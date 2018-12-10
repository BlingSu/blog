/*
 * @author: angelasu
 * @date: 2018/12/10
 * @description: 解释器模式。通过使用这个解释器来解释语言中定义的句子.
 */

 /**
  * 假设如下HTML如何获取id为fuck元素相对于文档的路径？
  */

<div id="container">
  <div>
    <div>
      <ul>
        <li><span id="span1"></span></li>
        <li><span id="span2"></span></li>
      </ul>
    </div>
  </div>
  <div>
    <div>
      <ul>
        <li><span id="span1"></span></li>
        <li><span id="span2"></span></li>
      </ul>
    </div>
  </div>
</div>


// 同级兄弟元素遍历
function getSublingName(node) {
  // 如果存在兄弟元素
  if (node.previousSibling) {
    let name = '',  // 返回的兄弟元素名称字符串
        count = 1,  // 紧邻兄弟元素中相同名称元素个数
        nodeNmae = node.nodeNmae,  // 原始节点名称
        sibling = node.previousSibling;  // 前一个兄弟元素
    // 如果存在前一个兄弟
    while(sibling) {
      /**
       * 如果节点圆元素
       * 节点类型与前一个兄弟元素类型相同
       * 前一个兄弟元素存在
       * */ 
      if (sibling.nodeType == 1 && sibling.nodeType === node.nodeType && sibling.nodeNmae) {
        // 如果节点名称和前一个兄弟元素名称相同
        if (nodeNmae == sibling.nodeNmae) {
          // 节点名称后面添加计数
          name += ++count
        } else {
          // 充值相同紧邻节点名称节点个数
          count = 1
          // 追加新的节点名称
          name += `|${sibling.nodeNmae.toUpperCase()}`
        }
      }
      // 向前获取前一个兄弟元素
      sibling = sibling.previousSibling
    }
    return name
  } else {
    // 否则不存在兄弟元素返回空
    return ''
  }
}

/**
 * XPath解释器
 * 遍历文档树
 * */ 

var Interpreter = (function() {
  const getSublingName = (node) => {}

  /**
   * node: 目标节点
   * wrap 容器节点
   */
  return (node, wrap) => {
    // 路径数组
    let path = [],
        // 如果不存在容器节点，默认为document
        wrap = wrap || document
    // 如果当前节点等于容器节点
    if (node == wrap) {
      // 容器节点为元素
      if (wrap.nodeType == 1) {
        // 路径数组中输入容器节点名称
        path.push(wrap.nodeNmae.toUpperCase())
      }
      // 返回最终路径数组结算
      return path
    }

    // 如果当前节点的父节点不等于容器节点
    if (node.parentNode !== wrap) {
      // 对当前节点的父节点执行遍历操作
      path = arguments.callee(node.parentNode, wrap)
      // 如果当前节点的父节点与容器节点相等
    } else {
      // 容器节点为元素
      if (wrap.nodeType == 1) {
        // 路径数组中输入容器节点名称
        path.push(wrap.nodeNmae.toUpperCase())
      }      
    }
    // 获取元素的兄弟元素名称统计
    let sublingsNames = getSublingName(node)

    // 如果节点为元素
    if (node.nodeType == 1) {
      // 输入当前节点元素名称及其前面兄弟元素名称统计
      path.push(node.nodeNmae.toUpperCase() + sublingsNames)
    }
    // 返回最终路径数组结果
    return path
  }
})()


/**
 * test
 */

 var path = Interpreter(document.getElementById('fuck'))

 console.log(path.join('>'))