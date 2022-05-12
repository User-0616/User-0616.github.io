<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar :title="activeTitle" fixed/> 
    
    <div class="main">
      <!-- 二级路由挂载点 -->
      <router-view></router-view>
    </div>
    

  <!-- 底部首页与搜索导航 -->
    <van-tabbar v-model="active"> 
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      activeTitle:this.$route.meta.title //默认顶部导航栏要显示的标题，获取当前路由对象的meta中的title值
    };
  },
  watch: {
    //侦听路由对象的改变
    $route(){
      this.activeTitle = this.$route.meta.title
    }
  }
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>