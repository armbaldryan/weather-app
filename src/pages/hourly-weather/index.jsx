import React, {useEffect, useState} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const useStyles = makeStyles(theme => ({
    backButton: {
        margin: 8,
        background: '#c977fd',
        color: '#fff',
        borderRadius: '50%',
        padding: '14px',
        minWidth: 'inherit',
    },
    singleDay: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px',
    },
}));

const HourlyWeather = (props) => {
    const [loading, setLoading] = useState(true);

    const classes = useStyles();

    const generateChartData = (data) => data.map((item) => ({
        name: moment(item.dt_txt).format("h:mm a"),
        temp: Math.round(item.main.temp),
    }));

    const [data, setData] = useState((Object.keys(props.data).length && props.match.params.day) ? generateChartData(props.data[Number(props.match.params.day)]) : []);

    useEffect(() => {
        if (Object.keys(props.data).length && !data.length && props.match.params) {
            setData(generateChartData(props.data[Number(props.match.params.day)]))
        }
        // eslint-disable-next-line
    }, [props.data]);

    useEffect(() => {
        if (
            !data.length && loading !== true
        ) {
            setLoading(true);
        } else if (!!data.length && loading === true) {
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [data]);

    const backButtonHandler = () => props.history.push('/');

    return (
        <div className={classes.singleDay}>
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
                    : (
                        <>
                            <Button
                                variant="contained"
                                onClick={backButtonHandler}
                                className={classes.backButton}
                            >
                                <FontAwesomeIcon icon="arrow-left"/>
                            </Button>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <ReferenceLine y={0} stroke="#000"/>
                                <Bar dataKey="temp" fill="#C977FD"/>
                            </BarChart>
                        </>
                    )
            }
        </div>
    );
};

export default HourlyWeather;
