<template>
  <v-card
    class="mx-auto"
    max-width="100%"
    margin-bottom="100px"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Компания  «Теплосервис» предлагает Вам широкий ассортимент товаров и предоставляемых услуг.
    </v-card-title>

    <v-card-subtitle>
      Мы всегда рады Вам помочь!
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        @click="show = !show"
        color="orange lighten-2"
        text
      >
        Наши услуги
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text
          height="200px"
          v-html="message"
        >

        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      message: `<h2>
          1) Изготовление и продажа станков для сетки «Рабица».</br></br>

          2) Продажа сетки «Рабица».</br></br>

          3) Изготовление и продажа вибростанков.</br></br>

          4) Изготовление и продажа вибростолов.</br></br>

          5) Продажа, монтаж газового и отопительного оборудования.</br></br>

          6) Бесплатная консультация по ремонту и установке  газ. котлов, колонок, конвекторов.</br></br>

          7) Загильзовка дымоходов и продажа вент. и дым. труб (нержавейка, оцинковка).</br></br>

          8) Ремонт газовых котлов, колонок, конвекторов.</br></br>

          9) Монтаж твердотоплевных котлов.</br></br>

          10) Установка счетчиков воды.</br></br>

          11) Установка счетчиков газа.</br></br>

          12) Монтаж газопровода.</br></br>

          13) Монтаж бойлеров.</br></br>

          14) Ремонт газовых котлов.</h2>`,
      show: false,
    }),
  }
</script>
