import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Swal from 'sweetalert2'

export default () => ({
  adminEntrance: false,
  authUser: null,
  userEntrance: false,
  error: null,
  Products: [],
  userId: null,
  listUsers: [],
  Users: [],
  InfoUser: [],
  user: null,

})
