<template>
  <div class="x-dialog-wrap" v-show="dialogVisible" @click.self="hidden">
    <div class="x-dialog">
      <div class="dialog-header">{{title}}</div>
      <div class="dialog-content">{{content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xDialog',
  data() {
    return {
      title: '标题',
      content: 'Dialog Body',
      dialogVisible: false
    };
  },
  methods: {
    show(opt) {
      this.content = opt.content || '';
      this.dialogVisible = true;
    },
    hidden() {
      setTimeout(() => {
        this.dialogVisible = false;
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

.x-dialog-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1);
  .x-dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
  }
  .dialog-header {
    height: 50px;
    line-height: 50px;
    padding: 10px 0 0 12px;
    background-color: $dialog-header-color;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .dialog-content {
    background: $white-color;
    padding: 20px 15px 30px;
    border: 1px solid $gray-color;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>

