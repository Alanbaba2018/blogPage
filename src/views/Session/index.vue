<template>
  <div class="reveal">
    <div class="slides">
      <section class="main-page">
        <h2>Canvas & 几何图形基础介绍</h2>
        <span style="margin-left: 500px;">by 刘鑫</span>
      </section>
      <section data-markdown data-separator="---" data-separator-vertical="--">
        <script type="text/template">
          ## 最简单的demo
          - [中国地图](http://localhost:8080/code/1)
          - [热力图](http://localhost:8080/code/3)
        </script>
      </section>
      <section data-markdown data-separator="---" data-separator-vertical="--">
        ## 主要内容
        - 一些canvas[基本用法](http://localhost:8080/code/2) <!-- .element: class="fragment" data-fragment-index="1" -->
        - 一些几何图形算法 <!-- .element: class="fragment" data-fragment-index="2" -->
        - 交互 = 绘制 + 几何判定 <!-- .element: class="fragment" data-fragment-index="3" -->
      </section>
      <section data-markdown data-separator="---" data-separator-vertical="--">
        <script type="text/template">
          ## 几何基础算法
          - [点即向量](http://localhost:8080/code/4?lang=typescript&compile=false&mode=default)
          - [点在直线判定](http://localhost:8080/code/5?lang=typescript&compile=false&mode=default)
          - [点在多边形判定](http://localhost:8080/code/6?lang=typescript&compile=false&mode=default)
          - 两个矩形相交判断 即 判断两个矩形的外包矩形的宽高是否小于两个矩形宽高分别相加
          - .....
        </script>
      </section>
      <section data-markdown data-separator="---" data-separator-vertical="--">
        ## Canvas交互
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
