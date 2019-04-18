/*
 * @author: angelasu
 * @date: 2018/04/18
 * @description: es5实现一个Promise
 */
function testPromise (fn) {
  let self = this
  this.status = 'pending'
  this.data = undefined
  this.handleResolvedCallback = []
  this.handleRejectedCallback = []

  function resolve (value) {
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (let i = 0; i < self.handleResolvedCallback.length; i++) {
          self.handleResolvedCallback[i](value)
        }
      }
    }, 0)
  }

  function reject (err) {
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = err
        for (let i = 0; i < self.handleRejectedCallback.length; i++) {
          self.handleRejectedCallback[i](err)
        }
      }
    }, 0)
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

testPromise.prototype.then = function (onResolved, onRejected) {
  let self = this
  let promise2 = null
  
  onResolved = typeof onResolved === 'function' ? onResolved : function (val) { return val }
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) { return err }

  if (self.status === 'resolved') {
    return promise2 = new testPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let b = onResolved(self.data)
          if (b instanceof testPromise) {
            b.then(resolve, reject)
          } else {
            resolve(b)
          }
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new testPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let b = onRejected(self.data)
          if (b instanceof testPromise) {
            b.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }

  if (self.status === 'pending') {
    return promise2 = new testPromise(function (resolve, reject) {
      self.handleResolvedCallback.push(function (value) {
        try {
          let b = onResolved(self.data)
          if (b instanceof testPromise) {
            b.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
      self.handleResolvedCallback.push(function (err) {
        try {
          let b = onRejected(self.data)
          if (b instanceof testPromise) {
            b.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

testPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}