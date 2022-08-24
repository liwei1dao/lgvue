import request from '@/utils/request'

///发送验证码
export function sendemailcaptcha (data) {
  return request({
    url: '/lego/api/sendemailcaptcha',
    method: 'post',
    data
  })
}


///邮箱注册
export function emailregister (data) {
  return request({
    url: '/lego/api/emailregister',
    method: 'post',
    data
  })
}

///邮箱登录
export function emaillogin (data) {
  return request({
    url: '/lego/api/emaillogin',
    method: 'post',
    data
  })
}

///邮箱登录
export function getinfo (data) {
  return request({
    url: '/lego/api/getinfo',
    method: 'post',
    data
  })
}