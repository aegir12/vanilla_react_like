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
  return {
    type,
    props,
    states: {},
    children,
    stateIdx: -1,
    componentIdx: -1,
    components: {},
    render: () => {
      if (typeof type === "string") {
        return renderElement(type, props, children);
      } else {
        return renderComponent(type, props, children);
      }
    },
  };
}

/**
 * Like React
 */
const root = { componentIdx: -1, components: {} };

export function useState(initialValue) {
  console.log("parent", parent);
  console.log("componentIdx: ", parent.componentIdx);

  parent.stateIdx += 1;
  const curIdx = parent.stateIdx;

  if (!parent.states[curIdx]) {
    parent.states[curIdx] = initialValue;
  }
  const state = parent.states[curIdx];

  function setState(value) {
    parent.states[curIdx] = value;
    // call render
  }

  return [state, setState];
}

export function useEffect(params) {}

let parent = root;
export function createElement(type, props, children) {
  console.log("parent", parent);
  parent.componentIdx += 1;
  console.log("componentIdx: ", parent.componentIdx, type);
  const curIdx = parent.componentIdx;
  if (!parent.components[curIdx]) {
    parent.components[curIdx] = _createElement(type, props, children);
  }
  const element = parent.components[curIdx];

  function render() {
    parent = element;
    parent.componentIdx = -1;
    parent.stateIdx = -1;
    return element.render();
  }

  return { render };
}

export function renderDom(element, component) {
  parent = root;

  element.appendChild(component.render());
}

export default { useState, useEffect, createElement, renderDom };
