<template>
  <div class="bg-polka">
    <div class="flex-container bg-polka">
      <div class="mt-3 mb-0 w-3/4 md:max-w-2xl mx-auto">
        <ProgressBar :percent="(state / states.preview) * 100" />
      </div>
      <div class="my-3 w-full md:w-3/4 md:max-w-2xl mx-auto">
        <transition name="fadein">
          <div v-if="state === states.type" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block flow-root">
            <div class="prose mx-auto block my-2 w-full text-center">
              <h3>What are you here to do?</h3>
            </div>
            <div class="border rounded-t px-3 py-5 bg-white cursor-pointer hover:bg-gray-200" :class="{ 'bg-primary-grad text-white': user.searchType==='Join' }" @click="user.searchType = 'Join'">
              Join an existing band
            </div>
            <div class="border border-t-0 px-3 py-5 bg-white cursor-pointer hover:bg-gray-200" :class="{ 'bg-primary-grad text-white': user.searchType==='Form' }" @click="user.searchType='Form'">
              Form a new band
            </div>
            <div class="border border-t-0 px-3 py-5 bg-white cursor-pointer hover:bg-gray-200" :class="{ 'bg-primary-grad text-white': user.searchType==='Either' }" @click="user.searchType='Either'">
              Either join or form band
            </div>
            <div class="border border-t-0 rounded-b px-3 py-5 bg-white cursor-pointer hover:bg-gray-200" :class="{ 'bg-primary-grad text-white': user.searchType==='Recruit' }" @click="user.searchType='Recruit'">
              Recruit a new member
            </div>
            <Button v-if="user.searchType !== ''" :action="()=>{ state++ }" class=" my-1 w-1/2 md:w-1/3 mx-0 float-right">
              Next <arrow-right-icon class="inline-block" height="21px" width="21px" />
            </Button>
          </div>
        </transition>
        <transition name="fadein">
          <div v-if="state === states.genres" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block flow-root">
            <div class="prose mx-auto block my-2 w-full text-center">
              <h3>What genres do you play?</h3>
            </div>
            <ArrayInput v-model="user.genres" class="my-3" />

            <Button :action="()=>{ state-- }" class="w-1/2 md:w-1/3 mx-0 my-1 float-left">
              <arrow-left-icon class="inline-block" height="21px" width="21px" /> Back
            </Button>
            <Button v-if="user.genres.length > 0" :action="()=>{ state++ }" class="w-1/2 md:w-1/3 mx-0 my-1 float-right">
              Next <arrow-right-icon class="inline-block" height="21px" width="21px" />
            </Button>
          </div>
        </transition>
        <transition name="fadein">
          <div v-if="state === states.instruments" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block flow-root">
            <div class="prose mx-auto block  my-2 w-full text-center">
              <h3>What instruments do you play?</h3>
            </div>
            <ArrayInput v-model="user.instruments" class="my-3" />

            <Button :action="()=>{ state-- }" class="w-1/2 md:w-1/3 mx-0 my-1  float-left">
              <arrow-left-icon class="inline-block" height="21px" width="21px" /> Back
            </Button>
            <Button v-if="user.instruments.length > 0" :action="()=>{ state++ }" class="w-1/2 md:w-1/3 mx-0 my-1  float-right">
              Next <arrow-right-icon class="inline-block" height="21px" width="21px" />
            </Button>
          </div>
        </transition>
        <transition name="fadein">
          <div v-if="state === states.location" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block flow-root">
            <div class="prose mx-auto block  my-2 w-full text-center">
              <h3>Location</h3>
              <p class="mb-0">
                <small>This doesn't have to be your real location. It can be the location where you are active i.e. your local town/city</small>
              </p>
              <p class="mb-0 text-complementary-400">
                <small>This information is publicly visible</small>
              </p>
            </div>
            <LocationInput v-model="user.searchLocation.coordinates" height="25" />
            <div class="prose mx-auto block  my-2 w-full text-center">
              <h3>Search Radius</h3>
              <p>
                <small>How far away do you want to look for people?</small>
              </p>
            </div>
            <NumberSlider v-model="user.searchRadius" class="bg-white rounded" units="km" :min="1" :max="100" />
            <Button :action="()=>{ state-- }" class="w-1/2 md:w-1/3 mx-0 my-1 float-left">
              <arrow-left-icon class="inline-block" height="21px" width="21px" /> Back
            </Button>
            <Button :action="()=>{ state++ }" class="w-1/2 md:w-1/3 mx-0 my-1 float-right">
              Next <arrow-right-icon class="inline-block" height="21px" width="21px" />
            </Button>
          </div>
        </transition>
        <transition name="fadein">
          <div v-if="state === states.description" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block flow-root">
            <div class="prose mx-auto block  my-2 w-full text-center">
              <h3>Description</h3>
              <p>
                <small>Describe yourself in a few sentences. Who are your favourite bands? What do you want in your future bandmates?</small>
              </p>
              <p>
                <small>Only the first ~50 characters will be shown in searches.</small>
              </p>
            </div>
            <MarkdownInput v-model="user.description" class="w-full px-0 md:w-auto md:px-3" :maxlength="512" />
            <Button :action="()=>{ state-- }" class="w-1/2 md:w-1/3 mx-0 my-1 float-left">
              <arrow-left-icon class="inline-block" height="21px" width="21px" /> Back
            </Button>
            <Button v-if="user.description !== ''" colour="secondary" :action="() => { state++ }" class="w-1/2 md:w-1/3 mx-0 my-1 float-right text-gray-500">
              <eye-icon class="inline-block mr-1" />Preview
            </Button>
          </div>
        </transition>
        <transition name="fadein">
          <div v-if="state === states.preview" class="container min-w-250 mx-auto p-4 mt-8 block flow-root">
            <div class="prose mx-auto block my-2 w-full text-center bg-gray-100 rounded shadow">
              <h3>Preview</h3>
              <p>
                <small>This is how you will appear in searches.</small>
              </p>
            </div>

            <div class="w-full clear-both block">
              <div class="block mx-auto w-300">
                <ProfileCardPreview
                  class="mx-auto my-5"
                  :user="user"
                  @send-type="state=states.type"
                  @send-description="state=states.description"
                  @send-genre="state=states.genres"
                  @send-instrument="state=states.instruments"
                />
              </div>
            </div>

            <div class="block flow-root p-4 rounded bg-gray-100 shadow grid grid-cols-5">
              <Button :action="()=>{ state-- }" class="w-fullmx-0 my-1 col-span-2" groupPos="first">
                <arrow-left-icon class="inline-block" height="21px" width="21px" /> Back
              </Button>
              <Button :action="openNotificationSettings" class="w-full mx-0 my-1 col-span-1 text-gray-500" groupPos="mid">
                <bell-icon class="inline-block mr-1" />
              </Button>
              <Button v-if="user.description !== ''" colour="tertiary" :action="saveAndFinish" class="w-full mx-0 my-1 col-span-2 text-gray-500" groupPos="last">
                <check-icon class="inline-block mr-1" />Save
              </Button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRightIcon, ArrowLeftIcon, EyeIcon, CheckIcon, BellIcon } from 'vue-feather-icons'
