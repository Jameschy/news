<template id="about">
  <div>
    <h1>About</h1>
    <p>This is the tutorial about vue-router.</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed:{
      onRoutes(){
        return this.$route.path.replace('/','');
      }
    },
  }
</script>
