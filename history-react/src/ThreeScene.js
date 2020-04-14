import React, { Component } from 'react';
import * as THREE from 'three';

import Globe from './Globe.js';
import CameraHandler from './CameraHandler.js';
import VariableObjects from './VariableObjects.js';



export default class ThreeScene extends Component{
  componentDidMount(){
  
  	//value initialize
    this.loaded = false;
    
    const width = window.innerWidth
    const height = window.innerHeight
    
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
    

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height)
    this.renderer.domElement.style.position = 'absolute';
    
    this.container.appendChild(this.renderer.domElement)
	
	window.addEventListener('resize', this.onWindowResize, false);
	    
    this.globe = new Globe(this.scene);
    this.globe.init();
    this.mesh = this.globe.mesh;

	this.cameraHandler = new CameraHandler(this.container,this.camera,this.mesh);
	this.objects = new VariableObjects(this.scene,this.mesh,this.globe,this.container);
    
	this.start()
	
	
  }
  
  

 onWindowResize = ( event ) => {
	  this.camera.aspect = window.innerWidth / window.innerHeight;
	    this.camera.updateProjectionMatrix();

	    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
  	
componentWillUnmount(){
    this.stop()
    this.container.removeChild(this.renderer.domElement)
  }
  
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
  
animate = () => {
  // this.cube.rotation.x += 0.01
   //this.cube.rotation.y += 0.01
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
 
renderScene = () => {
	//this.zoom(this.curZoomSpeed);
	this.cameraHandler.render();
    


    this.objects.render(this.cameraHandler.mouse,this.camera);
    
    this.renderer.render(this.scene, this.camera);
    
   
}
render(){
    return(
      <div
        
        ref={(container) => { this.container = container }}
      />
    )
  }
}