<template>
  <div id="app">
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Basic - 01</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <ul class="list-group">
          <!--使用指令v-link进行导航-->
          <a class="list-group-item"><router-link to="/">Home</router-link></a>
          <a class="list-group-item"><router-link to="/about">About</router-link></a>
          <a class="list-group-item"><router-link to="/contact">Contact</router-link></a>
        </ul>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!--用于渲染匹配的组件-->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){

  },
  created(){
    console.log($);
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
