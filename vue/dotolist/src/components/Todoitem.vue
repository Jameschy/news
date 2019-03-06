<template>
  <li class="item" @click="handleDelete">{{content}}</li>
</template>

<script>
export default {
     props: [ 'content', 'index' ],
     methods: {
     handleDelete () {
       this.$emit('delete', this.index)
     }
   }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--scoped 作用域修饰符，只对当前组件生效-->
<!--如果不用scoped，父组件和子组件含同名class时，父组件样式会被子组件污染，会全局生效；-->
<!--添加scoped，子组件样式就只对子组件生效-->
<style scoped>
.item{
  color: green;
}
</style>
