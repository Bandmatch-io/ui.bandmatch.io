<template>
  <div class="bg-polka">
    <div v-if="userStatus === 'success'" class="flex flex-wrap">
      <div class="w-full lg:flex-1 min-w-350 block mx-auto my-4 xl:mx-4 xl:w-1/2 bg-gray-100 rounded shadow">
        <div class="p-5 border-b-2 shadow-sm grid grid-cols-4">
          <ButtonPrimary :action="() => {$router.push(`${user._id}`)}" group-pos="first" class="col-span-3 inline-block w-full mx-0">
            View public profile
          </ButtonPrimary>
          <ButtonTertiary :action="postUserProfile" group-pos="last" class="col-span-1 inline-block w-full mx-0">
            <check-icon v-if="isSaved" class="inline-block" /><loader-icon v-else class="inline-block" /> Saved
          </ButtonTertiary>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p>Email</p>
          </div>
          <div class="col-span-3">
            <p>{{ user.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            Password
          </div>
          <div class="col-span-3">
            <ButtonPrimary :action="() => {}">
              <key-icon class="inline-block" /> Update Password
            </ButtonPrimary>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p class="mb-4">
              Display Name
            </p>
            <p><small>Max 16 characters </small></p>
          </div>
          <div class="col-span-3">
            <TextInput v-model="user.displayName" type="text">
              <at-sign-icon class="block mx-auto" />
            </TextInput>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p class="mb-4">
              Do you want to be shown in searches?
            </p>
            <p><small>You will still be able to send and receive messages.</small></p>
          </div>
          <div class="col-span-3">
            <CustomSelect>
              <option :selected="user.active" value="true" @click="user.active=true">
                Show me in searches
              </option>
              <option :selected="!user.active" value="false" @click="user.active=false">
                Don't show me in searches
              </option>
            </CustomSelect>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p class="mb-4">
              What do you want to do?
            </p>
            <p />
          </div>
          <div class="col-span-3">
            <CustomSelect>
              <option :selected="typeSelected('Join')" value="Join" @click="user.searchType='Join'">
                Join an existing band
              </option>
              <option :selected="typeSelected('Form')" value="Form" @click="user.searchType='Form'">
                Form a new band
              </option>
              <option :selected="typeSelected('Either')" value="Either" @click="user.searchType='Either'">
                Either join or form a band
              </option>
              <option :selected="typeSelected('Recruit')" value="Recruit" @click="user.searchType='Recruit'">
                Recruit a band memer
              </option>
            </CustomSelect>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
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
          <div class="col-span-3">
            <ArrayInput v-model="user.genres" />
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
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
          <div class="col-span-3">
            <ArrayInput v-model="user.instruments" />
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p>Search radius</p>
            <p />
          </div>
          <div class="col-span-3 bg-white">
            <NumberSlider v-model="user.searchRadius" units="km" min="1" max="100" />
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 shadow-sm border-b-2">
          <div class="col-span-1">
            <p>Your location</p>
            <p />
          </div>
          <div class="col-span-3 bg-white">
            <LocationInput v-model="user.searchLocation.coordinates" height="25" />
          </div>
        </div>

        <div class="p-5 shadow-sm">
          <h2 class="prose">
            Account Actions
          </h2>
          <ButtonPrimary :action="fetchAccountData" class="inline-block w-full mx-0">
            <download-icon class="inline-block" /> Download my data
          </ButtonPrimary>
          <ConfirmationInput :confirm="() => {}" :check-string="user.displayName" class="inline-block w-full mx-0">
            <trash-2-icon class="inline-block" /> Delete my account
          </ConfirmationInput>
        </div>
      </div>

      <div class="w-full lg:flex-1 flex-shrink min-w-350 block mx-auto my-4 xl:mx-4 xl:w-1/2 bg-gray-100 rounded shadow">
        <h1 class="px-8 pt-4 text-5xl">
          Description
        </h1>
        <MarkdownInput v-model="user.description" class="px-8 py-8" :maxlength="512" />
      </div>
    </div>
  </div>
</template>

<script>
import { AtSignIcon, KeyIcon, LoaderIcon, CheckIcon, DownloadIcon, Trash2Icon } from 'vue-feather-icons'
// import { mapMutations } from 'vuex'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import ButtonTertiary from '~/components/Core/ButtonTertiary'
import MarkdownInput from '~/components/Widgets/MarkdownInput'
import ConfirmationInput from '~/components/Widgets/ConfirmationInput'

export default {
  components: {
    AtSignIcon,
    KeyIcon,
    CheckIcon,
    LoaderIcon,
    DownloadIcon,
    Trash2Icon,
    ButtonPrimary,
    ButtonTertiary,
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

      this.$axios.$patch('/users/profile', newUser)
        .then((data) => {
          console.log(data, newUser)
          if (data.success) {
            // this.$store.commit('user/setUser', JSON.stringify(data.user))
            this.$auth.setUser(data.user)
            this.isSaved = true
          }
        })
    },
    fetchAccountData () {
      window.location = 'http://localhost:8080/users/download'
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
</style>
