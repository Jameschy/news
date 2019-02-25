<template>
  <div class="wrapper">
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in"><router-view></router-view></transition>

      <p>这是个比CD首页</p>
    </div>
  </div>
</template>

<script>
  import vSidebar from './Sidebar.vue';
  export default {
    data() {
      return {

      }
    },
    components:{
      vSidebar
    }
  }
</script>
