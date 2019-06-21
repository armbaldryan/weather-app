import React, {useEffect, useState} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import {generateDegrees} from "../../helpers";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    backButton: {
        margin: theme.spacing(1),
        background: '#c977fd',
        color: '#fff',
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
    const classes = useStyles();

    const generateChartData = (data) => data.map((item) => ({
        name: new Date(item.dt_txt).toLocaleTimeString(),
        temp: generateDegrees(item.main.temp),
    }));

    const [data, setData] = useState((Object.keys(props.data).length && props.match.params.day) ? generateChartData(props.data[Number(props.match.params.day)]) : []);

    useEffect(() => {
        if (Object.keys(props.data).length && !data.length && props.match.params) {
            setData(generateChartData(props.data[Number(props.match.params.day)]))
        }
    }, [props.data]);

    const backButtonHandler = () => props.history.push('/');

    return (
        <div className={classes.singleDay}>
            <Button
                variant="contained"
                onClick={backButtonHandler}
                className={classes.backButton}
            >
                Return Back
            </Button>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="temp" fill="#C977FD" />
            </BarChart>
        </div>
    )
};

export default HourlyWeather;
