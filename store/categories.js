import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  categories: [
    {name: 'Станки', value: 'Machine_tools'},
    {name: 'Котлы', value: 'Boilers'},
    {name: 'Статьи', value: 'Articles'},
    {name: 'Услуги', value: 'Services'},
    {name: 'Контакты', value: 'Contacts'},
    {name: 'О нас', value: 'About'},
  ],
  sortedProducts: [],
  selected: 'Категории',
  Products: [],
})

export const mutations = {
  FIREBASE_PRODUCTS: (state, data) => {
    state.Products = data
  },
  SORT_PRODUCTS: (state, sortedProducts) => {
    state.sortedProducts = sortedProducts
  },
  SELECT_PRODUCTS: (state, selected) => {
    state.selected = selected
  },
}

export const actions = {
bindCountDocument: firestoreAction(async function ({ commit,bindFirestoreRef }) {
    const ref = this.$fireStore
      .collection('products')
    await bindFirestoreRef('Products', ref, { wait: true }).then(documents => {
      // commit('LAST_DOC', documents[documents.length - 1]);
      commit('FIREBASE_PRODUCTS', documents)
    });
  }),
// async readFromFirestore({commit}) {
//   const promises = []
//   await this.$fireStore.collection("products")
//     .get()
//     .then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//         const data = doc.data()
//         promises.push(
//           data
//         )
//       })
//     })
//   const ProductsAll = await Promise.all(promises)
//   commit('FIREBASE_PRODUCTS', ProductsAll)
// },

async sortByCategories({commit, getters, dispatch}, category) {

    await dispatch('bindCountDocument')

    const PRODUCTS = await getters.getProducts

    const sortedProducts = [];
    await PRODUCTS.map((item) => {
      if (item.category === category.name) {
        sortedProducts.push(item);
      }
    })
    const selected = category.name
    commit('SORT_PRODUCTS', sortedProducts)
    commit('SELECT_PRODUCTS', selected)
  },
}

export const getters = {
  getProducts(state){
    return state.Products
  }
}
