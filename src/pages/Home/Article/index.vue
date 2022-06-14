<!-- 文章列表-->
<template>
  <div class="content">
    <ul>
      <li v-for="article in articleData.article" :key="article.id" >
        <div>
          <div class="article_opt">
            <span class="iconfont" :class="{'icon-uncollect':!article.collect,'icon-collect':article.collect}" @click="doCollectOpera(article)"></span>
          </div>
          <div class="article_content">
            <p>
              <span v-if="article.fresh" class="fresh">
                &nbsp;新&nbsp;
              </span>
              <a :href="article.link" target="_blank">{{article.title}}</a>
            </p>
            <span v-if="article.type===1" class="type">
                &nbsp;置顶&nbsp;
            </span>
            <span class="tag" v-for="(tag,index) in article.tags" :key="index">
              <a :href="tag.url" target="_blank">{{tag.name}}</a>
            </span>
            <span class="author">
              <!--        跳转到单独的路由          -->
              <a v-if="article.author" target="_blank">作者：{{article.author}}</a>
              <!--        跳转到单独的路由          -->
              <a v-if="article.shareUser" target="_blank">分享人：{{article.shareUser}}</a>
            </span>
            <span class="catrgory">
              分类：
              <a target="_blank">{{article.superChapterName}}</a>
							/
              <a target="_blank">{{article.chapterName}}</a>
            </span>
            <span class="date">时间：{{article.niceDate}}</span>
          </div>
          <div class="article_more">
            <span class="iconfont icon-more"></span>
          </div>
        </div>
      </li>
    </ul>
    <el-pagination
        v-model:currentPage="articleData.curPage"
        v-model:page-size="articleData.size"
        :disabled="articleData.disabled"
        :background="true"
        layout="prev, pager, next, jumper,->"
        :total="articleData.totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
  import {articleHooks} from '@/hooks/use-article'
  import {doCancelCollect, doCollectArticle} from "@/api/api";
  import {ElMessage} from "element-plus";

  const props = defineProps({
    typeFlag:{
      default:0,
      type:Number,
    }
  })

  // 列表数据加载 Hooks  广场和首页 数据格式相同
  const {
    articleData,
    handleSizeChange,
    handleCurrentChange,
  } = articleHooks(props.typeFlag)



  // 收藏
  const doCollectOpera = (article) => {
    if(article.collect){
      doCancelCollect(0,article.id).then(res => {
        if(res){
          article.collect = !article.collect
          ElMessage({
            message: '取消收藏成功',
            type: "success"
          })
        }
      })
    }else{
      doCollectArticle(article.id).then(res => {
        if(res){
          article.collect = !article.collect
          ElMessage({
            message: '收藏成功',
            type: "success"
          })
        }
      })
    }
  }

  // 取消收藏



</script>

<style scoped lang="scss">
.content{
  width: 100%;
  margin: 0 0 0 8px;
  background-color: white;
  overflow: auto;
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  // 文章列表
  li{
    width: 100%;
    border-bottom: 1px solid #e2e2e2;
    &>div{
      width: 94%;
      margin: 16px auto;
      overflow: hidden;
      // 收藏
      .article_opt{
        float: left;
        height: 46px;
        &>span{
          height: 46px;
          line-height: 46px;
        }
      }
      // 具体内容
      .article_content{
        float: left;
        width: 90%;
        margin-left: 2%;
        // 统一 a标签悬浮下划线
        a:hover{
          text-decoration: underline;
        }

        // 置顶和 是否‘新发布(type==1)’
        .fresh,.type{
          display: inline;
          color: #f56a6b;
          border: 1px solid #f56a6b;
          margin-right: 2%;
        }

        // 标题
        &>p{
          width: 100%;
          margin-bottom: 10px;
          &>a{
            white-space: normal;
            margin-right: 6px;
            color: #2e3135;
            font-size: 16px;
            font-weight: bold;
          }
        }

        // 跳转标签
        .tag{
          color: #009a61;
          border: 1px solid #009a61;
          background-color: white;
          margin-right: 8px;
          &:hover{
            background-color: #009a61;
          }
          &>a{
            color: #009a61;
            &:hover{
              color: white;
            }
          }
        }

        // 作者或分享人    // 分类
        .author,.catrgory,.date{
          color: #999;
          font-size: 12px;
          margin-right: 8px;
          a{
            color: #999;
          }
        }

        // 时间

      }
      // more图标
      .article_more{
        float: right;
        .icon-more{
          height: 46px;
          line-height: 46px;
          font-size: 26px;
        }
      }
    }
    &:hover{
      background-color: rgba(0,0,0,0.01);
    }
  }


  .el-pagination{
    margin: 12px auto;
    justify-content: center;
  }
}
</style>