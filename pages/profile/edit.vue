<template>
  <div class="bg-polka">
    <div class="flex flex-wrap">
      <div v-if="userStatus === 'success'" class="w-full min-w-350 block mx-auto my-8 xl:w-1/2 bg-gray-100 rounded shadow">
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
            <ButtonPrimary :action="() => {}"><key-icon class="inline-block"/> Update Password</ButtonPrimary>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p class="mb-4">Display Name</p>
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
            <p class="mb-4">Do you want to be shown in searches?</p>
            <p><small>You will still be able to send and receive messages.</small></p>
          </div>
          <div class="col-span-3">
            <CustomSelect>
              <option :selected="user.active" @click="user.active=true" value="true">Show me in searches</option>
              <option :selected="!user.active" @click="user.active=false" value="false">Don't show me in searches</option>
            </CustomSelect>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p class="mb-4">What do you want to do?</p>
            <p></p>
          </div>
          <div class="col-span-3">
            <CustomSelect>
              <option :selected="typeSelected('Join')" @click="user.searchType='Join'" value="Join">Join an existing band</option>
              <option :selected="typeSelected('Form')" @click="user.searchType='Form'" value="Form">Form a new band</option>
              <option :selected="typeSelected('Either')" @click="user.searchType='Either'" value="Either">Either join or form a band</option>
              <option :selected="typeSelected('Recruit')" @click="user.searchType='Recruit'" value="Recruit">Recruit a band memer</option>
            </CustomSelect>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p class="mb-4">Genres</p>
            <p v-if="user.searchType === 'Recruit'"><small>What genres do you play?</small></p>
            <p v-else><small>What genres do you want to play?</small></p>
          </div>
          <div class="col-span-3">
            <ArrayInput v-model="user.genres" />
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p class="mb-4">Instruments</p>
            <p v-if="user.searchType === 'Recruit'"><small>What instruments do you need?</small></p>
            <p v-else><small>What instruments can you play?</small></p>
          </div>
          <div class="col-span-3">
            <ArrayInput v-model="user.instruments" />
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p>Search radius</p>
            <p></p>
          </div>
          <div class="col-span-3 bg-white">
            <NumberSlider v-model="user.searchRadius" units="km" min="1" max="100"/>
          </div>
        </div>

        <div class="grid grid-cols-4 p-5 border-b-2 shadow-sm">
          <div class="col-span-1">
            <p>Your location</p>
            <p></p>
          </div>
          <div class="col-span-3 bg-white">
            <LocationInput v-model="user.searchLocation.coordinates" height="25"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { AtSignIcon, KeyIcon } from 'vue-feather-icons'
import { mapMutations } from 'vuex'
import { ButtonPrimary } from '~/components/Core/ButtonPrimary'

export default {
  components: {
    AtSignIcon,
    KeyIcon,
    ButtonPrimary
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
        active: false
      }
    }
  },
  watch: {
    user: {
      handler (val) {
        fetch('http://localhost:8080/users/profile',
          {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.user)
          })
          .then(res => res.json())
          .then((data) => {
            if (data.success) {
              this.$store.commit('user/setUser', JSON.stringify(data.user))
            }
          })
      },
      deep: true // Needs to watch for changes to child objects as well.
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    },
    userStatus () {
      return this.$store.state.user.status
    }
  },
  mounted () {
    this.user = JSON.parse(JSON.stringify(this.currentUser))
  },
  methods: {
    ...mapMutations({
      setUser: 'user/setUser'
    }),
    typeSelected (val) {
      return this.user.searchType === val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
