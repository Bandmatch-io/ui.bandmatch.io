<template>
  <div class="block w-full border rounded shadow" :style="`height: ${height}rem;`">
    <div id="map" class="w-full h-full" />
  </div>
</template>

<script>

export default {
  props: {
    value: { type: Array, default () { return [] } },
    height: { type: String, default () { return '0' } }
  },
  data () {
    return {
      map: undefined,
      locationMarker: undefined,
      location: [0.1278, 51.5074],
      ignoreUpdate: false
    }
  },
  watch: {
    value () { // set ignore update to true, to ensure input event is only emitted once
      this.ignoreUpdate = true
      this.map.setCenter(this.value)
    }
  },
  mounted () {
    const MapboxGL = require('mapbox-gl')
    MapboxGL.accessToken = 'pk.eyJ1IjoidGNyb2FzZGFsZSIsImEiOiJjazFoeHVnYXAwMHBpM2ltbjc4eDEzcWkyIn0.KBvexyHWTEuO4-OGIwE0tA'
    this.map = new MapboxGL.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: this.location, // starting position [lng, lat]
      zoom: 9 // starting zoom
    })
    this.map.addControl(new MapboxGL.NavigationControl({ showZoom: true }))
    this.map.addControl(new MapboxGL.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: false
    }))

    this.locationMarker = new MapboxGL.Marker({ color: '#196795' })
      .setLngLat(this.location).addTo(this.map)

    this.map.on('moveend', () => {
      const center = this.map.getCenter()
      this.location = [center.lng, center.lat]
      if (!this.ignoreUpdate) {
        this.$emit('input', this.location)
      } else {
        this.ignoreUpdate = false
      }
    })

    this.map.on('move', () => {
      this.locationMarker.setLngLat(this.map.getCenter())
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
