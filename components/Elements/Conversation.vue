<template>
  <div ref="container" class="overflow-y-auto">
    <div v-if="state===states.default">
      <div v-for="msg in messages" :key="msg._id" class="w-full flow-root">
        <div class="border rounded shadow m-3 w-3/4 max-w-350 bg-white flow-root" :class="{ 'float-right': amSender(msg.sender), 'float-left': !amSender(msg.sender) }">
          <div v-if="amSender(msg.sender)">
            <p class="float-left text-black">
              <MarkdownView :markdown="msg.content" />
            </p>
            <p class="float-right pr-3">
              <small>{{ msg.sender.displayName }}</small>
            </p>
          </div>
          <div v-else>
            <p class="float-right pr-3 text-black">
              <MarkdownView :markdown="msg.content" />
            </p>
            <p class="float-left pl-3">
              <small>{{ msg.sender.displayName }}</small>
            </p>
          </div>
          <p class="clear-both mx-3">
            <small><timeago :class="{ 'float-right': amSender(msg.sender) }" :datetime="msg.timestamp" :auto-update="60" /></small>
          </p>
        </div>
      </div>
    </div>
    <div v-else class="w-1/2 md:w-1/4 mx-auto h-24 my-8">
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
    convoId: { type: String, default () { return '' } }
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
      if (id === undefined) {
        this.messages = []
        this.state = this.states.default
        return
      }
      this.state = this.states.loading
      this.$axios.get(`/conversations/${id}`)
        .then((res) => {
          this.state = this.states.default

          if (res.data.success) {
            this.messages = res.data.messages
            this.scrollToBottom()
          } else {
            this.messages = []
          }
        })
        .catch((e) => {
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
        if (this.$refs.container) {
          this.$refs.container.scrollTop = this.$refs.container.scrollHeight
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
@import '~/assets/scss/colours.scss';

</style>
