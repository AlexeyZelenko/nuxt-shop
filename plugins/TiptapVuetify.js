import Vue from 'vue'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

export default ({ app }) => {
  console.log([ typeof app.vuetify, app.vuetify]);

  Vue.use(TiptapVuetifyPlugin, {
    // Below is an IMPORTANT line.
    vuetify: app.vuetify,
    iconsGroup: 'mdi'
  })
}
