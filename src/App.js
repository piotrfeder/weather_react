import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './img/1.jpg';
import './img/2.jpg';
import FormMain from './components/form/form';
import GetData from './components/getData/getData';

class App extends Component {
  constructor() {
    super();
      this.state = {
        city: ''
      }

      this.getCity = this.getCity.bind(this);
  }

  getCity(city) {
    this.setState({
      city: city
    })
  }



  render() {
    return (
      <div className="weather-app">
          <FormMain getCity={this.getCity} />
          { (this.state.city !=='') ? <GetData city={this.state.city} /> : null }

      </div>
    );
  }
}

export default App;
