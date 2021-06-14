<template>
  <div class="relative max-w-7xl border-r border-l border-dashed border-gray-700 py-6 mx-auto">
    <div data-aos="fade-up" class="text-center">
      <h2 class="text-2xl tracking-tight font-extrabold text-gray-200">
        {{ $t('projects.header') }}
      </h2>
      <p class="mt-2 px-2 max-w-2xl mx-auto text-sm leading-7 text-gray-400">
        {{ $t('projects.subtext') }}
      </p>
    </div>
    <div data-aos="zoom-in" class="mt-5 gap-4 mx-4 grid max-w-none lg:grid-cols-3">
      <ProjectCard class="hover:-rotate-12" v-for="project in projects" :key="project.slug" :project="project" />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `projects -- ${this.$config.name}`
    }
  },
  async asyncData({ $content }) {
    const fetchDocsLabel = 'fetchAllProjects'
    console.time(fetchDocsLabel)
    const projects = await $content('projects')
      .without(['body', 'toc'])
      .sortBy('id', 'asc')
      .fetch()
    console.timeEnd(fetchDocsLabel)
    return {
      projects
    }
  }
}
</script>

<style scoped>

</style>
