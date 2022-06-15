var stats, camera, scene, renderer, controls, attractors;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;


function randomPoint(min, max) {
	return Math.random() * (max - min) + min;
}

var settings = {
	"showAxes" : function() {
		return document.getElementById("showAxes").checked;
	},
	"attractorCount" : function() {
		return parseInt(document.getElementById("attractorCount").value);
	},
	"startAt" : function() {
		return parseInt(document.getElementById("startAtTime").value);
	},
	"maxSize" : function() {
		return parseInt(document.getElementById("maxSize").value);
	},
	"cyclic" : function() {
		return document.getElementById("cyclicAtMaxSize").checked;
	}
};

// Contains getters for all attractor variables for any given attractor type.
var attractorVariables = {
	"type" : function() {
		return document.getElementById("attractorSelect").value;
	},
	
	"attractorData" : function() {
		var type = this["type"]();
		
		var getValue = function(attributeValue) {
			
			return parseFloat(document.getElementById(attributeValue).value);
		};
		
		switch(type) {
			case "Rossler":
				return ["Rossler", getValue("aValue"), getValue("bValue"), getValue("cValue")];
			case "Buckling":
				return ["Buckling", getValue("mValue"), getValue("aValue"), getValue("bValue"), getValue("cValue")];
			case "Rayleigh":
				return ["Rayleigh", getValue("cdValue"), getValue("bValue"), getValue("aValue")];
			case "Thomas":
				return ["Thomas", getValue("bValue")];
			case "Aizawa":
				return ["Aizawa", getValue("aValue"), getValue("bValue"), getValue("cValue"), getValue("dValue"), getValue("eValue"), getValue("fValue")];
			case "Dadras":
				return ["Dadras", getValue("aValue"), getValue("bValue"), getValue("cValue"), getValue("dValue"), getValue("eValue")];
			case "Chen":
				return ["Chen", getValue("alphaValue"), getValue("betaValue"), getValue("deltaValue")];
			case "Lorenz83":
				return ["Lorenz83", getValue("aValue"), getValue("bValue"), getValue("fValue"), getValue("gValue")];
			case "Halvorsen":
				return ["Halvorsen", getValue("aValue")];
			case "Rabinovich-Fabrikant":
				return ["Rabinovich-Fabrikant", getValue("alphaValue"), getValue("gammaValue")];
			case "Three-Scroll Unified Chaos System":
				return ["Three-Scroll Unified Chaos System", getValue("aValue"), getValue("bValue"), getValue("cValue"), getValue("dValue"), getValue("eValue"), getValue("fValue")];
			case "Sprott":
				return ["Sprott", getValue("aValue"), getValue("bValue")];
			case "Four-Wing":
				return ["Four-Wing", getValue("aValue"), getValue("bValue"), getValue("cValue")];
			default:
				return ["Lorenz", getValue("sigmaValue"), getValue("rhoValue"), getValue("betaValue")];
		}
	},
	
	"deltaT" : function() {
		return parseFloat(document.getElementById("deltaT").value);
	},
	
	"startX" : function() {
		return randomPoint(parseFloat(document.getElementById("startMinX").value), parseFloat(document.getElementById("startMaxX").value));
	},
	
	"startY" : function() {
		return randomPoint(parseFloat(document.getElementById("startMinY").value), parseFloat(document.getElementById("startMaxY").value));
	},
	
	"startZ" : function() {
		return randomPoint(parseFloat(document.getElementById("startMinZ").value), parseFloat(document.getElementById("startMaxZ").value));
	},
	
	"sphereSize" : function() {
		return parseFloat(document.getElementById("sphereSize").value);
	},
	
	"lineSize" : function() {
		return parseFloat(document.getElementById("lineSize").value);
	},
	
	"scale" : function() {
		return parseFloat(document.getElementById("scale").value);
	},
	
	"initAttractor" : function(i) {
		//x, y, z, deltaT, sphereRadius, sphereColour, lineWidth, lineColour, attractorData, scale
		return new Attractor(
			this["startX"](), this["startY"](), this["startZ"](),
			this["deltaT"](), this["sphereSize"](),
			this["lineSize"](), Math.random() * 0xffffff,
			this["attractorData"](), this["scale"](), i);
	}
};

// Each instance of this class represents a different attractor of the given attractor type.
class Attractor {
	constructor(x, y, z, deltaT, sphereRadius, lineWidth, colour, attractorData, scale, id) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.z = z;
		
