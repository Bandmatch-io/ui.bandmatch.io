<template>
  <div class="bg-polka">
    <div class="mx-auto block w-3/4 max-w-350">
      <DateInput v-model="dailyStats.date" @change="getDailyStats">
        <calendar-icon class="block mx-auto" />
      </DateInput>
    </div>
    <div class="flex-container justify-center flex flex-wrap">
      <DashboardCard title="Searches" link="">
        <h1 class="my-1 text-2xl">
          {{  dailyStats.stats.searches ? dailyStats.stats.searches : 0 }}
        </h1>
      </DashboardCard>
      <DashboardCard title="Messages Sent" link="">
        <h1 class="my-1 text-2xl">
          {{  dailyStats.stats.messagesSent ? dailyStats.stats.messagesSent : 0 }}
        </h1>
      </DashboardCard>
      <DashboardCard title="Returning Users" link="">
        <h1 class="my-1 text-2xl">
          {{  dailyStats.stats.logins ? dailyStats.stats.logins : 0 }}
        </h1>
      </DashboardCard>
      <DashboardCard title="New Users" link="/admin/users">
        <h1 class="my-1 text-2xl">
          {{  dailyStats.stats.signups ? dailyStats.stats.signups : 0 }}
        </h1>
      </DashboardCard>
      <DashboardCard title="Reports" link="/admin/reports">
        <h1 class="my-1 text-2xl">
          {{  dailyStats.stats.reports ? dailyStats.stats.reports : 0 }}
        </h1>
      </DashboardCard>
      <DashboardCard title="Internal errors" link="/admin/health">
        <h1 class="my-1 text-2xl">
          {{  dailyStats.stats.serverErrors ? dailyStats.stats.serverErrors : 0 }}
        </h1>
      </DashboardCard>
      <DashboardCard title="User errors" link="">
        <h1 class="my-1 text-2xl">
          {{ dailyStats.stats.userErrors ? dailyStats.stats.userErrors : 0 }}
        </h1>
      </DashboardCard>
      <DashboardCard title="Unauthorized Requests" link="">
        <h1 class="my-1 text-2xl">
          {{ dailyStats.stats.unauthorizedErrors ? dailyStats.stats.unauthorizedErrors : 0 }}
        </h1>
      </DashboardCard>
      <DashboardCard title="Alerts Sent" link="">
        <h1 class="my-1 text-2xl">
          {{ dailyStats.stats.alertsSent ? dailyStats.stats.alertsSent : 0 }}
        </h1>
      </DashboardCard>
    </div>
    <div v-if="dailyStats.stats.errors" class="flex-container justify-center flex flex-wrap w-3/4 block mx-auto">
      <h1 class="text-xl w-full text-center rounded border-2 bg-complementary-300 hover:bg-complementary-400 text-white" @click="()=>{errorsOpen= !errorsOpen}">
        <alert-circle-icon size="1x" class="inline mr-1"/>Error Summary
        <chevron-up-icon v-if="errorsOpen" size="1x" class="inline ml-1"/>
        <chevron-down-icon v-else size="1x" class="inline ml-1"/>
      </h1>
      <div v-if="errorsOpen" class="w-full flex-container justify-center flex flex-wrap">
        <div v-for="(err, index) in dailyStats.stats.errors" :key="index" class="w-full block border bg-white shadow-sm rounded-sm my-2 mx-auto px-4 py-2">
          <p> {{err.message}} </p>
          <div class="grid grid-cols-2 w-full">
            <p class="my-1 col-span-1 text-sm"> {{err.origin}} </p>
            <p class="my-1 col-span-1 text-sm text-right"> {{err.timestamp}} </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-container justify-center flex flex-wrap">
      <DateInput v-model="periodStats.startDate" label="Start date" class="w-1/3 mx-auto inline-block min-w-250" @change="getPeriodStats">
        <calendar-icon class="block mx-auto" />
      </DateInput>
      <DateInput v-model="periodStats.endDate" label="End date" class="w-1/3 mx-auto inline-block min-w-250" @change="getPeriodStats">
        <calendar-icon class="block mx-auto" />
      </DateInput>
      <LineChart :data="periodStats.stats" class="mb-4" />
    </div>
  </div>
</template>

<script>
import { CalendarIcon, AlertCircleIcon, ChevronDownIcon, ChevronUpIcon } from 'vue-feather-icons'
import DashboardCard from '~/components/Widgets/Admin/DashboardCard'
import DateInput from '~/components/Widgets/DateInput'
import LineChart from '~/components/Widgets/Admin/LineChart'

export default {
  middleware: 'isadmin',
  components: {
    DashboardCard,
    DateInput,
    LineChart,
    CalendarIcon,
    AlertCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon
  },
  data () {
    return {
      dailyStats: {
        date: '',
        stats: {}
      },
      periodStats: {
        startDate: '',
        endDate: '',
        stats: {}
      },
      errorsOpen: false
    }
  },
  mounted () {
    const now = new Date(Date.now())
    this.dailyStats.date = this.toDateInputString(now)
    this.periodStats.endDate = this.toDateInputString(now)
    this.periodStats.startDate = this.toDateInputString(this.daysBeforeEndDate(7))
    this.getDailyStats()
    this.getPeriodStats()
  },
  methods: {
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
    resetDailyStats () {
      this.dailyStats.stats = { searches: 0, messagesSent: 0, logins: 0, signups: 0, rootViews: 0, rejections: 0, conversionRate: 0, errors: undefined }
    },
    getDailyStats () {
      const ymd = this.toYMD(this.dailyStats.date)
      this.$axios.get(`/admin/analytics/daily?y=${ymd.year}&m=${ymd.month}&d=${ymd.day}`)
        .then((res) => {
          this.resetDailyStats()
          if (res.data.success) {
            this.dailyStats.stats = res.data.stats
          }
        })
        .catch((e) => { this.resetDailyStats() })
    },
    getPeriodStats () {
      const start = this.parseDate(this.toYMD(this.periodStats.startDate))
      const ymd = this.toYMD(this.periodStats.endDate)
      const end = this.parseDate(ymd)
      const p = this.dateDiff(start, end)

      this.$axios.get(`/admin/analytics/period?y=${ymd.year}&m=${ymd.month}&d=${ymd.day}&p=${p}`)
        .then((res) => {
          if (res.data.success) {
            this.periodStats.stats = this.compileData(res.data.stats, ymd.year, ymd.month, ymd.day, p)
          }
        })
        .catch((e) => {
          this.periodStats.stats = undefined
        })
    },
    compileData (data, y, m, d, p) {
      const compiled = { labels: [], searches: [], messages: [], signups: [], logins: [] }

      const date = new Date(Date.UTC(y, m - 1, d))
      date.setDate(date.getDate() - Number(p) + 1)
      for (let i = 0; i < p; i++) {
        compiled.labels.push(date.toDateString())

        let foundData = false
        data.forEach((stat) => {
          if (this.matchingDates(date, stat.Date)) {
            compiled.searches.push(stat.searches)
            compiled.messages.push(stat.messagesSent)
            compiled.signups.push(stat.signups)
            compiled.logins.push(stat.logins)
            foundData = true
          }
        })
        if (!foundData) {
          compiled.searches.push(0)
          compiled.messages.push(0)
          compiled.signups.push(0)
          compiled.logins.push(0)
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
