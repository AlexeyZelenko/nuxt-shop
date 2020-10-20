<template>
  <v-app id="inspire">
    <v-card
      class="mx-auto overflow-hidden"
      width="100%"
    >
      <v-app-bar
        color="deep-purple accent-4"
        dark
        prominent
      >
        <v-btn
          :to="{name: 'index'}"
          icon
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title>Администратор</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
            v-model="group"
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.value"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-card-text>
        <nuxt/>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Статистика', icon: 'mdi-view-dashboard', value: 'statistics'},
        { title: 'Объявления', icon: 'mdi-forum', value: 'admin' },
        { title: 'Помощь', icon: 'mdi-gavel', value: 'Help' },
      ],
      drawer: false,
      group: null,
    }),
    methods: {
      productClick(article) {
        this.$router.push({name: 'product', query: {'product': id}})
      },
    },
    watch: {
      group() {
        this.drawer = false
      },
    },
  }
</script>

