// 此文件->封装3个方法->专门用于操作token的
// 封装点东西: 目的: 代码分层, 更方便清晰, 以后修改方便
// 本地存储存的是字符串  (JSON字符串是字符串的一种)
const key = 'z-token'

// 设置
export const setToken = (token) => {
  localStorage.setItem(key, token)
}

// 获取
export const getToken = () => localStorage.getItem(key)

// 删除
export const removeToken = () => {
  localStorage.removeItem(key)
}
