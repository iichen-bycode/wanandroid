import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import loginStore from "@/router/login/login";
import homeStore from "@/router/home";

export default createStore({
    //配置插件
    plugins:[createPersistedState(

    )],
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        loginStore,
        homeStore
    }
})
