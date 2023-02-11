import { createComponent } from "../lib/components.js";

class Main {
  afterRender() {
    console.log(this);
    setTimeout(() => {
      this.setState(1);
    }, 1000);
  }

  render(props) {
    console.info("props: ", props);
    console.info("state", this.state);
    return createComponent("div", {
      children: [
        createComponent("div", {
          children: [
            "hello",
            createComponent("span", { children: `${this.state}` }),
          ],
        }),
        `${this.state}`,
      ],
    });
  }
}

export default Main;
