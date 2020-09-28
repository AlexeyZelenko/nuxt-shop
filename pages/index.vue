<template>
  <section class="v-catalog">
    <template>
      <div
        class="v-catalog__link_to_cart"
        style="justify-content: center;"
      >
        <v-card
          flat
        >
          <v-btn
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
      <!--		ВХОД ЧЕРЕЗ ГУГЛ АККАУНТ-->
      <div>
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
    //     placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    //     observer: null,
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
    //     messages: []
      }
    },
    methods: {
    //   ...mapActions([
    //     'ADD_TO_CART',
    //     'VIEW_CART_USER',
    //     'userEntrance',
    //     'USER_ID_ACTIONS'
    //   ]),
    //   onElementObserved(entries) {
    //     entries.forEach(({target, isIntersecting}) => {
    //       if (!isIntersecting) {
    //         return;
    //       }
    //       this.observer.unobserve(target);
    //
    //       setTimeout(() => {
    //         const i = target.getAttribute("data-index");
    //         this.filteredProducts[i].seen = true;
    //         target.src = this.filteredProducts[i].arrayImages[0]
    //
    //         target.onload = () => {
    //           target.parentNode.classList.remove('loading');
    //         };
    //       })
    //     });
    //   },
    //   adminPlusLogin() {
    //     if (this.GET_ADMIN_ENTRANCE) {
    //       this.$router.push('/admin')
    //     } else {
    //       this.$router.push('/login')
    //     }
    //   },
      async signInWithGoogle() {
        try {
          await this.$store.dispatch('signInWithGoogle')
          // this.VIEW_CART_USER()
        } catch (e) {
          console.log('Ошибка входа Google')
        }
      },
      async logout() {
        await this.$store.dispatch('logout')
      },
      // productClick(article) {
      //   this.$router.push({name: 'product', query: {'product': article}})
      // },
      sortByCategories(category) {
        this.sortedProducts = [];
        this.PRODUCTS.map((item) => {
          if (item.category === category.name) {
            this.sortedProducts.push(item);
          }
        })
        this.selected = category.name
      },
    //   addToCart(data) {
    //     this.ADD_TO_CART(data)
    //       .then(() => {
    //         this.VIEW_CART_USER()
    //       })
    //   },
    // },
    // created() {
    //   this.userEntrance()
    //   this.observer = new IntersectionObserver(
    //     this.onElementObserved,
    //     {
    //       root: this.$el,
    //       threshold: 0.5,
    //     }
    //   );
    // },
    // beforeDestroy() {
    //   this.observer.disconnect();
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
    //     'GET_CART_USER',
    //     'User_Entrance',
    //     'USER_ID',
    //     'GET_ADMIN_ENTRANCE'
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
          return this.PRODUCTS
        }
      }
    },
    // mounted() {
    //   this.VIEW_CART_USER()
    //   this.USER_ID_ACTIONS()
    // }
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

