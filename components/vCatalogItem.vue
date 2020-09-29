<template>
  <div
    class="v-catalog-item"
    @click="productClick"
  >
    <div
      v-if="product_data.arrayImages"
    >
      <transition name="fade">
        <img
          style="z-index: 7"
          class="v-catalog-item_image"
          :src="product_data.arrayImages[0]"
          alt="">
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
    <p
      class="v_catalog_item_price"
    >
      Цена : {{product_data.price}} грн
    </p>
    <div class="v-catalog-item_button" style="margin-bottom: 1%;">
      <button
        class="v-catalog-item_show-info"
      >
        Инфо
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-catalog-item",
    data() {
      return {
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
      productClick() {
        this.$emit('productClick', this.product_data.article)
      },
      addToCart() {
        this.$emit('addToCart', this.product_data);
      }
    },
  }
</script>

<style lang="scss">
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
    margin-left: 1px;

    &_image {
      width: 100px;
      justify-content: center;
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
      margin-bottom: 10px;
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
