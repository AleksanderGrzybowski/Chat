import React, { Component } from 'react';
import axios from 'axios';
import backendUrl from './backendUrl';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            input: '',
            serverResponse: null
        }
    }
    
    handleInputChange = (e) => {
        this.setState({input: e.target.value})
    };
    
    makeRequest = () => {
        axios.get(`${backendUrl}/test/square?number=${this.state.input}`)
            .then((response) => this.setState({serverResponse: JSON.stringify(response)}))
            .catch((error) => this.setState({serverResponse: JSON.stringify(error)}))
    };
    
    render() {
        return (
            <div className="App">
                <input value={this.state.input} onChange={this.handleInputChange}/>
                <button onClick={this.makeRequest}>Click</button>
                <span>Response: {this.state.serverResponse}</span>
            </div>
        );
    }
}

export default App;
