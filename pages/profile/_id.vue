<template>
  <div class="bg-polka">
    <div v-if="state===states.loading">
      <div class="block mx-auto w-1/2 md:w-1/4 h-24 md:h-48" style="transform: translateY(25vh);">
        <LoaderAnim />
      </div>
    </div>
    <div v-else class="flex flex-wrap">
      <div class="area">
        <div v-if="me.admin" class="p-5 border-b-2 shadow-sm">
          <UserControlPanel :user="user" @refresh="refreshUser" />
        </div>

        <div class="p-5 border-b-2 shadow-sm">
          <div v-if="user._id !== me._id" class="w-full grid grid-cols-4">
            <ButtonPrimary :action="startChat" group-pos="first" class="col-span-3 inline-block mx-0">
              <message-square-icon class="inline-block" /> Chat
            </ButtonPrimary>
            <ButtonComplement :action="reportUser" group-pos="last" class="col-span-1 inline-block mx-0">
              <alert-octagon-icon class="inline-block" /> <span class="hidden md:inline">Report</span>
            </ButtonComplement>
          </div>
          <div v-else class="w-full grid grid-cols-1">
            <ButtonPrimary :action="() => { this.$router.push('/profile/edit') }" class="col-span-1 inline-block mx-0">
              Edit profile
            </ButtonPrimary>
          </div>
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
            Verified
          </div>
          <div class="col-span-4 md:col-span-3">
            <check-circle-icon v-if="user.emailVerified" class="inline-block mr-1 text-primary-300" />
            <circle-icon v-else class="inline-block mr-1 text-complementary-300" />
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p class="mb-4">
              Display Name
            </p>
          </div>
          <div class="col-span-4 md:col-span-3">
            <p>@{{ user.displayName }}</p>
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p class="mb-4">
              They want to:
            </p>
            <p />
          </div>
          <div class="col-span-4 md:col-span-3 px-4">
            <p v-if="user.searchType === 'Join'">
              Join an existing band
            </p>
            <p v-if="user.searchType === 'Form'">
              Form a new band
            </p>
            <p v-if="user.searchType === 'Either'">
              Either join or form a band
            </p>
            <p v-if="user.searchType === 'Recruit'">
              Recruit a band memer
            </p>
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p class="mb-4">
              Genres
            </p>
            <p v-if="user.searchType === 'Recruit'">
              <small>They play</small>
            </p>
            <p v-else>
              <small>They want to play</small>
            </p>
          </div>
          <div class="col-span-4 md:col-span-3">
            <Badge v-for="val in user.genres" :key="val" :val="val" />
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p class="mb-4">
              Instruments
            </p>
            <p v-if="user.searchType === 'Recruit'">
              <small>They need</small>
            </p>
            <p v-else>
              <small>They can play</small>
            </p>
          </div>
          <div class="col-span-4 md:col-span-3">
            <Badge v-for="val in user.instruments" :key="val" class="mx-2" :val="val" />
          </div>
        </div>

        <div class="section">
          <div class="col-span-4 md:col-span-1">
            <p>Their location</p>
            <p />
          </div>
          <div class="col-span-4 md:col-span-3">
            <img class="img-fluid rounded border shadow" :alt="'location of ' + user.displayName" :src="'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/' + user.searchLocation.coordinates[0] + ',' + user.searchLocation.coordinates[1] + ',9.67,0.00,0.00/640x480@2x?access_token=' + mapboxToken">
          </div>
        </div>
      </div>

      <div class="area">
        <h1 class="px-8 pt-4 text-5xl">
          Description
        </h1>
        <div class="w-full p-2">
          <MarkdownView class="block mx-auto rounded" :markdown="user.description" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageSquareIcon, AlertOctagonIcon, CheckCircleIcon, CircleIcon } from 'vue-feather-icons'
import MarkdownView from '~/components/Widgets/MarkdownView'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import ButtonComplement from '~/components/Core/ButtonComplement'
import UserControlPanel from '~/components/Widgets/Admin/UserControlPanel'

export default {
  components: {
    MarkdownView,
    CheckCircleIcon,
    MessageSquareIcon,
    AlertOctagonIcon,
    CircleIcon,
    ButtonComplement,
    ButtonPrimary,
    UserControlPanel
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 1,
      user: {
        displayName: '',
        genres: [],
        instruments: [],
        searchLocation: { coordinates: [0, 0] },
        searchRadius: 1,
        searchType: '',
        active: false,
        description: '',
        timestamps: { last_login: Date.now(), signup_at: Date.now() }
      },
      mapboxToken: 'pk.eyJ1IjoidGVjcm9hc2RhbGUiLCJhIjoiY2thbnVsMXFvMGs1bjJzcGZtOWl2eTRkYiJ9.aAxvfikHkPZI4d2nf_m6AA'
    }
  },
  computed: {
    me () {
      return this.$auth.user
    },
    signupDate () {
      if (this.user.timestamps.signup_at) {
        return new Date(this.user.timestamps.signup_at).toDateString()
      }
      return ''
    }
  },
  mounted () {
    this.$axios.get('/users/profile/' + this.$route.params.id)
      .then((res) => {
        if (res.data.success) {
          this.user = res.data.user
        }
        this.state = this.states.default
      })
      .catch((e) => {
        this.state = this.states.default
        this.$router.push('/')
      })
  },
  methods: {
    refreshUser () {
      this.$axios.get(`/users/profile/${this.user._id}`)
        .then((res) => {
          if (res.data.success) {
            this.user = res.data.user
          }
        })
    },
    startChat () {
      this.$store.commit('convo/setNewMessage', this.user._id, '')
      this.$router.push('/conversations')
    },
    reportUser () {
      this.$store.commit('reports/startReport', { id: this.user._id, type: 'User' })
    }
  },
  head () {
    return {
      title: `${this.user.displayName} | Bandmatch`,
      meta: [
        { hid: 'og-title', property: 'og:title', content: `${this.user.displayName} | Bandmatch` }
        // other meta
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';

.area {
  @apply w-full lg:flex-1 flex-shrink block mx-auto my-4 xl:mx-4 xl:w-1/2 bg-gray-100 rounded shadow;
  min-width: 300px; // I don't know why @apply won't take min-w-300, it's a total prick.
}

.section {
  @apply grid grid-cols-4 px-5 py-3 shadow-sm border-b-2;
}
</style>
