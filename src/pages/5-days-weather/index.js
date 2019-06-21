import React, {useEffect, useMemo, useState} from 'react';
import {generateDate, getAvgWeather} from "../../helpers";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from "moment";

const useStyles = makeStyles({
    weathers: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '100px',
        flexWrap: 'wrap',
    },
    weatherCard: {
        padding: '30px',
        marginBottom: '20px',
    },
    temperature: {
        margin: '7px 0',
        fontSize: 16,
    },
    buttonContainer: {
        justifyContent: 'center',
    },
});

const FullWeather = (props) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [dataWithConcreteProperties, setData] = useState([]);

    useEffect(() => {
        /**
         * Here we are looping through data, and getting max and min temperatures of the day, also,
         * we are sending weathers array, so we can simply get the most occasioned
         * weather of the day and show image
         */
      if (props.data) {
            setData(Object.values(props.data).map((item) => {
              return (item.reduce((acc, subItem) => {
                if (!acc.min) {
                  acc.min = subItem.main.temp_min;
                  acc.date = subItem.dt_txt;
                } else if (acc.min > subItem.main.temp_min) {
                  acc.min = subItem.main.temp_min;
                }
                if (!acc.max) {
                  acc.max = subItem.main.temp_max;
                } else if (acc.max < subItem.main.temp_max) {
                  acc.max = subItem.main.temp_max;
                }
                if (!acc.weather) {
                  acc.weather = [...subItem.weather];
                } else {
                  acc.weather = [...acc.weather, ...subItem.weather]
                }
                return acc;
              }, {}));
            }));
        }
    }, [props.data]);

    useEffect(() => {
        if (
            !dataWithConcreteProperties.length && loading !== true
        ) {
            setLoading(true);
        } else if (!!dataWithConcreteProperties.length && loading === true) {
            setLoading(false);
        }
    }, [dataWithConcreteProperties]);

    const clickHandler = (day) => {
        props.history.push(`/${day}`);
    };

    const cards = useMemo(() => (
        dataWithConcreteProperties.map((item) => {
            return(<Card className={classes.weatherCard} key={item.date}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        <img src={`http://openweathermap.org/img/w/${getAvgWeather(item.weather)}.png`}/>
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {generateDate(item.date)}
                    </Typography>
                    <Typography className={classes.temperature}>
                        Min. {item.min > 0 ? `+${Math.round(item.min)}` : Math.round(item.min)} °
                    </Typography>
                    <Typography className={classes.temperature}>
                        Max. {item.max > 0 ? `+${Math.round(item.max)}` : Math.round(item.max)} °
                    </Typography>
                </CardContent>
                <CardActions className={classes.buttonContainer}>
                    <Button size="small" onClick={() => clickHandler(moment(item.date).format("DD"))}>Learn More</Button>
                </CardActions>
            </Card>)
        })
    ), [dataWithConcreteProperties]);

    return (
        <div className={classes.weathers}>
            {
                loading ? (
                    <div id="preloader">
                        <div id="ctn-preloader" className="ctn-preloader">
                            <div className="animation-preloader">
                                <div className="spinner"/>
                            </div>
                        </div>
                    </div>
                    )
                    : !!dataWithConcreteProperties.length && cards
            }
        </div>
    )
};

export default FullWeather;
