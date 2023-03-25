import request from '@/utils/request'
import axios from "axios";


const options = {
  method: 'POST',
  url: 'http://localhost:8081/user/login',
  params: {
    creationTime: '',
    id: '',
    lastAccessedTime: '',
    maxInactiveInterval: '',
    new: '',
    valueNames: ''
  },
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'content-type': 'application/json'
  },
  data: 'pwd'
};

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}


export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
