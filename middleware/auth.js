export default async function ({ app, store, $config }) {
  if ($config.firebase.enabled) {
    if (app.$fire.auth) {
      try {
        const user = app.$fire.auth.currentUser
        if (user) {
          console.debug('[middleware] user logged in')
          store.dispatch('setFirebaseUser', {authUser: user})
        } else {
          console.debug('[middleware] no user here')
          store.dispatch('signOut')
        }
      } catch (e) {
        store.dispatch('signOut')
      }
    }
  }
}
