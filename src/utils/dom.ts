/**
 * 创建元素工具函数
 *
 * @param  {string} tagName           - new Element tag name
 * @param  {Array|string} classNames  - list or name of CSS class
 * @param  {object} attributes        - any attributes
 * @returns {Element}
 */
export function make(tagName: keyof HTMLElementTagNameMap, classNames?: string | null | string[], attributes: any = {}) {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames as []);
  } else if (classNames) {
    el.classList.add(classNames);
  }

  for (const attrName in attributes) {
    // @ts-ignore
    el[attrName] = attributes[attrName];
  }

  return el;
};

export function makeModal(contentId?: string, visible = false, onOk?: () => void) {
  const wrap = make('div', 'cx-common-modal');
  const cancelBtn = make('span', 'cx-commom-modal-cancel', {innerHTML: '取消'});
  const saveBtn = make('span', 'cx-commom-modal-save', {innerHTML: '保存'});
  const content = make('div', 'cx-commom-modal-content', {id: contentId});
  wrap.append(content, saveBtn, cancelBtn);

  wrap.style.display = visible ? 'block' : 'none';

  saveBtn.addEventListener('click', () => {
    onOk && onOk();
    wrap.style.display = 'none';
  }, false);

  cancelBtn.addEventListener('click', () => {
    wrap.style.display = 'none';
  }, false);

  return wrap
}

export const hideElementById = (id: string) => {
  // 隐藏滑块
  const block = document.querySelector(`#${id}`) as HTMLElement;
  block.style.display = 'none';
  return
}

export function makeFragment(htmlString: string) {
  const tempDiv = document.createElement('div');

  tempDiv.innerHTML = htmlString.trim();

  const fragment = document.createDocumentFragment();

  fragment.append(...Array.from(tempDiv.childNodes));

  return fragment;
}

export function findElement(target: Element, searchNodeClass: string[]) {
  return searchNodeClass.some(name => !!target.querySelector(`.${name}`))
}