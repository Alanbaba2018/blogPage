<template>
  <el-header class="app-header" height="50px">
    <i class="app-header-logo" :class="weather"></i>
    <span class="app-title-bold">Thought</span>
    <span class="app-title-light"> Works</span>
  </el-header>
</template>
<script>
export default {
  name: 'xHeader',
  data() {
    return {
      weather: '',
      weatherEnum: {
        lightRain: 'el-icon-light-rain',
        sunny: 'el-icon-sunny'
      }
    };
  },
  mounted() {
    this.setWeather();
  },
  methods: {
    setWeather() {
      const weathers = Object.keys(this.weatherEnum);
      const random = weathers[Math.floor(Math.random() * weathers.length)];
      this.weather = this.weatherEnum[random];
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.app-header {
  line-height: 50px;
  text-align: left;
  color: $white-color;
  background-color: $dark-color;
  font-size: 24px;
  @include shadowBottom();
  .app-title-bold {
    font-weight: bold;
    padding-left: 10px;
    @include letterSpace(1px);
  }
  .app-header-logo {
    cursor: pointer;
  }
  .app-header-logo.el-icon-sunny:hover {
    color: $yellow-light-color;
  }
  .app-header-logo.el-icon-light-rain:hover {
    color: $blue-light-color;
  }
}
</style>
