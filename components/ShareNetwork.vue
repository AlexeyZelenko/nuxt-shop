<template>
  <div>
    <div style="position: relative;">
      <v-fab-transition>
        <v-btn
          :key="activeFab.icon"
          :color="activeFab.color"
          absolute
          top
          right
          fab
          style="z-index: 999; color: white"
        @click="hidden = !hidden"
      >
          <v-icon>{{ activeFab.icon }}</v-icon>
  <!--        <v-icon>mdi-share-variant</v-icon>-->
      </v-btn>
      </v-fab-transition>
    </div>
    <div class="icon-bar" v-show="hidden">
      <ShareNetwork
        v-for="network in networks"
        :network="network.network"
        :key="network.network"
        :style="{backgroundColor: network.color}"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :quote="sharing.quote"
        :hashtags="sharing.hashtags"
        :twitterUser="sharing.twitterUser"
      >
        <template>
          <div class="text-center">
            <v-fab-transition>
              <v-btn
                class="mx-2"
                fab
                small
                color="primary"
              >
                <v-icon :class="network.icon"></v-icon>
              </v-btn>
            </v-fab-transition>
          </div>
        </template>
        <!--      <i :class="network.icon"></i>-->
        <!--      <span>{{ network.name }}</span>-->
      </ShareNetwork>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'Share',
    data () {
      return {
        fab: false,
        hidden: false,
        tabs: null,
        sharing: {
          url: 'http://teploservis68.com.ua/',
          title: 'Компания  «Теплосервис» предлагает Вам широкий ассортимент товаров и предоставляемых услуг.',
          description: '1) Изготовление и продажа станков для сетки «Рабица». \n' +
            '\n' +
            '2) Продажа сетки «Рабица». \n' +
            '\n' +
            '3) Изготовление и продажа вибростанков. \n' +
            '\n' +
            '4) Изготовление и продажа вибростолов. \n' +
            '\n' +
            '5) Продажа, монтаж газового и отопительного оборудования. \n' +
            '\n' +
            '6) Бесплатная консультация по ремонту и установке  газ. котлов, колонок, конвекторов.  \n' +
            '\n' +
            '7) Загильзовка дымоходов и продажа вент. и дым. труб (нержавейка, оцинковка). \n' +
            '\n' +
            '8) Ремонт газовых котлов, колонок, конвекторов.\n' +
            '\n' +
            '9) Монтаж твердотоплевных котлов.\n' +
            '\n' +
            '10) Установка счетчиков воды.\n' +
            '\n' +
            '11) Установка счетчиков газа.\n' +
            '\n' +
            '12) Монтаж газопровода.\n' +
            '\n' +
            '13) Монтаж бойлеров.\n' +
            '\n' +
            '14) Ремонт газовых котлов.',

          quote: '1) Изготовление и продажа станков для сетки «Рабица». \n' +
            '\n' +
            '2) Продажа сетки «Рабица». \n' +
            '\n' +
            '3) Изготовление и продажа вибростанков. \n' +
            '\n' +
            '4) Изготовление и продажа вибростолов. \n' +
            '\n' +
            '5) Продажа, монтаж газового и отопительного оборудования. \n' +
            '\n' +
            '6) Бесплатная консультация по ремонту и установке  газ. котлов, колонок, конвекторов.  \n' +
            '\n' +
            '7) Загильзовка дымоходов и продажа вент. и дым. труб (нержавейка, оцинковка). \n' +
            '\n' +
            '8) Ремонт газовых котлов, колонок, конвекторов.\n' +
            '\n' +
            '9) Монтаж твердотоплевных котлов.\n' +
            '\n' +
            '10) Установка счетчиков воды.\n' +
            '\n' +
            '11) Установка счетчиков газа.\n' +
            '\n' +
            '12) Монтаж газопровода.\n' +
            '\n' +
            '13) Монтаж бойлеров.\n' +
            '\n' +
            '14) Ремонт газовых котлов.',
          hashtags: 'станки,котлы,рабица',
          twitterUser: 'youyuxi'
        },
        networks: [
          // { network: 'baidu', name: 'Baidu', icon: 'fas fah fa-lg fa-paw', color: '#2529d8' },
          // { network: 'buffer', name: 'Buffer', icon: 'fab fah fa-lg fa-buffer', color: '#323b43' },
          { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
          // { network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60' },
          { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
          // { network: 'flipboard', name: 'Flipboard', icon: 'fab fah fa-lg fa-flipboard', color: '#e12828' },
          // { network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000' },
          // { network: 'instapaper', name: 'Instapaper', icon: 'fas fah fa-lg fa-italic', color: '#428bca' },
          // { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
          { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
          // { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
          { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
          { network: 'pocket', name: 'Pocket', icon: 'fab fah fa-lg fa-get-pocket', color: '#ef4056' },
          // { network: 'quora', name: 'Quora', icon: 'fab fah fa-lg fa-quora', color: '#a82400' },
          // { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
          { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
          { network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
          // { network: 'stumbleupon', name: 'StumbleUpon', icon: 'fab fah fa-lg fa-stumbleupon', color: '#eb4924' },
          { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
          // { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
          { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
          { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
          // { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
          // { network: 'weibo', name: 'Weibo', icon: 'fab fah fa-lg fa-weibo', color: '#e9152d' },
          { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
          // { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
          // { network: 'xing', name: 'Xing', icon: 'fab fah fa-lg fa-xing', color: '#026466' },
          // { network: 'yammer', name: 'Yammer', icon: 'fab fah fa-lg fa-yammer', color: '#0072c6' },
          // { network: 'fakeblock', name: 'Custom Network', icon: 'fab fah fa-lg fa-vuejs', color: '#41b883' }
        ]
      }
    },
    computed: {
      activeFab () {
        switch (this.hidden) {
          case false: return { color: 'success', icon: 'mdi-share-variant' }
          case true: return { color: 'red', icon: 'mdi-close' }
          default: return {}
        }
      },
    },
  }
</script>

<style>
  #lateral .v-btn--example {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
  }
  .icon-bar {
    position: fixed;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 99;
  }

  /* Style the icon bar links */
  .icon-bar a {
    display: block;
    text-align: center;
    padding: 5px;
    transition: all 0.3s ease;
    color: white;
    font-size: 5px;
  }

  /* Style the social media icons with color, if you want */
  .icon-bar a:hover {
    background-color: #000;
  }
</style>
