<template >
  <div
    @click="productClick"
    class="v-catalog-item"
  >
    <div
      style="height: 50px; overflow-wrap: break-word; margin-bottom: 10px"
    >
      <span
        v-html="product_data.name"
      ></span>
    </div>

    <div
      class="divImage"
      v-if="product_data.arrayImages"
    >
      <ImageItem
        style="margin: 0 auto"
        :source="product_data.arrayImages[0]"
      />

    </div>
    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn
        style="margin: 50px 0 5px"
        absolute
        bottom
        depressed
        color="primary"
      >
        Инфо
      </v-btn>
    </v-row>

  </div>

</template>

<script>
  export default {
    name: "v-catalog-item",
    components: {
      'ImageItem': () => import('~/components/ImageItem.vue'),
    },
    data() {
      return {
        isActive: false,
      }
    },
    props: {
      product_data: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    methods: {
      // lazyLoadImage(e){
      //   let media = e.target.parentNode.querySelectorAll('[data-manual-lazy]');
      //   [...media].forEach(m => this.$lazyLoad(m))
      // },
      productClick() {
        this.$emit('productClick', this.product_data.id)
      },
    },
  }
</script>

<style lang="scss">
  .divImage {
    height: 130px;
    margin: 100px 0 100px;
  }

  .v-catalog-item {
    min-width: 200px;
    text-align: center;
    vertical-align: middle;
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    z-index: 1;
    position: relative;



    &_top {
      text-align: center;
      margin-bottom: $margin*2;
      padding: 0;
    }

    &_bottom {
      text-align: center;
      width: 100%;
      bottom: -1px ;
      margin-top: $margin*2;
    }

    &_show-info {
      z-index: 5;
      padding: 8px 16px;
      margin-bottom: 5px;
      background: darkseagreen;
      color: whitesmoke;
      border: 0;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
    }

  }
</style>
