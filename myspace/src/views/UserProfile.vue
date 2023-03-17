<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
<!--        :是绑定对象的，@是绑定事件的   -->
        <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user"></UserProfileInfo>
        <UserProfileWrite v-if="is_me" @post_a_post="post_a_post"></UserProfileWrite>
      </div>
      <div class="col-9">
        <UserProfilePosts :user="user" :posts="posts" @delete_a_post="delete_a_post"></UserProfilePosts>
      </div>
    </div>
  </ContentBase>
</template>

<script>
// @ is an alias to /src
import ContentBase from "@/components/ContentBase";
import UserProfileInfo from "@/components/UserProfileInfo";
import UserProfilePosts from "@/components/UserProfilePosts";
import UserProfileWrite from "@/components/UserProfileWrite";
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import $ from 'jquery'
import { useStore } from 'vuex';
import { computed } from 'vue';


export default {
  name: 'UserProfile',
  components: {
    ContentBase,
    UserProfileInfo,
    UserProfilePosts,
    UserProfileWrite
  },
  setup:()=>{
    const store=useStore();
    const route=useRoute();
    const userId=parseInt(route.params.userId);
    // console.log(userId);

    const user=reactive({});
    const posts=reactive({});

    $.ajax({
      url:"https://app165.acapp.acwing.com.cn/myspace/getinfo/",
      type:"GET",
      data:{
        user_id:userId
      },
      headers:{
        'Authorization':"Bearer "+store.state.user.access
      },
      success(resp){
        user.id=resp.id;
        user.username=resp.username;
        user.photo=resp.photo;
        user.followerCount=resp.followerCount;
        user.is_followed=resp.is_followed;
      }
    });

    $.ajax({
      url:"https://app165.acapp.acwing.com.cn/myspace/post/",
      type:"GET",
      data:{
        user_id:userId
      },
      headers:{
        'Authorization':"Bearer "+store.state.user.access
      },
      success(resp){
        // console.log(resp);
        posts.count=resp.length;
        posts.posts=resp;
      }
    });

    const follow= () =>{
      if(user.is_followed) return;
      user.is_followed=true;
      user.follwerCount++;
    };

    const unfollow= () =>{
      if(!user.is_followed) return;
      // console.log(111);
      user.is_followed=false;
      user.follwerCount--;
    };

    const is_me=computed(()=>userId===store.state.user.id);

    const post_a_post=(content) =>{
      posts.count++;
      posts.posts.unshift({
        id:posts.count,
        userId:1,
        content:content
      })
    }

    const delete_a_post=post_id=>{
      posts.posts=posts.posts.filter(post=>post.id !== post_id);
      posts.count=posts.posts.length;
    }


    return {
      user,
      follow,
      unfollow,
      posts,
      post_a_post,
      is_me,
      delete_a_post
    }
  }
}
</script>

<style scoped>
.container{
  margin-top: 20px;
}
</style>
