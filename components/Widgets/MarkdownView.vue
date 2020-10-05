<template>
  <div v-html="cleanMD" class="prose max-w-none bg-white relative mx-auto mt-0 mb-0 block p-4 m-4 relative inset-0"/>
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
  created () {
    this.render = new marked.Renderer()
    this.render.link = function (href, title, text) {
      return text
    }
    this.render.image = function (href, title, text) {
      return text
    }
  },
  computed: {
    cleanMD () {
      const dirty = marked(this.markdown, { renderer: this.render })
      return DOMPurify.sanitize(dirty)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
