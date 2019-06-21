import React, {useEffect, useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import FullWeather from "./pages/5-days-weather";
import HourlyWeather from "./pages/hourly-weather";
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";

const useStyles = makeStyles({
  app: {
    textAlign: 'center',
    backgroundImage: 'linear-gradient(to right top, #38b5fb, #4eacff, #77a0ff, #a48fff, #cf78fd)',
    height: '100vh',
  },
  appHeader: {
    background: '#282c34',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontsize: 'calc(10px + 2vmin)',
    color: '#fff',
  },
});

const App = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [generatedData, setGeneratedData] = useState({});

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?id=616052&units=metric&appid=fb0fd9d68ed3270e7bf10930befbe876")
      .then((result) => result.json())
      .then((result) => setData(result.list));
  }, []);

  useEffect(() => {
    if (data.length && !generatedData.length) {
      /**
       * This function is mapping through our array and adding date days
       **/
      const dataWithConcreteDate = data.map((item) => ({
        ...item,
        day: moment(item.dt_txt).format('DD'),
      }));

      /**
       * This function is generating Objects with day keys like {
       *     21: ...
       *     22: ...
       * }
       **/
      const generatedData = dataWithConcreteDate.reduce((acc, item) => {
        if (acc[item.day]) {
          acc[item.day].push(item);
        } else {
          acc[item.day] = [item];
        }
        return acc;
      }, {});

      setGeneratedData(generatedData);
    }
  }, [data]);

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <h1>Weather Application</h1>
      </header>
      <Switch>
        <Route exact path='/' render={(props) => <FullWeather data={generatedData} {...props}/>}/>
        <Route exact path='/:day' render={(props) => <HourlyWeather data={generatedData} {...props} />}/>
      </Switch>
    </div>
  );
};

export default App;
