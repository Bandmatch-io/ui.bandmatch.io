<template>
  <div class="prose max-w-none relative mx-auto mt-0 mb-0 block p-4 m-4 relative inset-0" v-html="cleanMD" />
</template>

<script>
import DOMPurify from 'dompurify'
import marked from 'marked'

export default {
  props: {
    markdown: String
  },
  data () {
    return {
      render: undefined
    }
  },
  computed: {
    cleanMD () {
      if (this.markdown === '') { return '' }

      const md = this.markdown.replace(/[\n]{1}/gi, '\n\n')

      const dirty = marked(md, { renderer: this.render })
      return DOMPurify.sanitize(dirty)
    }
  },
  created () {
    this.render = new marked.Renderer()
    this.render.link = function (href, title, text) {
      return text
    }
    this.render.image = function (href, title, text) {
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
