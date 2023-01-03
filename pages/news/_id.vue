<template>
  <div class="flex-container bg-polka">
    <div v-if="state===states.loading" class="block max-w-350 mx-auto w-full md:w-1/4 h-24 my-3">
      <LoaderAnim />
    </div>
    <div v-if="article" class="w-full h-full">
      <h1 class="text-5xl text-center w-3/4 mx-auto block my-3 capitalize">{{ article.title }}</h1>
      <p class="text-center w-3/4 mx-auto block mb-2">
        <nuxt-link to="/news" class="text-primary-300 hover:text-secondary-300 cursor-pointer hover:underline">
          <link-icon size="1x" class="inline-block mr-1" />Go back
        </nuxt-link>
      </p>
      <div class="w-3/4 mx-auto block">
        <MarkdownView class="block mx-auto rounded bg-white shadow" :markdown="article.markdown" />
      </div>
    </div>
  </div>
</template>

<script>
import { LinkIcon } from 'vue-feather-icons'

export default {
  auth: false,
  components: {
    LinkIcon
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 1,
      article: undefined
    }
  },
  methods: {
    getPage (id) {
      this.state = this.states.loading
      this.pages = []
      this.$axios.get(`/news/get?id=${id}`)
        .then((res) => {
          this.state = this.states.default
          if (res.data.success) {
            this.article = res.data.newsletter
          }
        })
        .catch((e) => {
          this.news = []
          this.state = this.states.default
        })
    }
  },
  mounted () {
    this.getPage(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
