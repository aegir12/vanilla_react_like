function setStateWrapper(__holder) {
  return function setState(state) {
    let newState = state;
    if (typeof state === "function") {
      newState = state(this.state);
    }
    __holder.render(newState);
  };
}

function isEq(o1, o2) {
  if (typeof o1 !== typeof o2) return false;

  if (typeof o1 === "object") {
    const keys = [...Object.keys(o1), ...Object.keys(o2)];

    return keys.every((key) => o1[key] === o2[key]);
  }
  return o1 === o2;
}

const shouldRender = function (prev, next) {
  return !isEq(prev.props, next.props) || !isEq(prev.state, next.state);
};

const _root = {};

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

function renderElement(Components, props) {
  const elem = document.createElement(Components);
  Object.entries(props).forEach(([key, val]) => {
    if (key === "children") {
      if (Array.isArray(val)) {
        val.forEach((child) => {
          renderChild(elem, child);
        });
      } else {
        renderChild(elem, val);
      }
    } else {
      elem.setAttribute(key, val);
    }
  });
  return elem;
}

function renderComponent(comp, props, state) {
  comp.props = props;
  comp.state = state;
  const elem = comp.render(props).render();
  if (comp.afterRender) {
    comp.afterRender();
  }

  return elem;
}

export function createComponent(Components, props = {}) {
  const __holder = {
    type: "component",
    comp: null,
    state: undefined,
    props: undefined,
    _renderer: undefined,
  };

  if (typeof Components !== "string") {
    __holder.comp = new Components(props);

    __holder.comp.setState = setStateWrapper(__holder).bind(__holder.comp);
    __holder.comp.props = props;
    __holder.comp.shouldRender =
      __holder.comp.shouldRender || shouldRender.bind(__holder.comp);
  } else {
    __holder.comp = Components;
  }
  __holder.render = (state) => {
    if (
      !__holder._renderer ||
      shouldRender(
        {
          props: __holder.props,
          state: __holder.state,
        },
        {
          props,
          state,
        }
      )
    ) {
      __holder.props = props;
      __holder.state = state;

      let newElement;
      if (typeof Components === "string") {
        newElement = renderElement(__holder.comp, props);
      } else {
        newElement = renderComponent(__holder.comp, props, state);
      }

      if (__holder._renderer) {
        __holder._renderer.replaceWith(newElement);
      }

      __holder._renderer = newElement;
    }

    return __holder._renderer;
  };

  return __holder;
}

export function renderDom(element, comp) {
  element.appendChild(comp.render());
}
