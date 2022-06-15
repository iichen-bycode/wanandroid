<!-- 文章侧边 -->
<template>
   <div class="content">
      <!-- 搜索框   -->
      <div class="search clearfix">
        <input class="search_input" type="search" placeholder="搜索关键词以空格形式隔开" v-model="searchKey" @keydown.enter="doSearch">
        <div class="search_icon" @click="doSearch">
          <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/1e8ab9a22f0ddc36349f60b38900d0bd.svg"
               alt="搜索">
        </div>
      </div>
      <!--  个人信息和福利  -->
      <div class="card">
        <h2 class="title">
          <span>个人信息和福利</span>
        </h2>
        <ul class="leading-list">
          <li><a>消息中心<span v-if="!userInfo">: 需登录</span></a></li>
          <li>
            <a class="plr">本站积分
              <span v-if="!userInfo">: 需登录</span>
              <template v-else>
                <span class="point">{{ rankLevel?.coinCount }}</span>
                <span class="level">lv {{ rankLevel?.level }}</span>
                <span class="rank">排名 {{ rankLevel?.rank }}</span>
              </template>
            </a>
          </li>
          <li>
            <a>积分规则 </a>
            <a>积分排行榜</a>
          </li>
        </ul>
      </div>
      <!-- 搜索热词   -->
      <div class="card">
        <h2 class="title">
          <span>大家都在搜</span>
        </h2>
        <ul class="hot_search">
          <li v-for="hot in hotSearch" :key="hot.id">
            <a class="hot_link">{{ hot.name }}</a>
          </li>
        </ul>
      </div>

      <!-- 常用网站   -->
      <div class="card">
        <h2 class="title">
          <span>常用网站</span>
        </h2>
        <ul class="p_category_ul" v-for="pCategory in commonNet" :key="pCategory.category">
          <li>{{ pCategory.category }}</li>
          <li v-for="category in pCategory.data" :key="category.id">
            <a :href="category.link" target="_blank">{{ category.name}}</a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script setup lang="ts">
import {mapState, useStore} from 'vuex'
import {computed, nextTick, onMounted, ref} from "vue";
import homeStore from "@/router/home";
import {getCommonNet, getHotSearch} from "@/api/api";
import {ElMessage} from "element-plus"; // 引入useStore 方法
const store = useStore()  // 该方法用于返回store 实例

const rankLevel = computed(() => store.state.homeStore.rankLevel)
const userInfo = computed(() => store.state.loginStore.userInfo)

nextTick(() => {
  store.dispatch('getUserRankLevel');
})


const hotSearch = ref()
const commonNet = ref()
const searchKey = ref()

const doSearch = () => {
    if(searchKey.value){

    }else{
      ElMessage({
        message: '搜索关键词不能为空哦！',
        type: "error"
      })
    }
}

onMounted(() => {
  getHotSearch().then(res => {
    if (res) {
      hotSearch.value = res.data
    }
  });


  getCommonNet().then(res => {
    if (res) {
      let dataArr = <any>[];
      res.data.map(mapItem => {
        if (dataArr.length == 0) {
          dataArr.push({category: mapItem.category, data: [mapItem]})
        } else {
          let res = dataArr.some(item => {
            if (item.category == mapItem.category) {
              item.data.push(mapItem)
              return true
            }
          })
          if (!res) {
            dataArr.push({category: mapItem.category, data: [mapItem]})
          }
        }
      })
      commonNet.value = dataArr
    }
  })
})


</script>

<style scoped lang="scss">

.content {
  width: 100%;
  overflow: auto;

  .search {
    background-color: white;
    padding: 0 10px;

    .search_input {
      float: left;
      height: 36px;
      width: 70%;
      font-size: 12px;
    }

    .search_icon {
      float: right;
      height: 36px;
      line-height: 36px;
    }
  }

  .card {
    background-color: white;
    margin-top: 12px;

    .title {
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid #8DB5D0;
      //padding-left: 10px;
      text-indent: 10px;
    }

    .leading-list {
      padding: 10px;

      & > li {
        height: 30px;
        line-height: 30px;

        &:before {
          content: '';
          float: left;
          width: 6px;
          height: 6px;
          margin-top: 12px;
          margin-right: 5px;
          background-color: #276692;
          border-radius: 50%;
        }
      }

      .plr {
        .point {
          color: #C81623;
        }

        .level {
          color: white;
          background-color: #009a61;
          margin-left: 8px;
          padding-left: 3px;
          padding-right: 3px;
        }

        .rank {
          color: white;
          background-color: #1b93fb;
          margin-left: 8px;
          padding-left: 3px;
          padding-right: 3px;
        }
      }
    }

    .hot_search {
      overflow: hidden;
      padding: 10px;
      text-overflow: ellipsis;

      & > li {
        display: inline-block;
        margin: 5px 8px;
      }

      .hot_link {
        color: #3367D6;
        font-size: 14px;
        text-decoration: underline;
      }
    }

    .p_category_ul {
      padding: 10px;

      & > li:first-child {
        background-color: #1b93fb;
        color: white;
        padding: 0 5px;
        text-decoration: none;
        cursor: text;
      }

      & > li {
        display: inline-block;
        margin: 0px 5px;
        overflow: hidden;

        & > a:hover{
          text-decoration: underline;
          color: #C81623;
        }
      }
    }
  }
}
</style>