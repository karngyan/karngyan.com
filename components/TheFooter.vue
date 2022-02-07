<template>
  <footer class="bg-gray-800">
    <div class="max-w-7xl border-l border-r border-dashed border-gray-700 mx-auto px-4">
      <div class="pt-5 pb-12 md:flex md:items-center md:justify-between">
        <div class="flex space-x-6 md:order-2">
          <a v-if="$config.social.facebook" target="_blank" rel="noreferrer"  :href="`https://facebook.com/${$config.social.facebook}`" class="text-gray-400 hover:text-gray-300">
            <span class="sr-only">Facebook</span>
            <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <a v-if="$config.social.instagram" target="_blank" rel="noreferrer"  :href="`https://instagram.com/${$config.social.instagram}`" class="text-gray-400 hover:text-gray-300">
            <span class="sr-only">Instagram</span>
            <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
            </svg>
          </a>
          <a v-if="$config.social.twitter" target="_blank" rel="noreferrer"  :href="`https://twitter.com/${$config.social.twitter}`" class="text-gray-400 hover:text-gray-300">
            <span class="sr-only">Twitter</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 16 16"><g transform="matrix(0.6666666666666666,0,0,0.6666666666666666,0,0)"><path d="M23.32,6.44c0.212-0.177,0.241-0.492,0.065-0.704c-0.068-0.082-0.161-0.14-0.265-0.166l-0.79-0.2 c-0.268-0.067-0.431-0.339-0.364-0.606C21.974,4.731,21.986,4.7,22,4.67l0.44-0.89c0.12-0.249,0.015-0.548-0.233-0.668 C22.099,3.06,21.976,3.049,21.86,3.08l-2,0.56c-0.151,0.044-0.314,0.014-0.44-0.08c-0.865-0.649-1.918-1-3-1c-2.761,0-5,2.239-5,5 l0,0v0.36c0.001,0.127-0.094,0.235-0.22,0.25C8.39,8.5,5.7,7.07,2.8,3.73c-0.128-0.142-0.325-0.2-0.51-0.15 C2.124,3.656,2.013,3.817,2,4C1.599,5.645,1.761,7.377,2.46,8.92c0.062,0.123,0.013,0.274-0.11,0.336 C2.303,9.279,2.251,9.288,2.2,9.28L1.08,9.06C0.807,9.016,0.551,9.202,0.507,9.474C0.498,9.533,0.499,9.592,0.51,9.65 c0.175,1.555,1.047,2.945,2.37,3.78c0.124,0.06,0.176,0.21,0.116,0.334c-0.025,0.051-0.065,0.092-0.116,0.116l-0.53,0.21 c-0.256,0.103-0.381,0.394-0.278,0.65c0.005,0.014,0.011,0.027,0.018,0.04c0.595,1.302,1.791,2.229,3.2,2.48 c0.13,0.047,0.197,0.191,0.15,0.32c-0.025,0.07-0.08,0.124-0.15,0.15C3.93,18.292,2.471,18.575,1,18.56 c-0.276-0.055-0.545,0.124-0.6,0.4s0.124,0.545,0.4,0.6l0,0c2.548,1.208,5.321,1.866,8.14,1.93c2.479,0.038,4.915-0.658,7-2 c3.484-2.326,5.571-6.241,5.56-10.43V8.19c0.001-0.147,0.067-0.286,0.18-0.38L23.32,6.44z" stroke="none" fill="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
          </a>
          <a v-if="$config.social.github" target="_blank" rel="noreferrer" :href="`https://github.com/${$config.social.github}`" class="text-gray-400 hover:text-gray-300">
            <span class="sr-only">GitHub</span>
            <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
          <a v-if="$config.social.linkedin" target="_blank" rel="noreferrer" :href="`https://linkedin.com/in/${$config.social.linkedin}`" class="text-gray-400 hover:text-gray-300">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 16 16"><g transform="matrix(0.6666666666666666,0,0,0.6666666666666666,0,0)"><path d="M2.5,8.5h4C6.776,8.5,7,8.724,7,9v13c0,0.276-0.224,0.5-0.5,0.5h-4C2.224,22.5,2,22.276,2,22V9C2,8.724,2.224,8.5,2.5,8.5z M4.48,1.5c1.37,0,2.48,1.119,2.48,2.5S5.85,6.5,4.48,6.5S2,5.381,2,4S3.11,1.5,4.48,1.5z M18.5,22.5h3c0.276,0,0.5-0.224,0.5-0.5 v-8.4C22,9.83,19.87,8,16.89,8c-1.189-0.043-2.34,0.418-3.17,1.27c-0.148,0.171-0.407,0.19-0.578,0.042C13.051,9.233,13,9.12,13,9 c0-0.276-0.224-0.5-0.5-0.5h-3C9.224,8.5,9,8.724,9,9v13c0,0.276,0.224,0.5,0.5,0.5h3c0.276,0,0.5-0.224,0.5-0.5v-7.5 c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5V22C18,22.276,18.224,22.5,18.5,22.5z" stroke="none" fill="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
          </a>
          
        </div>
        <p class="mt-8 text-sm leading-6 text-gray-400 md:mt-0 md:order-1">
          {{ $config.name }} <span class="ceator-preview hover:text-hot-pink text-gray-300">
          <a class="hidden md:inline-block" rel="noreferrer" target="_blank" href="https://github.com/karngyan/karngyan.com">
          <creator-preview
            :avatar="avatar"
            :name="name"
            :description="description"
            :content="content" :mode="mode" />
          </a>
          
          </span>
        </p>
      </div>
    </div>
  </footer>

</template>

<script>
import CreatorPreview from 'vue-creator-preview';

export default {
  components: {
    CreatorPreview
  },
  data() {
    return {
      avatar: 'https://cdn.karngyan.com/karn.jpg',
      name: 'Karn',
      mode: 'dark',
      description: 'Software Engineer who tinkers with side projects, every now n then.',
      content: `Hey, I am Karn 👋<br/> I built this template for procrastinating devs to set up their portfolio + blogs<br/><br/>
Click on the link to visit the github repo to fork 👇🏾`,
    }
  }
}
</script>

<style scoped>
>>> .CreatorPreview {
  @apply bg-gray-900 shadow-lg !important;
}

>>> .CreatorPreview--Avatar {
  @apply h-20 w-20 !important;
}
</style>
