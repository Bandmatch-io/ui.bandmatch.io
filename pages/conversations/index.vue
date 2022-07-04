<template>
  <div ref="container" class="flex-container bg-polka">
    <div v-if="state===states.loading">
      <div class="block mx-auto w-1/2 md:w-1/4 h-24 md:h-48" style="transform: translateY(25vh);">
        <LoaderAnim />
      </div>
    </div>
    <div v-else class="fixed inset-0 t-nav">
      <p class="text-xl w-3/4 block mx-auto m-5">Conversations</p>
      <div class="w-3/4 block mx-auto">
        <!-- <div v-if="newChat" :class="{ 'bg-secondary-300 text-white hover:text-black': activeChat._id === undefined, 'bg-white': activeChat._id !== undefined }" class="clickable hover:bg-gray-100 border-b w-full block mx-auto shadow p-4 flow-root" @click="openChat(newChat)">
          <p class="float-left">
            <span v-if="newChat.otherUser">{{ newChat.otherUser.displayName }}</span>
          </p>
          <div class="float-right">
            <small class="text-complementary-300 mx-1">Unsent draft</small><plus-square-icon class="inline-block" />
          </div>
        </div> -->
        <div v-for="convo in conversations" :key="convo._id" class="bg-white text-black hover:text-white hover:bg-secondary-300 clickable border-b w-full block mx-auto shadow p-4 flow-root" @click="openChat(convo._id)">
          <p class="float-left">
            {{ convo.otherUser.displayName }}
          </p>
          <div class="float-right">
            <small><timeago :datetime="convo.lastMessage.timestamp" :auto-update="60" class="mr-1" /><eye-icon v-if="convo.lastMessage.read" size="1x" alt="Conversation has been read" class="inline-block" /><eye-off-icon v-else size="1x" alt="Conversation has not been read" class="inline-block" /></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EyeIcon, EyeOffIcon } from 'vue-feather-icons'
import LoaderAnim from '~/components/Core/LoaderAnim'
// import MarkdownMiniInput from '~/components/Widgets/MarkdownMiniInput'
// import Conversation from '~/components/Elements/Conversation'

export default {
  components: {
    LoaderAnim,
    EyeIcon,
    EyeOffIcon
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 1,
      conversations: [],
      messageContent: '',
      newChat: undefined, // Used when you start a new chat with someone
      activeChat: undefined, // The currently open chat,
      chatOpen: false,
      width: 0
    }
  },
  mounted () {
    this.getAllChats(this.checkNewChat)
  },
  methods: {
    openChat (convoID) {
      this.$router.push(`/conversations/${convoID}`)
    },
    checkNewChat () {
      this.newChat = this.$store.state.convo.newChat
      if (this.newChat.recipientID) {
        // check if new chat is with an old contact, if so open it
        for (let i = 0; i < this.conversations.length; i++) {
          const convo = this.conversations[i]
          if (convo.otherUser._id === this.newChat.recipientID) {
            this.openChat(convo._id)
            return
          }
        }
        // other wise open new
        this.openChat('new')
      }
    },
    getAllChats (done) {
      this.$axios.get('/convos/list')
        .then((res) => {
          if (res.data.success) {
            this.conversations = res.data.conversations
            this.conversations.forEach((convo) => {
              convo.otherUser = this.otherUser(convo.participants)
            })
            this.conversations.sort(this.convoSortFn)
            done()
          }
          this.state = this.states.default
        })
        .catch((e) => {
          this.state = this.states.default
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
