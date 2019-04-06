export function initGui() {
    const el = document.createElement('div');
    el.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000';
    document.body.appendChild(el);
}