export const state = () => ({
  newChat: {},
  drafts: []
})

export const mutations = {
  addDraft (state, convoID, draft) {
    state.drafts.push({ convoID, message: draft })
  },
  setNewMessage (state, recipientID) {
    state.newChat = { recipientID, message: '' }
  },
  clearNewMessage (state) {
    state.newChat = {}
  }
}
