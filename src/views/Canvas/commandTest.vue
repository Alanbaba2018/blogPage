<template>
  <div class="wrap" @click="showDialog">
    <div class="aside"></div>
    <div class="main"></div>
  </div>
</template>

<script>
import * as xCanvas from 'xCanvas';
export default {
  name: 'commandTest',
  props: {
    msg: String
  },
  mounted() {
    console.log(xCanvas);
    console.log(this.$showDailog);
  },
  methods: {
    showDialog() {
      this.$showDailog({content: '大家好'});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  width: 100%;
  position: relative;
}
.aside {
  width: 100px;
  height: 200px;
  float: left;
  // background-color: #f66;
}
.main {
  height: 250px;
  // background-color: #fcc;
}
</style>
