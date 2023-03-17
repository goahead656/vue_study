<template>
  <ContentBase>
    <div class="row justify-content-center">
      <div class="col-3">
        <!--        @submit是表单中自带的点击触发函数-->
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
          </div>
          <div class="error-message">{{error_message}}</div>
          <button type="submit" class="btn btn-primary">注册</button>
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
import $ from 'jquery';


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
    let password_confirm=ref('');
    let error_message=ref('');

    //定义事件
    const register=()=>{
      //每次登陆前清空error_message
      error_message.value="";
      //  注意访问ref的值的时候需要加上.value
      //   console.log(username.value,password.value)
      //  如果想要调用外面action的一个api的时候使用dispatch函数
      $.ajax({
        url:"后端提供的api",
        type:"POST",
        data:{
          username:username.value,
          password:password.value,
          password_confirm:password_confirm.value
        },
        success(resp){
          // console.log(resp);
          if(resp.result==="success"){
            store.dispatch("login",{
              username:username.value,
              password:password.value,
              success(){
                router.push({name:'userlist'});
              },
              error(){
                error_message.value="系统异常，请稍后重试";
              }
            });
          }else{
            error_message.value=resp.result;
          }
        }
      });
    }

    return{
      username,
      password,
      password_confirm,
      error_message,
      register
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
