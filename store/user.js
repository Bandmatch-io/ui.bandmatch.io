export const state = () => ({
  currentUser: undefined,
  status: 'idle'
})

export const mutations = {
  setUser (state, newUser) {
    state.currentUser = JSON.parse(newUser)
  },
  logIn (state, newUser) {
    state.currentUser = JSON.parse(newUser)
  },
  logOut (state) {
    state.currentUser = undefined
  },
  setStatus (state, newStatus) {
    state.status = newStatus
  }
}
