<template>
  <div class="block md:inline-block w-300 rounded shadow bg-gray-100">
    <div class="p-3 border-b-2 shadow-sm rounded-t">
      <h3 class="mb-0">
        <award-icon v-if="user.admin" class="inline-block" />{{ user.displayName }}
      </h3>
      <p class="mt-0 text-black flow-root">
        <small>
          They want to
          <span v-if="user.searchType === 'Join'">join a band</span>
          <span v-if="user.searchType === 'Form'">form a band</span>
          <span v-if="user.searchType === 'Either'">either join or form a band</span>
          <span v-if="user.searchType === 'Recruit'">recruit a member</span>
        </small>
        <ButtonSmall :action="() => { sendEdit('type') }" class="float-right">
          <edit-icon size="1.5x" class="inline-block" />
        </ButtonSmall>
      </p>
    </div>
    <div class="p-2 border-b-2 shadow-sm relative">
      <MarkdownView :markdown="shortDescription" style="height: 5rem;" class="overflow-y-auto rounded bg-white border-0 shadow-inner" />
      <ButtonSmall :action="() => { sendEdit('description') }" class="absolute mr-4 mt-4 top-0 right-0">
        <edit-icon size="1.5x" class="inline-block" />
      </ButtonSmall>
    </div>
    <div class="p-2">
      <div class="mb-0 flow-root">
        <Badge v-for="genre in user.genres" :key="genre" :val="genre" />
        <ButtonSmall :action="() => { sendEdit('genre') }" class="float-right">
          <edit-icon size="1.5x" class="inline-block" />
        </ButtonSmall>
      </div>
      <p v-if="user.searchType === 'Recruit'">
        <small>They are looking for people who play</small>
      </p><p v-else>
        They play
      </p>
      <div class="mb-0">
        <Badge v-for="instrument in user.instruments" :key="instrument" :val="instrument" />
        <ButtonSmall :action="() => { sendEdit('instrument') }" class="float-right">
          <edit-icon size="1.5x" class="inline-block" />
        </ButtonSmall>
      </div>
    </div>
    <div class="w-full mb-0 grid grid-cols-5">
      <Button :action="() => {}" group-pos="first" class="col-span-2 inline-block mx-0 mb-0 mt-0">
        <user-icon class="inline-block" /> Profile
      </Button>
      <Button :action="() => {}" group-pos="mid" class="col-span-2 inline-block mx-0 mb-0 mt-0">
        <message-square-icon class="inline-block" /> Chat
      </Button>
      <Button colour="complementary" :action="() => {}" group-pos="last" class="col-span-1 inline-block mx-0 mb-0 mt-0">
        <alert-octagon-icon class="inline-block" />
      </Button>
    </div>
  </div>
</template>

<script>
import { MessageSquareIcon, UserIcon, AlertOctagonIcon, AwardIcon, EditIcon } from 'vue-feather-icons'
import Badge from '~/components/Widgets/Badge'
import MarkdownView from '~/components/Widgets/MarkdownView'

export default {
  components: {
    AwardIcon,
    Badge,
    MessageSquareIcon,
    UserIcon,
    EditIcon,
    AlertOctagonIcon,
    MarkdownView
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
          searchType: 'Join'
        }
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
    sendEdit (type) {
      this.$emit(`send-${type}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
