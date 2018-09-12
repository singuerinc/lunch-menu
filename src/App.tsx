import axios from "axios";
import * as React from "react";
import { LoadingIcon } from "./LoadingIcon";

const day = (x: number) =>
  ["monday", "tuesday", "wednesday", "thursday", "friday"][x];

interface IState {
  week: number | null;
  menu: string[];
}

class App extends React.Component<{}, IState> {
  public state = {
    menu: [],
    week: null
  };
  constructor(props: {}) {
    super(props);
  }

  public load() {
    axios.get(`/.netlify/functions/menu`).then(({ data }) => {
      this.setState({
        ...data
      });
    });
  }

  public componentDidMount() {
    this.load();
  }

  public render() {
    if (this.state.week === null) {
      return <LoadingIcon />;
    }

    return (
      <>
        <h1>Lunch</h1>
        <h2>Week {this.state.week}</h2>
        {this.state.menu.map((x: string, idx: number) => {
          return (
            <p key={idx}>
              <div className="day">{day(idx)}</div>
              {x}
            </p>
          );
        })}
      </>
    );
  }
}

export { App };
