<template>
  <div class="w-full block px-8 py-8">
    <small class="block">Use markdown for flavour!</small>
    <div class="shadow rounded">
      <div class="rounded-t shadow-b bg-gray-100 border w-full block flex">
        <div v-if="!showHTML" @click="() => {processMD(); showHTML=true;}" class="w-110p clickable flex-grow text-white px-0 py-2 md:px-2 h-full inline-block text-center bg-secondary-300 hover:bg-secondary-400 hover:shadow-outline"><eye-icon class="inline-block mx-1 md:mx-2" />Preview</div>
        <div v-else @click="() => {showHTML=false}" class="w-110p clickable flex-grow text-white px-0 py-2 md:px-2 h-full inline-block text-center bg-secondary-300 hover:bg-secondary-400 hover:shadow-outline"><edit-icon class="inline-block mx-1 md:mx-2" />Edit</div>
        <div @click="addHeading" class="clickable flex-grow text-gray-500 hover:bg-gray-500 hover:text-white px-0 py-2 md:px-2 h-full inline-block text-center"><type-icon class="inline-block mx-1 md:mx-2" /></div>
        <div @click="addList" class="clickable flex-grow text-gray-500 hover:bg-gray-500 hover:text-white px-0 py-2 md:px-2 h-full inline-block text-center"><list-icon class="inline-block mx-1 md:mx-2" /></div>
        <div @click="setBold" class="clickable flex-grow text-gray-500 hover:bg-gray-500 hover:text-white px-0 py-2 md:px-2 h-full inline-block text-center"><bold-icon class="inline-block mx-1 md:mx-2" /></div>
        <div @click="setItalic" class="clickable flex-grow text-gray-500 hover:bg-gray-500 hover:text-white px-0 py-2 md:px-2 h-full inline-block text-center"><italic-icon class="inline-block mx-1 md:mx-2" /></div>
      </div>
      <ProgressBar class="border-l border-r" :percent="textFull"/>
      <div v-if="showHTML" v-html="htmlOutput" class="prose max-w-none rounded-b bg-white border relative mx-auto mt-0 mb-0 block p-4 m-4 relative inset-0"/>
      <textarea
        v-else
        ref="ta"
        @change="onChange"
        v-model="markdownInput"
        class=" border relative rounded-b mx-auto mt-0 mb-0 block p-4 m-4 relative inset-0"
        rows="12"
        :maxlength="maxlength">
      </textarea>
    </div>
    <small class="mt-0" v-if="maxlength">{{ markdownInput.length }} / {{ maxlength }}</small>
  </div>
</template>

<script>
import { EyeIcon, ListIcon, TypeIcon, ItalicIcon, BoldIcon, EditIcon } from 'vue-feather-icons'
import DOMPurify from 'dompurify'
import marked from 'marked'

export default {
  components: {
    EyeIcon,
    ListIcon,
    TypeIcon,
    ItalicIcon,
    BoldIcon,
    EditIcon
  },
  props: {
    value: String,
    maxlength: Number
  },
  data () {
    return {
      markdownInput: '',
      htmlOutput: '',
      showHTML: ''
    }
  },
  watch: {
    value () {
      this.markdownInput = this.value
    }
  },
  computed: {
    textFull () {
      return (this.markdownInput.length / this.maxlength) * 100
    }
  },
  methods: {
    processMD () {
      const render = new marked.Renderer()
      render.link = function (href, title, text) {
        return text
      }
      render.image = function (href, title, text) {
        return text
      }

      const dirty = marked(this.markdownInput, { renderer: render })
      console.log(dirty)
      this.htmlOutput = DOMPurify.sanitize(dirty)
    },
    onChange () {
      console.log(this.markdownInput)
      this.$emit('input', this.markdownInput)
    },
    addHeading () {
      if (this.markdownInput.length > 0) {
        this.markdownInput += '\n'
      }
      this.markdownInput += '# '
    },
    addList () {
      if (this.markdownInput.length > 0) {
        this.markdownInput += '\n'
      }
      this.markdownInput += '- '
    },
    setBold () {
      const textarea = this.$refs.ta
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const stringStart = this.markdownInput.substring(0, start)
      const heading = this.markdownInput.slice(start, end)
      const stringEnd = this.markdownInput.substring(end, this.markdownInput.length)

      this.markdownInput = stringStart + ' **' + heading + '** ' + stringEnd
    },
    setItalic () {
      const textarea = this.$refs.ta
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const stringStart = this.markdownInput.substring(0, start)
      const heading = this.markdownInput.slice(start, end)
      const stringEnd = this.markdownInput.substring(end, this.markdownInput.length)

      this.markdownInput = stringStart + ' *' + heading + '* ' + stringEnd
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';

textarea {
  resize: none;
  box-sizing: border-box;
  width: 100%;
  font-family: 'Roboto Mono', monospace;
}

.w-110p {
  width: 100px;
}
</style>
