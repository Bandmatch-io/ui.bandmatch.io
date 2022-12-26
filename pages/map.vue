<template>
  <div class="bg-polka">
    <div class="fixed inset-0 t-nav">
      <div class="absolute z-30 w-screen" @click="()=>{selectedMatch=undefined}">
        <h1 v-if="selectedMatch === undefined" class="block w-auto pointer-events-none text-center max-w-250 border bg-white rounded shadow ml-2 my-3 md:mx-auto p-2 text-2xl">
          {{ matches.length }} User<span v-if="matches.length != 1">s</span> nearby
        </h1>
        <div v-if="showAccountPopup" class="block text-center max-w-250 border bg-white rounded shadow ml-2 my-3 md:mx-auto p-2">
          <h1>You're the first one here</h1>
          <h1>Sign up and we'll let you know when other people join!</h1>
          <Button :action="navigateToSignup" class="max-w-350 mx-auto w-3/4 block my-3">
            Sign up
          </Button>
          <p class="w-full text-center font-semibold">
            OR
          </p>
          <Button :action="navigateToLogin" class="max-w-350 mx-auto w-3/4 block my-3">
            Log in
          </Button>
          <small class="inline-block w-full text-sm text-center cursor-pointer text-secondary-300 hover:underline hover:text-secondary-400" @click="closeAccountPopup">
            Close<x-icon size="1x" class="inline-block ml-1"/>
          </small>
          <small class="inline-block w-full text-sm text-center cursor-pointer text-secondary-300 hover:underline hover:text-secondary-400" @click="blockAccountPopup">
            Don't show again
          </small>
        </div>
        <div class="w-full h-screen overflow-y-scroll" v-if="selectedMatch !== undefined">
          <ProfileCardAnonymous class="mx-auto z-30 block my-5" :user="selectedMatch"/>
        </div>
      </div>
      <div id="map" class="w-full h-full"/>
    </div>
  </div>
</template>

<script>
import MapboxGL from 'mapbox-gl'
import { XIcon } from 'vue-feather-icons'
import ProfileCardAnonymous from '~/components/Elements/ProfileCardAnonymous'

export default {
  components: {
    ProfileCardAnonymous,
    XIcon
  },
  auth: false,
  data () {
    return {
      map: undefined,
      locationData: {
        type: 'FeatureCollection',
        features: []
      },
      matches: [],
      markers: [],
      selectedMatch: undefined,
      showAccountPopup: false,
      accountPopupSeen: false
    }
  },
  mounted () {
    this.create()
  },
  methods: {
    navigateToSignup () {
      this.$router.push('/account?st=signup')
    },
    navigateToLogin () {
      this.$router.push('/account?st=login')
    },
    closeAccountPopup () {
      this.showAccountPopup = false
    },
    blockAccountPopup () {
      this.showAccountPopup = false
      this.accountPopupSeen = true
    },
    create () {
      // const MapboxGL = require('mapbox-gl')
      MapboxGL.accessToken = 'pk.eyJ1IjoidGNyb2FzZGFsZSIsImEiOiJjazFoeHVnYXAwMHBpM2ltbjc4eDEzcWkyIn0.KBvexyHWTEuO4-OGIwE0tA'
      this.map = new MapboxGL.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [0.1278, 51.5074], // starting position [lng, lat]
        zoom: 9 // starting zoom
      })
      this.map.addControl(new MapboxGL.NavigationControl({ showZoom: true }))
      this.map.addControl(new MapboxGL.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: false
      }))

      this.map.on('moveend', this.getData)
      this.getData()
    },
    getData () {
      const bounds = this.map.getBounds()
      const sw = bounds.getSouthWest()
      const ne = bounds.getNorthEast()

      this.$axios.get(`/search/anonymous?swlng=${sw.lng}&swlat=${sw.lat}&nelng=${ne.lng}&nelat=${ne.lat}`)
        .then((res) => {
          if (res.data.success) {
            this.matches = []
            for (let x = 0; x < this.markers.length; x++) {
              this.markers[x].remove()
            }
            this.showAccountPopup = res.data.matches.length === 0 && !this.accountPopupSeen

            res.data.matches.forEach((m) => {
              const popup = new MapboxGL.Popup()
              popup.on('open', () => {
                this.selectedMatch = m
              })

              const marker = new MapboxGL.Marker()
                .setLngLat(m.searchLocation.coordinates)
                .addTo(this.map)
                .setPopup(popup)

              this.markers.push(marker)
              this.matches.push(m)
            })
          }
        })
    },
    pointToGeoJSON (x) {
      return {
        type: 'Feature',
        geometry: x.searchLocation,
        properties: {
          title: 'userLocation'
        }
      }
    }
  },
  head () {
    return {
      title: 'Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Bandmatch' }
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
