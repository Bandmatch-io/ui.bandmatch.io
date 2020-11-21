<template>
  <div ref="container" class="flex-container bg-polka">
    <div class="block w-3/4 mx-auto border bg-white shadow rounded m-3 p-2">
      <h1 class="text-6xl">
        Reports
      </h1>
      <div v-if="filters.length !== 0">
        <h1 class="text-1xl md:inline-block">
          active filters
        </h1>
        <Badge v-for="f in filters" :key="f" :val="f" :edit="true" @click="removeFilter(f)" />
      </div>
      <div v-if="filters.length < 4">
        <h1 class="text-1xl md:inline-block">
          possible filters
        </h1>
        <Badge v-for="f in possibleFilters" :key="f" :val="f" :edit="true" @click="addFilter(f)" />
      </div>
    </div>

    <p class="w-3/4 block mx-auto">
      {{ filteredReports.length }} open reports
    </p>

    <transition-group name="fade">
      <div v-for="report in filteredReports" :key="report._id" class="border rounded shadow bg-white w-3/4 block mx-auto m-3">
        <div class="flow-root border-b shadow-sm rounded-t p-3 bg-primary-grad text-white">
          <p class="float-left">
            Reported {{ report.target }}
          </p>
          <ButtonComplement :action="()=>{ closeReport(report._id) }" class="float-right">
            <x-icon class="fill-current inline-block" /><span v-if="!mobScreen" class="ml-1">Close Report</span>
          </ButtonComplement>
        </div>
        <div class="border-b shadow-sm p-3">
          <p v-if="report.reportedUser">
            {{ report.reportedUser.displayName }}
          </p>
          <p v-if="report.reportedConversation">
            {{ report.reportedConversation.participants[0] }}
          </p>
          <p>{{ reasons[report.reason] }}</p>
        </div>
        <div class="border-b shadow-sm p-3">
          <p v-if="report.reportedUser">
            <ButtonPrimary :action="()=>{ $router.push(`/profile/${report.reportedUser._id}`)}">
              <eye-icon class="inline-block mr-1" />View Profile
            </ButtonPrimary>
          </p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { XIcon, EyeIcon } from 'vue-feather-icons'
import ButtonComplement from '~/components/Core/ButtonComplement'
import ButtonPrimary from '~/components/Core/ButtonPrimary'
import Badge from '~/components/Widgets/Badge'

export default {
  middleware: 'isadmin',
  components: {
    EyeIcon,
    XIcon,
    ButtonComplement,
    ButtonPrimary,
    Badge
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      reports: [],
      reasons: {
        Offensive: 'This user has posted offensive content.',
        Harrassment: 'This user is harrassing me.',
        Spam: 'This user has posted spam.',
        FakeProfile: 'This is a fake profile'
      },
      filters: ['Offensive', 'Harrassment', 'FakeProfile', 'Spam']
    }
  },
  computed: {
    mobScreen () {
      console.log('62', this.$refs.container.clientWidth)
      return this.$refs.container.clientWidth < 639
    },
    possibleFilters () {
      return ['Offensive', 'Harrassment', 'FakeProfile', 'Spam'].filter(f => !this.isFilter(f))
    },
    filteredReports () {
      if (this.filters.length > 0) {
        return this.reports.filter(r => this.filters.includes(r.reason))
      } else {
        return this.reports
      }
    }
  },
  mounted () {
    this.state = this.states.loading
    this.$axios.get('/admin/reports')
      .then((res) => {
        this.state = this.states.default
        if (res.data.success) {
          this.reports = res.data.reports
        }
      })
      .catch((e) => {
        this.state = this.states.default
        this.reports = []
      })
  },
  methods: {
    addFilter (f) {
      this.filters.push(f)
    },
    removeFilter (f) {
      this.filters = this.filters.filter(filter => filter !== f)
    },
    isFilter (f) {
      return this.filters.includes(f)
    },
    closeReport (id) {
      this.$axios.delete(`/admin/reports/${id}`)
        .then((res) => {
          if (res.data.success) {
            this.reports = this.reports.filter(r => r._id !== id)
            this.$store.commit('toasts/create', { title: 'Report', message: 'Report has been closed' })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
