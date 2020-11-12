<template>
  <div class="block md:inline-block w-300 rounded shadow mx-auto md:mx-5 my-5 bg-gray-100">
    <div class="p-3 border-b-2 shadow-sm rounded-t">
      <h3 class="mb-0">
        <award-icon v-if="user.admin" class="inline-block" />{{ user.displayName }}
      </h3>
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
    <div class="w-full mb-0 grid grid-cols-5">
      <ButtonPrimary :action="navigateToProfile" group-pos="first" class="col-span-2 inline-block mx-0 mb-0 mt-0">
        <user-icon class="inline-block" /> Profile
      </ButtonPrimary>
      <ButtonPrimary :action="startChat" group-pos="mid" class="col-span-2 inline-block mx-0 mb-0 mt-0">
        <message-square-icon class="inline-block" /> Chat
      </ButtonPrimary>
      <ButtonComplement :action="()=>{}" group-pos="last" class="col-span-1 inline-block mx-0 mb-0 mt-0">
        <alert-octagon-icon class="inline-block" />
      </ButtonComplement>
    </div>
  </div>
</template>

<script>
import { MessageSquareIcon, UserIcon, AlertOctagonIcon, AwardIcon } from 'vue-feather-icons'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import ButtonComplement from '~/components/Core/ButtonComplement'
import Badge from '~/components/Widgets/Badge'
import MarkdownView from '~/components/Widgets/MarkdownView'

export default {
  components: {
    AwardIcon,
    ButtonPrimary,
    ButtonComplement,
    Badge,
    MessageSquareIcon,
    UserIcon,
    AlertOctagonIcon,
    MarkdownView
  },
  props: {
    user: Object
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
