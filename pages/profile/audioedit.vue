<template>
  <div class="flex-container bg-polka">
    <div class="my-5 w-3/4 max-w-2xl mx-auto">
      <div class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block mb-2">
        <div class="w-full text-center">
          <h1 class="w-full text-3xl md:text-6xl text-center mb-2">
            Update audio preview
          </h1>
          <p>
            <a class="clickable text-primary-300 hover:text-secondary-300 hover:underline" @click="goBack">
              <link-icon size="1x" class="inline-block mr-1" />Cancel
            </a>
          </p>
        </div>

        <div>
          <div class="max-w-350 block mx-auto">
            <TextInput v-model="audioURL" placeholder="Paste audio url" label="Paste an audio url from Spotify">
              <music-icon class="block mx-auto" />
            </TextInput>
            <TextError v-if="errors.audioURL && errors.audioURL.invalid">
              URL is invalid.
            </TextError>
            <TextError v-if="errors.audioURL && errors.audioURL.missing">
              URL is missing.
            </TextError>
          </div>

          <Button v-if="state===states.default" :action="postAudioDetails" class="max-w-350 mb-4 mx-auto w-full my-2">
            Update audio preview
          </Button>
          <div v-else class="block w-1/2 h-12 md:h-24 mx-auto mb-4">
            <LoaderAnim />
          </div>

          <div v-if="processedAudioURL!==''" class="max-w-350 block mx-auto mt-4">
            <AudioWidget :url="processedAudioURL" />
          </div>

          <div class="max-w-350 text-center mx-auto block w-full my-2">
            <small><p>Why do we only support Spotify URLs? <nuxt-link class="clickable text-primary-300 hover:text-secondary-300 hover:underline" to="/why-spotify"><link-icon size="1x" class="inline-block mr-1" />check here</nuxt-link></p></small>
            <small><p>Want to request another streaming service? <nuxt-link class="clickable text-primary-300 hover:text-secondary-300 hover:underline" to="/Feedback"><link-icon size="1x" class="inline-block mr-1" />go here</nuxt-link></p></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MusicIcon, LinkIcon } from 'vue-feather-icons'

export default {
  components: {
    MusicIcon,
    LinkIcon
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      audioURL: '',
      audioSRC: '',
      audioID: '',
      processedAudioURL: '',
      errors: {
        audioURL: { invalid: false, missing: false }
      }
    }
  },
  computed: {
    user () {
      return this.$auth.user
    }
  },
  watch: {
    audioURL () {
      this.processAudioURL()
    }
  },
  mounted () {
    const tempURL = this.user.audioURL === undefined ? '' : this.user.audioURL
    if (tempURL === '') {
      return
    }

    const id = tempURL.split(':=')[1]

    this.audioURL = `https://open.spotify.com/track/${id}`
  },
  methods: {
    processAudioURL () {
      this.resetErrors()
      // https://open.spotify.com/track/5oBarQJHCnHLzyezz0XzFx?si=93ef1db3c2dc4b62
      // https://drive.google.com/file/d/1QFNmah1Nsjb1qjqLNnw0zcWD9OIhdr_P/view?usp=share_link
      let url
      try {
        url = new URL(this.audioURL)
      } catch (error) {
        this.errors.audioURL.invalid = true
        this.processedAudioURL = ''
        return
      }

      if (url.hostname.includes('spotify.com') && url.pathname.includes('/track/')) {
        this.audioSRC = 'spotify'
        this.audioID = url.pathname.split('/track/')[1]
      } else {
        this.errors.audioURL.invalid = true
        this.processedAudioURL = ''
        return
      }

      this.processedAudioURL = `${this.audioSRC}:=${this.audioID}`
    },
    postAudioDetails (e) {
      e.preventDefault()
      this.resetErrors()
      this.state = this.states.loading
      this.$axios.patch(`/users/audio?tid=${this.audioID}&src=${this.audioSRC}`)
        .then((res) => {
          this.state = this.states.default
          if (res.data.success) {
            this.$auth.user.audioURL = this.processedAudioURL
            this.$router.push('/profile/edit')
            this.$store.commit('toasts/create', { title: 'User', message: 'Audio preview updated' })
          }
        })
        .catch((e) => {
          this.state = this.states.default
          const data = e.response.data
          if (data.error) {
            this.errors = data.error
          }
        })
    },
    goBack () {
      this.$router.push('/profile/edit')
    },
    resetErrors () {
      this.errors = {
        audioURL: { invalid: false, missing: false }
      }
    }
  },
  head () {
    return {
      title: 'Update preview audio | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Update preview audio | Bandmatch' }
        // other meta
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
