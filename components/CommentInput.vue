<template>
  <div>
    <div class="max-w-7xl">
      <label for="comment" class="block text-sm font-medium text-gray-600">
      </label>
      <div class="mt-1">
        <textarea ref="commentarea" v-model="text" id="comment" name="comment" rows="4" class="block bg-gray-900 border-transparent text-gray-300 placeholder-gray-600 w-full rounded-md shadow-sm text-sm focus:ring-offset-transparent focus:ring-indigo-900" placeholder="did you like the post or have any questions? please share."></textarea>
      </div>
      <p class="mt-3 text-sm text-blue-gray-500"></p>
    </div>
    <div class="flex justify-end">
      <button @click="reset" type="button" class="bg-gray-900 py-2 px-4 rounded-md shadow-sm text-xs font-medium text-blue-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-transparent focus:ring-indigo-900">reset</button>
      <button @click="postComment" type="button" class="ml-3 inline-flex justify-center py-2 px-4 shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-transparent focus:ring-gray-900">post</button>
    </div>
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
      text: '',
      toastOptions: { duration: 2000, theme: 'bubble' }
    }
  },
  methods: {
    async postComment() {

      if (!this.user) {
        this.$toast.error('please sign in to post', this.toastOptions)
        return
      }

      if (this.text.trim() === '') {
        this.$toast.error('empty comments do not mean much', this.toastOptions)
        return
      }

      if (this.text.trim().length > 1000) {
        this.$toast.error('too long', this.toastOptions)
        return
      }

      try {
        const resp = await this.$store.dispatch('postComment', {text: this.text, slug: this.slug})
        this.$toast.success(resp, this.toastOptions)
        this.text = ''
      } catch (e) {
        this.$toast.error(e.toString(), this.toastOptions)
      }
    },
    reset() {
      this.text = ''
      this.$refs.commentarea.focus()
    }
  }
}
</script>

<style scoped>

</style>
