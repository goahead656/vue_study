<template>
<!--  开始设计导航栏-->
  <NavBar></NavBar>
  <router-view :key="$route.fullPath" />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import NavBar from "@/components/NavBar";
//注意：important
//let定义变量，只能在当前块级作用域里访问，也不能跨函数访问，对函数外部无影响；无变量提升。
// const定义常量，只能在当前块级作用域里访问，也不能跨函数访问，使用时必须初始化(即必须赋值)，
// 而且不能修改(引用数据类型，如指向的对象，即内存地址不能修改，但是能修改里面的属性)；无变量提升。

export default {
  name:"App",
  components:{
    NavBar
  }
}
</script>

<style scoped>

</style>
