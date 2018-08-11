webpack 4 打包

网上能找到关于webpack的文章很多，这几篇讲得较清楚，并基于webpack4

1. [Learn Webpack by Example](https://medium.freecodecamp.org/learn-webpack-by-example-blurred-placeholder-images-4ad8b1751709)
2. [From Gulp to Webpack](https://www.valentinog.com/blog/from-gulp-to-webpack-4-tutorial/)
3. [Webpack 4 Tutorial: from 0 Conf to Production Mode](https://www.valentinog.com/blog/webpack-tutorial/)
4. [Webpack your bags](https://madewithlove.be/webpack-your-bags/), 老文章，但不少概念还适用。
5. [A tale of Webpack 4 and how to finally configure it in the right way](https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1),做了一个总结，把前面几篇提到要点都总结了一下


几点经验：

1. 为什么需要 `html-loader` & `HtmlWebPackPlugin` 一起：参见第一篇文章的`HTML Processing` 章节: "It’s because we want to use loaders to transform our source HTML"  
2. css是如何处理的：
   1. **最重要一点** import the CSS in the entry point，不然webpack不会处理css文件
   2. 需要哪些loader，webpack 4 用 mini-css-extract-plugin
   3. 不需要 [style-loader](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/173)，不然报错`window is not defined` , [css load](https://github.com/webpack-contrib/css-loader) readme给的例子用了，所以很容易出错
   4. `use` 数组是从后往前处理 

> we can specify multiple loaders in the use property by passing in an array of loader objects. The file then gets processed by each of the loaders starting with the last loader in the array and then ending with the first.

在entry的js文件里import css是最关键一步，也是最容易混淆的一步:我个人的理解是webpack主要是为了组件化的开发打包，组件化的开发css文件被import在js代码里是常见做法，然后再通过 `extract plugin` 把css单独提取出来。

加下去要做的

1. 有没有可能[code split](https://webpack.js.org/guides/code-splitting/)让打包文件变小
2. 让gulp和webpack同时能用。目前代码webpack和gulp没法同时工作

直接import css在js里，gulp会报错

```
events.js:167
      throw er; // Unhandled 'error' event
      ^
SyntaxError: Unexpected token
```

注：这个问题解决了`.transform({global: true}, require("browserify-css"))`  https://github.com/cheton/browserify-css

我们目前的gulp打包有几个错误：

1. 打包东西到dist，那起服务器就应该以dist为根目录，但目前还不能，index.html读取路径还是从项目的根目录下去
2. script.js加载样式 `link.href = 'styles/phone.css'; ` 需要改掉
  