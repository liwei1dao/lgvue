<template>
  <div class="menu-butt">
    <v-menu offset-y
            transition="scroll-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <img class="slang-icon"
             :class="flagIconClass(currlanguage,true)"
             v-bind="attrs"
             v-on="on">
      </template>
      <v-card width="240px">
        <div class="slang-title">
          <div class="slang-title-bg"></div>
          <div class="slang-title-text">{{$t('swicthlang')}}</div>
        </div>
        <v-list>
          <v-list-item v-for="(item,index) in languge"
                       :key="index"
                       link
                       @click="selectlanguge(item)">
            <v-list-item-avatar :class="flagIconClass(item.lang,true)"></v-list-item-avatar>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import 'flag-icon-css/css/flag-icon.css'
import relation from './relation'
import { mapGetters } from 'vuex'
export default {
  name: 'Languge',
  components: {},
  computed: {
    ...mapGetters(['currlanguage']),
  },
  data() {
    return {
      languge: [
        { lang: 'zh', text: '中文' },
        { lang: 'en', text: 'English' },
      ],
    }
  },
  methods: {
    flagIconClass: function (lang, squared) {
      return (
        (squared ? 'flag-icon-squared ' : '') +
        'flag-icon-' +
        relation[lang.toLowerCase()]
      )
    },
    selectlanguge: function (item) {
      this.$store.dispatch('app/setcurrlanguage', item.lang)
      this.$i18n.locale = item.lang
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-butt {
  width: 54px;
  height: 48px;
  display: flex;
  align-items: center;
}
.slang-icon {
  width: 46px;
  height: 46px;
  border-radius: 100%;
  border: 6px solid #bdbdbd;
}
.slang-title {
  width: 100%;
  height: 67px;
  background-color: #444054;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slang-title-bg {
  width: 100%;
  height: 67px;
  opacity: 0.05;
  position: absolute;
  z-index: 8;
}
.slang-title-text {
  position: absolute;
  z-index: 10;
  text-align: center;
  color: #fff;
}
</style>