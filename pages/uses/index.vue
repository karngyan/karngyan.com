<template>
<div class="max-w-7xl pb-10 border-r border-l border-dashed border-gray-700 mx-auto">
  <div data-aos="fade-up" class="relative max-w-7xl py-6 mx-auto">
    <div class="text-center">
      <h2 class="text-2xl tracking-tight font-extrabold text-gray-200">
        {{ $t('uses.header') }}
      </h2>
      <p class="mt-2 px-2 max-w-2xl mx-auto text-sm leading-7 text-gray-400">
        {{ $t('uses.subtext') }}
      </p>
    </div>
  </div>
  <div data-aos="zoom-in" class="max-w-4xl mx-4 border border-dashed border-gray-700 sm:mx-auto bg-gray-900 shadow-md rounded-md overflow-hidden sm:rounded-lg">
    <div v-if="$config.social.codestats" class="px-4 py-5 flex flex-row justify-between border-b border-indigo-600 sm:px-6">
      <div class="w-full">
        <a :href="`https://codestats.net/users/${$config.social.codestats}`" target="_blank" rel="noreferrer">
          <dl>
            <dt class="text-sm leading-6 font-normal text-hot-pink">
              Level {{ level }}
            </dt>
            <dd class="mt-1 flex justify-between items-baseline md:flex lg:flex">
              <div class="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
                {{ totalXP.toLocaleString() }} XP
                <span class="ml-2 text-sm leading-5 font-medium text-gray-500">
                  from {{ (totalXP - newXP).toLocaleString() }}
                </span>
              </div>
              <div class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-gray-800 text-green-400 md:mt-2 lg:mt-0">
                <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="sr-only">
                  Increased by
                </span>
                {{ newXP.toLocaleString() }}
              </div>
            </dd>
          </dl>
        </a>
      </div>
    </div>
    <div>
      <dl>
        <div v-for="(item, index) in $config.uses.meta" :class="index%2 === 0 ? 'bg-gray-800' : 'bg-gray-900'" class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm leading-5 font-medium text-gray-500">
            {{ item.title }}
          </dt>
          <dd class="mt-1 text-sm leading-5 text-gray-400 sm:mt-0 sm:col-span-2">
            {{ item.value }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</div>
</template>

<script>
export default {
  head() {
    return {
      title: `uses -- ${this.$config.name}`
    }
  },
  data() {
    return {
      totalXP: 0,
      newXP: 0,
      level: 0
    }
  },
  methods: {
    initValues({total_xp, new_xp, dates}) {
      this.totalXP = total_xp;
      this.newXP = new_xp;
      this.level = Math.floor(0.025 * Math.sqrt(total_xp))
    },
  },
  mounted() {
    fetch(`https://codestats.net/api/users/${this.$config.social.codestats}`)
      .then(resp => resp.json())
      .then(data => {
        this.initValues(data)
      })
      .catch(err => {
        console.error(err);
      })
  }
}
</script>

<style scoped>

</style>
