<template>
  <div class="flex-container bg-polka">
    <h1 class="text-5xl text-center w-3/4 mx-auto block my-3">News</h1>
    <div class="w-3/4 mx-auto block">
      <small>{{ news.length }} articles</small>
      <div v-for="news in pages[currentPage]" :key="news._id" class="cursor-pointer border rounded shadow p-3 m-3 bg-white hover:text-white hover:bg-secondary-300 flow-root grid grid-cols-2 md:grid-cols-4" @click="()=>{navigateTo(news._id)}">
        <div class="col-span-3">
          <h1 class="text-xl capitalize">{{ news.title }}</h1>
        </div>
        <div class="col-span-1">
          <small class="text-right w-full inline-block"><timeago :datetime="news.timestamps.deliveryTime" :auto-update="600"/></small>
        </div>
      </div>
      <div v-if="pages.length > 1" class="mb-4 grid grid-flow-col grid-rows-1 grid-cols-max centent-center">
        <Button class="inline-block h-12 mr-0 col-span-2" group-pos="first" colour="secondary" :action="()=>{ setPage(0) }">
          First
        </Button>
        <Button
          v-for="(item, index) in pages"
          :key="index"
          :disabled="currentPage===index"
          class="inline-block h-12 mx-0 col-span-1"
          group-pos="mid"
          :action="()=>{ setPage(index) }">
          {{ index }}
        </Button>
        <Button class="inline-block h-12 ml-0 col-span-2" group-pos="last" colour="secondary" :action="()=>{ setPage(pages.length-1) }">
          Last
        </Button>
      </div>
    </div>
    <div v-if="state===states.loading" class="block max-w-350 mx-auto w-full md:w-1/4 h-24 my-3">
      <LoaderAnim />
    </div>
  </div>
</template>

<script>

export default {
  auth: false,
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      query: '',
      news: [],
      pages: [],
      currentPage: 0,
      pageSize: 25
    }
  },
  methods: {
    navigateTo (id) {
      this.$router.push(`/news/${id}`)
    },
    setPage (p) {
      this.currentPage = p
    },
    performSearch () {
      this.state = this.states.loading
      this.pages = []
      this.$axios.get('/news/getall?dl=true')
        .then((res) => {
          this.state = this.states.default
          console.log(res.data)
          if (res.data.success && res.data.newsletters) {
            this.news = res.data.newsletters
            for (let i = 0; i < this.news.length; i += this.pageSize) {
              const page = this.news.slice(i, i + this.pageSize)
              this.pages.push(page)
            }
          }
        })
        .catch((e) => {
          this.news = []
          this.state = this.states.default
        })
    }
  },
  mounted () {
    this.performSearch()
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
