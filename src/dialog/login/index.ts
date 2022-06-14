import {render, createVNode, h, ComponentPublicInstance} from "vue";
import LoginDialog from "@/dialog/login/index.vue"
import {Action, DialogOptions} from "@/global";
import {AppContext} from "@vue/runtime-core";

// 兼容性 考虑 防止旧版本浏览器 可能对 undefined重写
const isUndefined = (val:any) => val === void 0;

Dialog['show'] = (
    options: DialogOptions,
    appContext?: AppContext | null
) => {
   return Dialog(options, appContext);
}

async function Dialog(
    options: DialogOptions,
    appContext?: AppContext | null): Promise<{ value: string; action: Action } | Action> {
    return new Promise((resolve, reject) => {
        const vm = showMessage(options, appContext ?? Dialog._context);
        messageInstance.set(vm, {
            options,
            resolve,
            reject
        });
    });
}

const _Dialog = Dialog;
// export default {
//     install(app) {
//         _Dialog._context = app._context;
//         app.config.globalProperties.$dialog = _Dialog;
//     }
// };

const showMessage = (options:any, appContext: AppContext | null) => {
    const container = genContainer();

    // 两个事件   emits: ["vanish", "action"],  vanish
    options.onVanish = () => {
        render(null, container);
        messageInstance.delete(vm);
        document.body.removeChild(container);
    };
    options.onAction = (action:Action) => {
        const currentMsg = messageInstance.get(vm);

        let resolve = action ;
        if (action === "cancel" || action === "close") {
            // 区分 取消按钮点击(cancel) 还是关闭按钮和遮罩点击(close)
            if (options.distinguishCancelAndClose && action !== "cancel") {
                currentMsg.reject("close");
            } else {
                currentMsg.reject("cancel");
            }
        } else {
            currentMsg.resolve(resolve);
        }
    };



    const instance = h(LoginDialog, options);
    instance.appContext = appContext;

    render(instance, container);

    document.body.appendChild(container);

    // 获取构建的组件代理对象
    const vm = instance.component?.proxy as ComponentPublicInstance<
        {
            showDialog: boolean
            doClose: () => void
        }>

    vm.showDialog = true;
    return vm;
};


Dialog.close = () => {
    messageInstance.forEach((_, vm) => {
        vm.doClose()
    })
    messageInstance.clear()
}


const messageInstance = new Map()

const genContainer = () => {
    return document.createElement("div");
};
Dialog._context = null;

export default Dialog