/* eslint no-unused-vars: 0 */

export const defaultTransitionDuration = 500;
export const defaultMessageTimeout = 4000;

export function hDispatch(eventName, params={}) {
  return window.dispatchEvent(new CustomEvent(eventName, { detail: params }));
}

export function hHandleTabEvent(e, firstElement, lastElement, tabbableClass) {
  let activeElement = document.activeElement;
  let activeElementContainsTabbableClass =
    activeElement.classList.contains(tabbableClass);

  function selectFirstElement() {
    e.preventDefault();
    firstElement.focus();
  }

  function selectLastElement() {
    e.preventDefault();
    lastElement.focus();
  }

  function selectFirstOrLastElement() {
    if (!e.shiftKey) {
      e.preventDefault();
      firstElement.focus();
    }
    else {
      e.preventDefault();
      lastElement.focus();
    }
  }

  if (tabbableClass) {
    if (!activeElementContainsTabbableClass) {
      selectFirstOrLastElement();
    }
    else if (activeElement === firstElement && e.shiftKey) {
      selectLastElement();
    }
    else if (activeElement === lastElement && !e.shiftKey) {
      selectFirstElement();
    }
  } else {
    if (activeElement === firstElement) {
      selectLastElement();
    } else {
      selectFirstElement();
    }
  }
}
