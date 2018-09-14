import axios from "axios";
import getISOWeek from "date-fns/get_iso_week";
import isPast from "date-fns/is_past";
import isSameWeek from "date-fns/is_same_week";
import isThisWeek from "date-fns/is_this_week";
import setISODay from "date-fns/set_iso_day";
import setISOWeek from "date-fns/set_iso_week";
import * as React from "react";
import { LoadingIcon } from "./LoadingIcon";

const day = (x: number) =>
  ["monday", "tuesday", "wednesday", "thursday", "friday"][x];

const veggie = x => x.replace("Veg", "<br/>Veg");

interface IState {
  week: number;
  menu: string[];
}

interface IData {
  data: {
    week: number;
    menu: string[];
  };
}

class App extends React.Component<{}, IState> {
  public state = {
    menu: [],
    week: NaN
  };
  constructor(props: {}) {
    super(props);
  }

  public load() {
    axios.get(`/.netlify/functions/menu`).then(({ data }: IData) => {
      this.setState({
        week: data.week as number,
        menu: data.menu.map(veggie)
      });
    });
  }

  public componentDidMount() {
    this.load();
  }

  public render() {
    if (isNaN(this.state.week)) {
      return <LoadingIcon />;
    }

    const { week } = this.state;
    const inThePast = (week: number, dayIdx: number): boolean =>
      isPast(setISODay(setISOWeek(new Date(), week), dayIdx));

    return (
      <>
        <h1>Lunch kids</h1>
        <h2>Week {week}</h2>
        {this.state.menu.map((x: string, idx: number) => {
          return (
            <p key={idx}>
              <div className="day">{day(idx)}</div>
              <div
                className={`food ${inThePast(week, idx + 1) ? "past" : ""}`}
                dangerouslySetInnerHTML={{ __html: x }}
              />
            </p>
          );
        })}
      </>
    );
  }
}

export { App };
