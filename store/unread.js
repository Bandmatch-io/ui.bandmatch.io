export const state = () => ({
  count: 0
})

export const mutations = {
  setUnread (state, num) {
    state.count = num
  },
  removeUnread (state) {
    state.count -= 1
  },
  addUnread (state) {
    state.count += 1
  }
}
