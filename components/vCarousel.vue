<template>
  <v-app>
    <div class="wrapper">
      <div class="v-carouselImage" :style="{ 'margin-left': '-' + (100 * currentSlideIndex) + '%' }">
        <v-carousel-item
          v-for="item in carousel_data"
          :key="item.id"
          :item_data="item"
          :width="300"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
        </v-carousel-item>
      </div>
      <div
        v-if="carousel_data.length > 1"
        class="text-center">
        <v-btn
          class="ma-2"
          tile
          outlined
          style="color: green"
          @click="prevSlide">
          <v-icon left>mdi-chevron-left</v-icon> Назад
        </v-btn>
        <v-btn
          class="ma-2"
          tile
          outlined
          style="color: green"
          @click="nextSlide">
          <v-icon left>mdi-chevron-right</v-icon> Вперед
        </v-btn>
      </div>
    </div>
  </v-app>

</template>

<script>
  import vCarouselItem from '~/components/vCarouselItem.vue'

  export default {
    name: "vCarousel",
    data: () => ({
      currentSlideIndex: 0
    }),
    components: {
      vCarouselItem
    },
    methods: {
      prevSlide() {
        if(this.currentSlideIndex > 0) {
          this.currentSlideIndex--
        }
      },
      nextSlide() {
        if(this.currentSlideIndex >= this.carousel_data.length - 1) {
          this.currentSlideIndex = 0
        } else
          this.currentSlideIndex++
      }
    },
    props: {
      carousel_data: {
        type: Array,
        default: () => []
      }
    },
  }
</script>

<style lang="scss">
  .wrapper {
    margin: 0 auto;
    max-width: 300px;
    overflow: hidden;
  }
  .v-carouselImage {
    display: flex;
    transition: all ease .5s;
  }
</style>
