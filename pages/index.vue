<template>
  <div>
    <HeroSection/>
    <GithubCalendar v-if="$config.social.github"/>
    <LazyRecentBlog v-if="$config.blog.enabled && posts" :posts="posts"/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `home -- ${this.$config.name}`,
    }
  },
  data() {
    return {
      posts: null
    }
  },
  async created() {
    const fetchDocsLabel = 'fetchAllPosts'
    console.time(fetchDocsLabel)
    try {
      const posts = await this.$content('posts')
        .without(['body', 'toc', 'dir', 'extension', 'path', 'tags'])
        .limit(3)
        .skip(0)
        .sortBy('createdAt', 'desc')
        .fetch()
      this.posts = posts
    } catch (e) {
      console.error(e)
    } finally {
      console.timeEnd(fetchDocsLabel)
    }
  },
}
</script>

<style>
</style>
