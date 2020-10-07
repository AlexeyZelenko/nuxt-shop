<template>
  <div
    class="v-catalog-item"
    @click="productClick"
  >
    <div class="v-catalog-item_top">
      <h4>
        {{product_data.name}}
      </h4>
    </div>

    <div
      v-if="product_data.arrayImages"
    >
      <transition name="fade" >
        <ImageItem
          style="z-index: 7"
          :source="product_data.arrayImages[0]"
        />
<!--      <img-->
<!--        style="z-index: 7"-->
<!--        class="v-catalog-item_image"-->
<!--        :src="product_data.arrayImages[0]"-->
<!--        alt="">-->
    </transition>

    </div>
    <p
      v-else
      class="emptyImage"
    >
			<span
        v-html="product_data.description"
      />
    </p>
    <div class="v-catalog-item_bottom">
      <button
        class="v-catalog-item_show-info"
      >
        Инфо
      </button>
    </div>
  </div>
</template>

<script>
  import ImageItem from '~/components/ImageItem.vue'
  export default {
    name: "v-catalog-item",
    components: {
      ImageItem
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
      lazyLoadImage(e){
        let media = e.target.parentNode.querySelectorAll('[data-manual-lazy]');
        [...media].forEach(m => this.$lazyLoad(m))
      },
      productClick() {
        this.$emit('productClick', this.product_data.id)
      },
    },
  }
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  h4 {
    padding: 5px;
  }
  .emptyImage {
    width: 100px;
    height: 300px;
  }

  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    z-index: 1;
    text-align: center;
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

    &_button {
      bottom: 1px ;
      position: absolute;
    }

    .v_catalog_item_new {
      margin-top: -35px;
      position: relative;
      text-align: center;
      z-index: 12;
      top: 45%;
      width: 95%;
      display: flex;
      justify-content: space-between;
      align-items: end;
    }
  }
</style>
