<template>
  <div class="bg-polka">
    <div v-if="userStatus === 'success'" class="flex flex-wrap">
      <div class="area">
        <div class="section">
          <Button :action="() => { $router.push(`${user._id}`) }" group-pos="first" class="col-span-3 inline-block w-full mx-0">
            View public profile
          </Button>
          <Button colour="tertiary" :action="() => { postUserProfile(user) }" group-pos="last" class="col-span-1 inline-block w-full mx-0">
            <check-icon v-if="isSaved" class="inline-block" /><loader-icon v-else class="inline-block spin" /> <span class="hidden md:inline">Saved</span>
          </Button>
        </div>

        <div v-if="user.timestamps" class="section">
          <div class="col-span-4 md:col-span-2">
            <p class="text-center">
              Last seen <timeago :datetime="user.timestamps.last_login" class="mr-1" />
            </p>
          </div>
          <div class="col-span-4 md:col-span-2">
            <p class="text-center">
              Member since {{ signupDate }}
            </p>
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p>Email</p>
          </div>
          <div class="col-span-4 md:col-span-3">
            <p><check-circle-icon v-if="user.emailConfirmed" class="inline-block mr-1 text-primary-300" />{{ user.email }}</p>
          </div>
          <div v-if="!user.emailConfirmed" class="col-span-4 text-center">
            <a class="inline-block clickable underline text-primary-300 hover:text-primary-100" @click="resendEmailVerification">
              Resend email verification
            </a>
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            Password
          </div>
          <div class="col-span-4 md:col-span-3">
            <Button :action="() => { this.$router.push('/account/changepassword') }" class="w-full mx-auto">
              <key-icon class="inline-block" /> Update Password
            </Button>
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p class="mb-4">
              Display Name
            </p>
            <p><small>Max 16 characters </small></p>
          </div>
          <div class="col-span-4 md:col-span-3">
            <TextInput v-model="user.displayName" type="text">
              <at-sign-icon class="block mx-auto" />
            </TextInput>
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p class="mb-4">
              Do you want to be shown in searches?
            </p>
            <p><small>You will still be able to send and receive messages.</small></p>
          </div>
          <div class="col-span-4 md:col-span-3">
            <CustomSelect @change="user.active=JSON.parse($event.target.value)">
              <option :selected="user.active" value="true">
                Show me in searches
              </option>
              <option :selected="!user.active" value="false">
                Don't show me in searches
              </option>
            </CustomSelect>
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p class="mb-4">
              What do you want to do?
            </p>
            <p />
          </div>
          <div class="col-span-4 md:col-span-3">
            <CustomSelect @change="user.searchType=$event.target.value">
              <option :selected="typeSelected('Join')" value="Join">
                Join an existing band
              </option>
              <option :selected="typeSelected('Form')" value="Form">
                Form a new band
              </option>
              <option :selected="typeSelected('Either')" value="Either">
                Either join or form a band
              </option>
              <option :selected="typeSelected('Recruit')" value="Recruit">
                Recruit a band memer
              </option>
            </CustomSelect>
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p class="mb-4">
              Genres
            </p>
            <p v-if="user.searchType === 'Recruit'">
              <small>What genres do you play?</small>
            </p>
            <p v-else>
              <small>What genres do you want to play?</small>
            </p>
          </div>
          <div class="col-span-4 md:col-span-3">
            <ArrayInput v-model="user.genres" />
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p class="mb-4">
              Instruments
            </p>
            <p v-if="user.searchType === 'Recruit'">
              <small>What instruments do you need?</small>
            </p>
            <p v-else>
              <small>What instruments can you play?</small>
            </p>
          </div>
          <div class="col-span-4 md:col-span-3">
            <ArrayInput v-model="user.instruments" />
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p>Search radius</p>
            <p />
          </div>
          <div class="col-span-4 md:col-span-3">
            <NumberSlider v-model="user.searchRadius" units="km" :min="1" :max="100" />
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p>Your location</p>
            <p />
          </div>
          <div class="col-span-4 md:col-span-3 bg-white">
            <LocationInput v-model="user.searchLocation.coordinates" height="25" />
          </div>
        </div>

        <div class="p-5 shadow-sm">
          <h2 class="prose">
            Account Actions
          </h2>
          <Button :action="fetchAccountData" class="my-1 inline-block w-full mx-0">
            <download-icon class="inline-block" /> Download my data
          </Button>
          <ConfirmationInput :check-string="user.displayName" class="my-1 inline-block w-full mx-0" @confirm="deleteAccount">
            <trash-2-icon class="inline-block" /> Delete my account
          </ConfirmationInput>
        </div>
      </div>

      <div class="area">
        <h1 class="px-8 pt-4 text-5xl">
          Description
        </h1>
        <MarkdownInput v-model="user.description" class="px-4 py-8" :maxlength="512" />
      </div>
    </div>
  </div>
