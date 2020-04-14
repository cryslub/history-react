import React, { useState } from 'react';
import './App.css';
import ThreeScene from './ThreeScene.js';
import DataService from './DataService.js';
import Main from './Main.js';

import './css/bootstrap.css';
import './css/glyphicon.css';


function App() {

	const scene = React.createRef();
	const data = new DataService(scene);
	

  return (		  
		  <>
		  	<ThreeScene ref={scene}/>
			 <Main data={data}/>
			  
			  
		      
		      
		  </>
  );
}

export default App;
