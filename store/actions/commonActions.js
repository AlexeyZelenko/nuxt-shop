import Swal from "sweetalert2";
import { vuexfireMutations, firestoreAction } from 'vuexfire'

export default {
  AlertMessageLoading() {
    Swal.fire({
      title: 'Идет загрузка...',
      showConfirmButton: false,
    })
  },
  bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fireStore
      .collection('products')
    await bindFirestoreRef('Products', ref, { wait: true })
  }),
  async editPRODUCT({dispatch}, editProduct) {

    Swal.fire({
      title: "Идет загрузка...",
      text: "",
      imageUrl: "352.gif",
      showConfirmButton: false
    });

    // await dispatch('AlertMessageLoading')
    const File = editProduct.File
    const promises = []
    const promisesName = []

    if (File) {
      for (let i = 0; i < File.length; i++) {

        // Создайте метаданные файла
        let metadata = {
          contentType: 'image/jpeg',
        };
        let nameTime = +new Date()


        // Загрузить файл и метаданные в объект 'assets/images/***.jpg'
        const storageRef  = await this.$fireStorage.ref().child('assets/images/' + nameTime)
        try {
          const snapshot = await storageRef.put(File[i], metadata)
        } catch (e) {
          console.log(e.message)
        }

        try {
          const url = await storageRef.getDownloadURL()
          promises.push(
            storageRef.getDownloadURL()
          )
          promisesName.push(
            nameTime
          )
        } catch (e) {
          console.log(e.message)
        }

      }
    }

    const NameImages = await Promise.all(promisesName)
    const URLs = await Promise.all(promises)
    const ArrayOld = await editProduct.arrayImages
    const NameImagesOld = await editProduct.NameImages
    const ArrayFile = [...URLs, ...ArrayOld]
    const ArrayNameImages = [...NameImages, ...NameImagesOld]
    try {

      await this.$fireStore.doc('products/' + editProduct.id)
        .update({
          fontSize: editProduct.fontSize,
          background_color: editProduct.background_color,
          NameImages: ArrayNameImages,
          video: editProduct.video,
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

          Swal.close()

          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Ваша работа была сохранена',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
    catch (err) {
      Swal.close()
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: 'Ошибка при сохранении!',
        showConfirmButton: false,
        timer: 1500
      })
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

          Swal.fire({
            title: "Идет загрузка...",
            text: "",
            imageUrl: "@/assets/images/352.gif",
            showConfirmButton: false
          });

          const File = item.arrayImages

          if (File) {
            for (let i = 0; i < File.length; i++) {
              let storageRef = this.$fireStorage.ref()
              let nameTime = item.NameImages[i]
              const Ref = storageRef.child('assets/images/' + nameTime)
              Ref.delete().then(function () {
              }).catch(function (error) {
                console.log('удаление фото со всем объявлением' + error)
              })
            }
          }

          const id = item.id
          this.$fireStore.collection("products").doc(`${id}`).delete().then(function() {
            console.log("Документ успешно удален!");

            Swal.close()

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
          const data = doc.data()

          promises.push(
            data
          )
        })
      })
    const ProductsAll = await Promise.all(promises)
    commit('FIREBASE_PRODUCTS', ProductsAll)

  },
  async list_Users({commit}) {
    const user = this.$fireAuthObj().currentUser;
    const userOnlain = user.providerData[0]
    commit('LIST_USERS', userOnlain)
  },
  FIREBASE({commit}, message) {
    commit('FIREBASE_MUTATIONS', message)
  },
}
