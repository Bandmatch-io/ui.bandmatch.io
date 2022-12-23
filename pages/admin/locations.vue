<template>
  <div class="bg-polka">
    <div class="fixed inset-0 t-nav">
      <div class="absolute z-30 pointer-events-none w-screen text-center my-3">
        <h1 class="block w-auto max-w-250 border bg-white rounded shadow ml-2 md:mx-auto p-2 text-2xl">
          Locations
        </h1>
      </div>
      <div id="map" class="w-full h-full" />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'isadmin',
  data () {
    return {
      map: undefined,
      locationData: {
        type: 'FeatureCollection',
        features: []
      }
    }
  },
  mounted () {
    this.create()
  },
  methods: {
    create () {
      const MapboxGL = require('mapbox-gl')
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

      this.map.on('moveend', this.loadData)
      this.loadData()
    },
    loadData () {
      const bounds = this.map.getBounds()
      const sw = bounds.getSouthWest()
      const ne = bounds.getNorthEast()

      this.$axios.get(`/admin/users/locations?swlng=${sw.lng}&swlat=${sw.lat}&nelng=${ne.lng}&nelat=${ne.lat}`)
        .then((res) => {
          this.locationData.features = res.data.locations.map(this.pointToGeoJSON)

          this.map.addSource('locations', {
            type: 'geojson',
            data: this.locationData
          })

          this.map.addLayer(this.createHeatmapLayer(), 'waterway-label')
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
    },
    createHeatmapLayer () {
      return {
        id: 'locations-heat',
        type: 'heatmap',
        source: 'locations',
        maxzoom: 15,
        paint: {
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [1, 0],
              [62, 1]
            ]
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [
              [11, 1],
              [15, 3]
            ]
          },
          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(236,222,239,0)',
            0.2, '#73A7C6',
            0.4, '#3C7BA0',
            0.6, '#196795',
            0.8, '#0A4A6F',
            1.0, '#03304B'
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [
              [11, 15],
              [15, 20]
            ]
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [
              [14, 1],
              [15, 0]
            ]
          }
        }
      }
    }
  },
  head () {
    return {
      title: 'Locations | Admin | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Locations | Admin | Bandmatch' }
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
