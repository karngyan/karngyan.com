<template>
  <div class="flex flex-col rounded-xl shadow-lg overflow-hidden" >
      <div class="flex-1 bg-gray-900 p-5 flex flex-row justify-between">
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <div class="text-xs font-medium text-hot-pink hover:text-hot-pink">
              <p class="text-hot-pink">
                {{ project.tech }}
              </p>
            </div>
            <nuxt-link class="group" :to="localePath(`/projects/${project.slug}`)">
              <h3 class="mt-0.5 group-hover:text-indigo-500 text-md leading-7 font-semibold text-gray-200">
                {{ project.title }}
              </h3>
              <p class="text-xs text-gray-400">
                {{ project.description }}
              </p>
            </nuxt-link>
          </div>
          <div class="flex mt-2 space-x-2 flex-row">
            <a target="_blank" rel="noreferrer" :href="project.website" class="hover:text-indigo-500 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
              </svg>
            </a>
            <a target="_blank" rel="noreferrer" :href="project.github" class="hover:text-indigo-500 text-gray-600">
              <span class="sr-only">GitHub</span>
              <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <div class="">
          <img class="h-16 rounded-md " :src="project.logo" alt="logo" />
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
