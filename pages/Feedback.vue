<template>
  <div class="flex-container bg-polka">
    <div class="prose block mx-auto my-5 p-2">
      <h1>Feedback</h1>
      <p>We are happy to your feedback and ideas for bandmatch, whether it's good or bad</p>
      <p>Get in touch with one of the admins below to share your feedback and ideas</p>
    </div>

    <div class="w-auto mx-5 md:w-3/4 block md:mx-auto my-5 p-2">
      <p>There <span v-if="admins.length > 1">are</span><span v-else>is</span> {{ admins.length }} admin<span v-if="admins.length > 1">s</span></p>
      <div v-for="admin in admins" :key="admin._id" class="border rounded shadow bg-white p-3">
        <at-sign-icon class="inline-block mr-1" />{{ admin.displayName }}
        <div class="mt-3 grid grid-cols-2 w-full">
          <Button colour="primary" :action="() => { $router.push(`/profile/${admin._id}`) }" group-pos="first" class="col-span-1">
            <eye-icon class="inline-block mr-1" /><span class="hidden md:inline">View Profile</span>
          </Button>
          <Button colour="secondary" :action="() => { startChat(admin._id) }" group-pos="last" class="col-span-1">
            <message-square-icon class="inline-block mr-1" /><span class="hidden md:inline">Start Chat</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AtSignIcon, EyeIcon, MessageSquareIcon } from 'vue-feather-icons'
export default {
  components: {
    AtSignIcon,
    EyeIcon,
    MessageSquareIcon
  },
  data () {
    return {
      admins: []
    }
  },
  mounted () {
    this.$axios.get('/users/admins/list')
      .then((res) => {
        if (res.data.success) {
          this.admins = res.data.users
        }
      })
  },
  methods: {
    startChat (id) {
      this.$store.commit('convo/setNewMessage', id, '')
      this.$router.push('/conversations')
    }
  },
  head () {
    return {
      title: 'Feedback | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Feedback | Bandmatch' }
        // other meta
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
