<template>
  <div class="flex-container bg-polka">
    <div class="w-3/4 mx-auto block border rounded shadow p-3 bg-white m-3">
      <form @submit.prevent="performSearch">
        <TextInput v-model="query" label="User or email regex" class="max-w-350 block mx-auto mb-1">
          <users-icon class="block mx-auto" />
        </TextInput>
        <div v-if="state===states.loading" class="block max-w-350 mx-auto w-full md:w-1/4 h-24 my-3">
          <LoaderAnim />this.colours =
        </div>
        <ButtonPrimary v-else :action="performSearch" class="block w-full max-w-350 mx-auto my-3">
          <search-icon class="block mx-auto" />
        </ButtonPrimary>
      </form>
    </div>

    <div class="w-3/4 mx-auto block">
      <div v-for="user in users" :key="user._id" class="border rounded shadow p-3 m-3 bg-white flow-root grid grid-cols-2">
        <div class="col-span-2 md:col-span-1">
          <p class="my-1">
            <mail-icon class="inline-block mr-1" /><check-circle-icon v-if="user.emailConfirmed" class="inline-block mr-1 text-primary-300" />{{ user.email }}
          </p>
          <p class="my-1">
            <at-sign-icon class="inline-block mr-1" />{{ user.displayName }}
          </p>
          <div class="grid grid-cols-4">
            <div class="col-span-4 md:col-span-2">
              <small>
                Last seen <timeago :datetime="user.timestamps.last_login" class="mr-1" />
              </small>
            </div>
            <div class="col-span-4 md:col-span-2">
              <small>
                Joined {{ new Date(user.timestamps.signup_at).toDateString() }}
              </small>
            </div>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1 grid grid-cols-2">
          <ButtonPrimary class="inline-block col-span-1 h-12" group-pos="first" :action="()=>{ $router.push(`/profile/${user._id}`) }">
            Go to profile
          </ButtonPrimary>
          <ButtonPrimary class="inline-block col-span-1 h-12" group-pos="last" :disabled="true" :action="()=>{}">
            Search as user
          </ButtonPrimary>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UsersIcon, SearchIcon, MailIcon, AtSignIcon, CheckCircleIcon } from 'vue-feather-icons'
import TextInput from '~/components/Widgets/TextInput'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import LoaderAnim from '~/components/Core/LoaderAnim'

export default {
  middleware: 'isadmin',
  components: {
    TextInput,
    CheckCircleIcon,
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
