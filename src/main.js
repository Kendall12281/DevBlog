import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


//Use quill
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App)

app.component('QuillEditor', QuillEditor)

app.use(createPinia())
app.use(router)

app.mount('#app')