		this.colour = colour
		
		this.scale = scale;
		
		this.deltaT = deltaT;
		
		this.attractorData = attractorData;
		
		this.elements = 0;
		
		var headGeometry = new THREE.SphereGeometry(sphereRadius, 32, 16);
		var headMaterial = new THREE.MeshBasicMaterial( { color: colour });
		
		this.tailGeometry = new THREE.BufferGeometry();
		var tailMaterial = new THREE.LineBasicMaterial( { color: colour, linewidth: lineWidth } );
		
		this.line = new Float32Array(settings["maxSize"]() * 3);
		this.tailGeometry.setAttribute('position', new THREE.BufferAttribute(this.line, 3));
		
		this.head = new THREE.Mesh(headGeometry, headMaterial);
		this.tail = new THREE.Line(this.tailGeometry, tailMaterial);
		
		this.head.name = "Head" + id;
		scene.add(this.head);
		scene.add(this.tail);
	}
	
	changeSphereSize(size) {
		scene.remove(scene.getObjectByName("Head" + this.id));
		
		var headGeometry = new THREE.SphereGeometry(size, 32, 16);
		var headMaterial = new THREE.MeshBasicMaterial( { color: this.colour });
		
		this.head = new THREE.Mesh(headGeometry, headMaterial);
		
		this.head.name = "Head" + this.id;
		scene.add(this.head);
	}
	
	update() {
		if (this.elements == settings["maxSize"]() && settings["cyclic"]() == true) {
			for (var i = 3; i < settings["maxSize"]() * 3; i++) {
				this.line[i - 3] = this.line[i];

			}

			this.elements -= 1;
		}
		
		if (this.elements < settings["maxSize"]()) {
			var deltaX = 0;
			var deltaY = 0;
			var deltaZ = 0;
			//https://www.dynamicmath.xyz/strange-attractors/
			
			if (this.attractorData[0] == "Lorenz") {
				// sigma = this.attractorData[1]
				// rho = this.attractorData[2]
				// beta = this.attractorData[3]
				deltaX = this.attractorData[1] * (this.y - this.x);
				deltaY = this.attractorData[2] * this.x - this.y - this.x * this.z;
				deltaZ = this.x * this.y - this.attractorData[3] * this.z;
			} else if (this.attractorData[0] == "Rossler") {
				// A = this.attractorData[1]
				// B = this.attractorData[2]
				// C = this.attractorData[3]
				deltaX = - (this.y + this.z);
				deltaY = this.x + this.attractorData[1] * this.y;
				deltaZ = this.attractorData[2] + this.x * this.z - this.attractorData[3] * this.z;
			} else if (this.attractorData[0] == "Buckling") {
				// m = this.attractorData[1]
				// a = this.attractorData[2]
				// b = this.attractorData[3]
				// c = this.attractorData[4]
				deltaX = this.y;
				deltaY = (-1 / this.attractorData[1]) * (this.attractorData[2] * this.x * this.x * this.x + this.attractorData[3] * this.x + this.attractorData[4] * this.y);
				deltaZ = 0;
			} else if (this.attractorData[0] == "Rayleigh") {
				// cd = this.attractorData[1]
				// b = this.attractorData[2]
				// a = this.attractorData[3]
				deltaX = this.y;
				deltaY = (-1 / this.attractorData[1]) * (this.x + this.attractorData[2] * this.y * this.y * this.y - this.attractorData[3] * this.y);
				deltaZ = 0;
			} else if (this.attractorData[0] == "Thomas") {
				// b = this.attractorData[1]
				deltaX = Math.sin(this.y) - this.attractorData[1] * this.x;
				deltaY = Math.sin(this.z) - this.attractorData[1] * this.y;
				deltaZ = Math.sin(this.x) - this.attractorData[1] * this.z;
			} else if (this.attractorData[0] == "Aizawa") {
				// a = this.attractorData[1]
				// b = this.attractorData[2]
				// c = this.attractorData[3]
				// d = this.attractorData[4]
				// e = this.attractorData[5]
				// f = this.attractorData[6]
				deltaX = (this.z - this.attractorData[2]) * this.x - this.attractorData[4] * this.y;
				deltaY = this.attractorData[4] * this.x + (this.z - this.attractorData[2]) * this.y;
				deltaZ = this.attractorData[3] + this.attractorData[1] * this.z - this.z * this.z * this.z / 3 - (this.x * this.x + this.y * this.y) * (1 + this.attractorData[5] * this.z) + this.attractorData[6] * this.z * this.x * this.x * this.x;
			} else if (this.attractorData[0] == "Dadras") {
				// a = this.attractorData[1]
				// b = this.attractorData[2]
				// c = this.attractorData[3]
				// d = this.attractorData[4]
				// e = this.attractorData[5]
				deltaX = this.y - this.attractorData[1] * this.x + this.attractorData[2] * this.y * this.z;
				deltaY = this.attractorData[3] * this.y - this.x * this.z + this.z;
				deltaZ = this.attractorData[4] * this.x * this.y - this.attractorData[5] * this.z;
			} else if (this.attractorData[0] == "Chen") {
				// alpha = this.attractorData[1]
				// beta = this.attractorData[2]
				// delta = this.attractorData[3]
				deltaX = this.attractorData[1] * this.x - this.y * this.z;
				deltaY = this.attractorData[2] * this.y + this.x * this.z;
				deltaZ = this.attractorData[3] * this.z + this.x * this.y / 3.0;
			} else if (this.attractorData[0] == "Lorenz83") {
				// a = this.attractorData[1]
				// b = this.attractorData[2]
				// f = this.attractorData[3]
				// g = this.attractorData[4]
				deltaX = -this.attractorData[1] * this.x - this.y * this.y - this.z * this.z + this.attractorData[1] * this.attractorData[3];
				deltaY = - this.y + this.x * this.y - this.attractorData[2] * this.x * this.z + this.attractorData[4];
				deltaZ = - this.z + this.attractorData[2] * this.x * this.y + this.x * this.z;
			} else if (this.attractorData[0] == "Halvorsen") {
				// a = this.attractorData[1]
				deltaX = - this.attractorData[1] * this.x - 4 * this.y - 4 * this.z - this.y * this.y;
				deltaY = - this.attractorData[1] * this.y - 4 * this.z - 4 * this.x - this.z * this.z;
				deltaZ = - this.attractorData[1] * this.z - 4 * this.x - 4 * this.y - this.x * this.x;
			} else if (this.attractorData[0] == "Rabinovich-Fabrikant") {
				// alpha = this.attractorData[1]
				// gamma = this.attractorData[2]
				deltaX = this.y * (this.z - 1 + this.x * this.x) + this.attractorData[2] * this.x;
				deltaY = this.x * (3 * this.z + 1 - this.x * this.x) + this.attractorData[2] * this.y;
				deltaZ = -2 * this.z * (this.attractorData[1] + this.x * this.y);
			} else if (this.attractorData[0] == "Three-Scroll Unified Chaos System") {
				// a = this.attractorData[1]
				// b = this.attractorData[2]
				// c = this.attractorData[3]
				// d = this.attractorData[4]
				// e = this.attractorData[5]
				// f = this.attractorData[6]
				deltaX = this.attractorData[1] * (this.y - this.x) + this.attractorData[4] * this.x * this.z;
				deltaY = this.attractorData[2] * this.x - this.x * this.z + this.attractorData[6] * this.y;
				deltaZ = this.attractorData[3] * this.z + this.x * this.y - this.attractorData[5] * this.x * this.x;
			} else if (this.attractorData[0] == "Sprott") {
				// a = this.attractorData[1]
				// b = this.attractorData[2]
				deltaX = this.y + this.attractorData[1] * this.x * this.y + this.x * this.z;
				deltaY = 1 - this.attractorData[2] * this.x * this.x + this.y * this.z;
				deltaZ = this.x - this.x * this.x - this.y * this.y;
			} else if (this.attractorData[0] == "Four-Wing") {
				// a = this.attractorData[1]
				// b = this.attractorData[2]
				// c = this.attractorData[3]
				deltaX = this.attractorData[1] * this.x + this.y * this.z;
				deltaY = this.attractorData[2] * this.x + this.attractorData[3] * this.y - this.x * this.z;
				deltaZ = -this.z - this.x * this.y;
			}
			
			
			this.x += deltaX * this.deltaT;
			this.y += deltaY * this.deltaT;
			this.z += deltaZ * this.deltaT;
			
			this.line[3 * this.elements + 0] = this.x * this.scale;
			this.line[3 * this.elements + 1] = this.y * this.scale;
			this.line[3 * this.elements + 2] = this.z * this.scale;
			
			this.elements += 1;
		}
	}
	
	draw() {
		if (attractorVariables["sphereSize"]() != 0) {
			this.head.visible = true;
			this.head.position.set(this.x * this.scale, this.y * this.scale, this.z * this.scale);
		} else {
			this.head.visible = false;
		}
		this.tailGeometry.setDrawRange(0, this.elements);
		this.tailGeometry.attributes.position.needsUpdate = true;
	}
}

