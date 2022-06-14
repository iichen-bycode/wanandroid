import {isRef, onScopeDispose, watch} from 'vue'
import type { Ref } from 'vue'
import {addClass, getScrollBarWidth, getStyle, hasClass, removeClass} from "@/global";


export const useLockscreen = (trigger: Ref<boolean>) => {
  if (!isRef(trigger)) {
    throw Error(
      'You need to pass a ref param to this function'
    )
  }

  if (hasClass(document.body, 'popup-parent--hidden')) {
    return
  }

  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyPaddingRight = '0'
  let computedBodyPaddingRight = 0

  const cleanup = () => {
    removeClass(document.body, 'popup-parent--hidden')
    if (withoutHiddenClass) {
      document.body.style.paddingRight = bodyPaddingRight
    }
  }
  watch(trigger, (val) => {
    if (!val) {
      cleanup()
      return
    }

    withoutHiddenClass = !hasClass(document.body, 'popup-parent--hidden')
    if (withoutHiddenClass) {
      bodyPaddingRight = document.body.style.paddingRight
      computedBodyPaddingRight = Number.parseInt(
        getStyle(document.body, 'paddingRight'),
        0
      )
    }
    scrollBarWidth = getScrollBarWidth()
    const bodyHasOverflow =
      document.documentElement.clientHeight < document.body.scrollHeight
    const bodyOverflowY = getStyle(document.body, 'overflowY')
    if (
      scrollBarWidth > 0 &&
      (bodyHasOverflow || bodyOverflowY === 'scroll') &&
      withoutHiddenClass
    ) {
      document.body.style.paddingRight = `${
        computedBodyPaddingRight + scrollBarWidth
      }px`
    }
    addClass(document.body, 'popup-parent--hidden')
  })
  onScopeDispose(() => cleanup())
}



