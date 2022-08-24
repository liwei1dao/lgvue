import Vue from 'vue'
import MessageVue from './Message.vue'

let MessageConstructor = Vue.extend(MessageVue)

let instance
let instances = []
let seed = 1
const Message = function (message, color, icon, typeClass) {
  let id = 'message_' + seed++
  instance = new MessageConstructor({
    propsData: {
      message: message,
      color: color,
      icon: icon,
      typeClass: typeClass,
    }
  })
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  instance.dom.style.zIndex = 10000
  instances.push(instance)
  return instance.vm
}

Message.success = function (message) {
  Message(message, "#67c23a", "mdi-marker-check", "message--success")
}

Message.alert = function (message) {
  Message(message, "#67c23a", "mdi-alert", "message--alert")
}

Message.error = function (message) {
  Message(message, "#CC0033", "mdi-backspace", "message--error")
}

Message.close = function (id) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      instances.splice(i, 1)
      break
    }
  }
}

Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}
export default Message