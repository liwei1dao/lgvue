
// 导出socket对象
export {
  socket
}

// socket主要对象
var socket = {
  websock: null,
  // 固定的WebSocket地址：此处是从env文件中读取socket地址，可以自行从其他config文件中读取或直接写死
  // 如需使用动态WebSocket地址，请自行作ajax通讯后扩展
  ws_url: process.env.VUE_APP_API_SOCKET_URL,
  // 开启标识
  socket_open: false,
  // 心跳timer
  hearbeat_timer: null,
  // 心跳发送频率
  hearbeat_interval: 5000,

  // 是否自动重连
  is_reonnect: false,
  // 重连次数
  reconnect_count: 3,
  // 已发起重连次数
  reconnect_current: 1,
  // 重连timer
  reconnect_timer: null,
  // 重连频率
  reconnect_interval: 3000,
  // 消息监听
  receivelisten: null,
  // 关闭监听
  closelisten: null,
  /**
   * 初始化连接
   */
  init: (ws_url) => {
    socket.ws_url = ws_url ? ws_url : socket.ws_url
    return new Promise(socket.connect)
  },




  /**
   * 发送消息
   * @param {*} data 发送数据
   * @param {*} callback 发送后的自定义回调函数
   */
  send: (data, callback = null) => {
    socket.websock.send(data)
    if (callback) {
      callback()
    }
  },

  /**
   * 接收消息
   * @param {*} message 接收到的消息
   */
  receive: (message) => {
    var params = JSON.parse(message.data)

    if (params.kind != 0) {
      console.log('收到服务器内容：', message.data)
    }

    if (params == undefined) {
      console.log("收到服务器空内容")
      return false
    }

    // 以下是接收消息后的业务处理，仅供参考

    // 被服务器强制断开
    if (params.kind != undefined && params.kind == 110) {
      socket.socket_open = false
      socket.is_reonnect = true

      // 被服务器踢掉
    } else if (params.kind == 99) {
      socket.socket_open = true
      socket.is_reonnect = false
      console.log("被挤下线 不做处理")
      return false
    } else if (params.kind == 'order_new') {
      console.log('有新的订单通知')
      var time = Date.parse(new Date()) / 1000
      params.timestamp = parseInt(params.timestamp)

      console.log(time - params.timestamp)

      // 测试环境不限制推送时间
      if (process.env.NODE_ENV == 'development') {
        // 小于半小时push和播放  大于半小时并且小于3天只push  大于3天不处理
        if ((time - params.timestamp) > 3600 * 24 * 3) {
          console.log('超过三天')
          return false
        }

        if ((time - params.timestamp) > 30 * 60 && (time - params.timestamp) < 3600 * 24 * 3) {
          console.log('超过半小时')
          return false
        }
      }

      // uniapp中可以使用$on和$emit来实现对应的业务处理

    } else if (params.kind == 'refund_created') {
      console.log('有新的退款订单')

    }

    if (params.kind == 'order_new' || params.kind == 'refund_created') {
      console.log('订单列表刷新')
    }
    // 自行扩展其他业务处理...
  },

  /**
   * 心跳
   */
  heartbeat: () => {
    console.log('socket', 'ping')
    if (socket.hearbeat_timer) {
      clearInterval(socket.hearbeat_timer)
    }

    socket.hearbeat_timer = setInterval(() => {
      const token = storage.get('Access-Token')
      var data = {
        kind: 0, //请求类型 kind 0 心跳包
        shop_id: Vue.prototype.$shop_id(false), //如果是商家 传当前店铺ID 否则可不传
        'API-Token': token, //用户的token
        'API-Source': 'MERCHANT', // MERCHANT  商家  CUSTOMER  顾客
      }
      socket.send(data)
    }, socket.hearbeat_interval)
  },

  /**
   * 主动关闭连接
   */
  close: () => {
    console.log('主动断开连接')
    clearInterval(socket.hearbeat_timer)
    socket.is_reonnect = false
    socket.websock.close()
  },

  /**
   * 连接
   */
  connect: (resolve, reject) => {
    console.log('连接服务器 连接次数', socket.reconnect_current)

    if (!("WebSocket" in window)) {
      console.log('浏览器不支持WebSocket')
      return reject("浏览器不支持WebSocket")
    }
    // 已经创建过连接不再重复创建
    if (socket.websock) {
      return resolve(socket.websock)
    }
    socket.websock = new WebSocket(socket.ws_url)
    socket.websock.onmessage = function (e) {
      if (socket.receivelisten != null) {
        socket.receivelisten(e)
      } else {
        socket.receive(e)
      }
    }
    // 关闭连接
    socket.websock.onclose = function (e) {
      console.log('连接已断开')
      console.log('connection closed (' + e.code + ')')
      clearInterval(socket.hearbeat_interval)
      socket.socket_open = false
      socket.websock = null
      // 需要重新连接
      if (socket.is_reonnect) {
        socket.reconnect_timer = setTimeout(() => {
          // 超过重连次数
          if (socket.reconnect_current > socket.reconnect_count) {
            clearTimeout(socket.reconnect_timer)
            return reject("超过重连次数")
          }

          // 记录重连次数
          socket.reconnect_current++
          return socket.connect(resolve, reject)
        }, socket.reconnect_interval)
      } else {
        if (socket.closelisten != null)
          socket.closelisten()
        return reject("连接失败")
      }
    }

    // 连接成功
    socket.websock.onopen = function () {
      console.log('连接成功')
      socket.reconnect_current = 0
      socket.socket_open = true
      // socket.is_reonnect = true
      // 开启心跳
      // socket.heartbeat()
      resolve(socket.websock)
    }
    // 连接发生错误
    socket.websock.onerror = function () {
      socket.websock = null
      console.log('WebSocket连接发生错误')
      // reject("WebSocket连接发生错误")
    }
  },
}