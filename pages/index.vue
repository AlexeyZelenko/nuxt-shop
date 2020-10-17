<template>
  <section class="v-catalog">
    <div>
      <div>
        <!--        Категории-->
        <v-row class="Change_categories">
          <v-select
            :options="categories"
            :key="name"
            :selected="selected"
            @select="sortByCategories"
            style="z-index: 3"
          />
        </v-row>
        <!--Отображение каталога-->
        <div class="v-catalog__list">
          <vCatalogItem
            :product_data="product"
            @productClick="productClick"
            v-for="product in filteredProducts"
            :key="product.id"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    asyncData() {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve({name: 'world'})
        }, 1300)
      })
    },
    components: {
      vCatalogItem: process.browser ? () => import('~/components/vCatalogItem.vue') : null,
      'vSelect': () => import('~/components/vSelect.vue'),
    },

    data() {
      return {
        isActive: false,
      }
    },
    methods: {
      ...mapActions([
        'bindCountDocument',
        'readFromFirestore',
        'userEntrance',
        'USER_ID_ACTIONS',
      ]),
      productClick(id) {
        this.$router.push({name: 'product', query: {'product': id}})
      },
      sortByCategories(category) {
        this.$store.dispatch('categories/sortByCategories', category)
      },
      // sortByCategories(category) {
      //   const sortedProducts = [];
      //   this.PRODUCTS.map((item) => {
      //     if (item.category === category.name) {
      //       sortedProducts.push(item);
      //       this.$store.commit('categories/SORT_PRODUCTS', sortedProducts)
      //     }
      //   })
      //   const selected = category.name
      //   this.$store.commit('categories/SELECT_PRODUCTS', selected)
      // },
    },
    mounted() {
      this.USER_ID_ACTIONS()
      this.userEntrance()
      this.bindCountDocument()
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'User_Entrance',
        'USER_ID',
      ]),
      categories() {
        return this.$store.state.categories.categories
      },
      selected() {
        return this.$store.state.categories.selected
      },
      sortedProducts() {
        return this.$store.state.categories.sortedProducts
      },
      filteredProducts() {
        if (this.sortedProducts.length) {
          return this.sortedProducts
        } else {
          const sortProducts = this.PRODUCTS.filter(item => item.category === 'Станки')
          return sortProducts.sort((a, b) => a.sort > b.sort ? 1 : -1)
        }
      }
    },
  }
</script>

<style lang="scss">

  .Change_categories {
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .v-catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }

  }
</style>

