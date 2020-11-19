<template>
  <div ref="container" class="flex-container bg-polka">
    <div v-if="state===states.loading">
      <div class="block mx-auto w-1/2 md:w-1/4 h-24 md:h-48" style="transform: translateY(25vh);">
        <LoaderAnim />
      </div>
    </div>
    <div v-else class="fixed grid grid-cols-4" style="top: 5rem; left: 0; right: 0; bottom: 0;">
      <div v-if="showConvoList" class="col-span-4 md:col-span-1 border-r overflow-y-auto">
        <div v-if="newChat" :class="{ 'bg-secondary-300 text-white hover:text-black': activeChat._id === undefined, 'bg-white': activeChat._id !== undefined }" class="clickable hover:bg-gray-100 border-b w-full block mx-auto shadow p-4 flow-root" @click="openChat(newChat)">
          <p class="float-left">
            <span v-if="newChat.otherUser">{{ newChat.otherUser.displayName }}</span>
          </p>
          <div class="float-right">
            <small class="text-complementary-300 mx-1">Unsent draft</small><plus-square-icon class="inline-block" />
          </div>
        </div>
        <div v-for="convo in conversations" :key="convo._id" :class="{ 'bg-secondary-300 text-white hover:text-black': activeChat._id === convo._id, 'bg-white': activeChat._id !== convo._id }" class="clickable border-b hover:bg-gray-100 w-full block mx-auto shadow p-4 flow-root" @click="openChat(convo)">
          <p class="float-left">
            {{ convo.otherUser.displayName }}
          </p>
          <div class="float-right">
            <small><timeago :datetime="convo.lastMessage.timestamp" :auto-update="60" class="mr-1" /><eye-icon v-if="convo.lastMessage.read" alt="Conversation has been read" class="inline-block" /><eye-off-icon v-else alt="Conversation has not been read" class="inline-block" /></small>
          </div>
        </div>
      </div>
      <div v-if="activeChat && showChat" class="col-span-4 md:col-span-3 grid grid-rows-4 overflow-y-auto">
        <Conversation ref="convoInstance" class="z-0 row-start-1 row-end-4 row-span-3" :class="{ 'pt-16': mobileScreen }" :convo-id="activeChat._id" />
        <MarkdownMiniInput
          v-model="messageContent"
          class="row-end-5 place-self-end rounded-b-0 z-10"
          :maxlength="1024"
          :rows="1"
          :use-send="true"
          @send="() => { sendMessage(activeChat, messageContent) }"
        />
      </div>
      <div v-if="mobileScreen && activeChat && showChat" class="fixed left-0 right-0 top-5 rounded-b shadow bg-white py-1 grid grid-cols-4">
        <chevron-left-icon size="3x" class="border rounded bg-white hover:bg-gray-100 ring-primary-200 ring-0 hover:ring ring-opacity-50 ml-1 float-left inline-block col-span-1" @click="chatOpen = false" />
        <p class="text-center col-span-2">
          {{ activeChat.otherUser.displayName }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { EyeIcon, EyeOffIcon, PlusSquareIcon, ChevronLeftIcon } from 'vue-feather-icons'
import LoaderAnim from '~/components/Core/LoaderAnim'
import MarkdownMiniInput from '~/components/Widgets/MarkdownMiniInput'
import Conversation from '~/components/Elements/Conversation'

export default {
  components: {
    LoaderAnim,
    EyeIcon,
    EyeOffIcon,
    PlusSquareIcon,
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
      conversations: [],
      messageContent: '',
      newChat: undefined, // Used when you start a new chat with someone
      activeChat: undefined, // The currently open chat,
      chatOpen: false,
      width: 0
    }
  },
  computed: {
    mobileScreen () {
      return this.width < 767
    },
    showConvoList () {
      return !this.mobileScreen || (this.mobileScreen && !this.chatOpen)
    },
    showChat () {
      return !this.mobileScreen || (this.mobileScreen && this.chatOpen)
    }
  },
  mounted () {
    this.getAllChats(this.getNewChat)

    // watch for resize
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  methods: {
    onResize () {
      this.width = window.innerWidth
    },
    openChat (convo) {
      this.activeChat = convo

      if (this.activeChat.lastMessage) {
        const msgID = this.activeChat.lastMessage._id
        this.$axios.patch(`/conversations/read/${msgID}`)
        this.$store.commit('unread/removeUnread')
      }

      this.chatOpen = true
    },
    getNewChat () {
      this.newChat = this.$store.state.convo.newChat
      if (this.newChat.recipientID) {
        // check if new chat is with an old contact
        this.conversations.forEach((convo) => {
          if (convo.otherUser._id === this.newChat.recipientID) {
            this.activeChat = convo
            this.newChat = undefined
          }
        })

        this.$axios.get(`/users/profile/${this.newChat.recipientID}`)
          .then((res) => {
            if (res.data.success) {
              this.newChat.otherUser = res.data.user
              // force update so displayname shows (vue doesnt react to object field changes)
              this.$forceUpdate()
            }
          })
          .catch((e) => {
            this.newChat = undefined
          })
        this.openChat(this.newChat)
      } else {
        this.newChat = undefined
      }
      this.$store.commit('convo/clearNewMessage')
    },
    getAllChats (done) {
      this.$axios.get('/conversations/')
        .then((res) => {
          if (res.data.success) {
            this.conversations = res.data.conversations
            this.conversations.forEach((convo) => {
              convo.otherUser = this.otherUser(convo.participants)
            })
            this.conversations.sort(this.convoSortFn)
            if (this.conversations.length > 0) {
              this.openChat(this.conversations[0])
            }
            done()
          }
          this.state = this.states.default
        })
        .catch((e) => {
          console.log(e)
          this.state = this.states.default
        })
    },
    sendMessage (convo, content) {
      const body = {
        recipientID: convo.otherUser._id,
        messageContent: content
      }
      this.$axios.post('/conversations/message', body)
        .then((res) => {
          if (res.data.success) {
            res.data.conversation.otherUser = this.otherUser(res.data.conversation.participants)
            // If this was a new conversation, add it to the list
            if (this.newChat !== undefined) {
              this.conversations.push(res.data.conversation)
              this.conversations.sort(this.convoSortFn)
              this.newChat = undefined
            } else {
              // Not a new conversation, update the array and resort it.
              const i = this.conversations.findIndex(v => v._id === res.data.conversation._id)
              this.conversations[i] = res.data.conversation
              this.conversations.sort(this.convoSortFn)
              this.$forceUpdate()
            }
            // Add the message to the conversation instance
            this.$refs.convoInstance.addMessage(res.data.message)
          }
        })
        .catch(e => console.log(e))
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
