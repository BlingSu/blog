/*
 * @author: angelasu
 * @date: 2018/12/25
 * @description: 实现一个Promise
 */


class testPromise {
  constructor(fn) {
    this.status = 'pending'
    this.value = null
    this.fnArr = {
      resolved: [],
      rejected: []
    }

    let handle = (status, val) => {
      if (this.status === 'pending') {
        this.status = status
        this.value = val
        this.fnArr[status].forEach(fn => {
          fn.call(this, status)
        })
      }
    }

    let resolve = handle.bind(this, 'resolved')
    let reject = handle.bind(this, 'rejected')

    setTimeout(fn, null, resolve, reject)
  }

  then(resFn, rejFn) {
    if (!isFn(resFn)) resFn = (val) => val
    if (!isFn(rejFn)) rejFn = (err) => err

    return new testPromise((resolve, reject) => {

      let resolveFn = (val) => {

        try {

          if (isThen(resFn(val))) {

            resFn(val).then(resolve, reject)

          } else {

            resolve(resFn(val))

          }
        } catch(e) {

          reject(e)

        }

      }

      let rejectFn = (err) => {

        try {

          if (isThen(rejFn(err)))
            e.then(resolve, reject)

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
  return fn instanceof Function
}


const isThen = (val) => {
  return val && this.isFn(val.then)
}
