<template>
  <div class="v-cart">
    <h1>Корзина</h1>
<!--    <div class="text-center">-->
<!--      <v-btn-->
<!--        @click="userOrder"-->
<!--        dark-->
<!--        rounded-->
<!--        style="background-color: #31c375; margin-bottom: 10px"-->
<!--      >-->
<!--        Заказать-->
<!--      </v-btn>-->
<!--    </div>-->
<!--    <p v-if="!GET_CART_USER.length">{{'There are no products in cart...' | localize }}</p>-->
<!--    <v-cart-item-->
<!--      :cart_item_data="item"-->
<!--      :key="item.article"-->
<!--      @decrement="decrement(item.article)"-->
<!--      @deleteFromCart="deleteFromCart(item.article)"-->
<!--      @increment="increment(item.article)"-->
<!--      v-for="item in newGetCartUser"-->
<!--    />-->
<!--    <div class="v-cart__total">-->
<!--      <p class="total__name">{{'Total:' | localize }} {{cartTotalCost}} грн</p>-->
<!--    </div>-->
  </div>
</template>

<script>
  // const VCartItem = () => import('./v-cart-item')
  import {mapActions, mapGetters} from 'vuex'
  import Swal from 'sweetalert2'

    export default {
      layout: 'back_catalog',
      name: "cart",
      components: {
        // VCartItem
      },
      computed: {
        ...mapGetters([
          'GET_CART_USER'
        ]),
        newGetCartUser() {
          return [...new Set(this.GET_CART_USER)]
        },
        cartTotalCost() {
          return this.GET_CART_USER.reduce((res, item) => res + +item.price, 0)
        },
      },
      created() {
        this.VIEW_CART_USER()
      },
      mounted() {
        setInterval(() => {
          this.date = new Date()
        }, 1000)
      },
      methods: {
        ...mapActions([
          'DELETE_FROM_CART',
          'INCREMENT_CART_ITEM',
          'DECREMENT_CART_ITEM',
          'VIEW_CART_USER',
          'ORDER_USER'
        ]),
        async userOrder() {
          Swal.mixin({
            cancelButtonText: 'Отмена',
            input: 'text',
            confirmButtonText: 'Дальше',
            showCancelButton: true,
            progressSteps: ['1', '2', '3', '4', '5']
          }).queue([
            {
              title: 'Имя:',
              text: 'Ваше имя',
              input: 'text',
            },
            {
              title: 'Телефон:',
              text: 'Чтобы отправить товары нам нужен номер Вашего телефона',
              input: 'text',
            },
            {
              title: 'Адресс',
              text: 'Адресс - Область, Населенный пункт'
            },
            {
              title: '№ отделения',
              text: '№ отделения Новой Почты'
            },
            {
              title: 'Дополнительно...',
              text: 'Дополнительная информация',
              input: 'textarea',
            },
          ]).then((result) => {
            if (result.value) {
              Swal.fire({
                title: 'Все сделано!',
                html: `
															Ваши данные:<br />
															Имя: ${result.value[0]}<br />
															Телефон: ${result.value[1]}<br />
															Адресс: ${result.value[2]}<br />
															№ Новой Почты: ${result.value[3]}<br />
															Дополнительно: ${result.value[4]}<br />
														`,
                confirmButtonText: 'Заказать!'
              })
                .then(() => {
                  let ObjectUserData = {}
                  ObjectUserData.name = result.value[0]
                  ObjectUserData.telephone = result.value[1]
                  ObjectUserData.adress = result.value[2]
                  ObjectUserData.newPost = result.value[3]
                  ObjectUserData.Addition = result.value[4]
                  ObjectUserData.ID = Date.now()
                  ObjectUserData.createdAt = new Date().toLocaleString()
                  ObjectUserData.CART = this.GET_CART_USER
                  ObjectUserData.cartTotalCost = this.cartTotalCost

                  let promises = [ObjectUserData]
                  this.ORDER_USER(promises)
                })
            }
          })
        },
        increment(article) {
          this.INCREMENT_CART_ITEM(article)
            .then(() => {
              this.VIEW_CART_USER()
            })
        },
        decrement(article) {
          this.DECREMENT_CART_ITEM(article)
            .then(() => {
              this.VIEW_CART_USER()
            })
        },
        deleteFromCart(article) {
          this.DELETE_FROM_CART(article)
            .then(() => {
              this.VIEW_CART_USER()
            })
        }
      }
    }
</script>

<style lang="scss">
  .v-cart {
    margin-bottom: 100px;

    &__total {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: $padding*2 $padding*3;
      display: flex;
      justify-content: center;
      background: $green-bg;
      color: #ffffff;
      font-size: 20px;
    }

    .total__name {
      margin-right: $margin*2;
    }
  }
</style>
