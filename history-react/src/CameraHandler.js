export default class CameraHandler{

	constructor(container,camera,mesh){
		
		this.camera = camera;
		this.mesh = mesh;
		this.container = container;
		
		this.distance = 300;
		this.distanceTarget = 300;
		
		this.camera.position.z = this.distance;
		
	  this.mouse = { x: 0, y: 0 };
	  this.mouseOnDown = { x: 0, y: 0 };
	  this.rotation = { x: 0, y: 0 };
	  this.target = { x: Math.PI*3/2, y: Math.PI / 6.0 };
	  this.targetOnDown = { x: 0, y: 0 };
	  
	  

	    this.container.addEventListener('mousedown', this.onMouseDown, false);
	    this.container.addEventListener('mousewheel', this.onMouseWheel, false);
	     this.container.addEventListener('mousemove', this.onTouchMove, false);
	}
	
	
  onMouseDown = (event) => { 
    event.preventDefault();
    
        this.container.addEventListener('mousemove', this.onMouseMove, false);
    this.container.addEventListener('mouseup', this.onMouseUp, false);
    this.container.addEventListener('mouseout', this.onMouseOut, false);
    

	this.mousedown = true;
    this.mouseOnDown.x = - event.clientX;
    this.mouseOnDown.y = event.clientY;

    this.targetOnDown.x = this.target.x;
    this.targetOnDown.y = this.target.y;

    this.container.style.cursor = 'move';
  }

   onMouseMove = (event) =>  {
   	//if(this.mousedown){
	    this.mouse.x = - event.clientX;
	    this.mouse.y = event.clientY;
	
	    var zoomDamp = this.distance/1000;
	
	    this.target.x = this.targetOnDown.x + (this.mouse.x - this.mouseOnDown.x) * 0.005 * zoomDamp;
	    this.target.y = this.targetOnDown.y + (this.mouse.y - this.mouseOnDown.y) * 0.005 * zoomDamp;
	
	    this.target.y = this.target.y > this.PI_HALF ? this.PI_HALF : this.target.y;
	    this.target.y = this.target.y < - this.PI_HALF ? - this.PI_HALF : this.target.y;
   // }
  }
  
  onMouseUp = (event) =>  {
   this.container.removeEventListener('mousemove', this.onMouseMove, false);
    this.container.removeEventListener('mouseup', this.onMouseUp, false);
    this.container.removeEventListener('mouseout', this.onMouseOut, false);
    
  	this.mousedown = false;
 
    this.container.style.cursor = 'auto';
  }

   onMouseOut = (event) =>  {
   this.container.removeEventListener('mousemove', this.onMouseMove, false);
    this.container.removeEventListener('mouseup', this.onMouseUp, false);
    this.container.removeEventListener('mouseout', this.onMouseOut, false);
    
  	this.mousedown = false;

  }
  
  onMouseWheel = (event) => {
    event.preventDefault();
    //if (overRenderer) {
      this.zoom(event.wheelDeltaY * 0.1);
    //}
    return false;
  }
  
   onTouchMove = ( event ) =>{

		var x, y;

		if ( event.changedTouches ) {

			x = event.changedTouches[ 0 ].pageX;
			y = event.changedTouches[ 0 ].pageY;

		} else {

			x = event.clientX;
			y = event.clientY;

		}

		this.mouse.x = ( x / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( y / window.innerHeight ) * 2 + 1;

	    

	//	checkIntersection();

	}
  
  
  
  zoom =(delta) =>{
  	const zoomMin = 120
  	const zoomMax = 300

    this.distanceTarget -= delta;
    this.distanceTarget = this.distanceTarget > zoomMax ? zoomMax : this.distanceTarget;
    this.distanceTarget = this.distanceTarget < zoomMin  ? zoomMin : this.distanceTarget;
  }
  
  
  render(){
  
  	
	this.rotation.x += (this.target.x - this.rotation.x) * 0.1;
	this.rotation.y += (this.target.y - this.rotation.y) * 0.1;
    this.distance += (this.distanceTarget - this.distance) * 0.3;

    this.camera.position.x = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y);
    this.camera.position.y = this.distance * Math.sin(this.rotation.y);
    this.camera.position.z = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y);

    this.camera.lookAt(this.mesh.position);
  
  }
}
