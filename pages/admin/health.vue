<template>
  <div class="bg-polka">
    <Button colour="tertiary" :action="() => { this.getHealth() }" class="m-3 block mx-auto">
      <refresh-cw-icon v-if="!isQuerying" class="inline-block" /><loader-icon v-else class="inline-block spin" /> <span class="hidden md:inline">30s</span>
    </Button>
    <div class="flex-container justify-center flex flex-wrap">
      <table class="table-auto w-3/4">
        <thead class="bg-primary-300 text-white border-1">
          <tr>
            <th class="px-3 py-1 rounded-tl-lg border-b-2 border-slate-400">Service</th>
            <th class="px-3 py-1 border-b-2 border-slate-400">Health</th>
            <th class="px-3 py-1 rounded-tr-lg border-b-2 border-slate-400">Port</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hb in heartbeats" :key="hb.serviceName">
            <td class="px-3 py-1 border-2 border-slate-400 bg-white">{{ hb.serviceName }}</td>
            <td class="px-3 py-1 border-2 border-slate-400 text-white" :style="'background-color: ' + colours[hb.state]">{{ states[hb.state] }}</td>
            <td class="px-3 py-1 border-2 border-slate-400 bg-white">{{ hb.port }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex-container justify-center flex flex-wrap">
      <DateInput v-model="periodStats.startDate" label="Start date" class="w-1/3 mx-auto inline-block min-w-250" @change="getPeriodStats">
        <calendar-icon class="block mx-auto" />
      </DateInput>
      <DateInput v-model="periodStats.endDate" label="End date" class="w-1/3 mx-auto inline-block min-w-250" @change="getPeriodStats">
        <calendar-icon class="block mx-auto" />
      </DateInput>
      <div class="w-2/3 mx-auto inline-block min-w-250">
        <CustomSelect @change="periodStats.toShow=$event.target.value; onSelectEndpointChange()">
          <option v-for="endpoint in periodStats.endpoints" :selected="periodStats.toShow===endpoint" :key="endpoint" :value="endpoint">
            {{ endpoint }}
          </option>
        </CustomSelect>
      </div>
      <HealthLineChart :data="periodStats.displayStats" class="my-4" />
    </div>
  </div>
</template>

<script>
import { LoaderIcon, RefreshCwIcon, CalendarIcon } from 'vue-feather-icons'
import DateInput from '~/components/Widgets/DateInput'
import HealthLineChart from '~/components/Widgets/Admin/HealthLineChart'
import CustomSelect from '~/components/Widgets/CustomSelect'

export default {
  middleware: 'isadmin',
  components: {
    LoaderIcon,
    RefreshCwIcon,
    CalendarIcon,
    DateInput,
    HealthLineChart,
    CustomSelect
  },
  data () {
    return {
      heartbeats: undefined,
      states: {
        '-1': 'Unresponsive',
        0: 'Starting up',
        1: 'Healthy'
      },
      isQuerying: false,
      colours: {
        '-1': '#E98D1B',
        0: '#196795',
        1: '#3BC417'
      },
      periodStats: {
        startDate: '',
        endDate: '',
        displayStats: {},
        allStats: {},
        toShow: '',
        endpoints: []
      }
    }
  },
  mounted () {
    const now = new Date(Date.now())
    this.periodStats.endDate = this.toDateInputString(now)
    this.periodStats.startDate = this.toDateInputString(this.daysBeforeEndDate(7))
    this.getPeriodStats()
    this.getHealth()
  },
  methods: {
    getHealth () {
      this.isQuerying = true
      this.$axios.get('/admin/health')
        .then((res) => {
          if (res.data.success) {
            this.heartbeats = res.data.heartbeats
            this.heartbeats.sort((a, b) => a.serviceName.localeCompare(b.serviceName))
          }
          this.isQuerying = false
          setTimeout(this.getHealth, 30000)
        })
    },
    daysBeforeEndDate (days) {
      const end = this.parseDate(this.toYMD(this.periodStats.endDate))
      return new Date(new Date().setDate(end.getDate() - days))
    },
    toDateInputString (date) {
      const [day, month, year] = date.toLocaleDateString().split('/')
      return `${year}-${month}-${day}`
    },
    toYMD (date) {
      const [year, month, day] = date.split('-')
      return { day, month, year }
    },
    parseDate ({ day, month, year }) {
      return new Date(year, month, day)
    },
    dateDiff (first, second) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round((second - first) / (1000 * 60 * 60 * 24))
    },
    onSelectEndpointChange () {
      const start = this.parseDate(this.toYMD(this.periodStats.startDate))
      const ymd = this.toYMD(this.periodStats.endDate)
      const end = this.parseDate(ymd)
      const p = this.dateDiff(start, end)

      this.periodStats.displayStats = this.compileData(this.periodStats.allStats, this.periodStats.toShow, ymd.year, ymd.month, ymd.day, p)
    },
    getPeriodStats () {
      const start = this.parseDate(this.toYMD(this.periodStats.startDate))
      const ymd = this.toYMD(this.periodStats.endDate)
      const end = this.parseDate(ymd)
      const p = this.dateDiff(start, end)

      this.$axios.get(`/admin/analytics/period?y=${ymd.year}&m=${ymd.month}&d=${ymd.day}&p=${p}`)
        .then((res) => {
          if (res.data.success) {
            // List all endpoints
            this.periodStats.endpoints = []
            res.data.stats.forEach((x) => {
              const eps = Object.keys(x.endpointTiming)
              eps.forEach((ep) => {
                if (!this.periodStats.endpoints.includes(ep)) {
                  this.periodStats.endpoints.push(ep)
                }
              })
            })
            this.periodStats.allStats = res.data.stats
            this.periodStats.displayStats = this.compileData(res.data.stats, this.periodStats.endpoints[0], ymd.year, ymd.month, ymd.day, p)
          }
        })
        .catch((e) => {
          this.periodStats.displayStats = undefined
        })
    },
    compileData (data, endpoint, y, m, d, p) {
      const compiled = { labels: [], max: [], min: [], avg: [], count: [] }

      const date = new Date(Date.UTC(y, m - 1, d))
      date.setDate(date.getDate() - Number(p) + 1)
      for (let i = 0; i < p; i++) {
        compiled.labels.push(date.toDateString())

        let foundData = false
        data.forEach((stat) => {
          if (stat.endpointTiming[endpoint] === undefined) {
            return
          }

          if (this.matchingDates(date, stat.Date)) {
            compiled.max.push(stat.endpointTiming[endpoint].max)
            compiled.min.push(stat.endpointTiming[endpoint].min)
            compiled.avg.push(stat.endpointTiming[endpoint].avg)
            compiled.count.push(stat.endpointTiming[endpoint].count)
            foundData = true
          }
        })
        if (!foundData) {
          compiled.max.push(0)
          compiled.min.push(0)
          compiled.avg.push(0)
          compiled.count.push(0)
        }

        date.setDate(date.getDate() + 1)
      }
      return compiled
    },
    matchingDates (date, statDate) {
      const [y, m, d] = [date.getYear(), date.getMonth(), date.getDate()]

      const nDate = new Date(statDate)
      const [y1, m1, d1] = [nDate.getYear(), nDate.getMonth(), nDate.getDate()]

      return (y === y1 && m === m1 && d === d1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
