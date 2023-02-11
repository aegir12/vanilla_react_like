class Child {
  #content = null;

  #parent = null;

  #state = null;

  #renderState = null;

  constructor(parent) {
    this.#parent = parent;
  }

  setState(newState) {
    this.#state = newState;
    setImmediate(this.render)
  }

  render() {
  }
}

export default Child;
