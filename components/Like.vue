<template>
<div class="space-y-2 flex flex-col items-center justify-center">
  <vue-clap-button @clap="clapClicked" :init-clicked="count" icon="good" :size="50" :max-click="10" bg-color="#18191a" color-active="#fd2d78" color-normal="#404345"/>
  <p class="text-xs select-none text-gray-500">{{ total }}</p>
</div>
</template>

<script>

export default {
  props: {
    slug: {
      type: String
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  data() {
    return {
      count: 0,
      total:  0,
      buffer: 0,
      id: ''
    }
  },
  methods: {
    clapClicked(e) {
      this.count = e
      this.total++
      this.buffer++
      if (!this.user) {
        this.$toast.error('sign in please so we don\'t lose your likes', { duration: 3000, theme: 'bubble' })
      }

      if (this.buffer >= 2 && this.user) {
        this.$store.dispatch('incrementLikes', {count: this.buffer, slug: this.slug, id: this.id})
        this.buffer = 0
      }
    },
    async fetchLikes() {
      if (!this.$config.firebase.enabled) {
        return
      }
      try {
        const { count, id } = await this.$store.dispatch('fetchLikes', {slug: this.slug})
        this.total = count
        this.id = id
      } catch (e) {
        console.error(e)
      }
    }
  },
  mounted() {
    this.fetchLikes()
  },
  watch: {
    user(n) {
      if (n) {
        this.fetchLikes()
      }
    }
  }
}
</script>

<style scoped>

</style>