import ProgressBar from '~/components/Widgets/ProgressBar'
import ArrayInput from '~/components/Widgets/ArrayInput'
import LocationInput from '~/components/Widgets/LocationInput'
import NumberSlider from '~/components/Widgets/NumberSlider'

export default {
  components: {
    ProgressBar,
    ArrowRightIcon,
    ArrowLeftIcon,
    EyeIcon,
    CheckIcon,
    ArrayInput,
    LocationInput,
    NumberSlider,
    BellIcon
  },
  data () {
    return {
      states: {
        type: 0,
        genres: 1,
        instruments: 2,
        location: 3,
        description: 4,
        preview: 5
      },
      state: 0,
      user: {
        displayName: '',
        searchType: '',
        genres: [],
        instruments: [],
        searchLocation: { coordinates: [0.1278, 51.5074] },
        searchRadius: 0,
        description: ''
      }
    }
  },
  mounted () {
    this.user.displayName = this.$auth.user.displayName
  },
  methods: {
    saveAndFinish () {
      this.$axios.$patch('/users/update', this.user)
        .then((data) => {
          if (data.success) {
            this.$auth.setUser(data.user)
            this.$router.push('/')
            this.$store.commit('toasts/create', { title: 'User', message: 'Your profile has been setup' })
          }
        })
    },
    openNotificationSettings () {
      this.$store.commit('notifications/open')
    }
  },
  head () {
    return {
      title: 'Setup Profile | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Setup Profile | Bandmatch' }
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
