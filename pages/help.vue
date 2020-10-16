<template>
  <v-card
    max-width="100%"
    class="mx-auto"
  >
    <v-app-bar
      dark
      color="green"
    >
      <v-toolbar-title>Помощь</v-toolbar-title>
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

                <v-btn
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  :href = "item.href"
                  style="margin-bottom: 10px"
                >
                  Перейти
                </v-btn>
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
    name:'Help',
    data: () => ({
      items: [
        {
          color: '#754172',
          title: 'Сжатие фото',
          artist: 'Редактирование фото перед загрузкой',
          href: "https://squoosh.app/index.html"

        },
        {
          color: '#cb5c30',
          title: 'Объявления на Flagma',
          artist: 'Объявления в Украине от Теплосервис на сайте Flagma',
          href: "https://cherkassy.flagma.ua/282731/obyavleniya.html"

        },
      ],
    }),
  }
</script>
