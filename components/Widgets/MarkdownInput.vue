<template>
  <div class="w-full block px-8 py-8">
    <small class="block">Use markdown for flavour!</small>
    <div class="shadow rounded">
      <div class="rounded-t shadow-b bg-gray-100 border w-full block flex">
        <div v-if="!showHTML" class="w-110p clickable flex-grow text-white px-0 py-2 md:px-2 h-full inline-block text-center bg-secondary-300 hover:bg-secondary-400 hover:shadow-outline" @click="() => {showHTML=true}">
          <eye-icon class="inline-block mx-1 md:mx-2" />Preview
        </div>
        <div v-else class="w-110p clickable flex-grow text-white px-0 py-2 md:px-2 h-full inline-block text-center bg-secondary-300 hover:bg-secondary-400 hover:shadow-outline" @click="() => {showHTML=false}">
          <edit-icon class="inline-block mx-1 md:mx-2" />Edit
        </div>
        <div class="clickable flex-grow text-gray-500 hover:bg-gray-500 hover:text-white px-0 py-2 md:px-2 h-full inline-block text-center" @click="addHeading">
          <type-icon class="inline-block mx-1 md:mx-2" />
        </div>
        <div class="clickable flex-grow text-gray-500 hover:bg-gray-500 hover:text-white px-0 py-2 md:px-2 h-full inline-block text-center" @click="addList">
          <list-icon class="inline-block mx-1 md:mx-2" />
        </div>
        <div class="clickable flex-grow text-gray-500 hover:bg-gray-500 hover:text-white px-0 py-2 md:px-2 h-full inline-block text-center" @click="setBold">
          <bold-icon class="inline-block mx-1 md:mx-2" />
        </div>
        <div class="clickable flex-grow text-gray-500 hover:bg-gray-500 hover:text-white px-0 py-2 md:px-2 h-full inline-block text-center" @click="setItalic">
          <italic-icon class="inline-block mx-1 md:mx-2" />
        </div>
      </div>
      <ProgressBar class="border-l border-r" :percent="textFull" />
      <!-- <div v-if="showHTML" v-html="htmlOutput" class="prose max-w-none rounded-b bg-white border relative mx-auto mt-0 mb-0 block p-4 m-4 relative inset-0"/> -->
      <MarkdownView v-if="showHTML" class="rounded-b border" :markdown="markdownInput" />
      <textarea
        v-else
        ref="ta"
        v-model="markdownInput"
        class=" border relative rounded-b mx-auto mt-0 mb-0 block p-4 m-4 relative inset-0"
        rows="12"
        :maxlength="maxlength"
        @change="onChange"
      />
    </div>
    <small v-if="maxlength" class="mt-0">{{ markdownInput.length }} / {{ maxlength }}</small>
  </div>
</template>

<script>
import { EyeIcon, ListIcon, TypeIcon, ItalicIcon, BoldIcon, EditIcon } from 'vue-feather-icons'
import MarkdownView from '~/components/Widgets/MarkdownView'

export default {
  components: {
    EyeIcon,
    ListIcon,
    TypeIcon,
    ItalicIcon,
    BoldIcon,
    EditIcon,
    MarkdownView
  },
  props: {
    value: String,
    maxlength: Number
  },
  data () {
    return {
      markdownInput: '',
      showHTML: ''
    }
  },
  computed: {
    textFull () {
      return (this.markdownInput.length / this.maxlength) * 100
    }
  },
  watch: {
    value () {
      this.markdownInput = this.value
    }
  },
  methods: {
    onChange () {
      console.log(this.markdownInput)
      this.$emit('input', this.markdownInput)
    },
    addHeading () {
      if (this.showHTML) { return }

      if (this.markdownInput.length > 0) {
        this.markdownInput += '\n'
      }
      this.markdownInput += '# '
    },
    addList () {
      if (this.showHTML) { return }

      if (this.markdownInput.length > 0) {
        this.markdownInput += '\n'
      }
      this.markdownInput += '- '
    },
    setBold () {
      if (this.showHTML) { return }

      const textarea = this.$refs.ta
      const start = textarea.selectionStart
      const end = textarea.selectionEnd

      const stringStart = this.markdownInput.substring(0, start)
      const heading = this.markdownInput.slice(start, end)
      const stringEnd = this.markdownInput.substring(end, this.markdownInput.length)

      this.markdownInput = stringStart + ' **' + heading + '** ' + stringEnd
    },
    setItalic () {
      if (this.showHTML) { return }

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
