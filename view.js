

Camera = function()
{
	this.FOV = 45;
	this.up = vec3.fromValues(0.0, 1.0, 0.0); 
	this.pos = vec3.fromValues(0.0, 0.0, 2.0);
	this.lookat = vec3.fromValues(0.0, 0.0, 0.0);

	this.xRotation = 0;
	this.yRotation = 0;
}

Camera.prototype.view = function()
{
	var out = mat4.create();
	mat4.lookAt(out, this.pos, this.lookat, this.up);

	mat4.rotateX(out, out, this.yRotation);
	mat4.rotateY(out, out, this.xRotation);

	return out;
}

Camera.prototype.persp = function()
{
	var out = mat4.create();
	mat4.perspective(out, this.FOV, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
	// mat4.frustum(out, -1, 1, -1, 1, 0.1, 100.0);
	return out;
}

Camera.prototype.setPos = function(p)
{
	this.pos[0] = p[0];
	this.pos[1] = p[1];
	this.pos[2] = p[2];
}

Camera.prototype.setLookat = function(p)
{
	this.lookat[0] = p[0];
	this.lookat[1] = p[1];
	this.lookat[2] = p[2];
}

Camera.prototype.move = function(x, y)
{
	this.xRotation += x;
	this.yRotation += y;
	if(this.yRotation >= Math.PI/2)
		this.yRotation = Math.PI/2;
	if(this.yRotation <= -Math.PI/2)
		this.yRotation = -Math.PI/2;
};
