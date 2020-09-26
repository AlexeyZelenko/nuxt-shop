// import { db } from '~/plugins/firebase.js'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import getters from './getters/getters'

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

export const actions = () => ({
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
    const user = firebase.auth().currentUser;
    const userOnlain = user.providerData[0]
    commit('LIST_USERS', userOnlain)
  },
  LOCALIZE({commit}, loc) {
    commit('CHANGE_LOCALE', loc)
  },
  FIREBASE({commit}, message) {
    commit('FIREBASE_MUTATIONS', message)
  },
})