</template>

<script>
import { AtSignIcon, KeyIcon, LoaderIcon, CheckIcon, DownloadIcon, Trash2Icon, CheckCircleIcon } from 'vue-feather-icons'
import MarkdownInput from '~/components/Widgets/MarkdownInput'
import ConfirmationInput from '~/components/Widgets/ConfirmationInput'

export default {
  components: {
    AtSignIcon,
    KeyIcon,
    CheckIcon,
    LoaderIcon,
    CheckCircleIcon,
    DownloadIcon,
    Trash2Icon,
    MarkdownInput,
    ConfirmationInput
  },
  data () {
    return {
      user: {
        email: '',
        displayName: '',
        genres: [],
        instruments: [],
        searchLocation: { coordinates: [0, 0] },
        searchRadius: 1,
        searchType: '',
        active: false,
        description: ''
      },
      isSaved: true
    }
  },
  computed: {
    currentUser () {
      return this.$auth.user
    },
    userStatus () {
      return 'success' // this.$auth.user.status
    },
    signupDate () {
      if (this.user.timestamps.signup_at) {
        return new Date(this.user.timestamps.signup_at).toDateString()
      }
      return ''
    }
  },
  watch: {
    user: {
      handler (val) {
        this.postUserProfile(val)
      },
      deep: true // Needs to watch for changes to child objects as well.
    }
  },
  mounted () {
    this.user = this.$auth.user
  },
  methods: {
    typeSelected (val) {
      return this.user.searchType === val
    },
    postUserProfile (newUser) {
      this.isSaved = false

      this.$axios.$patch('/users/update', newUser)
        .then((data) => {
          if (data.success) {
            this.$auth.setUser(data.user)
            this.isSaved = true
          }
        })
    },
    fetchAccountData () {
      this.$axios.get('/users/download', { responseType: 'blob' })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `${this.$auth.user.displayName}-account-data.json`) // or any other extension
          document.body.appendChild(link)
          link.click()
        })
    },
    resendEmailVerification () {
      this.$axios.post('/verify/resend')
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('toasts/create', { title: 'Account', message: 'Resent email verification' })
          }
        })
        .catch((e) => {
          this.$store.commit('toasts/create', { title: 'Account', message: "Couldn't resend verification", type: 'error' })
        })
    },
    deleteAccount () {
      this.$axios.delete('/users/')
        .then((res) => {
          if (res.data.success) {
            this.$auth.logout({ makeRequest: false })
              .then(() => {
                this.$router.push('/')
                this.$store.commit('toasts/create', { title: 'User', message: 'Account deleted' })
              })
          }
        })
        .catch((e) => {
          this.$store.commit('toasts/create', { title: 'User', message: 'Failed to delete account', type: 'error' })
        })
    }
  },
  head () {
    return {
      title: 'Edit Profile | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Edit Profile | Bandmatch' }
        // other meta
      ],
      link: [
        { rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v1.9.1/mapbox-gl.css' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';

.area {
  @apply w-full lg:flex-1 flex-shrink block mx-auto my-4 xl:mx-4 xl:w-1/2 bg-gray-100 rounded shadow;
  min-width: 300px;
}

.section {
  @apply grid grid-cols-4 px-5 py-3 shadow-sm border-b-2;
}

.spin {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}

@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
