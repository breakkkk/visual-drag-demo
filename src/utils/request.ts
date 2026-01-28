import { ElMessage } from 'element-plus'

export const urlRE = /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/

function request(options: any, responseType: any = 'json') {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.timeout = 6000

    let url = getURL(options.url)
    if (options.method === 'GET') {
      url += `${getURLParam(options.data)}`
    }

    xhr.open(options.method, url)

    xhr.ontimeout = reject
    xhr.onerror = reject
    xhr.onload = (e: any) => {
      resolve(e.target.response)
    }

    xhr.send(JSON.stringify(getURLData(options.data, options.paramType)))
  })
}

function getURLParam(data: any[]) {
  let result = ''
  data.forEach((item) => {
    if (item[0]) {
      result += `&${item[0]}=${item[1]}`
    }
  })

  return result ? `?${result}` : ''
}

function getURLData(data: any[], paramType: string) {
  if (!data) return ''

  if (paramType === 'array') {
    return data
  }

  const result: any = {}
  data.forEach((item) => {
    if (item[0]) {
      result[item[0]] = item[1]
    }
  })

  return result
}

export function getURL(url: string) {
  return url.startsWith('http') ? url : `https://${url}`
}

/**
 *
 * @param {object} options 请求的相关参数
 * @param {object} obj 需要修改的数据的父对象
 * @param {string} key 需要修改的数据在父对象中对应的 key
 * @param {string} responseType 需要修改的数据对应的类型
 * @returns {function} 可以取消请求的函数
 */
export default function requestWarpper(options: any, obj: any, key: string, responseType: string = 'object') {
  let count = 0
  let timer: any
  const url = options?.url
  if ((url && !/^\d+$/.test(url)) || urlRE.test(getURL(url))) {
    if (!options.series) {
      request(options, responseType)
        .then((data: any) => {
          if (responseType === 'object' || responseType === 'array') {
            obj[key] = JSON.parse(data)
          } else {
            obj[key] = data
          }
        })
        .catch((err) => ElMessage.error(err?.message || err))
    } else {
      timer = setInterval(() => {
        if (options.requestCount != 0 && options.requestCount <= count) {
          clearInterval(timer)
          return
        }

        count++
        request(options, responseType)
          .then((data: any) => {
            if (responseType === 'object' || responseType === 'array') {
              obj[key] = JSON.parse(data)
            } else {
              obj[key] = data
            }
          })
          .catch((err) => ElMessage.error(err?.message || err))
      }, options.time)
    }
  }

  return function cancelRequest() {
    clearInterval(timer)
  }
}
