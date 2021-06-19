<template>
  <img :src="imageURL" alt="user photo" @error="onImageLoadError" />
</template>

<script>

export default {
  methods: {
    onImageLoadError() {
      this.imageLoadError = true
    }
  },
  computed: {
    imageURL() {
      const avatar = `https://ui-avatars.com/api/?uppercase=false&background=212324&color=4f46e5&rounded=true&name=${this.name}`
      if (!this.photoURL || this.imageLoadError)
        return avatar
      return this.photoURL
    }
  },
  data() {
    return {
      imageLoadError: false
    }
  },
  props: {
    name: {
      type: String
    },
    photoURL: {
      type: String,
      required: false
    }
  }
}
</script>
