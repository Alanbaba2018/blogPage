<template>
  <el-container direction="vertical" class="app-container">
    <xHeader></xHeader>
    <el-container class="app-body-container">
      <xAside></xAside>
      <el-main class="app-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// @ is an alias to /src
import xHeader from './Header/index';
import xAside from './Aside/index';
export default {
  name: 'home',
  components: {
    xHeader,
    xAside
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.app-container {
  position: relative;
  height: 100%;
  .app-body-container {
    position: relative;
    height: calc(100% - 50px);
    .app-main {
      cursor: pointer;
      background-color: $gray-light-color;
    }
  }
}
</style>

