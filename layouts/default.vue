<template id="headerMain">
  <v-app>
    <div>
  <!--    ШАПКА-->
      <template>
        <div id="header">
          <v-toolbar
            color="#ff9900"
            prominent
          >
              <v-icon
                style="margin: 10px"
                @click="home"
              >
                mdi-home
              </v-icon>

            <v-spacer></v-spacer>

<!--            Вход в Админку-->
            <v-btn
              v-if="GET_ADMIN_ENTRANCE"
              @click="adminPlusLogin"
              class="ma-2"
              outlined
              small
              style="color: white; z-index: 102">
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>

            <!--		ВХОД ЧЕРЕЗ ГУГЛ АККАУНТ-->
            <div style="margin: 5px">
              <v-btn
                @click="signInWithGoogle"
                rounded
                style="background-color: darkgreen; color: white; position: relative; z-index: 10000;"
                v-if="!User_Entrance"
              >
                Войти
              </v-btn>
              <v-btn
                @click="logout"
                v-if="User_Entrance"
                rounded
                style="background-color: darkgreen; color: white; z-index: 102"
              >
                Выйти
              </v-btn>
            </div>
            <!--Отображение пользователя-->
            <div style="margin: 5px; z-index: 102">
              <div
                v-if="User_Entrance">
                <slot>
                  <img
                    :src="(getProfilePicUrl)"
                    alt=""
                    id="user-pic"
                  >
                </slot>
              </div>
              <div
                id="user-name"
                v-if="User_Entrance"
              >{{getUserName}}
              </div>
            </div>
          </v-toolbar>

          <v-toolbar
            color="#ff9900"
            style="margin-top: -50px;"
            >
            <v-toolbar-title>
              <img
                style="margin-left: 10px;"
                src="~/assets/logo.png"
                alt=""
              >
            </v-toolbar-title>

          </v-toolbar>
          <Share></Share>
        </div>
      </template>
  <!--    КОНТЕНТ-->
      <div id="content">
        <nuxt/>
      </div>
  <!--FOOTER-->
      <template id="footer">
        <div>
          <v-footer
            style="background-color: #f0b165"
            padless
            class="mx-auto"
            absolute
          >
            <v-row
              justify="center"
              no-gutters
            >
              <v-btn
                aria-live="polite"
                v-for="link in links"
                :key="link.name"
                color="white"
                text
                rounded
                class="my-2"
                :to="link.value"
              >
                {{ link.name }}
              </v-btn>
              <v-col
                style="background-color: #ff9900"
                class=" py-4 text-center white--text"
                cols="12"
              >
                {{ new Date().getFullYear() }} — Теплосервис
              </v-col>
            </v-row>
          </v-footer>
        </div>
      </template>
    </div>
  </v-app>
</template>

<script>
  // import Share from '~/components/ShareNetwork.vue'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    components: {
      'Share': () => import('~/components/ShareNetwork.vue'),
      // Share
    },
    data: () => ({
      links: [
        { name: 'О нас', value: 'About'},
        { name: 'Услуги', value: 'About'},
        { name: 'Контакты', value: 'Contacts'},
      ],
    }),
    methods: {
      home() {
        this.$router.push('/')
      },
      async signInWithGoogle() {
        try {
          await this.$store.dispatch('signInWithGoogle')
        } catch (e) {
          console.log('Ошибка входа Google')
        }
      },
      adminPlusLogin() {
        if (this.GET_ADMIN_ENTRANCE) {
          this.$router.push('admin')
        } else {
          this.$router.push('index')
        }
      },
      async logout() {
        await this.$store.dispatch('logout')
      },
    },
    computed: {
      ...mapGetters([
        'GET_ADMIN_ENTRANCE',
        'User_Entrance',
      ]),
      getUserName() {
        return this.$fireAuthObj().currentUser.displayName;
      },
      getProfilePicUrl() {
        return this.$fireAuthObj().currentUser.photoURL || '@/assets/images/profile_placeholder.png';
      },
    },
  }
</script>

<style>
  #headerMain {
    width:100%;
    margin:0px auto;
    z-index:0;
  }

  #header {
    hight: 160px;
    width:100%;
    position: fixed;
    z-index: 99;
  }

  #content {
    margin-top: 160px;
    margin-bottom: 100px;
  }

  #footer {
    margin-top: 100px;
    position: fixed;
    z-index: 99;
    hight: 100px;
  }

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

</style>
