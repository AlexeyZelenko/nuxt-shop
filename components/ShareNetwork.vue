<template>
  <div>
    <div style="position: relative;">
      <v-fab-transition>
        <v-btn
          aria-label="Share Social"
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
        :url="`https://teploservis68.com.ua${path}`"
        :title="product"
        :description="description"
        :quote="`https://teploservis68.com.ua${path}
        ------------------------------------------
          ${description}`"
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
    props: {
      path: {
        type: String,
        default() {
          return ''
        }
      },
      product: {
        type: String,
        default() {
          return ''
        }
      },
      description: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data () {
      return {
        fab: false,
        hidden: false,
        tabs: null,
        sharing: {
          // url: 'http://teploservis68.com.ua/',
          // url: `https://teploservis68.com.ua${this.path}`,
          // title: `${this.name}`,
          // description: `${this.description}`,
          quote: `https://teploservis68.com.ua${this.path}`,
          hashtags: 'станки,котлы,рабица',
          twitterUser: 'youyuxi'
        },
        networks: [
          { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
          { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
          { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
          { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
          { network: 'pocket', name: 'Pocket', icon: 'fab fah fa-lg fa-get-pocket', color: '#ef4056' },
          { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
          { network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
          { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
          { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
          { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
          { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
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
