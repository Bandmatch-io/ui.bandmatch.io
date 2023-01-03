<template>
  <div>
    <Button v-if="inputOpen === false" :colour="colour" :action="() => { inputOpen = true }" class="w-full mx-0">
      <slot />
    </Button>
    <div v-else class="w-full">
      <p>Type <span class="font-bold">{{ checkString }}</span> to confirm.</p>
      <div class="grid grid-cols-4">
        <input v-model="enteredText" type="text" class="inline-block col-span-3 mx-0 rounded-l border border-r-0 p-2 ring-primary-200 ring-0 focus:ring ring-opacity-50">
        <Button :colour="colour" :disabled="!valuesEqual" :action="confirm" group-pos="last" class="my-0 inline-block col-span-1 mx-0">
          <check-icon class="inline-block mx-auto md:mr-1 md:ml-1" /> <span class="hidden md:inline-block">Confirm</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from 'vue-feather-icons'
import Button from '~/components/Core/Button'

export default {
  components: {
    CheckIcon,
    Button
  },
  props: {
    colour: { type: String, default () { return 'complementary' } },
    checkString: { type: String, default () { return '' } }
  },
  data () {
    return {
      inputOpen: false,
      enteredText: ''
    }
  },
  computed: {
    valuesEqual () {
      return JSON.stringify(this.enteredText).trim() === JSON.stringify(this.checkString).trim()
    }
  },
  mounted () {
    console.log(this.checkString)
  },
  methods: {
    confirm () {
      if (this.enteredText === this.checkString) {
        this.$emit('confirm', true)
        this.inputOpen = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
