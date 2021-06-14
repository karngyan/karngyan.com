<template>
  <div id="pdfvuer">
    <div ref="buttons" class="ui grey three item inverted bottom fixed menu transition hidden">
      <a class="item" @click="page > 1 ? page-- : 1">
        <i class="left chevron icon"></i>
        Back
      </a>
      <a class="ui active item">
        {{page}} / {{ numPages ? numPages : '∞' }}
      </a>
      <a class="item" @click="page < numPages ? page++ : 1">
        Forward
        <i class="right chevron icon"></i>
      </a>
    </div>
    <div ref="buttons" class="ui grey three item inverted bottom fixed menu transition hidden">
      <a class="item" @click="scale -= scale > 0.2 ? 0.1 : 0">
        <i class="left chevron icon" />
          Zoom -
      </a>
      <a class="ui active item">
        {{ formattedZoom }} %
      </a>
      <a class="item" @click="scale += scale < 2 ? 0.1 : 0">
        Zoom +
        <i class="right chevron icon" />
      </a>
    </div>
    <pdf :src="pdfdata" v-for="i in numPages" :key="i" :id="i" :page="i"
      :scale.sync="scale" style="width:100%;margin:8px auto;"
        :annotation="true"
        :resize="true"
        @link-clicked="handle_pdf_link">
      <template slot="loading">
        loading content here...
      </template>
    </pdf>
  </div>
</template>

<script>
import pdfvuer from 'pdfvuer'
import 'pdfjs-dist/build/pdf.worker.entry'

export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  components: {
    pdf: pdfvuer
  },
  data () {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: 'page-width'
    }
  },
  computed: {
    formattedZoom () {
        return Number.parseInt(this.scale * 100);
    },
  },
  mounted () {
    this.getPdf()
  },
  watch: {
    show: function (s) {
      if(s) {
        this.getPdf();
      }
    },
    page: function (p) {
      if( window.pageYOffset <= this.findPos(document.getElementById(p)) || ( document.getElementById(p+1) && window.pageYOffset >= this.findPos(document.getElementById(p+1)) )) {
        // window.scrollTo(0,this.findPos(document.getElementById(p)));
        document.getElementById(p).scrollIntoView();
      }
    }
  },
  methods: {
    handle_pdf_link: function (params) {
      // Scroll to the appropriate place on our page - the Y component of
      // params.destArray * (div height / ???), from the bottom of the page div
      const page = document.getElementById(String(params.pageNumber));
      page.scrollIntoView();
    },
    getPdf () {
      const self = this;
      self.pdfdata = pdfvuer.createLoadingTask(this.src);
      self.pdfdata.then(pdf => {
        self.numPages = pdf.numPages;
        window.onscroll = () => {
          changePage()
          stickyNav()
        }

        // Get the offset position of the navbar
        const sticky = this.$refs.buttons.offsetTop

        // Add the sticky class to the self.$refs.nav when you reach its scroll position. Remove "sticky" when you leave the scroll position
        const stickyNav = () => {
          if (window.pageYOffset >= sticky) {
            this.$refs.buttons.classList.remove("hidden")
          } else {
            this.$refs.buttons.classList.add("hidden")
          }
        }

        const changePage = () => {
          let i = 1, count = Number(pdf.numPages);
          do {
            if(window.pageYOffset >= self.findPos(document.getElementById(i)) &&
                window.pageYOffset <= self.findPos(document.getElementById(i+1))) {
              self.page = i
            }
            i++
          } while (i < count)
          if (window.pageYOffset >= self.findPos(document.getElementById(i))) {
            self.page = i
          }
        }
      });
    },
    findPos(obj) {
      return (obj && obj.offsetTop) ? obj.offsetTop : 0;
    }
  }
}
</script>
<style src="pdfvuer/dist/pdfvuer.css"></style>

<style lang="css" scoped>
  .buttons {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  /* Page content */
  .content {
    padding: 12px;
  }
</style>
