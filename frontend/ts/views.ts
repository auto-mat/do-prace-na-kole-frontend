import Vue from 'vue';
import VueRouter from 'vue-router';
import Company from "./views/company.vue";
import Coordinator from "./views/coordinator.vue";
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

//@ts-ignore
let frontend_url: string = window.frontend_url;

const Unimplemented = { template: '' }


function load_version_string() {
    $.get({
        url: frontend_url+"version.txt",
        success: function(data) {
            var backend_version = $(".version").html();
            $(".version").html(backend_version + " . " + data);
        }
    });
}

$(document).ready(function() {
    const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
            //@ts-ignore
            { path: '/spolecnost/', component: Company },
            //@ts-ignore
            { path: '/coordinators/', component: Coordinator },
        ]
    })

    //@ts-ignore
    window.vueInstance = new Vue({
        router,
        template: `
<div id="app">
<router-view class="view"></router-view>
</div>
`,
    }).$mount('#app')

    console.log("Views code initialized.");
    if($(".version").length > 0){
        load_version_string();
    }
});
