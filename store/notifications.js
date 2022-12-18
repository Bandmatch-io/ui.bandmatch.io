export const state = () => ({
  active: false
})

export const mutations = {
  open (state) {
    state.active = true
  },
  close (state) {
    state.active = false
  }
}

export const actions = {

}
