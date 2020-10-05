<template>
  <div class="w-300 rounded shadow mx-auto sm:mx-4 my-5 bg-gray-100">
    <div class="p-3 border-b-2 shadow-sm rounded-t">
      <h3 class="mb-0">{{ user.displayName }}</h3>
      <p class="mt-0 text-black"><small>
        They want to
        <span v-if="user.searchType === 'Join'">join a band</span>
        <span v-if="user.searchType === 'Form'">form a band</span>
        <span v-if="user.searchType === 'Either'">either join or form a band</span>
        <span v-if="user.searchType === 'Recruit'">recruit a member</span>
      </small></p>
    </div>
    <div class="p-2 border-b-2  shadow-sm">
      <MarkdownView :markdown="user.description" class="rounded border-0 shadow-inner"/>
    </div>
    <div class="p-2">
      <div class="mb-0">
        <Badge v-for="genre in user.genres" :key="genre" :val="genre" />
      </div>
      <p v-if="user.searchType === 'Recruit'"><small>They are looking for people who play</small></p><p v-else>They play</p>
      <div class="mb-0">
        <Badge v-for="instrument in user.instruments" :key="instrument" :val="instrument" />
      </div>
    </div>
    <div class="w-full mb-0 grid grid-cols-5">
      <ButtonPrimary :action="()=>{}" groupPos="first" class="col-span-2 inline-block mx-0 mb-0 mt-0"><user-icon class="inline-block"/> Profile</ButtonPrimary>
      <ButtonPrimary :action="()=>{}" groupPos="mid" class="col-span-2 inline-block mx-0 mb-0 mt-0"><message-square-icon class="inline-block"/> Chat</ButtonPrimary>
      <ButtonComplement :action="()=>{}" groupPos="last" class="col-span-1 inline-block mx-0 mb-0 mt-0"><alert-octagon-icon class="inline-block" /></ButtonComplement>
    </div>
  </div>
</template>

<script>
import { MessageSquareIcon, UserIcon, AlertOctagonIcon } from 'vue-feather-icons'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import ButtonComplement from '~/components/Core/ButtonComplement'
import Badge from '~/components/Widgets/Badge'
import MarkdownView from '~/components/Widgets/MarkdownView'

export default {
  components: {
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
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
