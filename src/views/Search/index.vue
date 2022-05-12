<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @search="fn(value)"
      @input="inputFn"
    />
    <!-- 热门搜索容器 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 热搜关键词 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="fn(obj.first)"
        >
          {{ obj.first }}</span
        >
      </div>
    </div>
    <!-- 搜索结果页面 -->
    <!--  -->
    <div class="search_wrap" v-else>
      <!-- 热搜关键词容器与搜索结果容器互斥，需要用v-if 与 v-else进行互斥匹配 -->
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <song-item v-for="obj in resultList" :key="obj.id" :auther="obj.ar[0].name"  :name="obj.name" :id="obj.id"/>
        <!-- <van-cell
          center
          :title="obj.name"
          :label="obj.ar[0].name + ' - ' + obj.name"
          v-for="obj in resultList"
          :key="obj.id"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.7rem" />
          </template>
        </van-cell> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultListAPI } from "@/api";
import SongItem from '@/components/SongItem.vue';
export default {
  components: { SongItem },
  data() {
    return {
      list: [],
      loading: false,//数据加载完毕，保证下一次还能触发，只有为false才能触发
      finished: false, //finished为false才可以触发onload
      value: "", // 搜索关键字
      hotArr: [], //热搜关键字
      resultList: [], //搜索结果
      pages:1,
      timer:null,
    };
  },
  async created() {
    // 一创建就拿到热搜关键词
    const res = await hotSearchAPI();
    console.log(res);
    this.hotArr = res.data.result.hots;
  },
  methods: {
    // 搜索结果
    async getListFn() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.pages - 1) * 20
      });
    },
    async fn(val) {
      this.pages = 1 //点击重新获取第一页数据
      //finished为false才可以触发onload
      this.finished = false
      this.value = val; //
      // 按下调用搜索结果函数
      const res2 = await this.getListFn();
      console.log(res2);
      if (res2.data.result.songs === undefined) {
        alert('没有这首歌')
      }
      this.resultList = res2.data.result.songs;
      this.loading = false
    },
    async inputFn() {
      this.pages = 1 //点击重新获取第一页数据
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        this.finished = false
      //finished为false才可以触发onload
      if (this.value.trim().length === 0) {
        // 如果输入框的内容为空，不执行搜索，不显示列表
        this.resultList = [];

        return;
      }
      const res2 = await this.getListFn();
      console.log(res2);
      if(res2.data.result.songs === undefined){
        this.resultList = []  
        return
      }
      this.resultList = res2.data.result.songs;
      this.loading = false
      }, 900);
      

    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.pages++
      const res = await this.getListFn();
      if(res.data.result.songs === undefined){
        this.finished = true
        this.loading = false

        return
      }
      this.resultList = [...this.resultList, ...res.data.result.songs]
      this.loading = false //数据加载完毕，保证下一次还能出发，只有为false才能触发
    },
  }
  }

</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>