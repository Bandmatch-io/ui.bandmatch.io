<template>
  <transition name="fade">
    <div v-if="modalActive" class="fixed inset-0 p-4 opacity-100 z-50 bg-dark-translucent max-h-screen overflow-y-scroll" @click="closeNotificationSettings">
      <div class="border rounded shadow-xl block w-full bg-white max-w-350 mx-auto" @click="(e) => { e.stopPropagation() }">
        <div class="border-b shadow-sm p-4">
          <h1 class="text-xl text-center">
            Notification Settings
            <x-icon class="inline-block fill-current text-primary-300 hover:text-secondary-300 m-2 float-right" @click="closeNotificationSettings" />
          </h1>
        </div>
        <div v-if="state===states.default" class="border-b shadow-sm p-4">
          <Checkbox v-model="notificationSettings.allowNewsletters" class="my-1">
            Allow marketing emails & newsletters
          </Checkbox>
          <Checkbox v-model="notificationSettings.allowMessageAlerts" class="my-1">
            Send me emails when I get a message
          </Checkbox>
          <Checkbox v-model="notificationSettings.allowUserAlerts" class="my-1">
            Send me emails when there are new users around me
          </Checkbox>
        </div>
        <div v-else-if="state===states.loading" class="border-b shadow-sm p-4">
          <div class="block w-1/2 h-12 md:h-24 mx-auto">
            <LoaderAnim />
          </div>
        </div>
        <div class="border-b p-4">
          <Button v-if="state===states.default" colour="tertiary" class="w-3/4 mx-auto block" :action="saveSettings">
            <save-icon class="inline-block mr-2" />Save Settings
          </Button>
          <div v-else-if="state===states.saving" class="block w-1/2 h-12 md:h-24 mx-auto">
            <LoaderAnim />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { XIcon, SaveIcon } from 'vue-feather-icons'

export default {
  components: {
    XIcon,
    SaveIcon
  },
  data () {
    return {
      states: {
        default: 0,
        loading: 1,
        saving: 2
      },
      state: 0,
      notificationSettings: {
        allowNewsletters: true,
        allowMessageAlerts: true,
        allowUserAlerts: true
      }
    }
  },
  methods: {
    closeNotificationSettings () {
      this.$store.commit('notifications/close')
    },
    getSettings () {
      this.state = this.states.loading
      this.$axios.get('/users/profile/notifications')
        .then((res) => {
          if (res.data.success) {
            this.state = this.states.default
            this.notificationSettings = res.data.notificationSettings
          }
        })
    },
    saveSettings () {
      this.state = this.states.saving
      const ns = this.notificationSettings
      this.$axios.patch(`/users/profile/notifications/save?an=${ns.allowNewsletters}&ama=${ns.allowMessageAlerts}&aua=${ns.allowUserAlerts}`)
        .then((res) => {
          if (res.data.success) {
            this.state = this.states.default
            this.closeNotificationSettings()
          }
        })
    }
  },
  computed: {
    modalActive () {
      return this.$store.state.notifications.active
    }
  },
  watch: {
    modalActive (newVal, old) {
      if (newVal === true) {
        this.getSettings()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
