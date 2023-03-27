import request from '@/utils/request'

import axios from 'axios'

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
}

axios.request(options).then(function(response) {
  console.log(response.data)
}).catch(function(error) {
  console.error(error)
})
