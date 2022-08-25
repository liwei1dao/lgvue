import Vue from 'vue';
import store from '@/store'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    ...require('./lang/en.json'),
  },
  zh: {
    ...require('./lang/zh.json'),
  }
}

const i18n = new VueI18n({
  locale: store.getters.currlanguage, //设置语种
  messages: messages
})
export default i18n