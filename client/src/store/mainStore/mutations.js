export function updateAuth(state, user) {
  state.auth.user = user
  state.auth.isLogged = true
}
