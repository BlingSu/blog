/*
 * @author: angelasu
 * @date: 2018/12/11
 * @description: 数据访问对象模式。 抽象和封装对数据源的访问和存储，DAO通过对数据源链接的管理方便对数据的访问与存储。
 */

 /**
  * 本地存储类
  * preId 本地存储数据库前缀
  * timeSign 时间戳与存储数据之间的拼接符
  */
 
  const BaseLocalStorage = (preId, timeSign) => {
   this.preId = preId
   // 定义时间戳和存储数据之间的拼接符
   this.timeSign = timeSign || '|-|'
 }

 /**
  * 数据操作状态
  */

  BaseLocalStorage.prototype = {
    // 操作状态
    status: {
      SUCCESS: 0,  // 成功
      FAILURE: 1,  // 失败
      OVERFLOW: 2,  // 溢出
      TIMEOUT: 3  // 超时
    },
    storage: localStorage || window.localStorage,
    getKey (key) {
      return this.preId + key
    },
    set(key, value, callback, time) {
      // ...
    },
    remove(key, callback) {
      // ...
    }
  }

  /**
   * 增添数据
   * key 数据字段标识
   * value 数据值
   * callback 回调参数
   * time 添加时间
   */

   const set = (key, value, callback, time) => {
     let status = this.status.SUCCESS,
        key = this.getKey(key)

      try {
        time = new Date(time).getTime() || time.getTime()
      } catch(e) {
        // 如果时间有误默认取1个月
        time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31
      }

      try {
        // 向数据中添加数据
        this.storage.setItem(key, time + this.timeSign + value)
      } catch(e) {
        // 溢出失败，返回溢出状态
        status = this.status.OVERFLOW
      }

      // 有callback则执行并传入吃桉树操作状态，真实数据字段标识及存储数据值
      callback && callback.call(this, status, key, value)
   }



   /**
    * 获取数据
    * key  数据字段标识
    * callback 回调函数
    */

    const get = (key, callback) => {
      let status = this.status.SUCCESS, //操作状态
          key = this.getKey(key),   // 获取
          value = null,   // 默认null
          timeSignLen = this.timeSign.length, // 时间戳与存储数据之间的拼接符长度
          that = this, // cache
          index,  // 时间戳和储存数据之间拼接符起始位置
          time,   // 时间戳
          result  // 结果

      try {
        value = that.storage.getItem(key)
      } catch (e) {
        result = {
          status: that.status.FAILURE,
          value: null
        }
        callback && callback.call(this, result.status, result.value)
        return result
      }

      if (value) {
        //  时间戳与存储数据之间的拼接符起始位置
        index = value.indexOf(that.timeSign)
        // 获取时间戳
        time = +value.slice(0, index)

        if (new Date(time).getTime() > new Date().getTime() || time == 0) {
          value = value.slice(index + timeSignLen)
        } else {
          value = null
          status = that.status.TIMEOUT
          this.remove(key)
        }
      } else {
        status = that.status.FAILURE
      }

      result = {
        status: status,
        value: value
      }

      callback && callback.call(this, result.status, result.value)
      return result
    }

  /**
   * 删除数据
   * key  数据字段标识别
   * callback  回调函数
   */

  const remove = (key, callback) => {
    let status = this.status.FAILURE,
        key = this.getKey(key),
        value = null
  
    try {
      value = this.storage.getItem(key)
    } catch(e) {
      if (value) {
        try {
          this.storage.removeItem(key)
          status = this.status.SUCCESS
        } catch (e) {}
      }
    }

    callback && callback.call(this, status, status > 0 ? null : value.slice(value.indexOf(this.timeSign) + this.timeSign.length))
    }


  /**
   * 校验
   */

  const LS = new BaseLocalStorage('LS__')
  LS.set('test', '1', function() { console.log(arguments) })
  LS.get('test', function() { console.log(arguments) })
  LS.remove('test', function() { console.log(arguments) })
  LS.get('test', function() { console.log(arguments) })






  /**
   * 使用MongoDB数据库
   * 在NodeJS中配置
   */

  /* config.js */
  module.exports = {
    DB: {
      db: 'test', // 数据库名称
      host: 'localhost',
      port: 27017
    }
  }

  /*连接MongoDB  db.js */
  const mongodb = require(`mongodb`)
  const config = require('./config').DB
  // 创建数据库对象
  const dbObject = new mongodb.Db(
    config.db,
    new mongodb.Server(
      config.host,
      config.port,
      {auto_reconnect: true},  // 自动连接
      {safe: true}  //  安全模式
    )
  )

  exports.DB = () => {}


  /**
   * 打开数据库，操作集合
   * @param col 集合名
   * @param fn 操作方法
   */

  const connect = (col, fn) => {
    d.open((err, db) => {
      if (err) {
        throw err
      } else {
        // 操作集合
        db.collection(col, (err, col) => {
          if (err) {
            throw err
          } else {
            fn && fn(col, db)
          }
        })
      }
    })
  }

  // 执行的增删查改要在connect的fn中实现
  exports.DB = (col) => {
    return {
      /**
       * param data     插入数据项
       * pararm success 插入成功回调函数
       * param fail     插入失败回调函数
       */
      insert: (data, success, fail) => {
        connect(col, (col, db) => {
          col.insert(data, (err, docs) => {
            if (err) {
              fail && fail(err)
            } else {
              success && success(docs)
              db.close()
            }
          })
        })
      },
      remove: (data, success, fail) => {
        /**
         * param data     删除数据项
         * pararm success 成功回调函数
         * param fail     失败回调函数
         */
        connect(col, (col, db) => {
          col.remove(data, (err, len) => {
            if (err) {
              fail && fail(err)
            } else {
              success && success(len)
              db.close()
            }
          })
        })
      },
      update: (con, doc, success, fail) => {
        /**
         * param con     筛选条件
         * pararm doc    更新数据项
         * param success 成功回调
         * param fail    失败回调
         */
        connect(col, (col, db) => {
          col.update(con, doc, (err, len) => {
            if (err) {
              fail && fail(err)
            } else {
              success && success(len)
              db.close()
            }
          })
        })
      },
      find: (con, success, fail) => {
        /**
         * @param con      查找条件
         * @param success  成功条件
         * @param fail     失败条件
         */
        connect(col, (col, db) => {
          col.find(con).toArray((err, docs) => {
            if (err) {
              fail && fail(err)
            } else {
              success && success(docs)
              db.close()
            }
          })
        })
      }
    }
  }