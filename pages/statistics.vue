<template>
  <v-card
    max-width="100%"
    class="mx-auto"
  >
    <v-system-bar
      color="pink darken-2"
      dark
    >
    </v-system-bar>

    <v-app-bar
      dark
      color="pink"
    >

      <v-toolbar-title>Статистика</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                <v-card-action>
                  <v-btn
                    v-if="item.artist === 'Ellie Goulding'"
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="40px"
                    right
                    width="40px"
                  >
                    <v-icon>mdi-play</v-icon>
                  </v-btn>

                  <v-btn
                    v-else
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    :href = "item.href"
                    style="margin-bottom: 10px"
                  >
                    Подробнее
                  </v-btn>
                </v-card-action>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    layout: 'admin',
    name:'statistics',
    data: () => ({
      items: [
        {
          color: '#955121',
          // src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Обзор пользователей',
          artist: 'Обзор посещений пользователей',
          href: "https://analytics.google.com/analytics/web/#/p247599057/reports/dashboard?params=_u..nav%3Dga1-experimental%26_u..pageSize%3D25&r=users-overview"

        },
        {
          color: '#1F7087',
          // src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Обзор демографических данных',
          artist: 'Пользователи по странам и городам',
          href: "https://analytics.google.com/analytics/web/#/p247599057/reports/dashboard?params=_u..nav%3Dga1-experimental%26_u..pageSize%3D25&r=demographics"

        },
        {
          color: '#952175',
          // src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Поведение пользователей',
          artist: 'Обзор поведения пользователей',
          href: "https://analytics.google.com/analytics/web/#/p247599057/reports/dashboard?params=_u..nav%3Dga1-experimental%26_u..pageSize%3D25&r=behavior-overview"

        },
      ],
    }),
  }
</script>
