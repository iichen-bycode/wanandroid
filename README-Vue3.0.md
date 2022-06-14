# vue3_practice

    Vue2中的问题：(Vue3不存在) -新增、删除属性，以及集合索引修改值
        $set, Vue.set 以及集合的 几个修改方法可以解决 数据劫持那里的问题

    Vue3响应原理：Window.Proxy + Window.Reflect（操作数据）
        const p = new Proxy(person,{
            get(target,propName){
                return target[propName];
            },
            set(target,propName,value){
                target[propName] = value;
            },
            deleteProperty(target,propName){
                return delete target[propName];
            }
        });

# Composition Api
  ## setup （存放使用的数据、方法等）- 直接写变量和方法即可，return 对象、渲染函数
    1. 若返回一个对象，则对象中的属性、方法，在模板中均可直接使用
    2. 返回一个渲染函数，则可以自定义渲染内容
        import {h} from 'vue'
        ...
        return () => { return  h('h1',"文本内容")};

  ## ref函数 不是之前的 ref标识作用 - 响应式修改，将需要的变量等使用ref函数包裹
    1. 类似于 Flutter的 GetX    （修改 .value即可，调用的地方不需要）
        let a = ref(18) => var a = 18.obs;
        a.value = 19  =>    a.value = 19;
    2. 原理
        2.1 基本数据类型 => Object.defineProperty()的get、set方法
        2.2 对象数据类型 => 使用了新增的 reactive函数

  ## reactive函数
    1. 响应式对象类似，使用reactice包裹 不使用ref,就无须再写 .value了
    2. 集合 => 若修改集合前已经 修改了 ref,reactive，即使集合不加包裹 也能响应式


# Setup函数注意
    1. Vue2的 定义props若外部传入，但组件不使用 props属性接受，其定义的属性将会放在 $attrs属性下，也可以用，但比较麻烦
    2. 最最开始的生命周期函数 - this为 undefined    
    3. 第一个参数：props，可以便捷使用外部传入的props , 第二个参数：context



# 计算属性和监视函数
    1. 计算属性
        import {computed} from 'vue'
        setup(){
            // computed 是一个函数 只读简写
            let fullName = computed(() => {

            });

            <!-- 完整写法 -->
            let fullName = computed({
                get(){

                },
                set(value){

                }
            });
        }    

    2. 监视函数
        Vue2:
            sum(newValue,oldValue){

            }   
            sum:{
                handler(newValue,oldValue){

                }
            } 


        Vue3:    
            import {watch} from 'vue'    
            setup(){
                <!-- 可定义多个watch -->
                watch(sum,(newValue,oldValue) => {

                },{immediate:true,deep:true})

                <!-- newValue和oldValue也是数组 -->
                watch([sum, msg],(newValue,oldValue) => {

                })

                <!-- 监视对象某个属性 需要函数返回值形式，若是 嵌套对象，则需要开启 deep:true -->
                watch(() => person.name,(newValue,oldValue) => {

                })

                <!-- 监视ref基本数据类型 不需要加 .value,  对象需要 -->
            }


# watchEffect函数
    1. 内部函数实现 使用到哪个 响应式变量就监视谁
    watchEffect(() => {
        <!-- 监视 person.name属性 -->
       let name = person.name; 
    });

# 生命周期
    1. 相比Vue2 最后的 destroy变为 unMouted
    2. 组合式Api生命周期写法
        2.1 beforeCreate，created -=> setup()
        2.2 其余的在前面 加上 onXxxxx() 即可    

# 自定义 hook函数(其实就是 吧setup内的 有关函数剥离出来)
    1. 新建一个 hooks文件夹，新建 一系列 useXX.js文件 内写剥离出的业务函数逻辑  

# toRef (Import) 
    1. 将变量转为响应式
     例如： let name = person.name; 这时候 name变量不再是响应式了
        使用：let name = toRef(person,'name'); 这样name依然是响应式的

    2. toRefs 将对象内全部转为
        toRefs(person);

# 父传子 自定义事件需要 像 props那样定义接受一下
    形式：emits:[],
    且 Vue2，需要加 @click.native 否则会被认为自定义事件 无法处理
    Vue3 移除 .native，使用 上诉接受

    过滤器 filter移除


# 其他不常用Api
    1. shallowReactive与shallowRef  
        1.1 shallowReactive 只考虑对象第一层数据的响应式，对象嵌套不响应
        1.2 shallowRef  只支持基本数据类型，不能传入对象

    2. readonly与shallowReadonly       
        2.1  readonly               person = readonly(person); 将响应式变量转为非响应式   
        2.1  shallowReadonly        person = readonly(person); 深层次嵌套对象可以被修改  

    3. toRaw与markRaw
        3.1 toRaw       => 响应式转为非响应式变量 只处理reactive定义的
        3.2 markRaw     => 讲一个变量 标记为 永远非响应式，比如一个对象新增一个属性
                                person.sex = markRaw(obj);

    4. provide与inject - 实现祖孙间的通信
        4.1 provide
        4.2 inject
            实例：
                provide('person',person);
                后代组件：let person = inject('person');


    5. 判断函数：
        5.1 isRef
        5.2 isReactive
        5.3 isReadonly
        5.3 isProxy


    6. customRef
        1. 自定义ref,并对其依赖项跟踪和更新触发进行显式控制。
        防抖实现：
            function myRef(value,delay){
                var timer;
                return customRef((track,trigger) => {
                    return {
                        get(){
                            track();
                            return value;
                        },
                        set(newValue){
                            clearTimeout(timer);
                            timer = setTimerout(() => {
                                trigger();
                                value = newValue;
                            },delay);
                        }
                    }
                });
            }

            let keyword = myRef("",500);


# 其他新增组件
    1. Fragment - vue3不需要顶层元素，就是包在了Fragment内

    2. Teleport - 将html元素移动到指定位置 (有用诶)
        将需要变动位置的html元素标签块外部包一个 Teleport组件即可
            <teleport to='body'>    // 移动到哪个位置，直接写标签，#id,.class等
                xxxxx
            </teleport>



    3. Suspense beta版本暂时不用哦        

    4. vite-plugin-vue-setup-extend 插件