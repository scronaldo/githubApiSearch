import React, { Component, Fragment } from 'react';
import '../App.css';
import '../bootstrap.css';
import { client, key } from '../API/api';
import Header from './Header';
import { NavLink } from 'react-router-dom'



class Org extends Component {

  state = {
    orgData: {},
    showData: false
  }

  handleInput = (e) => {
    this.setState({
      listInput: e.target.value
    })
  }


  fetchList = (event) => {
    event.preventDefault();

    return (
      this.fetchListCall(this.state.listInput)
    )
  }

  fetchListCall = async (listInput) => {

    console.log(listInput);

    const rawList = await fetch(`https://api.github.com/orgs/${listInput}?client_id=${client}&client_secret=${key}`);
    const data = await rawList.json();
    console.table(data);
    console.log('%c while you checking for errors. . . Quick side-note: I love reactJS and JS itself. Hopefully i will always enjoy it. Coding is an art to me.', 'color: green; font-weight: bold; font-size: 15px; background: linear-gradient(#000000, #434343) ');


    this.setState({
      orgData: data,
      showData: true
    })
  }


  render() {

    const showTest = <p>JUST DO IT! SEARCH!</p>;
    const showResults = this.state.orgData.message ? <p>NOTHING IS FOUND</p> :
      <Fragment>
        <p className='text-success'>Result:</p>
        <p>{this.state.orgData.name}</p>
        <p><a href={`https://github.com/${this.state.orgData.name}`}>Go to GitHub page</a></p>
      </Fragment>

    return (

      <div className="container">
        <Header />
        <div className="col-md-8 text-center center-block mx-auto" style={{ margin: '40px' }}>
          <form onSubmit={this.fetchList}>
            <div className="form-group">
              <label htmlFor="org">enter full name (for example, Facebook):</label>
              <input type="text" className="form-control" id="org" onChange={this.handleInput} />
            </div>
            <button type="submit" className="btn btn-primary">find</button>
          </form>
        </div>

        <div className="row">
          <div className="col-md-12 dataresult text-center">
            {this.state.showData ? showResults : showTest}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 jumbotron text-center" style={{ padding: '20px' }}>
            <h1>Organisation search</h1>
            <p style={{ margin: '30px' }}> <NavLink className='blue bg-primary text-white' style={{ padding: '11px', fontWeight: 'bold', color: 'red', marginBottom: '30px' }}
              to="/">SWITCH TO USER SEARCH</NavLink></p>
            <p>Powered by GitHub api <a href="https://developer.github.com/v3/orgs/">
              https://developer.github.com/v3/orgs/</a></p>
            <p className="black black-color">Dedicated to Andrew (the person that motivated me to create it)</p>
            <span className='blue bg-danger text-white' style={{ padding: '5px' }}>Description: </span>
            <p style={{ marginTop: '5px' }}>Simple ReactJS project using GitHub API</p>
          </div>
        </div>
      </div>
    )
  }



}
export default Org;
