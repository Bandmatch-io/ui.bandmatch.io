<template>
  <div class="w-300 rounded shadow bg-gray-100">
    <div class="p-3 border-b-2 shadow-sm rounded-t">
      <div class="mb-0 grid grid-cols-2">
        <h3 class="col-span-1 overflow-x-hidden">
          <award-icon v-if="user.admin" class="inline-block text-secondary-300" />{{ user.displayName }}
        </h3>
        <small class="col-span-1 text-right">
          <eye-icon size="1x" class="inline-block mr-1 text-secondary-300" /><timeago :datetime="user.timestamps.last_login" class="ml-auto mr-1" />
        </small>
      </div>
      <p class="mt-0 text-black">
        <small>
          They want to
          <span v-if="user.searchType === 'Join'">join a band</span>
          <span v-if="user.searchType === 'Form'">form a band</span>
          <span v-if="user.searchType === 'Either'">either join or form a band</span>
          <span v-if="user.searchType === 'Recruit'">recruit a member</span>
        </small>
      </p>
    </div>
    <div class="p-2 border-b-2  shadow-sm">
      <MarkdownView :markdown="shortDescription" style="height: 5rem;" class="overflow-y-auto rounded bg-white border-0 shadow-inner" />
    </div>
    <div class="p-2 border-b-2 shadow-sm" v-if="user.audioURL">
      <AudioWidget :url="user.audioURL" />
    </div>
    <div class="p-2">
      <div class="mb-0">
        <Badge v-for="genre in user.genres" :key="genre" :val="genre" />
      </div>
      <p v-if="user.searchType === 'Recruit'">
        <small>They are looking for people who play</small>
      </p><p v-else>
        They play
      </p>
      <div class="mb-0">
        <Badge v-for="instrument in user.instruments" :key="instrument" :val="instrument" />
      </div>
    </div>
    <div class="w-full mb-0 grid grid-cols-5" v-if="showControls">
      <Button :action="navigateToProfile" group-pos="first" class="col-span-2 inline-block mx-0 mb-0 mt-0">
        <user-icon class="inline-block" /> Profile
      </Button>
      <Button :action="startChat" group-pos="mid" class="col-span-2 inline-block mx-0 mb-0 mt-0">
        <message-square-icon class="inline-block" /> Chat
      </Button>
      <Button colour="complementary" :action="reportUser" group-pos="last" class="col-span-1 inline-block mx-0 mb-0 mt-0">
        <alert-octagon-icon class="inline-block" />
      </Button>
    </div>
  </div>
</template>

<script>
import { MessageSquareIcon, UserIcon, AlertOctagonIcon, AwardIcon, EyeIcon } from 'vue-feather-icons'
import Badge from '~/components/Widgets/Badge'
import MarkdownView from '~/components/Widgets/MarkdownView'

export default {
  components: {
    AwardIcon,
    Badge,
    MessageSquareIcon,
    UserIcon,
    AlertOctagonIcon,
    MarkdownView,
    EyeIcon
  },
  props: {
    user: {
      type: Object,
      default () {
        return {
          displayName: 'unknown user',
          instruments: [],
          genres: [],
          _id: undefined,
          description: '',
          searchType: 'Join',
          admin: false
        }
      }
    },
    showControls: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  computed: {
    shortDescription () {
      if (this.user.description.length > 50) {
        return this.user.description.slice(0, 50) + '\n ###### ...'
      }
      return this.user.description
    }
  },
  methods: {
    navigateToProfile () {
      this.$router.push(`/profile/${this.user._id}`)
    },
    startChat () {
      this.$store.commit('convo/setNewMessage', this.user._id, '')
      this.$router.push('/conversations')
    },
    reportUser () {
      this.$store.commit('reports/startReport', { id: this.user._id, type: 'User' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
