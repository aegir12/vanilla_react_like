/**
 * Like React
 */
export default (() => {
  const states = {};
  const components = {};
  const stateIdx = 0;
  const componentIdx = 0;

  function useState(params) {
    const state = states[stateIdx] || initialValue;
    const currstateIdx = stateIdx;

    function setState(value) {
      states[currstateIdx] = value;
    }

    stateIdx += 1;
    return [state, setState];
  }

  function useEffect(params) {}

  function createElement(type, props, children) {
    const element =
      components[componentIdx] || _createElement(type, props, children);
    const currstateIdx = stateIdx;

    function render() {}

    return { render };
  }

  return { useState, useEffect, createElement };
})();
