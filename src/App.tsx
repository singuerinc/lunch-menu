import axios from "axios";
import * as React from "react";

interface IState {
  menu: string[]
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
  }

  public load() {
    axios.get(`/.netlify/functions/menu`).then(({ data }) => {
      this.setState({
        menu: data
      });
    });
  }

  public componentDidMount() {
    this.load();
  }

  public render() {
      return <div>a</div>
  }
}

export { App };
