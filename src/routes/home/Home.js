import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {

  render() {
  	
    const token = window.localStorage.getItem('user');
    if(token != null){
    	return (
	      <div className="wrapper">
	        <h2>Velkomin á bókasafnið</h2><br></br>
	        <p>Þú ert skráður notandi og getur því <NavLink to="/books/new">skráð bækur</NavLink> og breytt <NavLink to="/books">þeim sem til eru.</NavLink>  </p>
	        <p>Einnig getur þú skoðað <NavLink to="/users">aðra notendur</NavLink></p>
	      </div>
	    );
    }else{
    	return (
	      <div>
	        <h2>Velkomin á bókasafnið</h2>
	        <p>Til að njóta bókasafnisins til fullnustu mælum við með að <NavLink to="/login">skrá sig inn</NavLink> Þangað til getur þú skoðað <NavLink to ="/books">allar bækurnar</NavLink>.</p>
	      </div>
	    );
    }

  }
}

export default Home;
