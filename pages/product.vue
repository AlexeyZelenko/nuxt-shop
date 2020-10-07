<template>
  <div class="z-product-information">

    <h2
      style="margin: 10px 0; text-align: center">{{product.name}}</h2>

    <template >
      <v-carousel hide-delimiters style="margin: 10px 0 10px">
        <v-carousel-item
          v-for="(item,i) in product.arrayImages"
          :key="i"
          :src=item
          lazy-src="https://picsum.photos/id/11/100/60"
        ></v-carousel-item>
      </v-carousel>
    </template>

<!--    <v-carousel-->
<!--      v-if="product.arrayImages"-->
<!--      :carousel_data="product.arrayImages"-->
<!--    />-->

    <div class="video"
      v-if="product.video"
      v-html="product.video"
    ></div>

    <p v-if="product.price">Цена: {{product.price}} грн</p>
    <p>Описание:</p>
    <p v-html="product.description"></p>

<!--    <p>Артикль товара: {{product.article}}</p>-->

    <p>Контактное лицо: {{product.name_contact}}</p>
    <p>Контакты: {{product.telephone_contact}}</p>



  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  // import vCarousel from '~/components/vCarousel.vue'

  export default {
    layout: 'back_catalog',
    name: "zProductInformation",
    data: () => ({
      // dialog: false,
    }),
    components: {
      // vCarousel,
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
        this.PRODUCTS.map((item) =>  {
          if (item.id === this.$route.query.product) {
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
    text-align: center;

    &_image {
      width: 300px;
    }

    iframe {
      max-width: 100%;
      max-height: 400px;
      margin: 0 auto;
    }
  }
</style>
