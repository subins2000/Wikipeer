import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import i18n from 'vue-banana-i18n'

Vue.config.productionTip = false

const locale=navigator.language.split('-')[0] || 'en'
Vue.use(i18n, {
  locale,
  finalFallback: 'en',
  messages: { }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      this.$router.push(redirect)
    }
    import( `./assets/i18n/${this.i18n.locale}`).then(messages => {
      this.i18n.loadMessages (messages.default, this.i18n.locale);
    })
    this.$store.commit('app/setUiLanguage',locale)
  }
}).$mount('#app')
