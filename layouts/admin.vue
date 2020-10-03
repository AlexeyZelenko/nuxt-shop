<template>
  <v-app id="inspire">
  <v-card
    class="mx-auto overflow-hidden"
    width="100%"
  >
    <v-system-bar color="deep-purple darken-3"></v-system-bar>

    <v-app-bar
      color="deep-purple accent-4"
      dark
      prominent
    >
      <v-btn
        icon
        :to="{name: 'index'}"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Администратор</v-toolbar-title>

      <v-spacer></v-spacer>


      <v-btn
        @click.stop="drawer = !drawer"
        icon
      >
        <v-icon>mdi-dots-vertical</v-icon>

      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
    <v-app>
      <nuxt />
    </v-app>
  </v-app>
</template>

<script>

  import {mapActions} from "vuex";

  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
    methods: {
      ...mapActions([
        'readFromFirestore'
        //     'userEntrance',
      ]),
      productClick(article) {
        this.$router.push({name: 'product', query: {'product': id}})
      },
      sortByCategories(category) {
        this.sortedProducts = [];
        this.PRODUCTS.map((item) => {
          if (item.category === category.name) {
            this.sortedProducts.push(item);
          }
        })
        this.selected = category.name
      },
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

