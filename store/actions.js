import {query} from "vue-gtag";

export default {
  // nuxt handles invoking this when firebaseAuthStateChanges
  async authAction({dispatch, state, commit}, {authUser}) {
    console.debug('in auth action')
    if (!authUser) {
      console.debug('signing out as no user')
      await dispatch('signOut')
    } else {
      // logged in
      await dispatch('setFirebaseUser', {authUser})
    }
  },

  setFirebaseUser({commit}, {authUser}) {
    return new Promise((resolve) => {
      const { uid, email, emailVerified, displayName, photoURL } = authUser
      commit('setUser', { uid, email, emailVerified, displayName, photoURL })
      resolve({ uid, email, emailVerified, displayName, photoURL })
    })
  },

  signOut({commit}) {
    return this.$fire.auth.signOut()
      .then(() => {
        commit('setUser', null)
      })
  },

  signInUserWithGoogle({dispatch}) {
    return new Promise((resolve, reject) => {
      // https://firebase.google.com/docs/auth/web/google-signin#web-v8
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      this.$fire.auth.signInWithPopup(provider)
        .then((userCred) => {
          dispatch('setFirebaseUser', {authUser: userCred.user})
            .then((user) => {
              resolve(user)
            })
        }).catch((error) => {
          reject(error)
        })
    })
  },

  postComment({commit, state}, {text, slug}) {
    return new Promise((resolve, reject) => {
      const timestamp = new Date()
      const comment = {
        authorUID: state.user.uid,
        photoURL: state.user.photoURL,
        text: text.trim(),
        name: state.user.displayName,
        slug,
        created: timestamp,
        updated: timestamp
      }
      this.$fire.firestore.collection('comments').add(comment)
        .then((docRef) => {
          commit('pushItem', {id: slug, item: comment, resource: 'comments'})
          resolve('posted successfully')
        }).catch((e) => {
          reject(e)
      })
    })
  },

  fetchComments({commit, state}, {slug}) {
    return new Promise((resolve, reject) => {
      if (state.comments[slug]) {
        resolve(state.comments[slug])
        return
      }
      commit('setItem', {item: null, id: slug, resource: 'comments'})
      const comments = []
      this.$fire.firestore.collection('comments').where('slug', '==', slug)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const comment = { ...doc.data() }
            comment.created = new Date(comment.created.seconds * 1000)
            comment.updated = new Date(comment.updated.seconds * 1000)
            commit('pushItem', {item: comment, id: slug, resource: 'comments'})
            comments.push(doc.data())
          })
          resolve(comments)
        })
        .catch((e) => {
            reject(e)
        })
    })
  },

  fetchLikes({commit, state}, {slug}) {
    return new Promise((resolve, reject) => {
      this.$fire.firestore.collection('likes').where('slug', '==', slug)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            if (state.user) {
              this.$fire.firestore.collection('likes').add({
                slug,
                likes: 0
              }).then((docRef) => {
                resolve({count: 0, id: docRef.id})
              })
            } else {
              resolve({count: 0, id: 0})
            }
          } else {
            querySnapshot.forEach((doc) => {
              const like = { ...doc.data() }
              resolve({count: like.likes, id: doc.id})
            })
          }
        })
        .catch((e) => {
            reject(e)
        })
    })
  },

  incrementLikes({commit, state}, {count, slug, id}) {
    const like = {
      slug,
      likes: this.$fireModule.firestore.FieldValue.increment(count)
    }
    this.$fire.firestore.collection('likes').doc(id).update(like)
  },
}
