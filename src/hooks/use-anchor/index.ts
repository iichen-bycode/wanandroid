/**
 * @description 锚链接滚动过渡
 * @param {String} selector   元素ID or 定位点
 */
export const goAnchor = (selector) => {
    // 移动距离
    let top = 0;
    // 当前滚动条位置
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    const anchor = document.getElementById(selector) || { offsetTop: 0 };
    top = anchor.offsetTop - scrollTop;
    window.scrollBy({ top, behavior: 'smooth' });
};
