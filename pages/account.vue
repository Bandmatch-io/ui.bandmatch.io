<template>
  <div class="flex-container bg-polka">
    <div class="w-full my-5 lg:w-3/4 max-w-2xl mx-auto">
      <div v-if="state === states.default" class="container min-w-350 shadow bg-gray-100 mx-auto p-4 mt-8 block" style="height: 15rem;">
        <div @click="state=states.signup" class="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded m-5">
          Sign up
        </div>
        <p class="w-full text-center font-semibold"> OR </p>
        <div @click="state=states.login" class="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded m-5">
          Log in
        </div>
      </div>

      <SignupForm  v-if="state === states.signup" />
      <LoginForm v-if="state === states.login" />

    </div>

  </div>
</template>

<script>
export default {
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
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
