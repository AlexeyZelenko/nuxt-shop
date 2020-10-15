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
  // import vSelect from '~/components/vSelect.vue'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    asyncData() {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve({name: 'world'})
        }, 1000)
      })
    },
    components: {
      vCatalogItem: process.browser ? () => import('~/components/vCatalogItem.vue') : null,
      'vSelect': () => import('~/components/vSelect.vue'),
      // vCatalogItem,
      // vSelect,
    },

    data() {
      return {
        isActive: false,
        categories: [
          {name: 'Станки', value: 'Machine_tools'},
          {name: 'Котлы', value: 'Boilers'},
          {name: 'Статьи', value: 'Articles'},
          {name: 'Услуги', value: 'Services'},
          {name: 'Контакты', value: 'Contacts'},
          {name: 'О нас', value: 'About'},
        ],
        selected: 'Категории',
        sortedProducts: [],
      }
    },
    methods: {
      ...mapActions([
        'readFromFirestore',
        'userEntrance',
        'USER_ID_ACTIONS',
      ]),
      productClick(id) {
        this.$router.push({name: 'product', query: {'product': id}})
      },
      sortByCategories(category) {
        this.sortedProducts = [];
        this.PRODUCTS.map((item) => {
          if (item.category === category.name) {
            this.sortedProducts.push(item);
          }
        })
        this.selected = category.name
      },
    },
    mounted() {
      this.USER_ID_ACTIONS()
      this.userEntrance()
      this.readFromFirestore()
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'User_Entrance',
        'USER_ID',
      ]),
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

