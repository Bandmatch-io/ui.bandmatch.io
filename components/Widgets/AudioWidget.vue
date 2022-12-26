<template>
  <div class="max-w-none mx-auto mt-0 mb-0 block m-4 relative inset-0">
    <ButtonSmall class="w-full mb-1" :action="toggleShow" colour="secondary">
      {{ state===states.hidden ? 'Show Audio Preview': 'Hide Audio Preview' }}
    </ButtonSmall>
    <div v-if="state===states.displayed">
      <iframe
        v-if="audioSource === audioSources.Spotify"
        style="border-radius:12px"
        :src="`https://open.spotify.com/embed/track/${processedSongID}?utm_source=generator&theme=0`"
        width="100%"
        height="152"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"/>
      <iframe
        v-if="audioSource === audioSources.SoundCloud"
        width="100%"
        height="152"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        :src="`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${processedSongID}&color=%23196795&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default () { return '' }
    }
  },
  data () {
    return {
      states: {
        hidden: 0,
        displayed: 1
      },
      state: 0,
      audioSources: {
        Spotify: 'spotify',
        SoundCloud: 'sndcld'
      }
    }
  },
  methods: {
    toggleShow (e) {
      e.stopPropagation()
      this.state = this.state === 0 ? 1 : 0
    }
  },
  computed: {
    processedSongID () {
      return this.url.split(':=')[1]
    },
    audioSource () {
      return this.url.split(':=')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
