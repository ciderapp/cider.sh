import VueAnimateOnScroll from 'vue3-animate-onscroll';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueAnimateOnScroll);
})