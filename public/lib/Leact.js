function renderChild(elem, child) {
  if (typeof child === "string") {
    elem.appendChild(document.createTextNode(child));
    return;
  }
  if (typeof child === "object" && child.type === "component") {
    elem.appendChild(child.render());
    return;
  }
  throw new Error("render error");
}

function renderElement(type, props, children) {
  const elem = document.createElement(type);
  Object.entries(props).forEach(([key, val]) => {
    elem.setAttribute(key, val);
  });

  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        renderChild(elem, child);
      });
    } else {
      renderChild(elem, children);
    }
  }
  return elem;
}

function renderComponent(type, props, children) {
  const elem = type({ ...props, children }).render();
  return elem;
}

function _createElement(type, props, children) {
  const element = {
    type,
    props,
    states: {},
    effects: {},
    children,
    stateIdx: -1,
    effectIdx: -1,
    componentIdx: -1,
    components: {},
    listeners: [],
  };

  element.render = () => {
    parent = element;
    parent.componentIdx = -1;
    parent.stateIdx = -1;
    parent.effectIdx = -1;
    parent.listeners = [];

    if (typeof type === "string") {
      element.rendered = renderElement(type, element.props, element.children);
    } else {
      element.rendered = renderComponent(type, element.props, element.children);
    }
    setTimeout(() => {
      element.listeners.forEach((l) => l());
    });
    return parent.rendered;
  };

  return element;
}

/**
 * Like React
 */
const root = { componentIdx: -1, components: {} };

export function useState(initialValue) {
  const _parent = parent;
  _parent.stateIdx += 1;
  const curIdx = _parent.stateIdx;

  if (!_parent.states[curIdx]) {
    _parent.states[curIdx] = initialValue;
  }
  const state = _parent.states[curIdx];

  function setState(value) {
    let newState = value;
    if (typeof value === "function") {
      newState = value( _parent.states[curIdx]);
    }
    _parent.states[curIdx] = newState;
    // call render
    const oldRendered = _parent.rendered;

    oldRendered.replaceWith(_parent.render());
  }

  return [state, setState];
}

function isEq(o1, o2) {
  if (typeof o1 !== typeof o2) return false;

  if (typeof o1 === "object") {
    const keys = [...Object.keys(o1), ...Object.keys(o2)];

    return keys.every((key) => o1[key] === o2[key]);
  }
  return o1 === o2;
}

export function useEffect(func, deps) {
  const _parent = parent;
  _parent.effectIdx += 1;
  const curIdx = _parent.effectIdx;
  _parent.listeners.push(() => {
    if (!deps || !isEq(_parent.effects[curIdx], deps)) {
      func();
    }
    _parent.effects[curIdx] = deps;
  });
}

let parent = root;
export function createElement(type, props, children) {
  parent.componentIdx += 1;

  const curIdx = parent.componentIdx;
  if (!parent.components[curIdx]) {
    parent.components[curIdx] = _createElement(type, props, children);
  }
  const element = parent.components[curIdx];
  element.props = props;
  element.children = children;

  return element;
}

export function renderDom(element, component) {
  parent = root;

  element.appendChild(component.render());
}

export default { useState, useEffect, createElement, renderDom };
