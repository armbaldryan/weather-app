import * as moment from 'moment';

export const getAvgWeather = (data) => {
    if(data.length === 0)
        return null;
    let weather = {};
    let maxEl = data[0].icon, maxCount = 1;
    for(let i = 0; i < data.length; i++)
    {
        let el = data[i].icon;
        if(weather[el] == null)
            weather[el] = 1;
        else
            weather[el]++;
        if(weather[el] > maxCount)
        {
            maxEl = el;
            maxCount = weather[el];
        }
    }
    return maxEl;
};

export const generateDate = (date) => moment("date", "DD-MM-YYYY");


export const generateDegrees = (temperature) => {
    if (temperature > 0) {
        return `+${Math.round(temperature)}`
    } else {
        return Math.round(temperature);
    }
};
