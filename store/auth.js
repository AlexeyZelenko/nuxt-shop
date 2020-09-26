// import firebase from 'firebase/app'
// import { db } from '~/plugins/firebase.js';
// import Swal from 'sweetalert2'
// import 'firebase/auth'

export default {
  actions: {
    async signInWithGoogle({commit, dispatch}) {
      try {
        let provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider)
        const uid = await dispatch('getUid')

        // Получить информацию из Database текущего пользователя
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        // Если нет инфо, создать
        if(!info) {
          const user = firebase.auth().currentUser;
          let array = []
          await  user.providerData.forEach((profile) => {
            array = [profile.providerId, profile.uid, profile.displayName, profile.email, profile.photoURL]
            return array
          })
          await firebase.database().ref(`/users/${uid}/info`).set({
            SignInPprovider: array[0],
            Name: array[2],
            Email: array[3],
            PhotoURL: array[4],
            ProviderSpecificUID: array[1],
          })
        }

        // Получить корзину для ткущего пользователя
        await db.collection('users')
          .doc(uid)
          .get()
          .then(snapshot => {
            const document = snapshot.data()
            // Если нет никаких данных
            if(!document) {
              db.collection('users')
                .doc(uid)
                .set({
                  cartInfo: [],
                  orderInfo: []
                })
              return document
            }
            // Если нет никаких данных-пользователь удалил
            if (document === {}) {
              db.collection('users').doc(uid).set({
                cartInfo: [],
                orderInfo: []
              })
              return document
            }
            return document.cartInfo
          })
        // Проверка администратора
        if(['wH7hb4Zdh9Xqt2RZRMAnJa3Nko23', 'hng6vLzPtTYo5xgiuYyjYpOnijB2', 'HInmvosDanObSDnC2csXiV3iR0A2']
          .some(elem => elem === `${uid}`)) {

          // Получение ТОКЕНА администратора
          // await dispatch('saveMessagingDeviceToken')

          console.log('Администратор вошел!')
          // router.push('/admin')
        }else{
          console.log('Пользователь вошел!')
        }
      }
      catch (e) {
        commit('setError', e)
        throw e
      }

      const userEntrance = !!firebase.auth().currentUser
      const USER_ID = await dispatch('getUid')
      if(userEntrance) {
        const adminEntrance =  await ["wH7hb4Zdh9Xqt2RZRMAnJa3Nko23", "hng6vLzPtTYo5xgiuYyjYpOnijB2","HInmvosDanObSDnC2csXiV3iR0A2"].includes(USER_ID)
        commit('ADMIN_ENTRANCE', adminEntrance)
      }
      commit('USER_ENTRANCE', userEntrance)
    },
    async login({commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name
        })
        await db.collection('users').doc(`${uid}`).set({
          cartInfo: []
        })
        console.log('Пользователь создан!')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    displayName() {
      return firebase.auth().currentUser.displayName
    },
    getProfilePicUrl() {
      return firebase.auth().currentUser.photoURL || '@/assets/images/profile-pic-placeholder.png';
    },
    async userEntrance({commit, dispatch}) {
      const USER_ID = await dispatch('getUid')
      const userEntrance =  !!firebase.auth().currentUser
      if(userEntrance) {
        const adminEntrance =  await ["8VcWFEfj1KYYs06GiR7dR6XpTLS2", "wH7hb4Zdh9Xqt2RZRMAnJa3Nko23", "hng6vLzPtTYo5xgiuYyjYpOnijB2", "HInmvosDanObSDnC2csXiV3iR0A2"].includes(USER_ID)
        commit('ADMIN_ENTRANCE', adminEntrance)
      }
      commit('USER_ENTRANCE', userEntrance)
    },
    async USER_ID_ACTIONS({commit}) {
      const user = firebase.auth().currentUser
      const userID = user ? user.uid : null
      if(userID) {
        commit('USER_ID_ENTRANCE', userID)
      } else {
        console.log('Незарегестрированый пользователь')
      }
    },
    async logout({commit}) {
      await firebase.auth().signOut()
        .then(() => {
          const userEntrance = !!firebase.auth().currentUser
          commit('USER_ENTRANCE', userEntrance)
        })
    }
  }
}
