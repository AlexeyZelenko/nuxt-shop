<template>
  <section class="v-catalog">
    <template>
      <div
        v-if="GET_ADMIN_ENTRANCE"
        class="v-catalog__link_to_cart"
        style="justify-content: center;"
      >
        <v-card
          flat
        >
          <v-btn
            @click="adminPlusLogin"
            class="ma-2"
            fab
            outlined
            small
            style="color: #3e9538">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
          <v-btn
            :to="{name: 'cabinetUser'}"
            class="my-2"
            outlined
            style="background-color: #3e9538; color: white; cursor: pointer"
            tile
          >
            <v-icon left>mdi-account-circle</v-icon>
            Кабинет
          </v-btn>
          <v-btn
            :to="{name: 'cart'}"
            class="ma-2"
            outlined
            style="background-color: #3e9538; color: white; cursor: pointer"
            tile
          >
            <v-chip
              close-icon="mdi-heart"
              style="background-color: #3e9538; color: white; cursor: pointer"
            >
              <v-avatar
                class="darken-4"
                left
                style="background-color: #0a4506;"
              >
              </v-avatar>
              Корзина
            </v-chip>
          </v-btn>
        </v-card>
      </div>
    </template>
    <div>
      <div>
<!--		ВХОД ЧЕРЕЗ ГУГЛ АККАУНТ-->
        <template>
          <div
            class="text-center"
          >
            <v-btn
              @click="signInWithGoogle"
              rounded
              style="background-color: darkgreen; color: white"
              v-if="!userEntrance"
            >
              Войти через Google
            </v-btn>
            <v-btn
              @click="logout"
              v-if="userEntrance"
            >
              Выйти
            </v-btn>
          </div>
        </template>
<!--Отображение пользователя-->
        <div
          class="v-carousel-item"
          v-if="userEntrance">
          <slot>
            <img
              :src="(getProfilePicUrl)"
              alt=""
              id="user-pic"
            >
          </slot>
        </div>
        <div
          id="user-name"
          v-if="userEntrance"
        >{{getUserName}}
        </div>
<!--        Категории-->
        <v-row class="Change_categories">
          <v-select
            :options="categories"
            :selected="selected"
            @select="sortByCategories"
            style="z-index: 3"
          />
        </v-row>
<!--Отображение каталога-->
        <div class="v-catalog__list">
          <vCatalogItem
            v-for="product in filteredProducts"
            :key="product.article"
            :product_data="product"
            @productClick="productClick"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import vCatalogItem from '~/components/vCatalogItem.vue'
  import vSelect from '~/components/vSelect.vue'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    components: {
      vCatalogItem,
      vSelect
    },
    data() {
      return {
        categories: [
          {name: 'Все', value: 'All'},
          {name: 'Ветровки', value: 'Windbreaker'},
          {name: 'Пальто', value: 'Coat'},
          {name: 'Плащи', value: 'Raincoats'},
          {name: 'Джинсы', value: 'Jeans'},
          {name: 'Брюки', value: 'Pants'},
          {name: 'Кофты', value: 'Sweatshirts'},
          {name: 'Футболки', value: 'T-shirts'},
          {name: 'Рубашки', value: 'Shirts'},
          {name: 'Блузки', value: 'Blouses'},
          {name: 'Платья', value: 'Dresses'},
          {name: 'Костюмы', value: 'Costumes'},
          {name: 'Куртки', value: 'Jackets'},
        ],
        selected: 'Категории',
        sortedProducts: [],
    //     minPrice: 0,
    //     maxPrice: 1000,
      }
    },
    methods: {
      ...mapActions([
        'readFromFirestore'
    //     'userEntrance',
      ]),
      async signInWithGoogle() {
        try {
          await this.$store.dispatch('signInWithGoogle')
        } catch (e) {
          console.log('Ошибка входа Google')
        }
      },
      adminPlusLogin() {
        console.log(this.GET_ADMIN_ENTRANCE)
        if (this.GET_ADMIN_ENTRANCE) {
          this.$router.push('admin')
        } else {
          this.$router.push('index')
        }
      },
      async logout() {
        await this.$store.dispatch('logout')
      },
      productClick(article) {
        this.$router.push({name: 'product', query: {'product': article}})
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
      this.readFromFirestore()
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'GET_ADMIN_ENTRANCE'
      ]),
      userEntrance() {
        return this.$store.state.userEntrance
      },
      getUserName() {
        return this.$fireAuthObj().currentUser.displayName;
      },
      getProfilePicUrl() {
        return this.$fireAuthObj().currentUser.photoURL || '@/assets/images/profile_placeholder.png';
      },
      filteredProducts() {
        if (this.sortedProducts.length) {
          return this.sortedProducts
        } else {
          console.log(this.PRODUCTS)
          return this.PRODUCTS
        }
      }
    },
  }
</script>

<style lang="scss">

  #user-pic {
    top: -3px;
    position: relative;
    display: inline-block;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    background-size: 40px;
    border-radius: 20px;
  }

  #user-name {
    font-size: 15px;
    line-height: normal;
    padding-right: 5px;
    padding-left: 5px;
  }

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

    &__link_to_cart {
      top: 5px;
      right: 3px;
    }

    &__link_to_admin {
      top: 5px;
      left: 3px;
      border: thick #0a4506;
    }
  }
</style>

