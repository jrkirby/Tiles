
/*
2015 Copyright Jonathan Kirby and Cadigo.com
*/

var gl;
var canvas;
var scene = {};
var cursor = [];
function initGL(canvas) {
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
}


function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	var shader;
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}


var shaderProgram;

function initShaders() {
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
	gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}


var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function setMatrixUniforms() {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}



var cubeVertexPositionBuffer;
var cubeVertexNormalBuffer;

function initBuffers() {

	cubeVertexPositionBuffer = gl.createBuffer();
	cubeVertexNormalBuffer = gl.createBuffer();
	cubeVertexIndexBuffer = gl.createBuffer();
}

function fillBuffers()
{
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);

	scene.geometry.pos = [];
	scene.geometry.norm = [];
	scene.geometry.indexs = [];

	scene.octree.toGeometryBuffer(scene.geometry);


	// var ray = getRayFromMouse(scene.mouse, scene.cam);
	// cursor = intersectRayGeometry(ray, vertices);
	// console.log(cursor);
	// console.log(vertices[2]);
	// drawCube(vertices, 4, [-1.0, -5.0, 0.0]);
	// drawCube(vertices, 4, [-3.0, -2.0, 0.0]);
	var ray = getRayFromMouse(scene.mouse, scene.cam);
	cursor = intersectRayGeometry(ray, scene.geometry.pos);
	// if(cursor !== false)
	// {
	// 	// drawCube(scene.geometry.pos, Math.pow(0.5, scene.level), cursor);
	// 	// console.log("Cursor: " + cursor.join(' '));
	// }

	// console.log(scene.geometry.pos.length);
	// console.log(scene.geometry.indexs.length);
	// console.log(scene.geometry.norm.length);

	pos = scene.geometry.pos;
	norm = scene.geometry.norm;

	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.DYNAMIC_DRAW);
	cubeVertexPositionBuffer.itemSize = 3;
	cubeVertexPositionBuffer.numItems = pos.length / 3;

	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm), gl.DYNAMIC_DRAW);
	cubeVertexNormalBuffer.itemSize = 3;
	cubeVertexNormalBuffer.numItems = norm.length / 3;

	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
	for(var i = 0; i < pos.length / 3; i++)
	{
		scene.geometry.indexs.push(i);
	}
	var indexs = scene.geometry.indexs;
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(scene.geometry.indexs), gl.DYNAMIC_DRAW);
	cubeVertexIndexBuffer.itemSize = 1;
	cubeVertexIndexBuffer.numItems = indexs.length;
	scene.dirty = false;
}


function drawScene() {
	if(scene.dirty !== false)
	{
		fillBuffers();
	}
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	pMatrix = scene.cam.persp();

	mat4.identity(mvMatrix);



	mvMatrix = scene.cam.view();

	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
	setMatrixUniforms();
	gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	// gl.drawArrays(gl.LINE_STRIP, 0, cubeVertexPositionBuffer.numItems);
}

function tick() {
	requestAnimFrame(tick);
	// drawScene();
	// animate();
}

function click(mouse)
{
	var ray = getRayFromMouse(mouse, scene.cam);
	var clickPos = intersectRayGeometry(ray, scene.geometry.pos);
	if(clickPos)
	{
		path = findPath(clickPos);
		if(scene.addBlocks === true)
		{
			scene.octree.addNode(path);	
		}
		else
		{
			scene.octree.deleteNode(path);
		}
	}
}

function handleMouseDown(e)
{
	scene.mousedown = true;
}

function handleMouseUp(e)
{
	scene.mousedown = false;
	var mousePos = getMousePos(canvas, e);
	if(scene.moved < 13)
	{
		click(mousePos);
	}
	scene.moved = 0;
	drawScene();
}

function getMousePos(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return [e.clientX - rect.left, e.clientY - rect.top];
}

function handleMouseMove(e)
{
	var mousePos = getMousePos(canvas, e);

	diffx = mousePos[0] - scene.mouse[0];
	diffy = mousePos[1] - scene.mouse[1];

	if(scene.mousedown)
	{
		scene.moved++;
		scene.cam.move(diffx / 800, diffy / 800);
		drawScene();
	}

	scene.mouse = mousePos;


	// console.log("mouse: " + mousePos[0] + " " + mousePos[1]);

};

function keydown(e)
{
	var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (e)
        keycode = e.which;
    if(keycode === 50)
    {
    	scene.level = 2;
    }
    if(keycode === 51)
    {
    	scene.level = 3;
    }
    if(keycode === 52)
    {
    	scene.level = 4;
    }
    if(keycode === 53)
    {
    	scene.level = 5;
    }
    if(keycode === 54)
    {
    	scene.level = 6;
    }
    if(keycode === 55)
    {
    	scene.level = 7;
    }
    if(keycode === 56)
    {
    	scene.level = 8;
    }

	if(e.shiftKey)
	{
		// console.log("shiftdown")
		scene.shiftdown = true;
	}

}
function keyup(e)
{
	if(!e.shiftKey)
	{
		if(scene.shiftdown)
		{
			scene.addBlocks = !scene.addBlocks;
		}
		// console.log("shiftup")
		scene.shiftdown = false;
	}
}


function MouseWheelHandler(e)
{
	console.log("wheel?");
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	console.log(delta);
	scene.cam.pos[2] += 0.06 * delta;
	if(scene.cam.pos[2] < 1.2)
		scene.cam.pos[2] = 1.2;
	drawScene();
}

function start() {
	canvas = document.getElementById("canvas");
	initGL(canvas);
	initShaders();
	initBuffers();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	canvas.onmousedown = handleMouseDown;
	document.onmouseup = handleMouseUp;
	// document.onmousemove = handleMouseMove;
	window.onkeydown = keydown;
	window.onkeyup = keyup;

	canvas.addEventListener("mousewheel", MouseWheelHandler, false);
	// Firefox
	canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);



	canvas.addEventListener('mousemove', handleMouseMove);


	scene.addBlocks = false;
	scene.level = 2;
	scene.scale = 1.0;
	scene.cam = new Camera();
	scene.mouse = [];
	scene.geometry = {};
	scene.geometry.pos = [];
	scene.geometry.norm = [];
	scene.octree = new Octree();
	scene.moved = 0;

	drawScene();
	tick();

}
