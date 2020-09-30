<template>
  <v-app
    id="inspire"
    style="padding: 5px"
  >
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
      <!--          Категории-->
      <v-row align="center">
        <v-col cols="12">
          <v-select
            :items="categories"
            label="Выбери категорию"
            v-model="search"
          ></v-select>
        </v-col>
      </v-row>
      <!--          Пагинация-->
      <div class="text-center pt-2">
        <v-pagination
          :length="pageCount"
          v-model="page"
        ></v-pagination>
        <v-text-field
          :value="itemsPerPage"
          @input="itemsPerPage = parseInt($event, 10)"
          label="Items per page"
          max="15"
          min="-1"
          type="number"
        ></v-text-field>
      </div>
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
        <template v-slot:item.name="{ item }">
          <v-chip
            color="blue"
            dark
          >
            {{ item.name }}
          </v-chip>
        </template>

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
                      :rules="[rules.counter]"
                      auto-grow
                      background-color="grey lighten-2"
                      color="cyan"
                      label="Оглавление"
                      name="input-7-1"
                      outlined
                      placeholder="Название товара"
                      prepend-icon="mdi-pencil"
                      row-height="15"
                      rows="1"
                      v-model="editedItem.name"
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
                    auto-grow
                    filled
                    label="Описание товара"
                    name="input-7-1"
                    outlined
                    placeholder="Опишите подробно товар"
                    row-height="5"
                    rows="2"
                    v-model="editedItem.description"
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
                      :src="(item)"
                      reverse-transition="fade-transition"
                      style="max-width: 400px; max-height: 600px"
                      transition="fade-transition"
                      v-for="(item, article) in editedItem.arrayImages"
                      :key="article"
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
  import {mapActions, mapGetters} from 'vuex'
  import Swal from 'sweetalert2'

  import {
    Blockquote,
    Bold,
    BulletList,
    Code,
    HardBreak,
    Heading,
    History,
    HorizontalRule,
    Italic,
    Link,
    ListItem,
    OrderedList,
    Paragraph,
    Strike,
    TiptapVuetify,
    Underline
  } from 'tiptap-vuetify'

  export default {
    layout: 'admin',
    name: "zAdmin",
    components: {
      TiptapVuetify,
    },
    data: () => ({
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
      headers: [
        {
          text: '',
          value: 'name',
          align: 'left',
          sortable: false,
          width: "1%",
        },
        {text: 'Артикль', value: 'article', width: "1%", align: 'left'},
        {text: 'Фото', value: 'arrayImages', width: "1%", align: 'left'},
        {text: 'Категория', value: 'category', width: "1%", align: 'left'},
        {align: 'left', sortable: false, text: 'Описание', value: 'description', width: "70%"},
        {text: 'Цена', value: 'price', width: "1%", align: 'left'},
        {text: 'Редактировать/Удалить', value: 'actions', sortable: false, width: "1%", align: 'left'},
      ],
      locations: [],
      isLoading: false
    }),
    methods: {
      ...mapActions([]),
      doAjax() {
        this.isLoading = true;
        // simulate AJAX
        setTimeout(() => {
          this.isLoading = false
        }, 5000)
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
        try {
          await this.$store.dispatch('editPRODUCT', editProduct)
        } catch (e) {
          console.log('Ошибка редактирования')
        }
      },
      async addLocation(addProduct, seen, arrayImages, File, article, available, category, name, price, description) {

        this.isLoading = true

        const createdAt = new Date()
        seen = false
        File = addProduct.File
        article = addProduct.article
        available = addProduct.available
        category = addProduct.category
        name = addProduct.name
        price = addProduct.price
        description = addProduct.description
        arrayImages = addProduct.arrayImages
        name = addProduct.name
        const adress = 'Украина, Черкасская обл, Черкассы, Громова 142, 18018'
        const name_contact = 'Василий Станиславович'
        const telephone_contact = '+38(096)651-10-52,  Viber:+38(098)804-15-81,   +38(094)985-32-91,   (0472)50-12-91'

// ЗАГРУЗКА ФОТО
        const promises = []
        const promisesName = []

        if (File) {
          for (let i = 0; i < File.length; i++) {

            // Создайте метаданные файла
            let metadata = {
              contentType: 'image/jpeg',
            };
            const nameTime = +new Date() + '.jpg'

            // Загрузить файл и метаданные в объект 'assets/images/***.jpg'
            const uploadTask = this.$fireStorage.ref().child('assets/images/' + nameTime).put(File[i], metadata);

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

        let docRef = await this.$fireStore.collection('products').add({
          NameImages: NameImages,
          seen,
          article,
          available,
          createdAt,
          category,
          arrayImages: URLs,
          name,
          price,
          description,
        });
        try {
          const docAdded = await docRef;
          console.log(`${docAdded.id}`);
          await this.$fireStore.doc('products/' + `${docAdded.id}`).update({id: `${docAdded.id}`});
        } catch (err) {
          return err;
        }

        this.isLoading = true

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
      async deleteLocation(item) {
        try {
          await this.$store.dispatch('deleteRRODUCT', item)
        } catch (e) {
          console.log('Ошибка')
        }
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


