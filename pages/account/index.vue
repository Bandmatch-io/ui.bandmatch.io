<template>
  <div class="flex-container bg-polka">
    <div class="my-5 w-3/4 max-w-2xl mx-auto">
      <div v-if="state === states.default" class="container rounded shadow min-w-250 bg-gray-100 mx-auto p-4 mt-8 block" style="height: 15rem;">
        <ButtonPrimary :action="() => state=states.signup" class="m-w-350 mx-auto w-3/4">
          Sign up
        </ButtonPrimary>
        <p class="w-full text-center font-semibold">
          OR
        </p>
        <ButtonPrimary :action="() => state=states.login" class="m-w-350 mx-auto w-3/4">
          Log in
        </ButtonPrimary>
      </div>

      <SignupForm v-if="state === states.signup" :switch-view="() => {state=states.login}" />
      <LoginForm v-if="state === states.login" :switch-view="() => {state=states.signup}" :switch-to-reset="() => {state=states.password}" />
      <RequestPassReset v-if="state === states.password" :switch-view="() => {state=states.default}" />
    </div>
  </div>
</template>

<script>
import ButtonPrimary from '~/components/Core/ButtonPrimary'

export default {
  auth: false,
  components: {
    ButtonPrimary
  },
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
