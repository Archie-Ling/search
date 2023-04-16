import request from '@/utils/request'

export default {
  fetchById(userId, status) {
    return request({
      url: '/file/fetch/' + userId + '/' + status,
      method: 'get'
    })
  }
}
