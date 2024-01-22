import './assets/main.css'
import PrimeVue from 'primevue/config';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Menubar from 'primevue/menubar';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import { PrimeIcons } from 'primevue/api';
import BlockUI from 'primevue/blockui';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';


import Card from 'primevue/card';



import 'primeicons/primeicons.css'
import AutoComplete from 'primevue/autocomplete';

import "primeflex/primeflex.css";

//in main.js
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'


const app = createApp(App)

app.use(router)
app.use(PrimeVue, {ripple: true})
app.component('Menubar', Menubar)
app.component('BlockUI', BlockUI)
app.component('AutoComplete', AutoComplete);
app.component('Calendar', Calendar)
app.component('Button', Button)
app.component('PrimeIcons', PrimeIcons)
app.component('Card', Card)
app.component('Textarea', Textarea)
app.component('Toast', Toast)
app.use(ToastService)
app.component('InputText', InputText)
app.mount('#app')
