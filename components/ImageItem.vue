<template>
  <figure
    v-lazyload
    class="image__wrapper"
  >
    <ImageSpinner
      class="image__spinner"
    />
    <img
      class="image__item"
      style="height: 120px"
      :data-url="source"
      alt="random image"
    >
  </figure>
</template>

<script>

  import LazyLoadDirective from "~/directives/LazyLoadDirective"
  export default {
    name: "ImageItem",
    directives: {
      lazyload: LazyLoadDirective
    },
    components: {
      'ImageSpinner': () => import('~/components/ImageSpinner.vue'),
    },
    props: {
      source: {
        type: String,
        required: true
      }
    }
  };
</script>

<style scoped lang="scss">
  .image {
    &__wrapper {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      margin-bottom: 30px;

      &.loaded {
        .image {
          &__item {
            visibility: visible;
            opacity: 1;
            border: 0;
          }

          &__spinner {
            display: none;
            width: 100%;
          }
        }
      }
    }

    &__item {
      width: 100%;
      border-radius: 4px;
      transition: all 0.4s ease-in-out;
      opacity: 0;
      visibility: hidden;
    }


  }


</style>
