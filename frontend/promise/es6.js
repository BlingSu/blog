/*
 * @author: angelasu
 * @date: 2018/12/25
 * @description: es6实现一个Promise
 */


class testPromise {
  constructor(fn) {
    this.status = 'pending'
    this.value = null
    this.fnArr = { resolved: [], rejected: [] }

    let handle = (status, value) => {
      if (this.status === 'pending') {
        this.status = status
        this.value = value
        this.fnArr[status].forEach(fn => {
          fn.call(this, status)
        })
      }
    }

    let resolve = handle.bind(this, 'resolved')
    let reject = handle.bind(this, 'rejected')

    fn(resolve, reject)
  }

  then(resFn, rejFn) {
    if (!isFn(resFn)) resFn = (val) => val
    if (!isFn(rejFn)) rejFn = (err) => err

    return new testPromise((resolve, reject) => {
      let resolveFn = (val) => {
        setTimeout(() => {
          try {
            let v = resFn(val)
            if (isThen(v)) {
              v.then(resolve, reject)
            } else {
              resolve(v)
            }
          } catch(e) {
            reject(e)
          }
        }, 0)
      }

      let rejectFn = (err) => {
        try {
          let e = rejFn (err)
          if (isThen(e)) {
            e.then(resolve, reject)
          }
        } catch(e) {
          reject(e)
        }
      }

      switch (this.status) {
        case 'pending':
          this.fnArr['resolved'].push(resolveFn)
          this.fnArr['rejected'].push(rejectFn)
          break
        case 'resolved':
          resolveFn(this.value)
          break
        case 'rejected':
          rejectFn(this.value)
          break
      }
    })
  }
}


const isFn = (fn) => {
  return typeof fn === 'function'
}

const isThen = (val) => {
  return val && this.isFn(val.then)
}
