import "./style.css"
import {createApp} from "vue"
import App from "./App.vue"
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaCircle, FaTrashAlt, FaPlus } from "oh-vue-icons/icons";

addIcons(FaCircle, FaTrashAlt, FaPlus);


const app = createApp(App)

app.component("v-icon", OhVueIcon);

app.mount("#app")