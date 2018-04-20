import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
  	
    const token = window.localStorage.getItem('user');
    if(token != null){
    	return (
	      <div className="wrapper">
	        <h2>Velkomin á bókasafnið</h2><br></br>
	        <p>Þú ert skráður notandi og getur því <Link to="/books/new">skráð bækur</Link> og breytt <Link to="/books">þeim sem til eru.</Link>  </p>
	        <p>Einnig getur þú skoðað <Link to="/users">aðra notendur</Link></p>
	      </div>
	    );
    }else{
    	return (
	      <div>
	        <h2>Velkomin á bókasafnið</h2>
	        <p>Til að njóta bókasafnisins til fullnustu mælum við með að <Link to="/login">skrá sig inn</Link> Þangað til getur þú skoðað <Link to ="/books">allar bækurnar</Link>.</p>
	      </div>
	    );
    }

  }
}

export default Home;
