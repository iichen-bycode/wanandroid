import { ElMessage } from 'element-plus'
import {article, collectArticles, login, loginOut} from "@/api/api";
const loginStore = {
    state:{
        userInfo:null
    },
    mutations:{
        setUserInfo(state,userInfo){
            state.userInfo = userInfo
        },
        deleteUserInfo(state){
            state.userInfo = null
        }
    },
    actions:{
        async doLogin(context,data){
            await login(data).then(res => {
              if(res){
                  context.commit('setUserInfo',res.data)
                  ElMessage.success({
                      message: '登陆成功',
                      type: 'success',
                  })
              }
            })
        },

        async doLoginOut(context){
            await loginOut().then(res => {
                if(res){
                    context.commit('deleteUserInfo')
                    ElMessage.success({
                        message: '注销成功',
                        type: 'success',
                    })
                }
            })
        }
    }
}

export default loginStore
