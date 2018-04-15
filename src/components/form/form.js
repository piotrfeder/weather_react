import React, { Component } from 'react';
import './form.css';

export default class FormMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            correctInput: true
        }
        this.getInput = this.getInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getInput(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let getCity = this.props.getCity;
        
        if(this.state.value === '')
        {
            this.setState({
                correctInput: false
            })
        }
        else
        {
            getCity(this.state.value);
        }

        
    }

    render() {

        return(
        <div className="form">
            <form >
              <label htmlFor="city">Wpisz miasto:</label>
              <input type="text" id="city" name="city" onChange={this.getInput} />
              <span className={ ( this.state.correctInput === false ? 'show' : 'hidden') + " warning" }>Musisz wybrac miasto!</span>
              <button type="submit" className="btn action-btn" onClick={(e) => {this.handleSubmit(e)}}>Pokaż pogodę</button>
            </form>
          </div>
        )
    }
}

 
