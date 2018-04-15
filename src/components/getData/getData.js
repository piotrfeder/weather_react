import React, { Component } from 'react';
import { ShowData } from '../showData/showData';
import './getData.css';

export default class GetData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.city,
            sunrise: '',
            sunset: '',
            humidity: '',
            pressure: '',
            temp: '',
            tempMax: '',
            tempMin: '',
            windDir: '',
            windSpeed: '',
            weatherDesc: '',
            weatherIcon: '',
            weatherMain: '',
            currTime: '',
            cityName: '',
            render: true
        }

        this.fetchData = this.fetchData.bind(this);
    }


     componentDidMount() {
        this.fetchData(this.props.city);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.city !== nextProps.city) {
            this.fetchData(nextProps.city);
        }
    }

    changeTime = (time) => {
        let newTime = new Date(time*1000),
            hours = newTime.getHours(),
            minutes = newTime.getMinutes(),
            minutesFixed,
            changedTime;
            
            if(minutes < 10) {
                 minutesFixed = '0' + minutes.toString();
            }
            else {
                minutesFixed = minutes;
            }
            changedTime = hours + ":" + minutesFixed
            
        return changedTime;
    }

    fetchData(cityName) {
        let main = this;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=f6eec388d2777d8e7ad84b20ad2e5bb4`;
       
        
        if(!window.fetch)
        {
            console.log('nie wpsiera fetch');
        }

        fetch(url, {
            method: 'GET',
            
        } )
            .then(function (response) {
                if (response.status !== 200) {
                   main.setState({
                       cityName: 'Nie można odczytać miasta',
                       render: false
                   })
                }
                else {
                    response.json().then(function (data) {
                    
                        main.setState({
                            sunrise: data.sys.sunrise,
                            sunset: data.sys.sunset,
                            humidity: data.main.humidity,
                            pressure: data.main.pressure,
                            temp: data.main.temp,
                            tempMax: data.main.temp_max,
                            tempMin: data.main.temp_min,
                            windDir: data.wind.deg,
                            windSpeed: data.wind.speed,
                            weatherDesc: data.weather[0].description,
                            weatherIcon: data.weather[0].icon,
                            weatherMain: data.weather[0].main,
                            currTime: data.dt,
                            cityName: data.name,
                            render: true
                        })

                    });
                }
               

            })
    }

    render() {
        
        return(
            <div className="weatherInfo">
                <h2>{this.state.cityName}</h2>
                {
                    this.state.render === true ?
                        <div className="dataBox">
                            <ShowData 
                                mainClass='sunInfo'
                                boxData = {[{
                                    data: this.changeTime(this.state.sunrise),
                                    name:'Wschód slońca:',
                                    boxClass: 'sunrise'
                                    },
                                    {
                                    data: this.changeTime(this.state.sunset),
                                    name: 'Zachód slońca:',
                                    boxClass: 'sunrise'
                                    }]}
                            />
                            <ShowData 
                                mainClass='weatherCond'
                                
                                boxData = {[{
                                    data: this.state.weatherMain,
                                    name:'',
                                    boxClass: 'main'
                                },
                                {
                                    data: this.state.weatherDesc,
                                    name: '',
                                    boxClass: 'description'
                                },
                                {
                                    data: this.state.weatherIcon,
                                    name: '',
                                    boxClass: 'icon'
                                }]}
                            />

                            <ShowData 
                                mainClass='currentTime'
                                
                                boxData = {[{
                                    data: this.changeTime(this.state.currTime),
                                    name:'Dane z:',
                                    boxClass: 'time'
                                }]}
                            />

                            <ShowData 
                                mainClass='mainWeather'
                                
                                boxData = {[{
                                    data: `${this.state.humidity} %`,
                                    name:'Wilgotność:',
                                    boxClass: 'humidity'
                                },
                                {
                                    data: `${this.state.pressure} hPa`,
                                    name:'Ciśnienie:',
                                    boxClass: 'pressure'
                                },
                                {
                                    data: `${this.state.temp} C`,
                                    name:'Temperatura:',
                                    boxClass: 'temp'
                                },
                                {
                                    data: `${this.state.tempMax} C`,
                                    name:'Temperatura max:',
                                    boxClass: 'tempMax'
                                },
                                {
                                    data: `${this.state.tempMin} C`,
                                    name:'Temperatura min:',
                                    boxClass: 'tempMin'
                                }]}
                            />
                                <ShowData 
                                mainClass='windInfo'
                                
                                boxData = {[{
                                    data: `${this.state.windSpeed} km/h`,
                                    name:'Szybkość wiatru:',
                                    boxClass: 'windSpeed'
                                },
                                {
                                    data: this.state.windDir,
                                    name: 'Kierunek wiatru:',
                                    boxClass: 'windDeg'
                                }]}
                            />
                    </div> : null
            }

            </div>
        )
    }
}