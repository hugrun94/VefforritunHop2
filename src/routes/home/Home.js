import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
  	//const { username, password } = this.state;
    //const { isFetching, isAuthenticated, message } = this.props;
    const token = window.localStorage.getItem('user');
    console.log(token);
    if(token != null){
    	return (
	      <div>
	        <h2>Velkomin á bókasafnið</h2>
	        <p>Þú ert skráður notandi og getur því <Link to="/books/new">skráð bækur</Link> og breytt <Link to="/books">þeim sem til eru.</Link>  </p>
	        <p>Einnig getur þú skoðað <Link to="/users">aðra notendur</Link></p>
	      </div>
	    );
    }else{
    	return (
	      <div>
	        <h2>Velkomin á bókasafnið</h2>
	        <h3>Til að njóta bókasafnisins til fullnustu mælum við með að <Link to="/login">skrá sig inn</Link> Þangað til getur þú skoðað allar bækurnar (Vantarlink)</h3>
	      </div>
	    );
    }

  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