// Initialises the menu and starts the simulation.
function init() {
	var headers = document.getElementsByClassName("dropdown-header");

	for (var header = 0; header < headers.length; header++ ) {
		menuData[header] = false;
	}
	
	initSlider("attractorCount", 1, 10, 1, 2);
	initSelector("attractorSelect",["Lorenz","Rossler","Buckling","Rayleigh","Thomas","Aizawa","Dadras","Chen","Lorenz83","Halvorsen","Rabinovich-Fabrikant","Three-Scroll Unified Chaos System","Sprott","Four-Wing"], 0);
	initCheckbox("showAxes", false);
	
	initSlider("maxSize", 100, 100000, 1, 100000);
	initSlider("startAtTime", 0, 100000, 1, 0);
	initRadio(["stopAtMaxSize", "cyclicAtMaxSize"], 0);
	
	changeAttractorValuesMenu("Lorenz");
	
	needToReset = false;
	
	main();
}

// Creates a scene and adds an attractor to it.
function initCanvas() {
	scene = new THREE.Scene();
	initCamera();
	initRenderer();
	initControls();
	resetNoAnimate();
	initStats();
	
	document.body.appendChild(renderer.domElement);
}

// Creates n attractors.
function initAttractors() {
	attractors = [];
	
	for (let i = 0; i < settings["attractorCount"](); i++) {
		attractors[i] = attractorVariables["initAttractor"](String(i));
	}
	
	for (let i = 0; i < settings["startAt"](); i++) {
		for (let i = 0; i < settings["attractorCount"](); i++) {
			attractors[i].update();
		}
	}
}

