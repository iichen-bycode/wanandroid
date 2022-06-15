<template>
  <div class="nav_container">
    <div class="nav">
      <div class="nav_item" v-for="(navList,index) in navCategory" :key="index">
        <p :id="navList.cid" class="nav_title">{{navList.name}}</p>
          <el-tag
              v-for="(nav,index) in navList.articles"
              :key="nav.id"
              :type="getRandomType(index)"
              round>
              <a :href="nav.link" target="_blank">{{ nav.title }}</a>
          </el-tag>
      </div>
    </div>
    <div class="category">
      <div class="fix">
        <ul class="nav_category_ul">
          <li v-for="(navList,index) in navCategory" :key="index">
            <a @click.prevent="goAnchor(navList.cid)">
              {{navList.name}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {getNavCategoryList} from "@/api/api";
import {goAnchor} from "@/hooks/use-anchor";

const navCategory = ref([])

onMounted(() => {
  getNavCategoryList().then(res => {
    if(res){
      navCategory.value = res.data
    }
  })
})

const getRandomType = (index) => {
  let type = ['','success','info','danger','warning']
  return type[index % 5]
}


</script>

<style scoped lang="scss">
  .el-tag{
    margin: 12px;
  }

  .nav_container{
    position: relative;
    max-width: 1200px;
    width: 96%;
    overflow: hidden;
    margin: 30px auto 0;

    .nav{
      position: relative;
      width: calc(100% - 180px);

      .nav_item{
        background-color: white;
        border-radius: 8px;
        margin-bottom: 12px;
        padding:  0 12px 20px;
        box-shadow: 0 2px 2.5px 0 rgba(0,0,0,0.1);

        &:hover{
          transform: translate(2px,2px);
        }

        .nav_title{
          height: 40px;
          line-height: 40px;
          margin-bottom: 32px;
          border-bottom: 2px solid #8DB5D0;
        }
      }
    }

    .category{
      position: absolute;
      right: 0;
      width: 150px;

      .fix{
        position: fixed;
        top: 80px;
        height: calc(100% - 160px);
        overflow: auto;

        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          background-color:#e4e6eb;
          outline:none;
          border-radius:5px
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          background: transparent;
        }

        .nav_category_ul{
          background-color: white;
          padding: 10px 18px;

          &>li{
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border-bottom: 1px solid #dbe2e8;
          }
        }
      }
    }
  }
</style>