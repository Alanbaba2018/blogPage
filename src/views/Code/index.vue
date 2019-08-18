<template>
  <div class="code-wrap">
    <el-row type="flex" :gutter="20" style="height: 95%">
      <el-col :span="10" class="left-panel">
        <div class="code-editor single-panel" id="monaco"></div>
      </el-col>
      <el-col :span="14" class="right-panel">
        <div class="result-wrap single-panel"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="handle-row">
      <el-col :span="10">
        <el-button type="primary" size="small" class="compile-btn">运行</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

export default {
  name: 'Code',
  data() {
    return {
      monacoInstance: null
    };
  },
  mounted() {
    this.monacoInstance = monaco.editor.create(document.getElementById('monaco'), {
      value: null,
      language: 'javascript'
    });
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
