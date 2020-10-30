<template>
  <div class="bg-polka">
    <div class="flex-container bg-polka">
      <div class="mt-3 mb-0 w-3/4 md:max-w-2xl mx-auto">
        <ProgressBar :percent="(state / states.description) * 100" />
      </div>
      <div class="my-3 w-full md:w-3/4 md:max-w-2xl mx-auto">
        <div v-if="state === states.type" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block clearfix">
          <div class="prose my-2 w-full text-center">
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
          <ButtonPrimary v-if="user.searchType !== ''" :action="()=>{ state++ }" class="w-1/2 md:w-1/3 mx-0 mb-1 float-right">
            Next <arrow-right-icon class="inline-block" height="21px" width="21px" />
          </ButtonPrimary>
        </div>
        <div v-if="state === states.genres" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block clearfix">
          <div class="prose my-2 w-full text-center">
            <h3>What genres do you play?</h3>
          </div>
          <ArrayInput v-model="user.genres" class="my-3" />

          <ButtonPrimary :action="()=>{ state-- }" class="w-1/2 md:w-1/3 mx-0 mb-1 float-left">
            <arrow-left-icon class="inline-block" height="21px" width="21px" /> Back
          </ButtonPrimary>
          <ButtonPrimary v-if="user.genres.length > 0" :action="()=>{ state++ }" class="w-1/2 md:w-1/3 mx-0 mb-1 float-right">
            Next <arrow-right-icon class="inline-block" height="21px" width="21px" />
          </ButtonPrimary>
        </div>
        <div v-if="state === states.instruments" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block clearfix">
          <div class="prose my-2 w-full text-center">
            <h3>What instruments do you play?</h3>
          </div>
          <ArrayInput v-model="user.instruments" class="my-3" />

          <ButtonPrimary :action="()=>{ state-- }" class="w-1/2 md:w-1/3 mx-0 mb-1 float-left">
            <arrow-left-icon class="inline-block" height="21px" width="21px" /> Back
          </ButtonPrimary>
          <ButtonPrimary v-if="user.instruments.length > 0" :action="()=>{ state++ }" class="w-1/2 md:w-1/3 mx-0 mb-1 float-right">
            Next <arrow-right-icon class="inline-block" height="21px" width="21px" />
          </ButtonPrimary>
        </div>
        <div v-if="state === states.location" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block clearfix">
          <div class="prose my-2 w-full text-center">
            <h3>Location</h3>
            <p class="mb-0">
              <small>This doesn't have to be your real location. It can be the location where you are active i.e. your local town/city</small>
            </p>
            <p class="mb-0 text-complementary-400">
              <small>This information is publicly visible</small>
            </p>
          </div>
          <LocationInput v-model="user.searchLocation.coordinates" height="25" />
          <div class="prose my-2 w-full text-center">
            <h3>Search Radius</h3>
            <p>
              <small>How far away do you want to look for people?</small>
            </p>
          </div>
          <NumberSlider v-model="user.searchRadius" class="bg-white rounded" units="km" min="1" max="100" />
          <ButtonPrimary :action="()=>{ state-- }" class="w-1/2 md:w-1/3 mx-0 mb-1 float-left">
            <arrow-left-icon class="inline-block" height="21px" width="21px" /> Back
          </ButtonPrimary>
          <ButtonPrimary :action="()=>{ state++ }" class="w-1/2 md:w-1/3 mx-0 mb-1 float-right">
            Next <arrow-right-icon class="inline-block" height="21px" width="21px" />
          </ButtonPrimary>
        </div>
        <div v-if="state === states.description" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block clearfix">
          <div class="prose my-2 w-full text-center">
            <h3>Description</h3>
            <p>
              <small>Describe yourself in a few sentences. Who are your favourite bands? What do you want in your future bandmates?</small>
            </p>
            <p>
              <small>Only the first ~50 characters will be shown in searches.</small>
            </p>
          </div>
          <MarkdownInput v-model="user.description" class="w-full px-0 md:w-auto md:px-3" :maxlength="512" />
          <ButtonPrimary :action="()=>{ state-- }" class="w-1/2 md:w-1/3 mx-0 mb-1 float-left">
            <arrow-left-icon class="inline-block" height="21px" width="21px" /> Back
          </ButtonPrimary>
          <ButtonTertiary v-if="user.description !== ''" :action="saveAndFinish" class="w-1/2 md:w-1/3 mx-0 mb-1 float-right text-gray-500">
            Save and Finish
          </ButtonTertiary>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRightIcon, ArrowLeftIcon } from 'vue-feather-icons'
import ProgressBar from '~/components/Widgets/ProgressBar'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import ButtonTertiary from '~/components/Core/ButtonTertiary'
import ArrayInput from '~/components/Widgets/ArrayInput'
import LocationInput from '~/components/Widgets/LocationInput'
import NumberSlider from '~/components/Widgets/NumberSlider'

export default {
  components: {
    ProgressBar,
    ButtonPrimary,
    ButtonTertiary,
    ArrowRightIcon,
    ArrowLeftIcon,
    ArrayInput,
    LocationInput,
    NumberSlider
  },
  data () {
    return {
      states: {
        type: 0,
        genres: 1,
        instruments: 2,
        location: 3,
        description: 4
      },
      state: 0,
      user: {
        searchType: '',
        genres: [],
        instruments: [],
        searchLocation: { coordinates: [0, 0] },
        searchRadius: 0,
        description: ''
      }
    }
  },
  methods: {
    saveAndFinish () {
      this.$axios.$patch('/users/profile', this.user)
        .then((data) => {
          if (data.success) {
            // this.$store.commit('user/setUser', JSON.stringify(data.user))
            this.$auth.setUser(data.user)
            window.location.href = '/'
          }
        })
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
@import '~/assets/scss/styles.scss'
</style>
