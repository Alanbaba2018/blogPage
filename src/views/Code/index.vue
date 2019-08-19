<template>
  <div class="code-wrap">
    <el-row type="flex" :gutter="20" style="height: 95%">
      <el-col :span="10" class="left-panel">
        <div class="code-editor single-panel" id="monaco"></div>
      </el-col>
      <el-col :span="14" class="right-panel">
        <div class="result-wrap single-panel" id="stage" ref="resultPanel"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="handle-row">
      <el-col :span="10">
        <el-button type="primary" size="small" class="compile-btn" @click="compile">运行</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import Http from '@/api/index.js';

export default {
  name: 'Code',
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = monaco.editor.create(document.getElementById('monaco'), {
      value: null,
      language: 'javascript'
    });
    this.initCode();
  },
  methods: {
    initCode() {
      const index = this.$route.params.codeIndex;
      Http.getCodeString(index).then(res => {
        this.editor.setValue(res);
      });
    },
    compile() {
      const el = this.$refs.resultPanel;
      const childNodes = el.childNodes;
      for (let i = childNodes.length - 1; i >= 0; i--) {
        el.removeChild(childNodes[i]);
      }
      const code = this.editor.getValue()
      const fn = new Function(code);
      fn.call(this);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.code-wrap {
  height: 100%;
  padding: 20px 15px;
  .single-panel {
    height: 100%;
    border: 1px solid $gray-light-color;
  }
  .result-wrap {
    position: relative;
    cursor: pointer;
  }
  .handle-row {
    margin-top: 10px;
    text-align: right;
    .compile-btn {
      padding: 9px 20px;
      margin-right: 15px;
    }
  }
}
</style>
