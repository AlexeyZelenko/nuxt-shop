<template>
  <v-app >
  <div id="app" style="display: flex;
	flex-direction: column;
	min-height: 100%;">
    <template>
      <div>
        <v-toolbar
          dark
          prominent
          src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Теплосервис</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-export</v-icon>
          </v-btn>
        </v-toolbar>
      </div>
    </template>
    <div>
      <nuxt/>
    </div>
    <div>
      <template>
        <v-footer
          color="primary lighten-1"
          padless
          class="mx-auto"
          absolute
        >
          <v-row
            justify="center"
            no-gutters
          >
            <v-btn
              v-for="link in links"
              :key="link"
              color="white"
              text
              rounded
              class="my-2"
            >
              {{ link }}
            </v-btn>
            <v-col
              class="primary lighten-2 py-4 text-center white--text"
              cols="12"
            >
              {{ new Date().getFullYear() }} — <strong>Теплосервис</strong>
            </v-col>
          </v-row>
        </v-footer>
      </template>
    </div>
  </div>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'О нас',
        'Услуги',
        'Контакты',
      ],
    }),
  }
</script>

