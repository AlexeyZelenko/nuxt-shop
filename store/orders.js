// import { db } from '~/plugins/firebase.js';
import Swal from 'sweetalert2'
import 'firebase/auth'

export default {
  actions: {
    async LIST_ORDERS_USERS({commit, dispatch}) {
      const result = await dispatch('userbindLocationsRef')
      const listOrderInfoUsers = result.filter(item => item.orderInfo)
      const listOrderInfoUsersMap = listOrderInfoUsers.map(item => item.orderInfo)
      let result3 = []
      for (let i = 0; listOrderInfoUsersMap.length > i; i++) {
        let result2 = []
        for (let c = 0; listOrderInfoUsersMap[i].length > c; c++) {
          let a = listOrderInfoUsersMap[i][c]
          result2.push(a)
        }
        result3.push(...result2)
      }
      commit('LIST_ORDER_USER', result3)
    },
    async ORDER_USER({dispatch}, promises, date = new Date()) {
      const uid = await dispatch('getUid')
      if (uid) {
        const user = await db.collection('users')
          .doc(uid)
          .get()
          .then(snapshot => {
            const document = snapshot.data()
            return document
          })
        await db.collection('users')
          .doc(uid)
          .set({
            ...user,
            orderInfo: [...user.orderInfo, ...promises]
          })
          .then(() => {
            Swal.fire('В ближайшее время Вам перезвонит менеджер, чтоб уточнить способ оплаты')
          })
        await db.collection('messages')
          .add({
            order: promises,
            user: `${uid}`,
            createdAt: date
          })
          .then(() => {
            console.log('Заказ добавлен в архив')
          })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ой...',
          text: `Вы не можете сделать заказ. Зарегестртруйтесь через Google Аккаунт!`,
          footer: '<a href="https://accounts.google.com/signup/v2/webcreateaccount?service=orkut&continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1&hl=ru&flowName=GlifWebSignIn&flowEntry=SignUp">Как создать аккаунт Google?</a>',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Войти!',
          cancelButtonText: 'Отмена'
        }).then((result) => {
          if (result.value) {
            dispatch('signInWithGoogle')
          }
        })
      }
    }
  }
}
