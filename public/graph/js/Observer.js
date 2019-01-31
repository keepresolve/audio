function Observer(data, option) {
  option = option || {};
  option.watch = option.watch || {};
  this.data = data;
  this.walk(data, option);
}

var p = Observer.prototype;

var arrayProto = Array.prototype;

var arrayMethods = Object.create(arrayProto);
// 重写了数组方法  监听
["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
  function(method) {
    // 使用 Object.defineProperty 进行监听
    Object.defineProperty(arrayMethods, method, {
      value: function testValue() {
        console.log("数组被访问到了");
        const original = arrayProto[method];
        // 使类数组变成一个真正的数组
        const args = Array.from(arguments);
        original.apply(this, args);
      }
    });
  }
);

p.walk = function(obj, option) {
  let value;
  let watchKeys = Object.keys(option.watch);
  for (let key in obj) {
    // 使用 hasOwnProperty 判断对象本身是否有该属性 继承的不要
    if (obj.hasOwnProperty(key)) {
      value = obj[key];
      // 递归调用，循环所有的对象
      if (typeof value === "object") {
        // 并且该值是一个数组的话
        if (Array.isArray(value)) {
          const augment = value.__proto__ ? protoAugment : copyAugment;
          augment(value, arrayMethods, key);
          observeArray(value);
        }
        /* 
     如果是对象的话，递归调用该对象，递归完成后，会有属性名和值，然后对
     该属性名和值使用 Object.defindProperty 进行监听即可
     */
        new Observer(value);
      }
      let cb = option.watch[watchKeys.find(v => v == key)];
      this.convert(key, value, cb);
    }
  }
};

p.convert = function(key, value, cb) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log(key + "被访问到了");
      return value;
    },
    set: function(newVal) {
      cb && cb(newVal, value);
      console.log(key + "被重新设置值了" + "=" + newVal);
      // 如果新值和旧值相同的话，直接返回
      if (newVal === value) return;
      // if (key == "list") {
      //   render(newVal);
      // }
      value = newVal;
    }
  });
};

function observeArray(items) {
  for (let i = 0, l = items.length; i < l; i++) {
    observer(items[i]);
  }
}

function observer(value) {
  if (typeof value !== "object") return;
  let ob = new Observer(value);
  return ob;
}

function def(obj, key, val) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: true,
    writable: true,
    configurable: true
  });
}

// 兼容不支持 __proto__的方法
function protoAugment(target, src) {
  target.__proto__ = src;
}

// 不支持 __proto__的直接修改先关的属性方法
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}

function Element(tagName, props, children) {
  if (!(this instanceof Element)) {
    //如果非Element实例 自动实例化
    return new Element(tagName, props, children);
  }
  // [this.tagName, this.props, this.children] = [...arguments]
  // this.props.key = this.props ? this.props.key : undefined
  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
  this.key = props ? props.key : undefined;

  let count = 0; //所有子元素计数
  this.children.forEach(child => {
    if (child instanceof Element) {
      count += child.count; //标签元素
    }
    count++; //如果是文本元素
  });
  this.count = count;
}

// 渲染
Element.prototype.render = function() {
  const el = document.createElement(this.tagName);
  const props = this.props;

  for (const propName in props) {
    setAttr(el, propName, props[propName]);
  }

  this.children.forEach(child => {
    const childEl =
      child instanceof Element
        ? child.render()
        : document.createTextNode(child);
    el.appendChild(childEl);
  });

  return el;
};

// 属性设置
function setAttr(node, key, value) {
  switch (key) {
    case "style":
      node.style.cssText = value;
      break;
    case "value": {
      const tagName = node.tagName.toLowerCase() || "";
      if (
        (tagName === "input" || tagName === "textarea", tagName == "button")
      ) {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    }
    default:
      node.setAttribute(key, value);
      break;
  }
}

function render(list, dom) {
  document.getElementsByClassName("warpper")[0].innerHTML = "";
  let virtualDom = list.map((v, index) =>
    Element(
      "li",
      {
        id: v.id,
        index,
        "data-src": v.path,
        src: v.remotePath,
        isplay: "false"
      },
      [
        Element("input", { type: "checkbox" }, []),
        v.fileName,
        Element("div", { class: "item" }, [
          Element("img", { src: "play.gif" }, [])
        ])
      ]
    )
  );
  let domTree = Element("ul", { class: "showList" }, virtualDom);
  console.log({ domTree, reder: domTree.render() });
  document.getElementsByClassName("warpper")[0].appendChild(domTree.render());
}

// var tree = Element('div', { id: 'virtual-container' }, [
//     Element('p', {}, ['Virtual DOM']),
//     Element('div', {}, ['before update']),
//     Element('ul', {}, [
//         Element('li', { class: 'item' }, ['Item 1']),
//         Element('li', { class: 'item' }, ['Item 2']),
//         Element('li', { class: 'item' }, ['Item 3']),
//     ]),
// ]);

// var root = tree.render();
// document.getElementById('virtualDom').appendChild(root);
// const newTree = Element('div', { id: 'virtual-container' }, [
//     Element('h3', {}, ['Virtual DOM']),                     // REPLACE
//     Element('div', {}, ['after update']),                   // TEXT
//     Element('ul', { class: 'marginLeft10' }, [              // PROPS
//         Element('li', { class: 'item' }, ['Item 1']),
//         // Element('li', { class: 'item' }, ['Item 2']),    // REORDER remove
//         Element('li', { class: 'item' }, ['Item 3']),
//     ]),
// ]);

// //   // 下面是测试数据

//   var data = {
//     testA: {
//       say: function() {
//         console.log("kongzhi");
//       }
//     },
//     xxx: [{ a: "b" }, 11, 22]
//   };

//   var test = new Observer(data);

//   console.log(test);

//   data.xxx.push(33);
