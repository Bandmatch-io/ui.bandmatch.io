<template>
  <div v-if="mobileScreen" class="border rounded p-3 shadow bg-primary-grad">
    <h1 class="text-3xl">
      Screen too small
    </h1>
  </div>
  <div v-else class="w-3/4 p-1 mx-auto block bg-white rounded shadow border">
    <canvas id="chart" class="block mx-auto w-3/4 h-auto" width="1920" height="1080" />
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: {
    data: { type: Object, default () { return {} } }
  },
  data () {
    return {
      chart: undefined,
      ctx: undefined,
      width: 0
    }
  },
  computed: {
    mobileScreen () {
      return this.width < 767
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler () {
        this.createChart()
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  methods: {
    onResize () {
      this.width = window.innerWidth
    },
    createLabel (title, data, color) {
      return { label: title, data, borderColor: color, fill: false, lineTension: 0.1 }
    },
    createChart () {
      if (this.chart) {
        this.chart.destroy()
      }
      if (document.getElementById('chart') === null) { return }
      if (this.data === undefined) { return }

      this.ctx = document.getElementById('chart').getContext('2d')
      this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.data.labels,
          datasets: [
            this.createLabel('Searches', this.data.searches, '#28546E'),
            this.createLabel('Messages Sent', this.data.messages, '#442F76'),
            this.createLabel('New Users', this.data.signups, '#AC9B39'),
            this.createLabel('Returning Users', this.data.logins, '#AC7839')
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
