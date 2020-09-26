<template>
  <div>
    <v-card
      class="mx-auto"
      width="100%"
      tile
    >
      <v-navigation-drawer
        permanent
        width="100%"
      >
        <v-system-bar></v-system-bar>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
<!--              <v-img :src="(this.GET_LIST_USERS.photoURL)"></v-img>-->
            </v-list-item-avatar>
            <template>
              <div
                style="margin-left: 50px"
                class="my-2">
                <v-btn
                  class="ma-2"
                  tile
                  outlined
                  color="indigo darken-4"
                  @click="$refs.modalName.openModal()"
                >
                  <v-icon left>mdi-pencil</v-icon>Редактировать
                </v-btn>
              </div>
            </template>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
<!--              <v-list-item-title class="title">{{this.GET_LIST_USERS.displayName}}</v-list-item-title>-->
<!--              <v-list-item-subtitle>{{this.GET_LIST_USERS.email}}</v-list-item-subtitle>-->
            </v-list-item-content>

          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          nav
          dense
        >

          <v-list two-line>
            <v-list-item @click="addUserTelephone">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-phone</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
<!--                <v-list-item-title>{{GET_InfoUser.telephone}}</v-list-item-title>-->
                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item @click="1">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-email</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
<!--                <v-list-item-title>{{this.GET_LIST_USERS.email}}</v-list-item-title>-->
                <v-list-item-subtitle>Personal</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item @click="1">
              <v-list-item-icon>
                <v-icon color="indigo">mdi-map-marker</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title></v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

        </v-list>
      </v-navigation-drawer>
    </v-card>

    <!--		Модальное окно-->
    <modal ref="modalName">
      <template v-slot:header>
        <h3>Редактировать</h3>
      </template>

      <template v-slot:body>
        <v-container fluid>
          <v-checkbox
            v-model="custom"
            label="Индикатор выполнения"
          ></v-checkbox>
          <v-text-field
            v-model="value"
            color="cyan darken"
            label="Телефон"
            placeholder="Начать печатать..."
            loading
          >
            <template v-slot:progress>
              <v-progress-linear
                v-if="custom"
                :value="progress"
                :color="color"
                absolute
                height="7"
              ></v-progress-linear>
            </template>
          </v-text-field>
        </v-container>
        <v-container fluid>
          <v-textarea
            name="input-7-1"
            label="Адресс"
            value=""
            hint="Адресс для пересылки"
          >
          </v-textarea>
        </v-container>
      </template>

      <template v-slot:footer>
        <div>
          <v-btn
            @click="$refs.modalName.closeModal()"
            rounded
            color="primary"
            dark
            style="margin: 5px"
          >
            Отменить
          </v-btn>
          <v-btn
            @click="$refs.modalName.closeModal()"
            rounded
            color="primary"
            dark
          >
            Сохранить
          </v-btn>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    layout: 'back_catalog',
    name: "cabinetUser",
    data: () => ({
      value2: '',
      value: '',
      custom: true,
    }),
    components: {
      Modal: () => import("@/components/Modal")
    },
    methods: {
      ...mapActions([
        'list_Users',
        'fetchInfo'
      ]),
      addUserTelephone() {

      },
    },
    computed: {
      ...mapGetters([
        'GET_LIST_USERS',
        'GET_InfoUser'
      ]),
      progress () {
        return Math.min(100, this.value.length * 10)
      },
      color () {
        return ['red', 'yellow', 'green'][Math.floor(this.progress / 40)]
      },
    },
    created() {
      this.list_Users()
      this.fetchInfo()

    },
  }
</script>

<style lang="scss" >
  .overflow-hidden {
    overflow: hidden;
  }
</style>
