<template>
  <v-app id="inspire">

    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
        <td class="text-xs-right"></td>
      </template>
    </v-data-table>

        <v-card>
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
            calculate-widths: true
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
      <!--		ВСПЛЫВАЮЩАЯ ПАНЕЛЬ-->
      <div>
        <v-dialog
          style="z-index: 100"
          v-model="dialog"
          width="85%"
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
<!--                      								НАЗВАНИЕ-->
                      <v-textarea
                        auto-grow
                        name="input-7-1"
                        outlined
                        rows="1"
                        row-height="15"
                        :rules="[rules.counter]"
                        label="Оглавление"
                        placeholder="Название товара"
                        prepend-icon="mdi-pencil"
                        v-model="editedItem.name"
                        background-color="grey lighten-2"
                        color="cyan"
                      ></v-textarea>
                    </v-row>
                  </v-col>
                  <!--						ОПИСАНИЕ ТОВАРА-->
                  <v-col cols="12">
<!--                    <tiptap-vuetify-->
<!--                      :extensions="extensions"-->
<!--                      placeholder="Описание товара"-->
<!--                      prepend-icon="mdi-pencil"-->
<!--                      v-model="editedItem.description"-->
<!--                    />-->
                      <v-textarea
                        placeholder="Опишите подробно товар"
                        name="input-7-1"
                        filled
                        outlined
                        label="Описание товара"
                        auto-grow
                        rows="2"
                        row-height="15"
                      ></v-textarea>
                  </v-col>
                  <!--						АРТИКЛЬ-->
                  <v-col cols="12">
                    <v-text-field
                      placeholder="article"
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
                      prepend-icon="mdi-pencil"
                      required
                      type="Number"
                      v-model="editedItem.price"
                    ></v-text-field>
                  </v-col>
                  <!--						Размер-->
                  <!--						КАТЕГОРИИ-->
                  <v-col cols="12">
                    <v-select
                      :items="itemsCategories"
                      :rules="[v => !!v || 'Пункт требуется']"
                      label="Выберите категорию"
                      placeholder="Категория"
                      prepend-icon="mdi-pencil"
                      v-model="editedItem.category"
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
    layout: 'admin',
    name: "zAdmin",
    components: {
      TiptapVuetify,
      // zUsers,
      // zOrders,
      // zSize
    },
    data: () => ({
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
          width: "1%"
        },
        { align: 'left', sortable: false, text: 'Calories', value: 'description', width: "70%" },
        { align: 'left', sortable: false,text: 'Fat (g)', value: 'fat',width: "1%" },
        { align: 'left', sortable: false,text: 'Carbs (g)', value: 'carbs',width: "1%" },
        { align: 'left', sortable: false,text: 'Protein (g)', value: 'protein',width: "1%" },
        { align: 'left', sortable: false,text: 'Iron (%)', value: 'iron', width: "1%" },
        { align: 'left', sortable: false,text: '', value: 'name' }
      ],
      desserts: [
        {
          value: true,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ],
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
      // currentItem: 'tab-Web',
      // items: [
      //   'Товары', 'Заказы'
      // ],
      // more: [
      //   'Клиенты', 'Размеры',
      // ],
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
      // headers: [
      //   {
      //     text: 'Артикль',
      //     value: 'article',
      //     align: 'start',
      //     sortable: false,
      //   },
      //   {text: '', value: '1'},
      //   {text: 'Фото', value: 'arrayImages'},
      //   {text: '', value: '2'},
      //   {text: '', value: '3'},
      //   {text: 'Категория', value: 'category'},
      //   {text: '', value: '4'},
      //   {text: 'Описание', value: 'description', width: "50%"},
      //   {text: '', value: '5'},
      //   {text: 'Цена', value: 'price'},
      //   {text: 'Редактировать/Удалить', value: 'actions', sortable: false},
      //   {text: '===============================', value: ''},
      // ],
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
  .text-xs-right
    padding: 50px 50px
    margin: 50px 50px
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


