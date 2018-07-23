import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
require('dotenv').config()
var config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectID,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};
firebase.initializeApp(config);

const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);



class App extends Component {


  
  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const textToSave = {
      name: this.state.name,
      password: this.state.password
    }
    
    db.collection("households").add(
      textToSave
    ).then(data => {
          console.log(data);
        }).catch(err => console.log(err));

  }

  handleGetSubmit = event => {
    event.preventDefault();

    db.collection("households").get().then(querySnapshot=>{
      querySnapshot.forEach(doc => console.log(doc.data()))
    }).catch(err=>console.log(err));

  }

  render() {
    return (
      <div className="App">
        <form>
          <label>
            name:
            <input type="text" name="name" onChange={this.handleFormChange}/>
          </label>
          <label>
            pass:
            <input type="text" name="password" onChange={this.handleFormChange}/>
          </label>
        </form>
        <button onClick={this.handleFormSubmit}>submit</button>
        <button onClick={this.handleGetSubmit}>get</button>
      </div>
    );
  }
}

export default App;
