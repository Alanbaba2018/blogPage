<template>
  <div class="wrap">
    <div class="aside"></div>
    <div class="main"></div>
  </div>
</template>

<script>
export default {
  name: 'commandTest',
  props: {
    msg: String
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
  background-color: #f66;
}
.main {
  height: 250px;
  background-color: #fcc;
}
</style>
