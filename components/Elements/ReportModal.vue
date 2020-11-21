<template>
  <transition name="fade">
    <div v-if="activeReport" class="fixed inset-0 p-4 opacity-100 z-50 bg-dark-translucent max-h-screen overflow-y-scroll" @click="cancelReport">
      <div class="border rounded shadow-xl block w-full bg-white max-w-350 mx-auto" @click="(e) => { e.stopPropagation() }">
        <div class="border-b shadow-sm p-4">
          <h1 class="text-xl text-center">
            Create report
            <x-icon class="inline-block fill-current text-primary-300 hover:text-secondary-300 m-2 float-right" @click="cancelReport" />
          </h1>
        </div>
        <div class="border-b shadow-sm p-4">
          <div class="border rounded-t px-3 py-3 bg-white cursor-pointer hover:bg-gray-200" :class="{ 'bg-primary-grad text-white': reason === reasons.offensive }" @click="reason = reasons.offensive">
            This user has posted offensive content
          </div>
          <div class="border border-t-0 px-3 py-3 bg-white cursor-pointer hover:bg-gray-200" :class="{ 'bg-primary-grad text-white': reason === reasons.harrassment }" @click="reason = reasons.harrassment">
            This user is harassing me
          </div>
          <div class="border border-t-0 px-3 py-3 bg-white cursor-pointer hover:bg-gray-200" :class="{ 'bg-primary-grad text-white': reason === reasons.spam }" @click="reason = reasons.spam">
            This is user has posted spam
          </div>
          <div class="border border-t-0 rounded-b px-3 py-3 bg-white cursor-pointer hover:bg-gray-200" :class="{ 'bg-primary-grad text-white': reason === reasons.fake }" @click="reason = reasons.fake">
            This is a fake profile
          </div>
        </div>
        <div class="border-b p-4">
          <ButtonComplement v-if="state===states.default" class="w-3/4 mx-auto block" :action="submitReport">
            <alert-octagon-icon class="inline-block mr-2" />Submit Report
          </ButtonComplement>
          <div v-else class="block w-1/2 h-12 md:h-24 mx-auto">
            <LoaderAnim />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { XIcon, AlertOctagonIcon } from 'vue-feather-icons'
import ButtonComplement from '~/components/Core/ButtonComplement'

export default {
  components: {
    ButtonComplement,
    AlertOctagonIcon,
    XIcon
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1
      },
      state: 0,
      reasons: {
        offensive: 'Offensive',
        harrassment: 'Harrassment',
        spam: 'Spam',
        fake: 'FakeProfile'
      },
      reason: 'Offensive',
      reportDetails: {
        target: '',
        reportedUser: '',
        reportedConversation: '',
        reason: ''
      }
    }
  },
  computed: {
    activeReport () {
      return this.$store.state.reports.active
    }
  },
  methods: {
    assembleData () {
      const data = {}

      data.target = this.$store.state.reports.type
      if (data.target === 'User') {
        data.reportedUser = this.$store.state.reports.target
        // data.reportedConversation = undefined
      } else if (data.target === 'Conversation') {
        data.reportedConversation = this.$store.state.reports.target
        // data.reportedUser = undefined
      }
      data.reason = this.reason
      return data
    },
    cancelReport () {
      this.$store.commit('reports/closeReport')
    },
    submitReport () {
      this.state = this.states.loading
      const data = this.assembleData()

      this.$axios.post('/reports/', data)
        .then((res) => {
          this.state = this.states.default
          if (res.data.success) {
            this.$store.commit('toasts/create', { title: 'Report', message: 'Successfully submitted report.' })
          }
        })
        .catch((e) => {
          this.state = this.states.default
          this.$store.commit('toasts/create', { title: 'Report', message: 'Failed to submit report.', type: 'error' })
        })

      this.$store.commit('reports/closeReport')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
