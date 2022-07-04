<template>
  <div ref="container" class="overflow-y-scroll">
    <div v-if="state===states.default">
      <div v-for="msg in messages" :key="msg._id" class="w-full flow-root">
        <div class="m-3 w-3/4 max-w-350" :class="{ 'float-right': amSender(msg.sender), 'float-left': !amSender(msg.sender) }">
          <div class="border rounded shadow bg-white flow-root mb-1">
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
          </div>
          <p class="mx-3">
            <small class="w-full grid grid-cols-5 grid-flow-col-dense">
              <check-circle-icon v-if="msg.read" size="1x" class="col-span-1 text-primary-300" :class="{'col-start-1': amSender(msg.sender), 'col-start-5 text-right': !amSender(msg.sender) }" />
              <circle-icon v-else size="1x" class="col-span-1 text-primary-300" :class="{'col-start-1': amSender(msg.sender), 'col-start-5 text-right': !amSender(msg.sender) }" />
              <timeago class="col-span-4" :datetime="msg.timestamp" :auto-update="60" :class="{'col-start-2 text-right': amSender(msg.sender), 'col-start-1': !amSender(msg.sender) }" />
            </small>
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
import { CircleIcon, CheckCircleIcon } from 'vue-feather-icons'
import MarkdownView from '~/components/Widgets/MarkdownView'
import LoaderAnim from '~/components/Core/LoaderAnim'

export default {
  components: {
    MarkdownView,
    LoaderAnim,
    CircleIcon,
    CheckCircleIcon
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
      state: 1,
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
      if (id === undefined || id === '') {
        this.messages = []
        this.state = this.states.error
        return
      }
      this.state = this.states.loading
      this.$axios.get(`/convos/?cid=${id}`)
        .then((res) => {
          this.state = this.states.default

          if (res.data.success) {
            this.messages = res.data.messages
            this.scrollToBottom()
            this.checkRead()
          } else {
            this.messages = []
          }
        })
        .catch((e) => {
          this.state = this.states.error
          this.messages = []
        })
    },
    checkRead () {
      const lastMSG = this.messages[this.messages.length - 1]
      if (lastMSG && !this.amSender(lastMSG.sender)) {
        const msgID = lastMSG._id
        lastMSG.read = true
        this.$axios.patch(`/msgs/read?mid=${msgID}`)
        this.$store.commit('unread/removeUnread')
      }
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
