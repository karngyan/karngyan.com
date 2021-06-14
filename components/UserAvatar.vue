<template>
  <object :data="`https://ui-avatars.com/api/?uppercase=false&background=212324&color=4f46e5&rounded=true&name=${name}`" type="image/png">
    <img :src="photoURL" alt="user photo">
  </object>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
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
