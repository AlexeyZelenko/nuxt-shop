<template>
  <div class="z-product-information">
    <v-carousel
      :carousel_data="product.arrayImages"
    />

    <p>Цена: {{product.price}} грн</p>
    <p>Описание:</p>
    <p v-html="product.description"></p>

    <p>Артикль товара: {{product.article}}</p>

    <p>Контактное лицо: {{product.name_contact}}</p>
    <p>Контакты: {{product.telephone_contact}}</p>



  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import vCarousel from '~/components/vCarousel.vue'

  export default {
    layout: 'back_catalog',
    name: "zProductInformation",
    data: () => ({
      // dialog: false,
    }),
    components: {
      vCarousel
    },
    methods: {
      ...mapActions([
        'readFromFirestore'
      ]),
    },
    mounted() {
      this.readFromFirestore()
    },
    computed: {
      ...mapGetters([
        'PRODUCTS'
      ]),
      product() {
        let result = {}
        console.log('this.PRODUCTS', this.PRODUCTS)
        this.PRODUCTS.map((item) =>  {
          if (item.article === +this.$route.query.product) {
            result = item;
          }
        })
        return result;
      },
    },
  }
</script>

<style lang="scss">
  .z-product-information {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;

    &_image {
      width: 300px;
    }
  }
</style>
