import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export default class Main extends Component {
	
	
	constructor(){
		super();
		 this.state = {
		      show: false
		    };
		
		
	}
	
	handleClose = () => this.setState({show:false});
   handleShow = () => this.setState({show:true});	
   selectScenario = (scenario) => {
	   this.props.data.selectScenario(scenario);
	   this.handleClose();
   }
	
  render() {
    return  <>
    		
		    <div id="currentInfo">
		  	
			 <Button variant="outline-light" size="sm" onClick={this.handleShow}> 
			 	Scenario
		      </Button>
			
			
		  </div>
		
		
		  <Modal show={this.state.show} onHide={this.handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Select Scenario</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        
	        <Tabs variant="pills" defaultActiveKey="pills-ancient">
		        <Tab eventKey="pills-ancient" title="Ancient">
		        	{this.props.data.era.ancient.map(scenario=>{
		        		if(scenario.yn)
		        			return <div onClick={() =>this.selectScenario(scenario)}><hr/><a href="#" >{scenario.name}</a></div>
		        			else return null;
		        	})}
		        </Tab>
		        <Tab eventKey="pills-classical" title="Classical">
		        	{this.props.data.era.classical.map(scenario=>{
		        		if(scenario.yn)
		        			return <div onClick={() =>this.selectScenario(scenario)}><hr/><a href="#">{scenario.name}</a></div>
		        			else return null;
		        	})}
			       
		        </Tab>
		        <Tab eventKey="pills-medieval" title="Medieval">
			        {this.props.data.era.medieval.map(scenario=>{
		        		if(scenario.yn)
		        			return <div onClick={() =>this.selectScenario(scenario)}><hr/><a href="#">{scenario.name}</a></div>
		        			else return null;
		        	})}
		        </Tab>
		        <Tab eventKey="pills-renaissance" title="Renaissance">
			        {this.props.data.era.renaissance.map(scenario=>{
		        		if(scenario.yn)
		        			return <div onClick={() =>this.selectScenario(scenario)}><hr/><a href="#">{scenario.name}</a></div>
		        			else return null;
		        	})}
		        </Tab>

		      
		        
		      </Tabs>
	        
	        
	        </Modal.Body>

	      </Modal>
	      
	      
	</>;

   
  }
}