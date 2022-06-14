// 顶部导航 交互 处理
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";


export const useNavMenu =  () => {
    let hvLogin = ref(false);
    let menuIndex = ref(0)

    const router = useRouter();

    const handleMenuClick = function (index,route) {
        if(menuIndex.value !== index){
            menuIndex.value = index;
            router.replace(route).then(() => {
            });
        }

    }

    onMounted(() => {
        router.replace({path: '/'}).then(() => {
        });
    })

    const navList = [
        {
            nav:'首页',
            route:'/home'
        },
        {
            nav:'广场',
            route:'/square'
        },
        {
            nav:'导航',
            route:'/nav'
        },
        {
            nav:'教程',
            route:'/course'
        },
        {
            nav:'问答',
            route:'/quiz'
        },
        {
            nav:'体系',
            route:'/system'
        },
        {
            nav:'项目',
            route:'/project'
        },
        {
            nav:'公众号',
            route:'/wxAccout'
        },
        {
            nav:'项目分类',
            route:'/category'
        },
        {
            nav:'工具',
            route:'/tools'
        },

    ];

    return {
        hvLogin,menuIndex,handleMenuClick,navList
    }
}