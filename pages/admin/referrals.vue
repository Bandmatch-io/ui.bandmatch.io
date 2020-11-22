<template>
  <div class="flex-container bg-polka justify-center flex flex-wrap">
    <DateInput v-model="startDate" label="Start date" class="w-1/3 mx-auto inline-block min-w-250" @change="getData">
      <calendar-icon class="block mx-auto" />
    </DateInput>
    <DateInput v-model="endDate" label="End date" class="w-1/3 mx-auto inline-block min-w-250" @change="getData">
      <calendar-icon class="block mx-auto" />
    </DateInput>
    <BarChart :data="stats" class="mb-4" />
  </div>
</template>

<script>
import { CalendarIcon } from 'vue-feather-icons'

export default {
  middleware: 'isadmin',
  components: {
    CalendarIcon
  },
  data () {
    return {
      startDate: '',
      endDate: '',
      stats: []
    }
  },
  mounted () {
    const now = new Date(Date.now())
    this.endDate = this.toDateInputString(now)
    this.startDate = this.toDateInputString(this.daysBeforeEndDate(7))
    this.getData()
  },
  methods: {
    compileData (data) {
      const s = []

      data.forEach((day) => {
        const refs = day.referrers
        refs.forEach((ref) => {
          const refInd = s.findIndex(e => e.x === ref.url)

          if (refInd >= 0) {
            s[refInd].y += ref.count
          } else {
            s.push({ x: ref.url, y: ref.count })
          }
        })
      })

      console.log(s)
      return s
    },
    daysBeforeEndDate (days) {
      const end = this.parseDate(this.toYMD(this.endDate))
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
    getData () {
      const start = this.parseDate(this.toYMD(this.startDate))
      const ymd = this.toYMD(this.endDate)
      const end = this.parseDate(ymd)
      const p = this.dateDiff(start, end)

      this.$axios.get(`/admin/analytics/referrals?y=${ymd.year}&m=${ymd.month}&d=${ymd.day}&p=${p}`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data)
            this.stats = this.compileData(res.data.stats)
          }
        })
        .catch((e) => {
          this.stats = undefined
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
