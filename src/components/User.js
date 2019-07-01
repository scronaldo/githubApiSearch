import React, { useState, useEffect } from 'react';
import '../App.css';
import '../bootstrap.css';
import { client, key } from '../API/api'

const User = (props) => {

    const [userData, setUserData] = useState({})


    let id = props.match.params.id;
    // console.log(id);



    const getUser = async (id) => {


        const rawList = await fetch(`https://api.github.com/users/${id}?client_id=${client}&client_secret=${key}`);
        const data = await rawList.json();
        console.table(data);
        console.log('%c while you checking for errors. . . Quick side-note: I love reactJS and JS itself. Hopefully i will always enjoy it. Coding is an art to me.', 'color: green; font-weight: bold; font-size: 15px; background: linear-gradient(#000000, #434343) ');
        setUserData(data);


    }




    useEffect(() => {
        getUser(id);
    }, [])




    return (

        <div className="container">
            <div className="row">
                <div className="col-10">


                    <div className="card text-center">
                        <img className=" img-fix rounded-circle img-thumbnail mx-auto d-block" src={userData.avatar_url} alt="cool pic" />
                        <div className="card-body">
                            <h5 className="card-title">User card</h5>
                            <p className="card-text">{userData.login}</p>
                            <a href={userData.url} target='_blank' className="btn btn-primary mb-3">Open user GitHub</a>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Location: {userData.location}</li>

                                <li className="list-group-item">Joined: {userData.created_at ?
                                    userData.created_at.slice(0, 4)
                                    : null}</li>
                                <li className="list-group-item">Name: {userData.name}</li>
                                <li className="list-group-item">Repositories: {userData.public_repos}</li>

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )



}



export default User