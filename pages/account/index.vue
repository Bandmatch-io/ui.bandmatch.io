<template>
  <div class="flex-container bg-polka">
    <div class="my-5 w-3/4 max-w-2xl mx-auto">
      <div v-if="state === states.default" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block">
        <Button :action="() => state=states.signup" class="max-w-350 mx-auto w-3/4 block my-3">
          Sign up
        </Button>
        <p class="w-full text-center font-semibold">
          OR
        </p>
        <Button :action="() => state=states.login" class="max-w-350 mx-auto w-3/4 block my-3">
          Log in
        </Button>
      </div>

      <SignupForm v-if="state === states.signup" :switch-view="() => {state=states.login}" />
      <LoginForm v-if="state === states.login" :switch-view="() => {state=states.signup}" :switch-to-reset="() => {state=states.password}" />
      <RequestPassReset v-if="state === states.password" :switch-view="() => {state=states.default}" />
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
      states: {
        default: 0,
        login: 1,
        signup: 2,
        password: 3
      },
      state: 0
    }
  },
  mounted () {
    if (this.$route.query.st) {
      if (this.states[this.$route.query.st] !== undefined) {
        this.state = this.states[this.$route.query.st]
      }
    }
  },
  head () {
    return {
      title: 'Sign up | Bandmatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Sign up | Bandmatch' }
        // other meta
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
