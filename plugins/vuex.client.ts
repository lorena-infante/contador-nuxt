import { createStore } from 'vuex';
import { store } from '../store';
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
    const vuexStore = createStore(store);
    nuxtApp.vueApp.use(vuexStore);
    nuxtApp.provide('store', vuexStore);
 });