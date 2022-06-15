var menuData = {};
var radioConnections = [];

var needToReset, needToRefresh;

var attractorDefaults = {
	"Lorenz" : [
		{"valueName" : "sigmaValue", "min" : 0, "max" : 20, "step" : 0.1, "default" : 10},
		{"valueName" : "rhoValue", "min" : 0, "max" : 50, "step" : 0.1, "default" : 28},
		{"valueName" : "betaValue", "min" : 0, "max" : 5, "step" : 0.1, "default" : 2.7},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 1}
	],
	"Rossler" : [
		{"valueName" : "aValue", "min" : 0, "max" : 5, "step" : 0.1, "default" : 0.2},
		{"valueName" : "bValue", "min" : 0, "max" : 5, "step" : 0.1, "default" : 0.2},
		{"valueName" : "cValue", "min" : 0, "max" : 10, "step" : 0.1, "default" : 5.7},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 1000, "step" : 0.01, "default" : 200}
	],
	"Buckling" : [
		{"valueName" : "mValue", "min" : -10, "max" : 20, "step" : 1, "default" : 10},
		{"valueName" : "aValue", "min" : -10, "max" : 20, "step" : 1, "default" : 20},
		{"valueName" : "bValue", "min" : -10, "max" : 20, "step" : 1, "default" : 10},
		{"valueName" : "cValue", "min" : -10, "max" : 20, "step" : 1, "default" : 5},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : 0, "max" : 0, "step" : 0, "default" : 0},
		{"valueName" : "startMaxZ", "min" : 0, "max" : 0, "step" : 0, "default" : 0},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 100, "max" : 10000, "step" : 100, "default" : 1000}
	],
	"Rayleigh" : [
		{"valueName" : "cdValue", "min" : -10, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "bValue", "min" : -10, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "aValue", "min" : -10, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 1}
	],
	"Thomas" : [
		{"valueName" : "bValue", "min" : 0, "max" : 5, "step" : 0.000001, "default" : 0.208186},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -1.5},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 1.5},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -1.5},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 1.5},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 10}
	],
	"Aizawa" : [
		{"valueName" : "aValue", "min" : 0, "max" : 5, "step" : 0.01, "default" : 0.95},
		{"valueName" : "bValue", "min" : 0, "max" : 5, "step" : 0.1, "default" : 0.7},
		{"valueName" : "cValue", "min" : 0, "max" : 5, "step" : 0.1, "default" : 0.6},
		{"valueName" : "dValue", "min" : 0, "max" : 5, "step" : 0.1, "default" : 3.5},
		{"valueName" : "eValue", "min" : 0, "max" : 5, "step" : 0.01, "default" : 0.25},
		{"valueName" : "fValue", "min" : 0, "max" : 5, "step" : 0.1, "default" : 0.1},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 15}
	],
	"Dadras" : [
		{"valueName" : "aValue", "min" : 0, "max" : 10, "step" : 0.1, "default" : 3},
		{"valueName" : "bValue", "min" : 0, "max" : 10, "step" : 0.1, "default" : 2.7},
		{"valueName" : "cValue", "min" : 0, "max" : 10, "step" : 0.1, "default" : 1.7},
		{"valueName" : "dValue", "min" : 0, "max" : 10, "step" : 0.1, "default" : 2},
		{"valueName" : "eValue", "min" : 0, "max" : 10, "step" : 0.1, "default" : 9},
		{"valueName" : "deltaT", "min" : 0.0001, "max" : 0.01, "step" : 0.001, "default" : 0.001},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 2}
	],
	"Chen" : [
		{"valueName" : "alphaValue", "min" : 0, "max" : 10, "step" : 0.1, "default" : 5},
		{"valueName" : "betaValue", "min" : -20, "max" : 0, "step" : 1, "default" : -10},
		{"valueName" : "deltaValue", "min" : -1, "max" : 0, "step" : 0.01, "default" : -0.38},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.001, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -10},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 10},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -10},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 10},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -10},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 10},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 2}
	],
	"Lorenz83" : [
		{"valueName" : "aValue", "min" : 0, "max" : 1, "step" : 0, "default" : 0.95},
		{"valueName" : "bValue", "min" : 0, "max" : 10, "step" : 0, "default" : 7.91},
		{"valueName" : "fValue", "min" : 0, "max" : 10, "step" : 0, "default" : 4.83},
		{"valueName" : "gValue", "min" : 0, "max" : 10, "step" : 0, "default" : 4.66},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 10}
	],
	"Halvorsen" : [
		{"valueName" : "aValue", "min" : 0, "max" : 5, "step" : 0.01, "default" : 1.89},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 3}
	],
	"Rabinovich-Fabrikant" : [
		{"valueName" : "alphaValue", "min" : 0, "max" : 1, "step" : 0.01, "default" : 0.14},
		{"valueName" : "gammaValue", "min" : 0, "max" : 1, "step" : 0.01, "default" : 0.1},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 10}
	],
	"Three-Scroll Unified Chaos System" : [
		{"valueName" : "aValue", "min" : 32, "max" : 33, "step" : 0.01, "default" : 32.48},
		{"valueName" : "bValue", "min" : 45, "max" : 46, "step" : 0.01, "default" : 45.84},
		{"valueName" : "cValue", "min" : 0, "max" : 2, "step" : 0.01, "default" : 1.18},
		{"valueName" : "dValue", "min" : 0, "max" : 1, "step" : 0.01, "default" : 0.13},
		{"valueName" : "eValue", "min" : 0, "max" : 1, "step" : 0.01, "default" : 0.57},
		{"valueName" : "fValue", "min" : 10, "max" : 15, "step" : 0.1, "default" : 14.7},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 1}
	],
	"Sprott" : [
		{"valueName" : "aValue", "min" : 2, "max" : 2.1, "step" : 0.01, "default" : 2.07},
		{"valueName" : "bValue", "min" : 1, "max" : 2, "step" : 0.01, "default" : 1.79},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 20}
	],
	"Four-Wing" : [
		{"valueName" : "aValue", "min" : 0, "max" : 0.4, "step" : 0.1, "default" : 0.2},
		{"valueName" : "bValue", "min" : 0, "max" : 0.1, "step" : 0.01, "default" : 0.01},
		{"valueName" : "cValue", "min" : -1, "max" : 0, "step" : 0.1, "default" : -0.4},
		{"valueName" : "deltaT", "min" : 0.001, "max" : 0.1, "step" : 0.001, "default" : 0.01},
		{"valueName" : "startMinX", "min" : -10, "max" : 10, "step" : 0.01, "default" : -2},
		{"valueName" : "startMaxX", "min" : -10, "max" : 10, "step" : 0.01, "default" : 2},
		{"valueName" : "startMinY", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.2},
		{"valueName" : "startMaxY", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.2},
		{"valueName" : "startMinZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : -0.02},
		{"valueName" : "startMaxZ", "min" : -10, "max" : 10, "step" : 0.01, "default" : 0.02},
		{"valueName" : "sphereSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "lineSize", "min" : 0.1, "max" : 10, "step" : 0.1, "default" : 1},
		{"valueName" : "scale", "min" : 0.01, "max" : 100, "step" : 0.01, "default" : 20}
	]
};


function initSlider(id, min, max, step, value) {
	document.getElementById(id).min = min;
	document.getElementById(id).max = max;
	document.getElementById(id).step = step;
	document.getElementById(id).value = value;
	document.getElementById(id + "Text").value = value;
}

function initSelector(id, values, defaultIndex) {
	var sel = document.getElementById(id);
	
	for (var i = 0; i < values.length; i++) {
		var opt = document.createElement("option");
		opt.textContent = values[i];
		opt.value = values[i];
		sel.appendChild(opt);
	}
	
	sel.selectedIndex = defaultIndex;
}

function initCheckbox(id, isChecked) {
	document.getElementById(id).checked = isChecked;
	console.log(isChecked);
}

function initRadio(ids, defaultIndex) {
	radioConnections.push({"ids" : ids, "defaultIndex" : defaultIndex, "checkedIndex" : defaultIndex});
	document.getElementById(ids[defaultIndex]).checked = true;
}



function checkBoxToggle(checkboxObject) {
	for (var i = 0; i < radioConnections.length; i++) {
		if (radioConnections[i]["ids"].includes(checkboxObject.id)) {
			radioToggle(radioConnections[i], checkboxObject.id);
		}
	}
	
	needToRefresh = true;
}

function radioToggle(radioConn, selectedId) {
	var ids = radioConn["ids"];
	var defaultIndex = radioConn["defaultIndex"];
	var checkedIndex = radioConn["checkedIndex"];
	
	if (ids[checkedIndex] == selectedId) {
		if (ids[defaultIndex] == selectedId) {
			document.getElementById(ids[checkedIndex]).checked = false;
			document.getElementById(ids[(defaultIndex + 1) % ids.length]).checked = true;
			radioConn["checkedIndex"] = (defaultIndex + 1) % ids.length;
		} else {
			document.getElementById(ids[checkedIndex]).checked = false;
			document.getElementById(ids[defaultIndex]).checked = true;
			radioConn["checkedIndex"] = defaultIndex;
		}
	} else {
		document.getElementById(ids[checkedIndex]).checked = false;
		document.getElementById(selectedId).checked = true;
		radioConn["checkedIndex"] = ids.indexOf(selectedId);
	}
}

function buttonToggle(buttonId) {
	menuData[buttonId] = !menuData[buttonId];
	return menuData[buttonId];
}



function buttonClick(buttonObject) {
	var isVisible = buttonToggle(buttonObject.id);
	if (isVisible) {
		showMenu(buttonObject.id);
	} else {
		hideMenu(buttonObject.id);
	}
}



function sliderChange(slider) {
	document.getElementById(slider.id + "Text").value = slider.value.toString();
	
	if (slider.id == "sphereSize") {
		needToRefresh = true;
	} else {
		needToReset = true;
	}
}

function sliderTextChange(sliderText) {
	var id = sliderText.id;
	var sliderId = id.substring(0, id.length - 4);
	
	var min = document.getElementById(sliderId).min;
	var max = document.getElementById(sliderId).max;
	var inc = document.getElementById(sliderId).step;
	
	var value = Math.round(parseFloat(sliderText.value) / inc) * inc;

	if (value < min) {
		value = min;
	}
	if (value > max) {
		value = max;
	}
	
	if (value.toString() == "NaN") {
		value = document.getElementById(sliderId).value;
	} else {
		document.getElementById(sliderId).value = value;
	}
	
	sliderText.value = value.toString();
	
	if (sliderId == "sphereSize") {
		needToRefresh = true;
	} else {
		needToReset = true;
	}
}

function selectorChange(selector) {
	if (selector.id == "attractorSelect") {
		changeAttractorValuesMenu(selector.value);
		needToReset = true;
	}
}


function changeAttractorValuesMenu(attractorType) {
	var attractorValuesContent = document.getElementById("attractorValuesContent")
	attractorValuesContent.innerHTML = "";
	
	var ul = document.createElement("ul");
	ul.className = "content-list";
	
	var value;
	for (var i = 0; i < attractorDefaults[attractorType].length; i++) {
		value = attractorDefaults[attractorType][i];
		
		var li = document.createElement("li");
		var contentContainer = document.createElement("div");
		var contentName = document.createElement("div");
		var sliderControlContainer = document.createElement("div");
		var sliderContainer = document.createElement("div");
		var slider = document.createElement("input");
		var sliderTextContainer = document.createElement("div");
		var sliderText = document.createElement("input");
		
		contentContainer.className = "content-container";
		
		contentName.className = "content-name";
		contentName.textContent = value["valueName"];
		
		sliderControlContainer.className = "slider-control-container";
		
		sliderContainer.className = "slider-container";
		
		slider.className = "slider";
		slider.type = "range";
		slider.id = value["valueName"];
		slider.addEventListener("change", function() { sliderChange(this); }, false);
		
		sliderTextContainer.className = "slider-text-container";
		
		sliderText.className = "slider-text";
		sliderText.type = "text";
		sliderText.id = value["valueName"] + "Text";
		sliderText.addEventListener("change", function() { sliderTextChange(this); }, false);
		
		sliderTextContainer.appendChild(sliderText);
		sliderContainer.appendChild(slider);
		
		sliderControlContainer.appendChild(sliderContainer);
		sliderControlContainer.appendChild(sliderTextContainer);
		
		contentContainer.appendChild(contentName);
		contentContainer.appendChild(sliderControlContainer);
		
		li.appendChild(contentContainer);
		ul.appendChild(li);
	}
	
	attractorValuesContent.appendChild(ul);
	
	for (var i = 0; i < attractorDefaults[attractorType].length; i++) {
		value = attractorDefaults[attractorType][i];
		initSlider(value["valueName"], value["min"], value["max"], value["step"], value["default"]);
	}
}



function getContentId(buttonId) {
	return buttonId.substring(0, buttonId.length - 6) + "Content";
}

function getButtonName(buttonId) {
	return document.getElementById(buttonId).textContent.slice(2);
}

function showMenu(buttonId) {
	document.getElementById(getContentId(buttonId)).className = "dropdown-content-container";
	document.getElementById(buttonId).textContent = "⯅ " + getButtonName(buttonId);
}

function hideMenu(buttonId) {
	document.getElementById(getContentId(buttonId)).className = "dropdown-content-container closed";
	document.getElementById(buttonId).textContent = "⯆ " + getButtonName(buttonId);
}