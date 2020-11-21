<template>
  <div class="flex-container bg-polka">
    <div class="w-3/4 mx-auto block border rounded shadow p-3 bg-white m-3">
      <TextInput v-model="query" label="User or email regex" class="max-w-350 block mx-auto mb-1">
        <users-icon class="block mx-auto" />
      </TextInput>
      <div v-if="state===states.loading" class="block max-w-350 mx-auto w-full md:w-1/4 h-24 my-3">
        <LoaderAnim />
      </div>
      <ButtonPrimary v-else :action="performSearch" class="block w-full max-w-350 mx-auto my-3">
        <search-icon class="block mx-auto" />
      </ButtonPrimary>
    </div>

    <div class="w-3/4 mx-auto block">
      <div v-for="user in users" :key="user._id" class="border rounded shadow p-3 m-3 bg-white flow-root">
        <div class="float-left">
          <p class="my-1">
            <mail-icon class="inline-block mr-1" />{{ user.email }}
          </p>
          <p class="my-1">
            <at-sign-icon class="inline-block mr-1" />{{ user.displayName }}
          </p>
        </div>
        <div class="float-right">
          <ButtonPrimary :action="()=>{ $router.push(`/profile/${user._id}`) }">
            Go to profile
          </ButtonPrimary>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UsersIcon, SearchIcon, MailIcon, AtSignIcon } from 'vue-feather-icons'
import TextInput from '~/components/Widgets/TextInput'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import LoaderAnim from '~/components/Core/LoaderAnim'

export default {
  middleware: 'isadmin',
  components: {
    TextInput,
    LoaderAnim,
    UsersIcon,
    MailIcon,
    AtSignIcon,
    SearchIcon,
    ButtonPrimary
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      query: '',
      users: []
    }
  },
  methods: {
    performSearch () {
      this.state = this.states.loading
      this.$axios.get(`/admin/users?q=${this.query}`)
        .then((res) => {
          this.state = this.states.default
          if (res.data.success) {
            this.users = res.data.users
          }
        })
        .catch((e) => {
          this.users = []
          this.state = this.states.default
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
