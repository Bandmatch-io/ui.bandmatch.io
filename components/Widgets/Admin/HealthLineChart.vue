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
    createLabel (title, data, color, type) {
      return { label: title, data, borderColor: color, fill: false, lineTension: 0.1, type }
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
            this.createLabel('Max', this.data.max, '#28546E', 'line'),
            this.createLabel('Min', this.data.min, '#442F76', 'line'),
            this.createLabel('Avg', this.data.avg, '#AC9B39', 'line'),
            this.createLabel('Count', this.data.count, '#AC7839', 'bar')
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
