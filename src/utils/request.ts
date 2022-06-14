import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import LoginDialog from "@/dialog/login/index";
// 按需引入 样式无效 单独引入
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'


// import {emitter} from "@/utils/bus";
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

const service = axios.create({
    baseURL: '/api',
    timeout: 30000,
    // 携带cookie
    withCredentials: true,
    headers:{
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    }
})


service.interceptors.request.use(
    config => {
        NProgress.start()
        // 全局Token的设置 (这里使用Cookie不需要设置)

        // 设置请求头


        return config
    },
    error => {
        NProgress.done()

        ElMessage({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error
    }
)

service.interceptors.response.use(
    response => {
        NProgress.done()
        // 全局Token的保存 (这里使用Cookie不需要设置)

        // 成功，不成功全部返回null 用于后续判断 null不处理
        if (response.data.errorCode === 0) {
            return response.data;
        } else if (response.data.errorCode === -1001) { // 未登录
            ElMessage({
                message: response.data.errorMsg || '啊哦,服务器跑路了！',
                type: "error"
            })
            // 弹窗提示 并跳转到 登录
            LoginDialog.show({
                distinguishCancelAndClose: true
            }).then(() => {
                console.log('confirm')
            }).catch((e) => {
                console.log(e)
            });
            return null
        } else { // 其他错误
            ElMessage({
                message: response.data.errorMsg || '啊哦,服务器跑路了！',
                type: "error"
            })
            return null
        }
    },
    error => {
        NProgress.done()
        if (!error.response) {
            ElMessageBox.confirm(`
            <p>检测到请求错误</p>
            <p>${error}</p>
            `, '请求报错', {
                dangerouslyUseHTMLString: true,
                distinguishCancelAndClose: true,
                confirmButtonText: '稍后重试',
                cancelButtonText: '取消'
            }).then(() => {
            })
        }

        switch (error.response.status) {
            case 500:
                ElMessageBox.confirm(`
                <p>检测到接口错误${error}</p>
                <p>错误码<span style="color:red"> 500 </span>服务器错误！</p>
                `, '接口报错', {
                    dangerouslyUseHTMLString: true,
                    distinguishCancelAndClose: true,
                    confirmButtonText: '清理缓存',
                    cancelButtonText: '取消'
                }).then(() => {

                })
                break
            case 404:
                ElMessageBox.confirm(`
                  <p>检测到接口错误${error}</p>
                  <p>错误码<span style="color:red"> 404 </span>：请求不存在！</p>
                  `, '接口报错', {
                    dangerouslyUseHTMLString: true,
                    distinguishCancelAndClose: true,
                    confirmButtonText: '我知道了',
                    cancelButtonText: '取消'
                }).then(() => {

                })
                break
        }

        return error
    }
)


export default service