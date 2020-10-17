<template>
  <div class="z-product-information">
    <h2
      style="margin: 10px 0; text-align: center">{{product.name}}
    </h2>
    <template>
      <v-row justify="center">
        <v-carousel
          style="margin: 10px auto 10px; max-width: 500px;"
          progress
          show-arrows-on-hover
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <v-carousel-item
            v-for="(item,i) in product.arrayImages"
            :key="i"
            :src=item
            lazy-src="https://picsum.photos/id/11/100/60"
            class="grey lighten-2"
          >
          </v-carousel-item>
        </v-carousel>
      </v-row>
    </template>

    <div class="video"
         v-if="product.video"
         v-html="product.video"
    ></div>

    <template>
      <v-chip
        v-if="product.price"
        :color="getColor(product.price)"
        dark
      >
        Цена: {{product.price}} грн
      </v-chip>
    </template>

    <p>Описание:</p>
    <p
      v-html="product.description"
      :style="[{fontSize: product.fontSize}, {['background-color']: product.background_color}]"
    ></p>

    <p>Контактное лицо: {{product.name_contact}}</p>
    <p>Контакты: {{product.telephone_contact}}</p>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    layout: 'back_catalog',
    name: "zProductInformation",
    data: () => ({
    }),
    methods: {
      ...mapActions([
        'bindCountDocument'
      ]),
      getColor(price) {
        if (price < 500) return 'red'
        else if (price > 500 && price < 1000 ) return 'orange'
        else if (price > 1000 && price < 2000 ) return 'cyan'
        else if (price > 2000 && price < 3000 ) return 'purple'
        else if (price > 3000) return 'blue'
        else return 'green'
      },
    },
    mounted() {
      this.bindCountDocument()
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

    iframe {
      max-width: 100%;
      max-height: 400px;
      margin: 0 auto;
    }
  }
</style>
