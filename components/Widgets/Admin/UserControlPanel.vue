<template>
  <div>
    <div class="w-full grid grid-cols-3 my-0">
      <Button colour="complementary" :action="clearName" group-pos="first" class="my-1 col-span-1 inline-block mx-0">
        <delete-icon class="inline-block" /> Clear Name
      </Button>
      <Button colour="complementary" :action="clearDesc" group-pos="mid" class="my-1 col-span-1 inline-block mx-0">
        <delete-icon class="inline-block" /> Clear Description
      </Button>
      <Button colour="complementary" :action="clearAudio" group-pos="last" class="my-1 col-span-1 inline-block mx-0">
        <delete-icon class="inline-block" /> Clear Audio
      </Button>
    </div>
    <div class="w-full grid grid-cols-1 my-0">
      <ConfirmationInput :check-string="user.displayName" class="my-1 col-span-1 inline-block mx-0" @confirm="deleteUser">
        <trash-2-icon class="inline-block" /> Delete user
      </ConfirmationInput>
      <ConfirmationInput v-show="user.admin" :checkString="user.displayName" class="my-1 col-span-1 inline-block mx-0" @confirm="demoteUser">
        <x-square-icon class="inline-block" /> Demote from admin
      </confirmationinput>
      <ConfirmationInput v-show="!user.admin" colour="secondary" :checkString="user.displayName" class="my-1 col-span-1 inline-block mx-0" @confirm="promoteUser">
        <award-icon class="inline-block" /> Promote to admin
      </confirmationinput>
    </div>
  </div>
</template>

<script>
import { AwardIcon, DeleteIcon, Trash2Icon, XSquareIcon } from 'vue-feather-icons'
import ConfirmationInput from '~/components/Widgets/ConfirmationInput'

export default {
  components: {
    AwardIcon,
    DeleteIcon,
    XSquareIcon,
    Trash2Icon,
    ConfirmationInput
  },
  props: {
    user: { type: Object, default () { return {} } }
  },
  methods: {
    clearName () {
      this.$axios.delete(`/admin/users/name?uid=${this.user._id}`)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('toasts/create', { title: 'Admin | User', message: `Cleared ${this.user.displayName}'s name` })
            this.$emit('refresh')
          }
        })
    },
    clearDesc () {
      this.$axios.delete(`/admin/users/description?uid=${this.user._id}`)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('toasts/create', { title: 'Admin | User', message: `Cleared ${this.user.displayName}'s description` })
            this.$emit('refresh')
          }
        })
    },
    clearAudio () {
      this.$axios.delete(`/admin/users/audio?uid=${this.user._id}`)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('toasts/create', { title: 'Admin | User', message: `Cleared ${this.user.displayName}'s audio preview` })
            this.$emit('refresh')
          }
        })
    },
    deleteUser () {
      this.$axios.delete(`/admin/users?uid=${this.user._id}`)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('toasts/create', { title: 'Admin | User', message: `Deleted ${this.user.displayName}` })
            this.$emit('refresh')
          }
        })
    },
    demoteUser () {
      this.$axios.patch(`/admin/users/demote?uid=${this.user._id}`)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('toasts/create', { title: 'Admin | User', message: `Demoted ${this.user.displayName}` })
            this.$emit('refresh')
          }
        })
    },
    promoteUser () {
      this.$axios.patch(`/admin/users/promote?uid=${this.user._id}`)
        .then((res) => {
          if (res.data.success) {
            this.$store.commit('toasts/create', { title: 'Admin | User', message: `Promoted ${this.user.displayName}` })
            this.$emit('refresh')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
