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

    <div data-aos="zoom-in" class="select-none px-4 items-center justify-center sm:justify-start overflow-hidden flex pt-4">
      <nav class="flex flex-wrap items-center justify-center flex-row space-x-2 sm:space-x-4" aria-label="Tabs">
        <button @click="currentCategory = category" :class="{ 'bg-gray-900 text-gray-300': category === currentCategory }" v-for="category in categories" :key="category" class="flex text-gray-300 focus:outline-none focus:ring-transparent focus:ring-offset-transparent hover:text-hot-pink px-3 py-2 font-medium text-sm rounded-xl">
          {{ category }}
        </button>
      </nav>
    </div>

    <div data-aos="zoom-in" class="mt-5 gap-4 mx-4 grid max-w-none lg:grid-cols-3">
      <BlogCard v-for="post in postsByCategories" :key="post.slug" :post="post" />
    </div>

  </div>
</template>

<script>
const ALL = 'all'

export default {
  computed: {
    categories() {
      return [ALL, ...new Set(this.posts.map(post => post.category))]
    },
    postsByCategories() {
      if (this.currentCategory === ALL)
        return this.posts
      return this.posts.filter(post => post.category === this.currentCategory)
    }
  },
  data() {
    return {
      currentCategory: ALL,
      ALL: ALL, // exporting it to template
    }
  },
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
