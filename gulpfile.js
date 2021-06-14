const gulp = require('gulp')
const awspublish = require('gulp-awspublish')
const awspublishRouter = require("gulp-awspublish-router");
const cloudfront = require('gulp-cloudfront-invalidate-aws-publish')
const parallelize = require('concurrent-transform')

// https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html

const config = {
  // Required
  params: {
    Bucket: process.env.AWS_BUCKET_NAME
  },
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v3'
  },

  // Optional
  deleteOldVersions: false, // KHATRON KE KHILADI // NOT FOR PRODUCTION // WHEN CLEANING UP THE BUCKET; JUST TURN IT ON.
  distribution: process.env.AWS_CLOUDFRONT, // CloudFront distribution ID
  region: process.env.AWS_DEFAULT_REGION,
  headers: {
    /* 'Cache-Control': 'max-age=315360000, no-transform, public', */
  },

  routerConfig: awspublishRouter({
    routes: {
        "^_nuxt/(?:.+)\\.(?:js|css|svg|ttf|png|json)$": {
            // don't modify original key. this is the default
            key: "$&",
            // use gzip for assets that benefit from it
            gzip: true,
            // cache static assets for 1 year for user
            cacheTime: 31536000,
            // cache static assets for 1 year on the CDN
            sharedCacheTime: 31536000
        },
        "^images/(?:.+)\\.(?:jpg|jpeg|gif|js|css|svg|ttf|png|json)$": {
            // don't modify original key. this is the default
            key: "$&",
            // use gzip for assets that benefit from it
            gzip: true,
            // cache static assets for 1 year for user
            cacheTime: 31536000,
            // cache static assets for 1 year on the CDN
            sharedCacheTime: 31536000
        },
        // pass-through for anything that wasn't matched by routes above, to be uploaded with default options
        "^.+$": "$&"
    }
  }),

  // Sensible Defaults - gitignore these Files and Dirs
  distDir: 'dist',
  indexRootPath: true,
  cacheFileName: '.awspublish',
  concurrentUploads: 10,
  wait: true // wait for CloudFront invalidation to complete (about 30-60 seconds)
}

gulp.task('deploy', function () {
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  const publisher = awspublish.create(config)

  let g = gulp.src('./' + config.distDir + '/**')

  // set route based config
  g = g.pipe(config.routerConfig)

  // publisher will add Content-Length, Content-Type and headers specified above
  // If not specified it will set x-amz-acl to public-read by default
  g = g.pipe(
    parallelize(publisher.publish(config.headers), config.concurrentUploads)
  )

  // Invalidate CDN
  if (config.distribution) {
    console.log('Configured with CloudFront distribution')
    g = g.pipe(cloudfront(config))
  } else {
    console.log(
      'No CloudFront distribution configured - skipping CDN invalidation'
    )
  }

  // Delete removed files
  if (config.deleteOldVersions) {
    g = g.pipe(publisher.sync())
  }
  // create a cache file to speed up consecutive uploads
  g = g.pipe(publisher.cache())
  // print upload updates to console
  g = g.pipe(awspublish.reporter())
  return g
})
