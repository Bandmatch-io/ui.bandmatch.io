<template>
  <div ref="container" class="flex-container bg-polka">
    <div v-if="state===states.loading">
      <div class="block mx-auto w-1/2 md:w-1/4 h-24 md:h-48" style="transform: translateY(25vh);">
        <LoaderAnim />
      </div>
    </div>
    <div v-else class="fixed inset-0 t-nav">
      <div class="grid grid-rows-4 overflow-y-auto h-full">
        <Conversation ref="convoInstance" class="z-0 row-start-1 row-end-4 row-span-3" :convo-id="convoID" />
        <MarkdownMiniInput
          v-model="messageContent"
          class="fixed bottom-0 w-full z-10"
          :maxlength="1024"
          :rows="1"
          :use-send="true"
          @send="() => { sendMessage(convoID, messageContent) }"
        />
      </div>
    </div>
    <chevron-left-icon size="3x" class="fixed border shadow rounded bg-white hover:bg-gray-100 ring-primary-200 ring-0 hover:ring ring-opacity-50" @click="closeChat" />
  </div>
</template>

<script>
import { ChevronLeftIcon } from 'vue-feather-icons'
import LoaderAnim from '~/components/Core/LoaderAnim'
import MarkdownMiniInput from '~/components/Widgets/MarkdownMiniInput'
import Conversation from '~/components/Elements/Conversation'

export default {
  components: {
    LoaderAnim,
    MarkdownMiniInput,
    Conversation,
    ChevronLeftIcon
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 1,
      messageContent: '',
      convoID: undefined // The currently open chat
    }
  },
  mounted () {
    this.getChat(this.$route.params.id)
  },
  methods: {
    getChat (convoID) {
      this.convoID = convoID
      this.state = this.states.default
      this.$store.commit('convo/clearNewMessage')

      this.$forceUpdate()
    },
    sendMessage (convoID, content) {
      const body = {
        conversationID: convoID,
        messageContent: content
      }
      this.$axios.post('/msgs/send', body)
        .then((res) => {
          if (res.data.success) {
            // Add the message to the conversation instance
            this.$refs.convoInstance.addMessage(res.data.message)
          }
        })
        .catch((e) => {
          console.log(e)
          this.$store.commit('toasts/create', { title: 'Message', message: 'Could not send message.', type: 'error' })
        })
    },
    otherUser (participants) {
      let user = {}
      participants.forEach((p) => {
        if (p._id !== this.$auth.user._id) {
          user = p
        }
      })
      return user
    },
    convoSortFn (first, second) {
      const fDate = Date.parse(first.lastMessage.timestamp)
      const sDate = Date.parse(second.lastMessage.timestamp)

      if (fDate < sDate) {
        return 1
      } else {
        return -1
      }
    },
    closeChat () {
      this.$router.push('/conversations')
    }
  },
  head () {
    return {
      title: 'Conversations | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Conversations | Bandmatch' }
        // other meta
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
