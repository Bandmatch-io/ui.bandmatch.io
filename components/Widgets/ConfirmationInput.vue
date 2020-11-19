<template>
  <div>
    <ButtonComplement v-if="inputOpen === false" :action="() => { inputOpen = true }" class="w-full mx-0">
      <slot />
    </ButtonComplement>
    <div v-else class="w-full">
      <p>Type <span class="font-bold">{{ checkString }}</span> to confirm.</p>
      <div class="grid grid-cols-4">
        <input v-model="enteredText" type="text" class="inline-block col-span-3 mx-0 rounded-l border border-r-0 p-2 ring-primary-200 ring-0 focus:ring ring-opacity-50">
        <ButtonComplement :disabled="enteredText !== checkString" :action="confirm" group-pos="last" class="my-0 inline-block col-span-1 mx-0">
          <check-icon class="inline-block mx-auto md:mr-1 md:ml-1" /> <span class="hidden md:inline-block">Confirm</span>
        </ButtonComplement>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from 'vue-feather-icons'
import ButtonComplement from '~/components/Core/ButtonComplement'

export default {
  components: {
    CheckIcon,
    ButtonComplement
  },
  props: {
    checkString: { type: String, default () { return '' } }
  },
  data () {
    return {
      inputOpen: false,
      enteredText: ''
    }
  },
  methods: {
    confirm () {
      if (this.enteredText === this.checkString) {
        this.$emit('confirm', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
