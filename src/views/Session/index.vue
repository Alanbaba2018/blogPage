<template>
  <div class="reveal">
    <div class="slides">
      <section class="main-page">
        <h2>Canvas & 几何图形基础介绍</h2>
        <span style="margin-left: 500px;">by 刘鑫</span>
      </section>
      <section data-markdown data-separator="---" data-separator-vertical="--">
        <script type="text/template">
          ## 最简单的[demo](http://localhost:8080/code/1)
          ```javascript
          const stage = new xCanvas.Stage('stage')
          ```
        </script>
      </section>
      <section data-markdown data-separator="---" data-separator-vertical="--">
        ## 主要内容
        - 基本语法 <!-- .element: class="fragment" data-fragment-index="1" -->
        - 组件化 <!-- .element: class="fragment" data-fragment-index="2" -->
        - 大型应用构建 <!-- .element: class="fragment" data-fragment-index="3" -->
      </section>
      <section data-markdown data-separator="---" data-separator-vertical="--">
        <script type="text/template">
          ## 基本语法
          - 数据绑定
          - 样式绑定
          - 事件绑定
          - 修饰符
          - 过滤器
          - 指令
          --
          ## 数据绑定
          ```javascript
          new Vue({
            el: '#appList',
            data: {
              todos: [
                {text: 'HTML'},
                {text: 'CSS'},
                {text: 'javascript'}
              ]
            }
          });
          ```
          --
          ## 样式绑定
          ```javascript
          new Vue({
            el: '#app',
            data: {
              classList: ["classA", "classB"]
            }
          });
          ```
          --
          ## 事件绑定
          ```javascript
          var appEventVue = new Vue({
            el: '#appEvent',
            data: {
              message: 'hello vuejs!'
            },
            methods: {
              reverseMessage: function() {
                this.message = this.message.split('').reverse().join('');
              }
            }
          });
          ```
          --
          ## 修饰符
          Note:
          13是指keyCode为13的时候触发submit。
          按键名支持，enter, tab, delete, esc, space, down, up ,left, right
          --
          ## 过滤器
          过滤器的作用是在模型的属性指输出或写入时，进行转化。
          ```javascript
          Vue.filter('wrap', function (value, begin, end) {
            return begin + value + end
          });
          ```
          Note:
          双向指令见demo
          --
          ## 指令
          指令作用是提供一种机制，将数据的变化转化为DOM行为。
          ```javascript
          Vue.directive('log', {
            bind: function () {
              // 准备工作
              // 例如，添加事件处理器或只需要运行一次的高耗任务
            },
            update: function (newValue, oldValue) {
              console.log('new value is ', newValue);
            },
            unbind: function () {
              // 清理工作
              // 例如，删除 bind() 添加的事件监听器
            }
          });
          ```
        </script>
      </section>
      <section data-markdown data-separator="---" data-separator-vertical="--">
        <script type="text/template">
          ## 组件化
          - 注册和使用
          - props
          - 父子组件通信
          --
          ## 注册和使用
          ```javascript
          // 创建
          var MyComponent = Vue.extend({
            // 选项...
            template: '<div>A custom component!</div>'
          });
          // 注册
          Vue.component('demo', MyComponent)
          ```
          --
          ## 父子组件通信
          子组件通过事件冒泡通知父组件状态变化。
          ```javascript
          Vue.component('child', {
            template: '#child',
            data: function () {return { msg: 'hello' }},
            methods: { notify: function () {
                this.$dispatch('child-msg', this.msg)
            } }
          });
          new Vue({
            el: '#parent',
            data: { messages: [] },
            events: {'child-msg': function (msg) {
                this.messages.push(msg)
            } }
          });
          ```
        </script>
      </section>
      <section data-markdown data-separator="---" data-separator-vertical="--">
        <script type="text/template">
          ## 大型应用构建
          - 单文件组件
          - 插件
          --
          ## 单文件组件
          使用vue文件去包含一个组件的全部内容。
          ![vue文件](http://cn.vuejs.org/images/vue-component.png)
          --
          ## 插件
          - vue-resource
          - vue-devtools
          - vue-router
          - vue-validator
          Note:
          vue-resource: ajax加载；vue-devtools: chrome开发者工具；vue-router 单页面路由;vue-validator 表单验证。

        </script>
      </section>
      <section>
        <h2>Q & A </h2>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Session',
  mounted() {
    setTimeout(() => {
      Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        transition: 'slide', // none/fade/slide/convex/concave/zoom
        // Optional reveal.js plugins
        dependencies: [
          { src: '../../library/plugin/markdown/marked.js', condition: function() { return !!document.querySelector('[data-markdown]') } },
          { src: '../../library/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector('[data-markdown]') } },
          { src: '../../library/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad() } },
          { src: '../../library/plugin/zoom-js/zoom.js', async: true },
          { src: '../../library/plugin/notes/notes.js', async: true },
          { src: '../../library/plugin/canvas/index.js'}
        ]
      });
    });
  }
};
</script>

<style scoped>

</style>
