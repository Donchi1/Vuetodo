import "./style.css"
import {createApp} from "vue"
import App from "./App.vue"
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaEdit, FaTrashAlt, FaPlus, FaCheck } from "oh-vue-icons/icons";

addIcons(FaEdit, FaTrashAlt, FaPlus, FaCheck);


const app = createApp(App)

app.component("v-icon", OhVueIcon);

app.mount("#app")