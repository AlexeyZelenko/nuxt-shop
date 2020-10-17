import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Swal from 'sweetalert2'

export default {
  ...vuexfireMutations,
  FIREBASE_PRODUCTS2: (state, documents) => {
    state.Products = documents
  },
  FIREBASE_MUTATIONS: (state, message) => {
    state.products = message
  },
  setError(state, error) {
    state.error = error
  },
  USER_ENTRANCE: (state, userEntrance) => {
    state.userEntrance = userEntrance;
  },
  USER_ID_ENTRANCE: (state, userID) => {
    state.userId = userID;
  },
  LIST_USERS: (state, userOnlain) => {
    state.listUsers = userOnlain;
  },
  ADMIN_ENTRANCE: (state, adminEntrance) => {
    state.adminEntrance = adminEntrance;
  },
  USER_INFO: (state, info) => {
    state.InfoUser = info;
  },
}
