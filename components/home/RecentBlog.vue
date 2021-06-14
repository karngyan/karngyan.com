<template>
  <div class="bg-gray-800 border-t border-b border-dashed border-gray-700">
    <div data-aos="fade-up" class="max-w-7xl pb-6 mx-auto border-l border-r border-dashed border-gray-700">
      <div class="max-w-prose text-center mx-auto py-4">
        <p class="text-xs leading-6 text-indigo-600 font-semibold tracking-wide lowercase">{{ $t('recentBlog.subtext') }}</p>
        <nuxt-link :to="localePath('/blog')" class="mt-2 text-3xl hover:text-hot-pink leading-8 font-extrabold tracking-tight text-gray-500">{{ $t('recentBlog.header') }}</nuxt-link>
      </div>
      <div data-aos="zoom-in" class="gap-4 mx-4 sm:mx-auto grid max-w-5xl grid-flow-row sm:grid-flow-col">
        <BlogCard v-for="post in posts" :key="post.slug" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
