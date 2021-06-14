<template>
  <div class="relative max-w-7xl border-r border-l border-dashed border-gray-700 py-6 mx-auto">
    <div data-aos="fade-up" class="text-center">
      <h2 class="text-2xl tracking-tight font-extrabold text-gray-200">
        {{ $t('blog.header') }}
      </h2>
      <p class="mt-2 px-2 max-w-2xl mx-auto text-sm leading-7 text-gray-400">
        {{ $t('blog.subtext') }}
      </p>
    </div>
    <div data-aos="zoom-in" class="mt-5 gap-4 mx-4 grid max-w-none lg:grid-cols-3">
      <BlogCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `blog -- ${this.$config.name}`
    }
  },
  async asyncData({ $content }) {
    const fetchDocsLabel = 'fetchAllPosts'
    console.time(fetchDocsLabel)
    const posts = await $content('posts')
      .without(['body', 'toc', 'dir', 'extension', 'path', 'tags'])
      .sortBy('createdAt', 'desc')
      .fetch()
    console.timeEnd(fetchDocsLabel)
    return { posts }
  }
}
</script>

<style scoped>

</style>