// If showAxes is true, show axes.
function initAxes() {
	var axes = new THREE.AxesHelper(1000);
	axes.name = "axes";
	scene.add(axes);
}

// Show stats for the simulation.
function initStats() {
	stats = new Stats();
	stats.showPanel( 0 );
	
	stats.dom.style.top = "30px";
	stats.dom.style.left = "15px";
	document.body.appendChild(stats.dom);
}

// Initialises the camera.
function initCamera() {
	camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000);
	camera.position.z = 100;
}

// Initialises the controls.
function initControls() {
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.autoRotate = true;
}

// Initialises the renderer.
function initRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(WIDTH, HEIGHT);
}

// Animates the scene.
function animate() {
	requestAnimationFrame(animate);
	
	if (needToReset == true) {
		needToReset = false;
		reset();
	} else if (needToRefresh == true) {
		needToRefresh = false;
		refresh();
	} else {
		stats.begin();
	
		for (let i = 0; i < settings["attractorCount"](); i++) {
			attractors[i].update();
			attractors[i].draw();
		}
		
		renderer.render(scene, camera);
		stats.end();
	}
}

// Refresh is called whenever a variable that doesn't mean the simulation must be restarted is changed.
function refresh() {
	refreshNoAnimate();
	animate();
}

// Reset is called whenever a variable that means the simulation must be restarted is changed.
function reset() {
	resetNoAnimate();
	animate();
}

function refreshNoAnimate() {
	if (settings["showAxes"]() == true) {
		initAxes();
	} else {
		var axes = scene.getObjectByName("axes");
		if (axes != null) {
			scene.remove(axes);
		}
	}
	
	for (let i = 0; i < settings["attractorCount"](); i++) {
		attractors[i].changeSphereSize(attractorVariables["sphereSize"]());
	}
	
}

function resetNoAnimate() {
	while(scene.children.length > 0){ 
		scene.remove(scene.children[0]); 
	}
	initAttractors();
	refreshNoAnimate();
}


// Initialises the canvas and starts the animation loop.
function main() {
	initCanvas();
	animate();
}

window.addEventListener('load', function(e) {
	init();
});