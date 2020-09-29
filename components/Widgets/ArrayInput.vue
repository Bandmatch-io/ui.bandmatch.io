<template>
  <div class="border rounded shadow">
    <div class="border-b-2 shadow-inner bg-white pt-2" style="min-height: 5rem;">
      <div v-for="val in value" @click="remove(val)" :key="val" class="capitalize inline-block hover:line-through font-bold rounded m-2 px-2 py-1 bg-blue-700 hover:bg-blue-800 clickable text-white">{{ val }}</div>
      <p v-if="value.length" class="mx-2 mb-1"><small>Click to remove.</small></p>
    </div>
    <div class="grid grid-cols-12">
      <input v-on:keyup.enter="add" v-model="input" class="col-span-10 lg:col-span-10 rounded-l py-3 px-2 ml-2 my-2 border" type="text" />
      <div class="col-span-2 lg:col-span-2 rounded-r border mr-2 my-2 bg-blue-800 hover:bg-blue-700">
        <div @click="add" class="font-bold text-2xl text-white h-full w-full py-3"><plus-icon class="block mx-auto" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons'

export default {
  components: {
    PlusIcon
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
