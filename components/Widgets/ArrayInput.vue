<template>
  <div class="border rounded shadow">
    <div class="border-b-2 rounded-t shadow-inner bg-white pt-2" style="min-height: 5rem;">
      <Badge v-for="val in value" :key="val" :val="val" :edit="true" @click="remove(val)" />
      <p v-if="value.length" class="mx-2 mb-1">
        <small>Click to remove.</small>
      </p>
    </div>
    <div class="grid grid-cols-12">
      <input v-model="input" placeholder="Enter each element seperately." class="col-span-10 focus:outline-none focus:shadow-outline rounded-l py-3 px-2 ml-2 my-2 border" type="text" @keyup.enter="add">
      <div class="col-span-2 clickable rounded-r border mr-2 my-2 bg-primary-300 hover:bg-primary-400 outline-none hover:shadow-outline">
        <div class="font-bold text-2xl text-white h-full w-full py-3" @click="add">
          <plus-icon class="block mx-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons'
import Badge from '~/components/Widgets/Badge'

export default {
  components: {
    PlusIcon,
    Badge
  },
  props: {
    value: Array
  },
  data () {
    return {
      input: ''
    }
  },
  methods: {
    add () {
      const str = this.sanitiseInput(this.input)
      if (str.length !== 0 && !this.value.includes(str)) {
        const clone = this.value.slice()
        clone.push(str)
        this.$emit('input', clone)
        this.input = ''
      }
    },
    remove (valueToRemove) {
      console.log(valueToRemove)
      const clone = this.value.slice()
      const ind = clone.indexOf(valueToRemove)
      if (ind > -1) {
        clone.splice(ind, 1)
      }
      this.$emit('input', clone)
    },
    sanitiseInput (str) {
      return str.toLowerCase().replace(/[^a-zA-Z\s]+/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
</style>
