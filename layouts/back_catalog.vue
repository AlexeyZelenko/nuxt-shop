<template>
  <v-app>
    <div class="z-product-information">
      <template>
        <v-btn
          aria-label="Left Go"
          :to="{name: 'index'}"
          block
          style="background-color: green; color: whitesmoke; margin-bottom: 19px"
        >
          <v-icon dark left>mdi-arrow-left</v-icon>
          Каталог товаров
        </v-btn>
<!--        <Share-->
<!--        :path="this.$route.fullPath"-->
<!--        />-->
      </template>

      <nuxt/>

    </div>
  </v-app>
</template>

<script>

  export default {
    components: {
      // 'Share': () => import('~/components/ShareNetwork.vue'),
    },
    data: () => ({})
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

  .main-content {
    margin: 30px 0;
  }
</style>
