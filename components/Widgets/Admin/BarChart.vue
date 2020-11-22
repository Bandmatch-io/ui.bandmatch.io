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
    data: { type: Array, default () { return [] } }
  },
  data () {
    return {
      chart: undefined,
      ctx: undefined,
      width: 0,
      colours: ['#73A7C6', '#3C7BA0', '#196795', '#0A4A6F', '#03304B',
        '#8F7DCE', '#5E47AD', '#3F23A1', '#291278', '#170751',
        '#95E680', '#64D447', '#3BC417', '#239305', '#156300',
        '#FFCC8E', '#FBB054', '#E98D1B', '#AF6306', '#764100']
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

    this.shuffleArray(this.colours)
  },
  methods: {
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
    },
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
        type: 'bar',
        data: {
          backgroundColor: '#0000FF',
          labels: ['Referrals'],
          datasets: this.data.map((s, i) => { return { backgroundColor: this.colours[i], data: [s.y], label: s.x } }) // [{ label: 'Referrals', minBarLength: 2, data: this.data.map(x => x) }]
        },
        options: {
          responsive: true,
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
