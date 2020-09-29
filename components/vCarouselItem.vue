<template>
  <div class="v-carousel-item">
    <slot>
      <img
        loading="lazy"
        style="width: 300px;"
        :src="(item_data)" alt=""
      >
    </slot>
  </div>
</template>

<script>
  export default {
    name: "vCarouselItem",
    data: () => ({

    }),
    props: {
      item_data: {
        type: String,
        default: () => ''
      }
    },
  }
</script>
