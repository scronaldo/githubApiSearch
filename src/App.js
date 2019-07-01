import React, { Component, Fragment } from 'react';
import './App.css';
import './bootstrap.css';
import { NavLink } from 'react-router-dom';
import { client, key } from './API/api';
import Header from './components/header'



class App extends Component {

  state = {
    userList: [],
    userData: {},
    showData: false,
    count: null
  }

  handleInput = (e) => {
    this.setState({
      listInput: e.target.value
    })
    // console.log(this.state.listInput);    
  }

  // self-note: could take event arg only so have to  use nested func (closure)
  // babel syntax for binding
  fetchList = (event) => {
    event.preventDefault();

    return (
      this.fetchListCall(this.state.listInput)
    )


  }

  fetchListCall = async (listInput) => {

    console.log(listInput);

    const rawList = await fetch(`https://api.github.com/search/users?q=${listInput}&client_id=${client}&client_secret=${key}`);
    const data = await rawList.json();
    // converted body to object
    console.table(data);
    console.log('%c while you checking for errors. . . Quick side-note: I love reactJS and JS itself. Hopefully i will always enjoy it. Coding is an art to me.', 'color: green; font-weight: bold; font-size: 15px; background: linear-gradient(#000000, #434343) ');


    this.setState({
      userList: data.items,
      count: data.total_count,
      showData: true
    })
    console.log(this.state);


  }






  render() {

    const usersMarkup = this.state.userList.length ?
      this.state.userList.map(el => {
        return (
          <div key={el.id} className='text-center container mb-5 p-5 font-weight-bolder'>
            <div className='row text-center'>
              <div className="col-sm-10 mx-auto">
                <p>User login: {el.login}</p>
                <img src={el.avatar_url} className=" img-fix rounded-circle img-thumbnail mx-auto d-block mb-4" alt="" />
                <p><NavLink className='blue bg-primary text-white'
                  style={{ padding: '11px', fontWeight: 'bold', color: 'red', marginBottom: '30px' }}
                  to={`/user/${el.login}`}>View  user profile on our website </NavLink></p>

              </div></div>

          </div>
        )
      })



      : null;






    const showTest = <p>JUST DO IT! SEARCH! WHAT ARE YOU WAITING FOR? MAKE YOUR DREAM COME TRUE!</p>;
    const showResults = this.state.userList.length ?


      (<Fragment>
        <p className='text-success'>Result:</p>
        <p>{this.state.count} users found</p>
        {usersMarkup}
      </Fragment>)

      :

      <p>NOTHING IS FOUND. DON'T GIVE UP! TRY HARDER. REACH THE POINT WHERE EVERYONE ELSE WOULD QUIT! BUT NOT YOU. SEARCH AGAIN!</p>








    return (
      <div className="container">
        <Header />

        <div className="col-md-8 text-center center-block mx-auto" style={{ margin: '40px' }}>

          <form onSubmit={this.fetchList}>
            <div className="form-group">
              <label htmlFor="org">enter user name:</label>
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
            <h1>User search</h1>
            <p style={{ margin: '30px' }}>
              <NavLink className='blue bg-primary text-white'
                style={{ padding: '11px', fontWeight: 'bold', color: 'red', marginBottom: '30px' }}
                to="/org">SWITCH TO ORGANISATION SEARCH</NavLink>




            </p>
            <p>Powered by GitHub api <a href="https://developer.github.com/v3/">https://developer.github.com/v3/search/</a></p>
            <p className="black black-color">Dedicated to Andrew (the person that motivated me to create it)</p>
            <span className='blue bg-danger text-white' style={{ padding: '5px' }}>Description: </span>
            <p style={{ marginTop: '5px' }}>Simple ReactJS project using GitHub API</p>
          </div>
        </div>
      </div>


    )

  }




}
export default App;
