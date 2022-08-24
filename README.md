# lgvue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### 环境初始化
1. vue ui 创建工程 添加 vue-router 和vuex 组件
2. 安装ui插件 vue add vuetify
3. 安装i18n 国际化插件  yarn add vue-i18n 
4. vscode 安装i18n-ally, 配置i18n-ally 插件
  ```
    {
      "i18n-ally.localesPaths": [
        "src/plugins/i18n/locales"
      ], // 翻译文件路径
      "i18n-ally.keystyle": "nested", // 翻译路径格式,
      "i18n-ally.sourceLanguage": "zh-CN", // 翻译源语言
      "i18n-ally.displayLanguage": "zh-HK", //显示语言， 这里也可以设置显示英文为en,
      // "i18n-ally.extract.keygenStrategy": "random", // 翻译字段命名采用随机字符 枚举['slug','random','empty']
      // "i18n-ally.extract.keygenStyle": "camelCase", // 翻译字段命名样式采用驼峰
    }
  ```
  5. 安装cookie插件 yarn add js-cookie
  6. 安装axios插件 yarn add axios
  7. 安装js-md5插件 yarn add js-md5
  8. 安装表单校验插件 yarn add vuelidate