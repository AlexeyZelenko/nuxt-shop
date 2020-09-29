<template>
  <v-app id="inspire">
    <div>
      <template>
        <div class="vld-parent">
          <loading
            :active.sync="isLoading"
            :can-cancel="true"
            :is-full-page="fullPage"
            :on-cancel="onCancel"
          >

          </loading>

          <label><input type="checkbox" v-model="fullPage">Full page?</label>
          <button @click.prevent="doAjax">fetch Data</button>
        </div>
      </template>
      <!--ВЕРХНЯЯ ПАНЕЛЬ-->
      <div>
        <v-card>
          <v-app-bar
            app
            color="green darken-3"
            dark
            flat
          >
            <!--НАЗАД К КАТАЛОГУ-->
            <v-toolbar-title class="ml-0">
              <div>
                <v-btn :to="{name: 'catalog'}" icon>
                  <i class="material-icons">reply</i>
                </v-btn>
              </div>
            </v-toolbar-title>
            <v-spacer></v-spacer>


            <!--правое МЕНЮ-->
            <template v-slot:extension>
              <v-tabs
                fixed-tabs
                slider-color="white"
                v-model="currentItem"
              >
                <v-tab
                  :href="'#tab-' + item"
                  :key="item"
                  v-for="item in items"
                >
                  {{ item }}
                </v-tab>

                <v-menu
                  bottom
                  left
                  v-if="more.length"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="align-self-center mr-4"
                      text
                      v-bind="attrs"
                      v-on="on"
                    >
                      Больше
                      <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>

                  <v-list class="grey lighten-3">
                    <v-list-item
                      :key="item"
                      @click="addItem(item)"
                      v-for="item in more"
                    >
                      {{ item }}
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-tabs>
            </template>
          </v-app-bar>
        </v-card>
      </div>

      <!--			МЕНЮ-->
      <v-tabs-items v-model="currentItem">
        <v-tab-item
          :key="item"
          :value="'tab-' + item"
          v-for="item in items.concat(more)"
        >
          <v-card flat>
            <v-card-text>
              <h2>{{ item }}</h2>
              <div v-if="item === 'Товары'">
                <v-card>
                  <!--Pagination-->
                  <template>
                    <v-card flat>
                      <v-container fluid>
                        <v-row class="child-flex">
                          <div>
                            <v-toolbar dark>
                              <v-pagination
                                :length="pageCount"
                                v-model="page"
                              ></v-pagination>
                            </v-toolbar>
                          </div>
                          <div style="flex-basis: 20%">
                            <v-toolbar dark>
                              <v-text-field
                                :value="itemsPerPage"
                                @input="itemsPerPage = parseInt($event, 10)"
                                label="Товаров на странице"
                                max="15"
                                min="-1"
                                style="margin-top: 25px"
                                type="number"
                              ></v-text-field>
                            </v-toolbar>
                          </div>
                        </v-row>
                      </v-container>
                    </v-card>
                  </template>

                  <!--		ПОИСК-->
                  <v-text-field
                    append-icon="mdi-magnify"
                    hide-details
                    label="Поиск"
                    single-line
                    style="margin: 10px 0 5px 0"
                    v-model="search"
                  ></v-text-field>
                  <v-row align="center">
                    <v-col cols="12">
                      <v-select
                        :items="categories"
                        label="Выбери категорию"
                        v-model="search"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <!--		ТАБЛИЦА-->
                  <v-data-table
                    :headers="headers"
                    :items="PRODUCTS"
                    :items-per-page="itemsPerPage"
                    :page.sync="page"
                    :search="search"
                    @page-count="pageCount = $event"
                    class="elevation-1"
                    disable-sort
                    hide-default-footer
                    item-key="article"
                  >
                    <template
                      style="height:190px;"
                      v-slot:item.arrayImages="{ item }">

                      <img
                        :src="(item.arrayImages[0])"
                        alt=""
                        loading="lazy"
                        style="max-width: 100px; max-height: 100px; margin: 5px"
                        v-if="item.arrayImages"
                      >
                    </template>

                    <template v-slot:item.price="{ item }">
                      <v-chip :color="getColor(item.price)" dark>{{ item.price }}</v-chip>
                    </template>

                    <template v-slot:item.clothingSize="{ item }">
                      <v-chip :color="getColor2(item.clothingSize)" dark>{{ item.clothingSize }}</v-chip>
                    </template>

                    <template v-slot:item.description="{ item }">
                      <span v-html="item.description"/>
                    </template>

                    <template v-slot:item.actions="{ item }">
                      <v-row justify="space-around">

                        <v-avatar color="indigo" size="48">
                          <v-icon
                            @click="editItem(item)"
                          >
                            mdi-pencil
                          </v-icon>
                        </v-avatar>

                        <v-avatar
                          color="teal"
                          size="48"
                          style="margin-left: 10px"
                        >
                          <v-icon
                            @click="deleteLocation(item)"
                          >
                            mdi-delete
                          </v-icon>
                        </v-avatar>
                      </v-row>
                    </template>

                  </v-data-table>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
          <template v-if="item === 'Клиенты'">
            <z-users/>
          </template>
          <template v-if="item === 'Заказы'">
            <z-orders/>
          </template>
          <template v-if="item === 'Размеры'">
            <z-size/>
          </template>
        </v-tab-item>
      </v-tabs-items>

      <!--		ВСПЛЫВАЮЩАЯ ПАНЕЛЬ-->
      <div>
        <v-dialog
          style="z-index: 100"
          v-model="dialog"
          width="400px"
        >
          <template v-slot:activator="{ on, attrs }">
            <!--		КНОПКА +-->
            <v-btn
              @click="dialog = !dialog"
              bottom
              color="pink"
              dark
              fab
              fixed
              left
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <form>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-container>
                <v-row class="mx-2">
                  <v-col
                    class="align-center justify-space-between"
                    cols="12"
                  >
                    <v-row
                      align="center"
                      class="mr-0"
                    >
                      <!--								НАЗВАНИЕ-->
                      <v-text-field
                        :rules="[rules.counter]"
                        label="Наименование одежды"
                        placeholder="Name"
                        prepend-icon="create"
                        v-model="editedItem.name"
                      ></v-text-field>
                    </v-row>
                  </v-col>
                  <!--						ОПИСАНИЕ ТОВАРА-->
                  <v-col cols="12">
                    <tiptap-vuetify
                      :extensions="extensions"
                      placeholder="Описание товара"
                      prepend-icon="edit"
                      v-model="editedItem.description"
                    />
                  </v-col>
                  <!--						АРТИКЛЬ-->
                  <v-col cols="12">
                    <v-text-field
                      placeholder="article"
                      prepend-icon="local_offer"
                      required
                      v-model="editedItem.article"
                    ></v-text-field>
                  </v-col>
                  <!--						ЦЕНА-->
                  <v-col cols="12">
                    <v-text-field
                      :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                      label="Цена товара"
                      placeholder="ОБЯЗАТЕЛЬНО"
                      prepend-icon="monetization_on"
                      required
                      type="Number"
                      v-model="editedItem.price"
                    ></v-text-field>
                  </v-col>
                  <!--						Размер-->
                  <v-col cols="12">
                    <v-text-field
                      label="Размер одежды"
                      placeholder="36-60"
                      prepend-icon="create"
                      v-model="editedItem.clothingSize"
                    ></v-text-field>


                  </v-col>
                  <!--						Бренд-->
                  <v-col cols="12">
                    <v-text-field
                      label="Брэнд"
                      placeholder="Пьер Кардэн"
                      prepend-icon="create"
                      v-model="editedItem.BrandName"
                    ></v-text-field>
                  </v-col>
                  <!--						КАТЕГОРИИ-->
                  <v-col cols="12">
                    <v-select
                      :items="itemsCategories"
                      :rules="[v => !!v || 'Пункт требуется']"
                      label="Выберите категорию"
                      placeholder="Категория"
                      prepend-icon="create"
                      v-model="editedItem.category"
                    ></v-select>
                  </v-col>
                  <!--							ПРОИЗВОДИТЕЛЬ-->
                  <v-col cols="12">
                    <v-select
                      :items="itemsclothingManufacturer"
                      label="Выберите производителя"
                      placeholder="Производитель"
                      prepend-icon="create"
                      v-model="editedItem.clothingManufacturer"
                    ></v-select>
                  </v-col>
                  <!--						ОТОБРАЖЕНИЕ-->
                  <div class="check_box">
                    <v-checkbox
                      color="success"
                      hide-details
                      label="Отображать в каталоге"
                      v-model="editedItem.available"
                    ></v-checkbox>
                    <v-checkbox
                      color="orange"
                      hide-details
                      label="Новинка"
                      v-model="editedItem.newClothes"
                    ></v-checkbox>
                    <v-checkbox
                      color="indigo darken-3"
                      hide-details
                      label="Товар со скидкой"
                      v-model="editedItem.promotionalPrice"
                    ></v-checkbox>
                  </div>
                  <!--ФОТО-->
                  <template v-if="editedItem.arrayImages.length > 0">
                    <v-carousel>
                      <v-carousel-item
                        :key="article"
                        :src="(item)"
                        reverse-transition="fade-transition"
                        style="max-width: 400px; max-height: 600px"
                        transition="fade-transition"
                        v-for="(item,article) in editedItem.arrayImages"
                      >
                        <v-btn
                          @click="deleteFoto(editedItem, item)"
                          class="mx-2"
                          color="pink"
                          dark
                          fab
                          small
                          style="float: right; top: 1em;"
                        >
                          <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                      </v-carousel-item>
                    </v-carousel>
                  </template>
                  <v-col cols="12">
                    <v-file-input
                      :rules2="rules"
                      accept="image/png, image/jpeg, image/bmp"
                      color="deep-purple accent-4"
                      counter
                      label="Загрузка фотографий"
                      multiple
                      placeholder="Выберите фото"
                      prepend-icon="mdi-camera"
                      v-model="editedItem.File"

                    >
                      <template>
                        <v-file-input
                          counter
                          label="File input"
                          multiple
                          show-size
                        ></v-file-input>
                      </template>

                    </v-file-input>
                  </v-col>

                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="close"
                  color="blue darken-1"
                  text
                >
                  Отмена
                </v-btn>
                <v-btn
                  @click="save"
                  color="blue darken-1"
                  text
                  type="submit"
                >
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </v-dialog>
      </div>
    </div>
  </v-app>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Swal from 'sweetalert2'
  import firebase from 'firebase/app'
  // const zUsers = () => import('@/components/administration/z-users')
  // const zOrders = () => import('@/components/administration/z-orders')
  // const zSize = () => import('@/components/administration/z-size')
  // const Loading = () => import('vue-loading-overlay')
  // import 'vue-loading-overlay/dist/vue-loading.css'
  import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History
  } from 'tiptap-vuetify'

  const formDefault = {
    NameImages: [],
    File: [],
    name: '',
    article: +new Date(),
    description: '',
    available: null,
    category: '',
    price: '',
    clothingSize: 42,
    promotionalPrice: false,
    clothingManufacturer: '',
    VideoClothings: false,
    BrandName: '',
    FotoClothes: '',
    newClothes: true,
  }

  export default {
    name: "zAdmin",
    components: {
      Loading,
      TiptapVuetify,
      zUsers,
      zOrders,
      zSize
    },
    data: () => ({
      isLoading: false,
      fullPage: true,
      categories: [
        '',
        'Ветровки',
        'Пальто',
        'Плащи',
        'Джинсы',
        'Брюки',
        'Кофты',
        'Футболки',
        'Рубашки',
        'Блузки',
        'Платья',
        'Костюмы',
        'Куртки',
      ],
      currentItem: 'tab-Web',
      items: [
        'Товары', 'Заказы'
      ],
      more: [
        'Клиенты', 'Размеры',
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
      ...formDefault, // ...formTest или ...formDefault
      rules: {
        required: value => !!value || 'Обязательно.',
        counter: value => value.length >= 5 || 'Min 5 знаков',
        counter2: value => value.length <= 400 || 'Max 400 знаков',
      },
      rules2: [
        value => !value || value.size < 5000000 || 'Avatar size should be less than 5 MB!',
      ],
      search: '',
      delete: '',
      products: [],
      dialog: false,
      drawer: null,
      arrayImages: [],
      editedIndex: -1,
      editedItem: {
        NameImages: [],
        File: [],
        name: '',
        article: +new Date(),
        description: '',
        available: true,
        category: '',
        price: null,
        clothingSize: 42,
        promotionalPrice: false,
        clothingManufacturer: '',
        VideoClothings: false,
        BrandName: '',
        FotoClothes: '',
        newClothes: true,
        arrayImages: [],
        seen: false
      },
      defaultItem: {
        seen: false,
        NameImages: [],
        File: [],
        name: '',
        article: +new Date(),
        description: '',
        available: true,
        category: '',
        price: null,
        clothingSize: 42,
        promotionalPrice: false,
        clothingManufacturer: '',
        VideoClothings: false,
        BrandName: '',
        FotoClothes: '',
        newClothes: true,
        arrayImages: []
      },
      itemsCategories: [
        'Куртки',
        'Ветровки',
        'Пальто',
        'Плащи',
        'Джинсы',
        'Брюки',
        'Кофты',
        'Футболки',
        'Рубашки',
        'Блузки',
        'Платья',
        'Костюмы',
      ],
      itemsclothingManufacturer: [
        'Турция',
        'Италия',
        'Китай',
        '',
      ],
      headers: [
        {
          text: 'Артикль',
          value: 'article',
          align: 'start',
          sortable: false,
        },
        {text: '', value: '1'},
        {text: 'Фото одежды', value: 'arrayImages'},
        {text: '', value: '2'},
        {text: '', value: '3'},
        {text: 'Категория', value: 'category'},
        {text: '', value: '4'},
        {text: 'Описание', value: 'description'},
        {text: '', value: '5'},
        {text: 'Цена', value: 'price'},
        {text: 'Размер', value: 'clothingSize'},
        {text: 'Бренд', value: 'BrandName'},
        {text: 'Производитель', value: 'clothingManufacturer'},
        {text: 'Редактировать/Удалить', value: 'actions', sortable: false},
        {text: '===============================', value: ''},
      ],
      locations: []
    }),
    methods: {
      ...mapActions([
        'list_Users',
      ]),
      doAjax() {
        this.isLoading = true;
        // simulate AJAX
        setTimeout(() => {
          this.isLoading = false
        },5000)
      },
      onCancel() {
        console.log('User cancelled the loader.')
      },
      addItem(item) {
        const removed = this.items.splice(0, 1)
        this.items.push(
          ...this.more.splice(this.more.indexOf(item), 1)
        )
        this.more.push(...removed)
        this.$nextTick(() => {
          this.currentItem = 'tab-' + item
        })
      },
      deleteFoto(editedItem, item) {
        const array = editedItem.arrayImages
        const arrayName = editedItem.NameImages

        const index = array.indexOf(item);
        if (index > -1) {
          array.splice(index, 1);
          arrayName.splice(index, 1);
        }
        editedItem.arrayImages = array
        editedItem.NameImages = arrayName
      },
      initialize() {
        this.products = this.PRODUCTS
      },
      save() {
        if (this.editedIndex > -1) {
          const editProduct = Object.assign(this.products[this.editedIndex], this.editedItem)
          this.editThisProduct(editProduct)
        } else {
          const addProduct = this.editedItem
          this.addLocation(addProduct)
        }
        this.close()
      },
      async close() {
        this.dialog = false
        await this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          // window.location.reload()
        })
      },
      editItem(item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      async editThisProduct(editProduct) {
        this.isLoading = true
        const File = editProduct.File
        const promises = []
        if (File) {
          for (let i = 0; i < File.length; i++) {

            const storageRef = firebase.storage().ref();
            // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

            // Создайте метаданные файла
            let metadata = {
              contentType: 'image/jpeg',
            };
            let nameTime = +new Date()
            // ПРОВЕРКА ЗАГРУЗКИ ФОТО
            const uploadTask = storageRef.child('assets/images/' + nameTime + '.jpg').put(File[i], metadata);

            promises.push(
              uploadTask
                .then(snapshot =>
                  snapshot.ref.getDownloadURL()
                )
            )
          }
        }
        const URLs = await Promise.all(promises)
        const ArrayOld = editProduct.arrayImages
        const ArrayFile = [...URLs, ...ArrayOld]
        let id = editProduct.id

        db.collection('products')
          .doc(id)
          .update({
            seen: editProduct.seen,
            arrayImages: ArrayFile,
            category: editProduct.category,
            createdAt: editProduct.createdAt,
            BrandName: editProduct.BrandName,
            article: editProduct.article,
            price: editProduct.price,
            promotionalPrice: editProduct.promotionalPrice,
            clothingSize: editProduct.clothingSize,
            newClothes: editProduct.newClothes,
            description: editProduct.description,
            clothingManufacturer: editProduct.clothingManufacturer,
          })
          .then(() => {
            this.isLoading = false
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Ваша работа была сохранена',
              showConfirmButton: false,
              timer: 1500
            })
          })
      },
      async addLocation(addProduct, seen, arrayImages, File, article, available, category, name, promotionalPrice, newClothes, BrandName, clothingSize, clothingManufacturer, price, description) {

        this.isLoading = true

        const createdAt = new Date()
        seen = false
        File = addProduct.File
        BrandName = addProduct.BrandName
        article = addProduct.article
        available = addProduct.available
        category = addProduct.category
        name = addProduct.name
        price = addProduct.price
        promotionalPrice = addProduct.promotionalPrice
        clothingSize = addProduct.clothingSize
        newClothes = addProduct.newClothes
        description = addProduct.description
        clothingManufacturer = addProduct.clothingManufacturer
        arrayImages = addProduct.arrayImages
// ЗАГРУЗКА ФОТО
        const promises = []
        const promisesName = []

        if (File) {
          for (let i = 0; i < File.length; i++) {

            const storageRef = firebase.storage().ref();
            // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

            // Создайте метаданные файла
            let metadata = {
              contentType: 'image/jpeg',
            };
            const nameTime = +new Date() + '.jpg'
            // ПРОВЕРКА ЗАГРУЗКИ ФОТО
            const uploadTask = storageRef.child('assets/images/' + nameTime).put(File[i], metadata);

            promises.push(
              uploadTask
                .then(snapshot =>
                  snapshot.ref.getDownloadURL()
                )
            )
            promisesName.push(
              nameTime
            )
          }
        }

        const URLs = await Promise.all(promises)
        const NameImages = await Promise.all(promisesName)

        await db.collection('products').add({
          NameImages: NameImages,
          seen,
          article,
          available,
          BrandName,
          newClothes,
          clothingManufacturer,
          clothingSize,
          promotionalPrice,
          createdAt,
          category,
          arrayImages: URLs,
          name,
          price,
          description,
        })
        this.isLoading = false

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ваша работа была сохранена',
          showConfirmButton: false,
          timer: 2000
        })
        arrayImages = [];
        this.dialog = false
      },
      getColor(price) {
        if (price < 500) return 'red'
        else if (price > 500) return 'orange'
        else if (price > 1000) return 'cyan'
        else if (price > 2000) return 'yellow'
        else if (price > 3000) return 'grey'
        else return 'green'
      },
      getColor2(clothingSize) {
        if (clothingSize < 36) return 'red'
        else if (clothingSize > 36 - 40) return 'orange'
        else if (clothingSize > 42 - 44) return 'cyan'
        else if (clothingSize > 45 - 46) return 'yellow'
        else if (clothingSize > 47 - 50) return 'grey'
        else return 'green'
      },
      async deleteLocation(item) {
        Swal.fire({
          title: 'Вы уверенны?',
          text: "Вы не сможете восстановить это!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Да, удалить это!'
        })
          .then((result) => {
            if (result.value) {
              this.isLoading = true
              const File = item.arrayImages

              if (File) {
                for (let i = 0; i < File.length; i++) {
                  let storageRef = firebase.storage().ref()
                  let nameTime = item.NameImages[i]
                  const Ref = storageRef.child('assets/images/' + nameTime)
                  Ref.delete().then(function () {
                  }).catch(function (error) {
                    console.log('удаление фото с всем объявлением' + error)
                  })
                }
              }
              let id = item.id
              db.collection('products').doc(id).delete()
              this.isLoading = false
              Swal.fire(
                'Удаленно!',
                'Ваш продукт удален.',
                'success'
              )
            }
          })

      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'GET_LIST_USERS'
      ]),
      formTitle() {
        return this.editedIndex === -1 ? 'Создание товара' : 'Форма редактирования'
      },
    },
    props: {
      source: String,
    },
    created() {
      this.initialize()
      this.list_Users()
    }
  }
</script>

<style lang="sass">
  .z-table-button
    position: fixed
    right: 10%
    top: 85%
    width: 90%
    display: block
    z-index: 10

    .v-data-table__mobile-row
      display: flex
      align-items: center
      align-content: normal
      min-height: 100px
      background-size: auto
      background-color: #c8bb9d
      font-size: 1rem
</style>


