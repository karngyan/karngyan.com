<template>
<div class="max-w-7xl mx-auto border-gray-700 border-dashed border-l border-r">
  <div class="dark antialiased text-gray-200">
    <div class="px-4 py-4 max-w-5xl mx-auto sm:px-6 lg:px-8">
      <article data-aos="fade-up">
        <div class="space-y-9">
          <div class="py-0.5 border-t border-b border-dashed border-gray-700 flex items-center justify-between">
            <div class="text-indigo-700 font-bold">
              <nuxt-link class="hover:text-indigo-500" :to="localePath('/blog')">{{ $t('blog.header') }}</nuxt-link> <span class="text-gray-700">/</span> {{ post.category }}
            </div>
            <div><a target="_blank" rel="noreferrer" :href="post.twitterShareUrl" class="inline-flex items-center py-2 px-3 space-x-2 rounded-md bg-gray-900 text-gray-300 text-xs font-medium hover:text-gray-200 transition ease-in-out duration-100"><span>Share on Twitter</span><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g transform="matrix(0.6666666666666666,0,0,0.6666666666666666,0,0)"><path d="M23.32,6.44c0.212-0.177,0.241-0.492,0.065-0.704c-0.068-0.082-0.161-0.14-0.265-0.166l-0.79-0.2 c-0.268-0.067-0.431-0.339-0.364-0.606C21.974,4.731,21.986,4.7,22,4.67l0.44-0.89c0.12-0.249,0.015-0.548-0.233-0.668 C22.099,3.06,21.976,3.049,21.86,3.08l-2,0.56c-0.151,0.044-0.314,0.014-0.44-0.08c-0.865-0.649-1.918-1-3-1c-2.761,0-5,2.239-5,5 l0,0v0.36c0.001,0.127-0.094,0.235-0.22,0.25C8.39,8.5,5.7,7.07,2.8,3.73c-0.128-0.142-0.325-0.2-0.51-0.15 C2.124,3.656,2.013,3.817,2,4C1.599,5.645,1.761,7.377,2.46,8.92c0.062,0.123,0.013,0.274-0.11,0.336 C2.303,9.279,2.251,9.288,2.2,9.28L1.08,9.06C0.807,9.016,0.551,9.202,0.507,9.474C0.498,9.533,0.499,9.592,0.51,9.65 c0.175,1.555,1.047,2.945,2.37,3.78c0.124,0.06,0.176,0.21,0.116,0.334c-0.025,0.051-0.065,0.092-0.116,0.116l-0.53,0.21 c-0.256,0.103-0.381,0.394-0.278,0.65c0.005,0.014,0.011,0.027,0.018,0.04c0.595,1.302,1.791,2.229,3.2,2.48 c0.13,0.047,0.197,0.191,0.15,0.32c-0.025,0.07-0.08,0.124-0.15,0.15C3.93,18.292,2.471,18.575,1,18.56 c-0.276-0.055-0.545,0.124-0.6,0.4s0.124,0.545,0.4,0.6l0,0c2.548,1.208,5.321,1.866,8.14,1.93c2.479,0.038,4.915-0.658,7-2 c3.484-2.326,5.571-6.241,5.56-10.43V8.19c0.001-0.147,0.067-0.286,0.18-0.38L23.32,6.44z" stroke="none" fill="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path></g></svg></a></div>
          </div>
          <div class="px-4 sm:px-0 lg:px-4 pb-4 bg-gray-900 rounded-lg">
            <a href="https://twitter.com/gyankarn">
            <div class="flex flex-items-center justify-center  rounded-full">
              <UserAvatar :photoURL="post.author.image" :name="post.author.name" class="w-12 h-12 border-2 border-indigo-600 hover:border-hot-pink -mt-5 bg-gray-900 rounded-full"/>
            </div>
            </a>
            <header class="py-4">
              <div class="space-y-1 text-center">
                <div >
                  <h1 class="text-2xl font-extrabold text-gray-100 tracking-tight">{{ post.title }}</h1>
                </div>

                <dl class="">
                  <div><dt class="sr-only">Published on</dt>
                    <dd class="text-xs font-medium text-gray-500">
                      <a target="_blank" rel="noreferrer" :href="`https://twitter.com/${post.author.twitter}`"><span class="text-indigo-600 hover:text-indigo-300">{{ post.author.name }}</span></a>
                      <time :datetime="post.createdAt">{{' on ' + new Date(post.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}) }}</time>
                      <span class="mx-1">
                        &middot;
                      </span>
                      {{ post.readingTime }}
                    </dd>
                  </div>
                </dl>

                <div class="overflow-hidden flex flex-wrap items-center flex-row justify-center">
                    <div class="px-3 text-xs flex flex-shrink-0 py-1 mt-1 mr-2 bg-indigo-600 rounded-md hover:bg-indigo-700" v-for="(tag, index) in post.tags" :key="`tag-${index}`">{{ tag }}</div>
                </div>
              </div>
            </header>

            <div class="prose dark:prose-dark break-words my-4 prose-sm max-w-4xl mx-auto">
              <nuxt-content :document="post" />
            </div>
          </div>

        </div>
        <div v-if="$config.firebase.enabled">
          <div class="my-6">
            <Like :slug="post.slug" />
          </div>
          <div id="comments" class="border-t border-gray-700 border-dashed mt-6 py-5">
            <CommentInput :slug="post.slug"/>
          </div>
          <div class="space-y-4 max-w-7xl">
            <Comment v-for="(comment, index) in comments" :comment="comment"  :key="index" />
          </div>
        </div>
      </article>
    </div>
  </div>

  <div @click="scrollToTop" class="cursor-pointer fixed z-50 bottom-4 right-4 w-8 w-8 rounded-full bg-gray-900 text-white block text-indigo-600 hover:text-hot-pink">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
    </svg>
  </div>
</div>
</template>

<script>
export default {
  async asyncData({ $content, params, route, $config }) {
    const post = await $content('posts', params.slug).fetch()
    post.twitterShareUrl = `https://twitter.com/intent/tweet?text=${post.title} by @${post.author.twitter}&url=https://${$config.domain}${route.fullPath}`
    return {
      post,
    }
  },
  computed: {
    comments() {
      const comments = [ ...(this.$store.state.comments[this.post.slug] ? this.$store.state.comments[this.post.slug] : [])]
      return comments.sort(this.cmp)
    }
  },
  data() {
    return {
      toastOptions: { duration: 2000, theme: 'bubble' }
    }
  },
  async fetch() {
    if (!this.$config.firebase.enabled) {
      return
    }
    try {
      await this.$store.dispatch('fetchComments', {slug: this.post.slug})
    } catch (e) {
      this.$toast.error(e.toString(), this.toastOptions)
      console.error(e)
    }
  },
  head() {
    return {
      title: this.post.title + ` -- blog -- ${this.$config.name}`,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.post.title },
        { hid: 'og:description', property: 'og:description', content: this.post.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.post.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.post.description }
      ]
    }
  },
  methods: {
    scrollToTop() {
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    cmp(a, b) {
      if (a.created < b.created) return 1
      if (a.created > b.created) return -1
      return 0
    }
  }
}
</script>

<style scoped>
>>> .icon {
  @apply text-indigo-600 hover:text-hot-pink hidden;
}

>>> .breaker {
    @apply text-center py-2;
}

>>> .breaker::after {
  content: "• • •";
}

>>> .nuxt-content .caption {
  @apply text-center;
}

>>> .nuxt-content img {
  @apply mx-auto rounded-md;
}

</style>
