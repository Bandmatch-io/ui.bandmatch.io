export const state = () => ({
  currentUser: undefined
})

export const mutations = {
  logIn (state, newUser) {
    console.log('newUser', JSON.parse(newUser))
    state.currentUser = JSON.parse(newUser)
  },
  logOut (state) {
    state.currentUser = undefined
  }
}
