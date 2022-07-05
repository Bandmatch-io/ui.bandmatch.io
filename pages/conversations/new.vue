<template>
  <div ref="container" class="flex-container bg-polka">
    <div v-if="state===states.loading">
      <div class="block mx-auto w-1/2 md:w-1/4 h-24 md:h-48" style="transform: translateY(25vh);">
        <LoaderAnim />
      </div>
    </div>
    <div v-else class="fixed inset-0 t-nav">
      <div class="grid grid-rows-4">
        <div class="mt-12 flex-container items-center row-start-1 row-end-4 row-span-3" v-if="recipient !== undefined" >
          <ProfileCard v-if="state===states.default" :user="recipient" :showControls="false" />
        </div>
        <MarkdownMiniInput
          v-model="messageContent"
          class="fixed bottom-0 w-full z-10"
          :maxlength="1024"
          :rows="1"
          :use-send="true"
          @send="() => { sendMessage(recipientID, messageContent) }"
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
import ProfileCard from '~/components/Elements/ProfileCard'
// import Conversation from '~/components/Elements/Conversation'

export default {
  components: {
    LoaderAnim,
    MarkdownMiniInput,
    ProfileCard,
    ChevronLeftIcon
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      messageContent: '',
      recipientID: undefined, // The currently open chat,
      recipient: undefined,
      width: 0
    }
  },
  mounted () {
    this.getOther()
  },
  methods: {
    getOther () {
      this.recipientID = this.$store.state.convo.newChat.recipientID
      this.$axios.get(`/users/profile?uid=${this.recipientID}`)
        .then((res) => {
          if (res.data.success) {
            this.recipient = res.data.user
            // force update so displayname shows (vue doesnt react to object field changes)
            this.$forceUpdate()
          }
        })
        .catch((e) => {
          this.newChat = undefined
        })
    },
    sendMessage (recipientID, content) {
      const body = {
        recipientID,
        messageContent: content
      }
      this.$axios.post('/msgs/send', body)
        .then((res) => {
          if (res.data.success) {
            this.openChat(res.data.conversation._id)
            this.$store.commit('convo/clearNewMessage')
          }
        })
        .catch((e) => {
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
    openChat (convoID) {
      this.$router.push(`/conversations/${convoID}`)
    },
    closeChat () {
      this.$store.commit('convo/clearNewMessage') // Remove this when adding drafts
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
