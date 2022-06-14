import {camelize, CSSProperties} from "vue";


export type Action = 'confirm' | 'close' | 'cancel'

export interface DialogOptions {

}


export const getStyle = (
    element: HTMLElement,
    styleName: keyof CSSProperties
): string => {
    if (!element || !styleName) return ''

    let key = camelize(styleName)
    if (key === 'float') key = 'cssFloat'
    try {
        const style = (element.style as any)[key]
        if (style) return style
        const computed: any = document.defaultView?.getComputedStyle(element, '')
        return computed ? computed[key] : ''
    } catch {
        return (element.style as any)[key]
    }
}

export const removeClass = (el: Element, cls: string) => {
    if (!el || !cls.trim()) return
    el.classList.remove(...classNameToArray(cls))
}

export const addClass = (el: Element, cls: string) => {
    if (!el || !cls.trim()) return
    el.classList.add(...classNameToArray(cls))
}

export const hasClass = (el: Element, cls: string): boolean => {
    if (!el || !cls) return false
    if (cls.includes(' ')) throw new Error('className should not contain space.')
    return el.classList.contains(cls)
}

export const classNameToArray = (cls = '') =>
    cls.split(' ').filter((item) => !!item.trim())


let scrollBarWidth: number
export const getScrollBarWidth = (): number => {
    if (scrollBarWidth !== undefined) return scrollBarWidth

    const outer = document.createElement('div')
    // Cannot access 'propKey' before initialization
    // need to be dynamic namespace
    outer.className = 'el-scrollbar__wrap'
    outer.style.visibility = 'hidden'
    outer.style.width = '100px'
    outer.style.position = 'absolute'
    outer.style.top = '-9999px'
    document.body.appendChild(outer)

    const widthNoScroll = outer.offsetWidth
    outer.style.overflow = 'scroll'

    const inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inner)

    const widthWithScroll = inner.offsetWidth
    outer.parentNode?.removeChild(outer)
    scrollBarWidth = widthNoScroll - widthWithScroll

    return scrollBarWidth
}