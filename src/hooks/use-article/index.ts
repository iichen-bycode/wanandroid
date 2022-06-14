import {onMounted, reactive} from "vue";
import {article} from "@/api/api";

export const articleHooks = (type:number = 0||1) => {

    const articleData = reactive({
        article: [],
        curPage: 0,
        totalPage:1,
        disabled:false,
        size:20
    })



    onMounted(() => {
        doRequestArticleByPage(0)
    })

    const doRequestArticleByPage = async (page:number = 0) => {
        await article(page,type).then(res => {
            if(res){
                if(res.data.over){

                }else{
                    articleData.article = res.data.datas
                    articleData.curPage = res.data.curPage
                    articleData.totalPage = res.data.pageCount
                    articleData.size = res.data.size
                }
            }
        }).catch(err => {

        });
    }

    const handleSizeChange = (val: number) => {
        articleData.size = val;
    }
    const handleCurrentChange = (val: number) => {
        doRequestArticleByPage(val - 1);
    }

    return {
        articleData,
        handleSizeChange,
        handleCurrentChange,
    }
}