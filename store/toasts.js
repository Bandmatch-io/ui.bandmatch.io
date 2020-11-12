export const state = () => ({
  sequence: 0,
  list: []
})

export const mutations = {
  create (state, { title, message, timealive = 5 }) {
    const t = {
      _id: state.sequence,
      title,
      message,
      timealive
    }
    state.list.push(t)
    state.sequence += 1

    setTimeout(() => {
      this.commit('toasts/destroy', t._id)
    }, timealive * 1000)
  },
  destroy (state, id) {
    state.list = state.list.filter(t => t._id !== id)
  }
}

export const actions = {

}
