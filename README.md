### 路由相关记录
 - 对于页面一些条件判断 跳转、显示等路由条件，可以将条件定义在 路由的 meta属性 => $route.meta.xxx
 - params参数 ： path:'detail/:id/:title' 必填
   - path:'detail/:id/:title?' 加入? 就可以非必填了

   [http://caibaojian.com/vue/guide/class-and-style.html]()

### 流程相关
 - 在组件生命周期内，通过Vuex的 dispatch派发 进行数据请求等  
 - computed 计算属性内 使用：..mapState 方便取值
 - Class与Style绑定 动态改变样式
   - 先给需要的标签 v-bind:class="{ active: isActive, 'text-danger': hasError }
   - 通过事件（鼠标进入等）改变 hasError的 bool从而是的 标签是否有 定义的class类名属性，从而改变样式
   - style同理 (三元表达式或if判断返回不同的样式)

### lodash 节流
   - v-for 循环的组件的点击事件 不要设置在 子标签上，直接父标签 顶层设置事件-提高性能(事件委派)
     -- 结合自定义属性： 给标签设置  :propName = 'xxxx'
     -- event.target.dataset 获取标签上的属性  父元素点击事件 @clidk='handler()'

     ` //普通获取  注意获取时：是小写，和定义的驼峰，命名不一样
       const categoryname = event.target.dataset.categoryname; 
       //对象解构获取属性值
       const {categoryname} = event.targrt.dataset
     `

### 注意query参数和params参数的合并 防止另一个将另一个覆盖

### 使用 mock.js 模拟服务器数据npm

### $refs
    Vue2.0:
        <test ref='hello'/>  => $refs.hello
    Vue3.0:
        import { ref, defineComponent, onMounted } from "vue";
        const inputRef = ref();
        inputRef.value.xxx

### $nextTick
    Vue2.0:
        mounted: function () {
            this.$nextTick(() => {
                this.get()
            })
        },
    Vue3.0:
        import {nextTick} from 'vue'
        const xx = async xxx => {
            xxx
            await nextTick()
            // new dom update
        }

### watch + $nextTick 实现异步任务 数据监听

### 全局守卫加入 是否登录判断
    1. 登陆了 直接 重定向到首页
    2. 否则到登录(路由是登录路由放行到登录页，不是登录路由但是需要登录的路由重定向到登录)


### Flex布局
    - 父项属性
     flex-direction => 主轴方向(水平或垂直 就是 Row和coloum)
     justify-content => 主轴上的子元素排列方式 (就是 MainAlignMent)
     
     align-content => 交叉轴的子元素排列方式-多行 (crossAlignment) 【类似flex-warp换行后 多行的情况】
     align-items    => 交叉轴的子元素排列方式-单行

     flex-wrap => 设置子元素是否换行
     flex-flow => 相当于设置了 flex-direction和flex-wrap

    - 子项属性
      flex                  =>  类似Expanded里
      align-self:xxx        => 设置某个子项的排列方式  
      order:1               => 改变子项的 排列顺序


### 2D转换 
 #### transform
    - transform: translate(x,y);
    - transform: translateX(n);
    - transform: translateY(n);

    - transform: rotate(45deg)  顺时针旋转 45度

    - transform: scale(x,y) 缩放 比例

    - transform-origin:x y 设置转换中心点 - 默认标签center
        像素或方位名词(top/bottom/left/right/center)


### transition 过渡
    - transition:
		border-color .5s ease-in .1s,
		background-color .5s ease-in .1s,
		color .5s ease-in .1s;


### Css3 动画  animation
    1. keyframes 定义动画 
        - @keyframes animaA{
            0%{     => from:
                width:50%
            }   
            25%{
            }
            .....
            100%{   => to:
                width:100%
            }
          }
        
    2. 使用
        - css标签属性内
            div{
                animation-name: animaA;
                animation-duration: .5s
            }
    

### 3D效果-（先移动后旋转    ）
    - 父盒子包含多盒子的3D效果，父元素需要
        1. transform-style:preserve-3d 必写

    - 透视效果-更好看出3d效果
        perspective: 500px
        


### em和rem  ( div[12px]>p[])
    - em相对于父元素字体大小
        p[2em] => 2 * 12 = 24px
    - rem相对于html根元素的字体大小，计算方式同上
        html{ font-size:14px } 14 * 2 = 28px
       
    
### 自定义指令   [https://www.javascriptc.com/vue3js/guide/custom-directive.html](自定义指令)
    const app = Vue.createApp({})
    // 注册一个全局自定义指令 `v-focus`
        app.directive('focus', {
            // 当被绑定的元素插入到 DOM 中时……
            mounted(el,params) {
            // Focus the element
            el.focus()
        }
    })

    v-pin:[direction]="200" 传递参数

    directives: {
        focus: {
            // 指令的定义
            mounted(el) {
                el.focus()
            }
        }
    }

### 插件- 使用app.use(A) A是一个暴露的install实例
    import PageTools from './PageTools'
    export default {
        install: (app) {
        app.component('PageTools', PageTools)
    }

    






























