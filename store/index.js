// import { db } from '~/plugins/firebase.js'
import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import getters from '~/store/getters'

Vue.use(Vuex)


export const state = () => ({
  locale: 'ru-RU',
  error: null,
  Products: [],
  cartUser: [],
  userEntrance: false,
  userId: null,
  listUsers: [],
  orderUser: [],
  Users: [],
  ordersUSERS: [],
  adminEntrance: false,
  InfoUser: [],
})

export const mutations = {
  ...vuexfireMutations,
  CHANGE_LOCALE: (state, loc) => {
    state.locale = loc;
  },
  FIREBASE_MUTATIONS: (state, message) => {
    state.products = message
  },
  setError(state, error) {
    state.error = error
  },
  CART_USER: (state, cartUser) => {
    state.cartUser = cartUser;
  },
  USER_ENTRANCE: (state, userEntrance) => {
    state.userEntrance = userEntrance;
  },
  USER_ID_ENTRANCE: (state, userID) => {
    state.userId = userID;
  },
  LIST_USERS: (state, listUsers) => {
    state.listUsers = listUsers;
  },
  ORDER_USER: (state, orderUser) => {
    state.orderUser = orderUser;
  },
  LIST_ORDER_USER: (state, result3) => {
    state.ordersUSERS = result3;
  },
  ADMIN_ENTRANCE: (state, adminEntrance) => {
    state.adminEntrance = adminEntrance;
  },
  USER_INFO: (state, info) => {
    state.InfoUser = info;
  },
}

export const actions = {
  getUid() {
    const user = new this.$fireAuthObj().currentUser
    return user ? user.uid : null
  },
  async signInWithGoogle({commit, dispatch}) {
    try {
      const provider = new this.$fireAuthObj.GoogleAuthProvider()
      await this.$fireAuthObj().signInWithPopup(provider)
      const uid = await dispatch('getUid')


      // Получить информацию из Database текущего пользователя
      const info = (await this.$fireDbObj().ref(`/users/${uid}/info`).once('value')).val()
      // Если нет инфо, создать
      console.log('1',info)
      if(!info) {
        const user = this.$fireAuthObj().currentUser;
        console.log('2', user)
        let array = []
        await  user.providerData.forEach((profile) => {
          array = [profile.providerId, profile.uid, profile.displayName, profile.email, profile.photoURL]
          return array
        })
        await this.$fireDbObj().ref(`/users/${uid}/info`).set({
          SignInPprovider: array[0],
          Name: array[2],
          Email: array[3],
          PhotoURL: array[4],
          ProviderSpecificUID: array[1],
        })
      }

      // Получить корзину для ткущего пользователя
      await this.$fireStore.collection('users')
        .doc(uid)
        .get()
        .then(snapshot => {
          const document = snapshot.data()
          // Если нет никаких данных
          if(!document) {
            this.$fireStore.collection('users')
              .doc(uid)
              .set({
                cartInfo: [],
                orderInfo: []
              })
            return document
          }
          // Если нет никаких данных-пользователь удалил
          if (document === {}) {
            this.$fireStore.collection('users').doc(uid).set({
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

    const userEntrance = !!this.$fireAuthObj().currentUser
    const USER_ID = await dispatch('getUid')
    if(userEntrance) {
      const adminEntrance =  await ["wH7hb4Zdh9Xqt2RZRMAnJa3Nko23", "hng6vLzPtTYo5xgiuYyjYpOnijB2","HInmvosDanObSDnC2csXiV3iR0A2"].includes(USER_ID)
      commit('ADMIN_ENTRANCE', adminEntrance)
    }
    commit('USER_ENTRANCE', userEntrance)
  },
  async logout({commit}) {
    await this.$fireAuthObj().signOut()
      .then(() => {
        const userEntrance = !!this.$fireAuthObj().currentUser
        commit('USER_ENTRANCE', userEntrance)
      })
  },
  bindLocationsRef: firestoreAction(context => {
    // context contains all original properties like commit, state, etc
    // and adds `bindFirestoreRef` and `unbindFirestoreRef`
    // we return the promise returned by `bindFirestoreRef` that will
    // resolve once data is ready
    return context.bindFirestoreRef('Products', db.collection('products'))
  }),
    userbindLocationsRef: firestoreAction(context => {
    return context.bindFirestoreRef('Users', db.collection('users'))
  }),
    async list_Users({commit}) {
    const user = this.$fireAuthObj().currentUser;
    const userOnlain = user.providerData[0]
    commit('LIST_USERS', userOnlain)
  },
  LOCALIZE({commit}, loc) {
    commit('CHANGE_LOCALE', loc)
  },
  FIREBASE({commit}, message) {
    commit('FIREBASE_MUTATIONS', message)
  },
  displayName() {
    return this.$fireAuthObj().currentUser.displayName
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
}

export default {
  getters
}
