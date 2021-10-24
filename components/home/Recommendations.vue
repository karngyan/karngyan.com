<template>
  <div class="max-w-7xl mx-auto border-l border-r border-dashed border-gray-700 pt-4 pb-6 px-4">
    <div class="max-w-prose text-center mx-auto pb-4">
      <p class="text-xs leading-6 text-indigo-600 font-semibold tracking-wide lowercase">{{ $t('recommendations.subtext') }}</p>
      <div v-if="$config.social.linkedin">
        <a :href="`https://linkedin.com/in/${$config.social.linkedin}`" target="_blank" rel="noreferrer" class="mt-2 text-3xl hover:text-hot-pink leading-8 font-extrabold tracking-tight text-gray-500">{{ $t('recommendations.header') }}</a>
      </div>
      <div v-else>
        <div class="mt-2 text-3xl hover:text-hot-pink leading-8 font-extrabold tracking-tight text-gray-500">{{ $t('recommendations.header') }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div v-for="(rec, index) in $config.recommendations.meta" :key="`rec-${index}`" class="relative h-full bg-gray-900 rounded-lg shadow-lg text-base w-full">
        <blockquote class="relative">
          <div class="rounded-t-lg px-5 py-5 sm:px-8 sm:py-8y">
            <div class="flex flex-row">
              <a :href="rec.linkedin" target="_blank" rel="noreferrer">
                <cite class="flex items-center rounded-b-lg not-italic">
                  <div class="flex-shrink-0 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 rounded-full border border-hot-pink mr-4">
                    <img class="w-8 h-8 rounded-full bg-indigo-300" :src="rec.image" alt="Varun">
                  </div>
                  <span class="text-gray-400 font-semibold py-2">
                  <strong class="text-gray-200 font-semibold">{{ rec.name }}</strong>
                  {{ rec.designation }}
                </span>
                </cite>
              </a>
            </div>
            <div class="relative text-sm text-gray-300 font-medium mt-4">
              <svg class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-800" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p class="relative">
                {{ rec.content }}
              </p>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
