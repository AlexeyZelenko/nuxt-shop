<template>
  <section class="v-catalog">
    <template>
      <div
        class="v-catalog__link_to_cart"
        style="justify-content: center;"
      >
        <v-card
          flat
        >
          <v-btn
            class="ma-2"
            fab
            outlined
            small
            style="color: #3e9538">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
          <v-btn
            :to="{name: 'cabinetUser'}"
            class="my-2"
            outlined
            style="background-color: #3e9538; color: white; cursor: pointer"
            tile
          >
            <v-icon left>mdi-account-circle</v-icon>
            Кабинет
          </v-btn>
          <v-btn
            :to="{name: 'cart'}"
            class="ma-2"
            outlined
            style="background-color: #3e9538; color: white; cursor: pointer"
            tile
          >
            <v-chip
              close-icon="mdi-heart"
              style="background-color: #3e9538; color: white; cursor: pointer"
            >
              <v-avatar
                class="darken-4"
                left
                style="background-color: #0a4506;"
              >
              </v-avatar>
              Корзина
            </v-chip>
          </v-btn>
        </v-card>
      </div>
    </template>
    <div>
      <app-logo/>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style lang="scss">

#user-pic {
  top: -3px;
  position: relative;
  display: inline-block;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  background-size: 40px;
  border-radius: 20px;
}

#user-name {
  font-size: 15px;
  line-height: normal;
  padding-right: 5px;
  padding-left: 5px;
}

.Change_categories {
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-catalog {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  &__link_to_cart {
    top: 5px;
    right: 3px;
  }

  &__link_to_admin {
    top: 5px;
    left: 3px;
    border: thick #0a4506;
  }
}
</style>

