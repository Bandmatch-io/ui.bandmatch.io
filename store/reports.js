export const state = () => ({
  target: undefined,
  type: '',
  active: false
})

export const mutations = {
  startReport (state, { id, type }) {
    state.active = true
    state.target = id
    state.type = type
  },
  closeReport (state) {
    state.active = false
    state.target = ''
    state.active = false
  }
}

export const actions = {

}
