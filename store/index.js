// import { db } from '~/plugins/firebase.js'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Swal from 'sweetalert2'


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
  FIREBASE_PRODUCTS: (state, data) => {
    state.Products = data
  },
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
  LIST_USERS: (state, userOnlain) => {
    state.listUsers = userOnlain;
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
  bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fireStore
      .collection('products')
    await bindFirestoreRef('Products', ref, { wait: true })
  }),
  async editPRODUCT({}, editProduct) {
    this.isLoading = true
    const File = editProduct.File
    const promises = []
    if (File) {
      for (let i = 0; i < File.length; i++) {

        // Создайте метаданные файла
        let metadata = {
          contentType: 'image/jpeg',
        };
        let nameTime = +new Date()


        const uploadTask = await this.$fireStorage.ref().child('assets/images/' + nameTime + '.jpg').put(File[i], metadata);

        promises.push(
          uploadTask
            .then(snapshot =>
              snapshot.ref.getDownloadURL()
            )
        )
      }
    }
    const URLs = await Promise.all(promises)
    const ArrayOld = await editProduct.arrayImages
    const ArrayFile = [...URLs, ...ArrayOld]
    const id = await editProduct.id

    try {
      await this.$fireStore.doc('products/' + `${id}`)
        .update({
          name: editProduct.name,
          id: editProduct.id,
          seen: editProduct.seen,
          arrayImages: ArrayFile,
          category: editProduct.category,
          article: editProduct.article,
          price: editProduct.price,
          description: editProduct.description,
          adress: editProduct.adress,
          name_contact: editProduct.name_contact,
          telephone_contact: editProduct.telephone_contact,
          })
        .then(() => {
          this.isLoading = false
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ваша работа была сохранена',
            showConfirmButton: false,
            timer: 1500
          })
        })
    } catch (err) {
      console.log(err)
    }
  },
  async deleteRRODUCT({}, item) {
    Swal.fire({
      title: 'Вы уверенны?',
      text: "Вы не сможете восстановить это!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Да, удалить это!'
    })
      .then((result) => {
        if (result.value) {

          const File = item.arrayImages

          if (File) {
            for (let i = 0; i < File.length; i++) {
              let storageRef = this.$fireStorage.ref()
              let nameTime = item.NameImages[i]
              const Ref = storageRef.child('assets/images/' + nameTime)
              Ref.delete().then(function () {
              }).catch(function (error) {
                console.log('удаление фото с всем объявлением' + error)
              })
            }
          }

          const id = item.id
          this.$fireStore.collection("products").doc(`${id}`).delete().then(function() {
            console.log("Документ успешно удален!");
          }).catch(function(error) {
            console.error("Ошибка при удалении документа: ", error);
          });

          Swal.fire(
            'Удаленно!',
            'Ваш продукт удален.',
            'success'
          )
        }
        window.location.reload()
      })
  },
  async readFromFirestore({commit}) {
    const promises = []
    await this.$fireStore.collection("products")
      .get()
      .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const data = doc.data()

        promises.push(
          data
        )
      })
    })
    const ProductsAll = await Promise.all(promises)
    commit('FIREBASE_PRODUCTS', ProductsAll)


    // this.$fireStore.collection("cities").where("capital", "==", true)
    //   .get()
    //   .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    //   });


    // const productRef = this.$fireStore.collection('products').doc('stanki')
    // const productRef = this.$fireStore.doc('products/stanki')
    // try {
    //   await productRef.set({
    //     message: 'Nuxt-Fire with Firestore rocks!'
    //   })
    // } catch (e) {
    //   alert(e)
    //   return
    // }
    // alert('Success.')
    // try {
    //   const productDoc = await productRef.get()
    //   console.log('productDoc.data()', productDoc.data())
      // alert(productDoc.data())
      // commit('LIST_USERS', userOnlain)
    // } catch (e) {
    //   alert(e)
    //   return
    // }
  },
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
      if(!info) {
        const user = this.$fireAuthObj().currentUser;
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
      if(['6XUeVk6rJKcsFvkgIRHcKhWqx523']
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
      const adminEntrance =  await ["6XUeVk6rJKcsFvkgIRHcKhWqx523"].includes(USER_ID)
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
    return this.$fireAuthObj().currentUser.photoURL || '@/assets/images/profile-pic-placeholder.png';
  },
  async userEntrance({commit, dispatch}) {
    const USER_ID = await dispatch('getUid')
    const userEntrance =  !!this.$fireAuthObj().currentUser
    if(userEntrance) {
      const adminEntrance =  await ["6XUeVk6rJKcsFvkgIRHcKhWqx523"].includes(USER_ID)
      commit('ADMIN_ENTRANCE', adminEntrance)
    }
    commit('USER_ENTRANCE', userEntrance)
  },
  async USER_ID_ACTIONS({commit}) {
    const user = this.$fireAuthObj().currentUser
    const userID = user ? user.uid : null
    if(userID) {
      commit('USER_ID_ENTRANCE', userID)
    } else {
      console.log('Незарегестрированый пользователь')
    }
  },
}

export const getters = {
  GET_CART_USER: state => state.cartUser,
  GET_PRODUCT_FROM_DB: state => state.Products,
  PRODUCTS: state => state.Products,
  USER_ID: state => state.userId,
  LOCALE_CHANGE: state => state.locale,
  User_Entrance: state => state.userEntrance,
  GET_LIST_USERS: state => state.listUsers,
  GET_ORDER_USERS: state => state.listAdminUser,
  GET_LIST_ORDER_USERS: state => state.ordersUSERS,
  GET_ADMIN_ENTRANCE: state => state.adminEntrance,
  GET_InfoUser: state => state.InfoUser,
  locale: s => s.locale,
  error: s => s.error
}

export const strict = false


