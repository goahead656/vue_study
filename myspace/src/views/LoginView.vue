<template>
  <ContentBase>
    <div class="row justify-content-center">
      <div class="col-3">
<!--        @submit是表单中自带的点击触发函数-->
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="error-message">{{error_message}}</div>
          <button type="submit" class="btn btn-primary">登录</button>
        </form>
      </div>
    </div>

  </ContentBase>
</template>

<script>
// @ is an alias to /src
import ContentBase from "@/components/ContentBase";
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from "@/router/index";


export default {
  name: 'LoginView',
  components: {
    ContentBase
  },
  setup(){
    const store=useStore();

    //定义变量
    let username=ref('');
    let password=ref('');
    let error_message=ref('');

    //定义事件
    const login=()=>{
      //每次登陆前清空error_message
      error_message.value="";
    //  注意访问ref的值的时候需要加上.value
    //   console.log(username.value,password.value)
    //  如果想要调用外面action的一个api的时候使用dispatch函数
      store.dispatch("login",{
        username:username.value,
        password:password.value,
        success(){
          // console.log("success");
          //进行跳转
          router.push({name:'userlist'});
        },
        error(){
          // console.log("failed");
          error_message.value="用户名或密码错误";
        }
      })
    }

    return{
      username,
      password,
      error_message,
      login
    }
  }
}
</script>

<style scoped>
.container{
  margin-top: 20px;
}
button{
  width: 100%;
}

.error-message{
  color: red;
}

</style>
