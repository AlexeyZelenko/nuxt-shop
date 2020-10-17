import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Swal from 'sweetalert2'

export default {
  GET_PRODUCT_FROM_DB: state => state.Products,
  PRODUCTS: state => state.Products,
  USER_ID: state => state.userId,
  LOCALE_CHANGE: state => state.locale,
  User_Entrance: state => state.userEntrance,
  GET_LIST_USERS: state => state.listUsers,
  GET_ADMIN_ENTRANCE: state => state.adminEntrance,
  GET_InfoUser: state => state.InfoUser,
  locale: s => s.locale,
  error: s => s.error
}
