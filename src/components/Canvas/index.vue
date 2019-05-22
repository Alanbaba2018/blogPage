<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
