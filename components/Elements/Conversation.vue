<template>
  <div ref="container" class="overflow-y-auto">
    <div v-if="state===states.default">
      <div v-for="msg in messages" :key="msg._id" class="w-full clearfix">
        <div class="border rounded shadow m-3 w-3/4 max-w-350 bg-white clearfix" :class="{ 'float-right': amSender(msg.sender), 'float-left': !amSender(msg.sender) }">
          <p class="float-left text-black">
            <MarkdownView :markdown="msg.content" />
          </p>
          <p class="float-right pr-3">
            <small>{{ msg.sender.displayName }}</small>
          </p>
        </div>
      </div>
    </div>
    <div v-else class="w-1/2 md:w-1/4 mx-auto h-48" style="transform: translateY(50%);">
      <LoaderAnim />
    </div>
  </div>
</template>

<script>
import MarkdownView from '~/components/Widgets/MarkdownView'
import LoaderAnim from '~/components/Core/LoaderAnim'

export default {
  components: {
    MarkdownView,
    LoaderAnim
  },
  props: {
    convoId: String
  },
  data () {
    return {
      states: {
        loading: 0,
        default: 1,
        error: 2
      },
      state: 0,
      messages: []
    }
  },
  watch: {
    convoId (newVal, oldVal) {
      this.fetchConversation(newVal)
    }
  },
  mounted () {
    this.fetchConversation(this.convoId)
  },
  methods: {
    fetchConversation (id) {
      this.state = this.states.loading
      this.$axios.get(`/conversations/${id}`)
        .then((res) => {
          this.state = this.states.default
          console.log(res.data)
          if (res.data.success) {
            this.messages = res.data.messages
            this.scrollToBottom()
          } else {
            this.messages = []
          }
        })
        .catch((e) => {
          console.log(e)
          this.state = this.states.error
          this.messages = []
        })
    },
    amSender (sender) {
      return sender._id === this.$auth.user._id
    },
    addMessage (msg) {
      this.messages.push(msg)
      this.scrollToBottom()
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$refs.container.scrollTop = this.$refs.container.scrollHeight
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
@import '~/assets/scss/colours.scss';

</style>
