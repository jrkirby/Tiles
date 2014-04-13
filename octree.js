
drawPlane = function(geometry, s, p, dir)
{
	if(dir === 'E')
	{
		vertices = [
			// Right face
			p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
			p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,
			p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
		];
	}
	if(dir === 'W')
	{
		vertices = [
			// Left face
			p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
			p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,
			p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
			p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,
		];
	}
	if(dir === 'N')
	{
		vertices = [
			// Top face
			p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
			p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,
			p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
		];
	}
	if(dir === 'S')
	{
		vertices = [
			// Bottom face
			p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,
			p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
			p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,
		];
	}
	if(dir === 'U')
	{
		vertices = [
			// Front face
			p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
			p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
			p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,
			p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
		];
	}
	if(dir === 'D')
	{
		vertices = [
			// Back face
			p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
			p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,
		];
	}
	try {
	geometry.push.apply(geometry, vertices);
	}
	catch(e)
	{
		console.log(e.stack);
	}
}

//s = scale, p = position
drawCube = function(geometry, s, p)
{

	// console.log("Drawing Cube");
	// console.log("Drawing cube.\nScale: " + s + " X: " + p[0] + " Y: " + p[1] + " Z: " + p[2]);
	/*

	//If I switch to using drawElements, this will be useful

	vertices = [
      // Front face
      p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
      p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,
      p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
      p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,

      // Back face
      p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
      p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
      p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,
      p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,

      // Top face
      p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
      p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,
      p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
      p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,

      // Bottom face
      p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
      p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
      p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,
      p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,

      // Right face
      p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
      p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,
      p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
      p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,

      // Left face
      p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
      p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
      p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,
      p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
    ];
    */

    vertices = [
		// Front face
		p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
		p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
		p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,
		p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,


		// Back face
		p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,


		// Top face
		p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
		p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,
		p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,


		// Bottom face
		p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,
		p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
		p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,


		// Right face
		p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,
		p[0] + 1*s, p[1] + 0*s,  p[2] + 1*s,
		p[0] + 1*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 1*s, p[1] + 1*s,  p[2] + 1*s,


		// Left face
		p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 0*s, p[1] + 0*s,  p[2] + 1*s,
		p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,
		p[0] + 0*s, p[1] + 1*s,  p[2] + 0*s,
		p[0] + 0*s, p[1] + 0*s,  p[2] + 0*s,
		p[0] + 0*s, p[1] + 1*s,  p[2] + 1*s,

    ];
    var vertexNormals = [
            // Front face
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,

            // Back face
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,
             0.0,  0.0, -1.0,

            // Top face
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,
             0.0,  1.0,  0.0,

            // Bottom face
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,
             0.0, -1.0,  0.0,

            // Right face
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,
             1.0,  0.0,  0.0,

            // Left face
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
        ];



    scene.geometry.pos.push.apply(scene.geometry.pos, vertices);
    scene.geometry.norm.push.apply(scene.geometry.norm, vertexNormals);

    // console.log(geometry.slice(geometry.length - 10, geometry.length).join(' '));
}

findPath = function(pos)
{
	var midx = 0.0;
	var midy = 0.0;
	var midz = 0.0;
	var dist = scene.scale / 2;
	var path = '';
	for(var i = 0; i < scene.level; i++)
	{
		dist = dist / 2;
		if(pos[0] < midx)
		{
			path = path.concat('W');
			midx -= dist;
		}
		else
		{
			path = path.concat('E');
			midx += dist;
		}
		if(pos[1] < midy)
		{
			path = path.concat('S');
			midy -= dist;
		}
		else
		{
			path = path.concat('N');
			midy += dist;
		}
		if(pos[2] < midz)
		{
			path = path.concat('D');
			midz -= dist;
		}
		else
		{
			path = path.concat('U');
			midz += dist;
		}
	}
	return path;

}

drawOctreePath = function(geometry, path)
{
	// console.log("Drawing octree path.\nPath: " + path);
	var scale = scene.scale;
	var position = [-scale / 2, -scale / 2, -scale / 2];
	for(var i = 0; i < path.length; i += 3)
	{
		var direction = path.slice(i, i + 3);
		if(direction === '')
		{
			alert("I didn't expect this to happen");
			break;
		}
		scale = scale / 2;
		if(direction[0] === 'E')
		{
			position[0] += scale;
		}
		if(direction[1] === 'N')
		{
			position[1] += scale;
		}
		if(direction[2] === 'U')
		{
			position[2] += scale;
		}
	}
	drawCube(geometry, scale, position);
}


/*
 E stands for East
 W stands for West
 S stands for South
 N stands for North
 U stands for Up
 D stands for Down

 E is +X
 W is -X
 N is +Y
 S is -Y
 U is +Z
 D is -Z
*/

/*
 I expect contents to be true or false, but I might put color or something in there later
*/

OctreeNode = function(contents, parent){
	this.contents = contents;
	this.leaf = true;
	this.parent = parent;
	this.level = parent.level + 1;
};

OctreeNode.prototype.devide = function() {
	this.leaf = false;
	this['ENU'] = new OctreeNode(this.contents, this);
	this['WNU'] = new OctreeNode(this.contents, this);
	this['ESU'] = new OctreeNode(this.contents, this);
	this['WSU'] = new OctreeNode(this.contents, this);
	this['END'] = new OctreeNode(this.contents, this);
	this['WND'] = new OctreeNode(this.contents, this);
	this['ESD'] = new OctreeNode(this.contents, this);
	this['WSD'] = new OctreeNode(this.contents, this);
};

OctreeNode.prototype.deleteNode = function(path)
{
	scene.dirty = true;
	if(this.level === scene.level)
	{
		this.contents = false;
		if(!this.leaf === true)
		{
			delete this.ENU;
			delete this.WNU;
			delete this.ESU;
			delete this.WSU;
			delete this.END;
			delete this.WND;
			delete this.ESD;
			delete this.WSD;
			this.leaf = true;
		}
	}
	else
	{
		var rel_path = path.slice(0,3);
		var path_remain = path.slice(3);
		if(!this[rel_path])
		{
			this.devide();
		}
		// var rel_path2 = rel_path.join('');
		// console.log(rel_path);
		this[rel_path].deleteNode(path_remain);
	}
};

OctreeNode.prototype.addNode = function(path)
{
	scene.dirty = true;
	if(this.level === scene.level)
	{
		this.contents = true;
	}
	else
	{
		var rel_path = path.slice(0,3);
		var path_remain = path.slice(3);
		if(!this[rel_path])
		{
			this.devide();
		}
		// var rel_path2 = rel_path.join('');
		// console.log(rel_path);
		this[rel_path].addNode(path_remain);
	}
};

OctreeNode.prototype.toGeometryBuffer = function(geometry, path)
{
	if(this.leaf === false)
	{
		this['ENU'].toGeometryBuffer(geometry, path + 'ENU');
		this['WNU'].toGeometryBuffer(geometry, path + 'WNU');
		this['ESU'].toGeometryBuffer(geometry, path + 'ESU');
		this['WSU'].toGeometryBuffer(geometry, path + 'WSU');
		this['END'].toGeometryBuffer(geometry, path + 'END');
		this['WND'].toGeometryBuffer(geometry, path + 'WND');
		this['ESD'].toGeometryBuffer(geometry, path + 'ESD');
		this['WSD'].toGeometryBuffer(geometry, path + 'WSD');
	}
	else if(this.leaf === true)
	{
		// console.log("level: " + this.level);
		if(this.contents === true)
		{
			drawOctreePath(geometry, path);
		}
	}
}

function mix(p1, p2, p3)
{
	var path = '';
	for (var i = 0; i < p1.length; i++) {
		path[i * 3] = p1[i];
		path[i * 3 + 1] = p1[i + 1];
		path[i * 3 + 2] = p1[i + 2];
	};
	return path;
}

function wallArray(path, dir, geometry)
{
	var level = 0;
	var scale = scene.scale;
	var position = [-scale / 2, -scale / 2, -scale / 2];
	for(var i = 0; i < path.length; i += 3)
	{
		var direction = path.slice(i, i + 3);
		if(direction === '')
		{
			alert("I didn't expect this to happen");
			break;
		}
		scale = scale / 2;
		if(direction[0] === 'E')
		{
			position[0] += scale;
		}
		if(direction[1] === 'N')
		{
			position[1] += scale;
		}
		if(direction[2] === 'U')
		{
			position[2] += scale;
		}
		level++;
	}
	for(var x = 0; x < Math.pow(2, scene.level - level); x++)
	{
		for(var y = 0; y < Math.pow(2, scene.level - level); y++)
		{
			if(dir === 'E')
			{
				var p = [
					position[0] + Math.pow(0.5, level) - Math.pow(0.5, scene.level),
					position[1] + x * Math.pow(0.5, scene.level),
					position[2] + y * Math.pow(0.5, scene.level),
				];
				drawPlane(geometry, Math.pow(0.5, scene.level), p, dir);
			}
			if(dir === 'W')
			{
				var p = [
					position[0] ,
					position[1] + x * Math.pow(0.5, scene.level),
					position[2] + y * Math.pow(0.5, scene.level),
				];
				drawPlane(geometry, Math.pow(0.5, scene.level), p, dir);
			}
			if(dir === 'N')
			{
				var p = [
					position[0] + x * Math.pow(0.5, scene.level),
					position[1] + Math.pow(0.5, level) - Math.pow(0.5, scene.level),
					position[2] + y * Math.pow(0.5, scene.level),
				];
				drawPlane(geometry, Math.pow(0.5, scene.level), p, dir);
			}
			if(dir === 'S')
			{
				var p = [
					position[1] + x * Math.pow(0.5, scene.level),
					position[0] ,
					position[2] + y * Math.pow(0.5, scene.level),
				];
				drawPlane(geometry, Math.pow(0.5, scene.level), p, dir);
			}
			if(dir === 'U')
			{
				var p = [
					position[0] + x * Math.pow(0.5, scene.level),
					position[1] + y * Math.pow(0.5, scene.level),
					position[2] + Math.pow(0.5, level) - Math.pow(0.5, scene.level),
				];
				drawPlane(geometry, Math.pow(0.5, scene.level), p, dir);
			}
			if(dir === 'D')
			{
				var p = [
					position[0] + x * Math.pow(0.5, scene.level),
					position[1] + y * Math.pow(0.5, scene.level),
					position[2] ,
				];
				drawPlane(geometry, Math.pow(0.5, scene.level), p, dir);
			}
		}
	}
}


OctreeNode.prototype.wallDir = function(path, dir, geometry)
{
	if(this.leaf !== true)
	{
		if(dir === 'E')
		{
			this['ENU'].wallDir(path.concat('ENU'), dir, geometry);
			this['ESU'].wallDir(path.concat('ESU'), dir, geometry);
			this['END'].wallDir(path.concat('END'), dir, geometry);
			this['ESD'].wallDir(path.concat('ESD'), dir, geometry);
		}
		if(dir === 'W')
		{
			this['WNU'].wallDir(path.concat('WNU'), dir, geometry);
			this['WSU'].wallDir(path.concat('WSU'), dir, geometry);
			this['WND'].wallDir(path.concat('WND'), dir, geometry);
			this['WSD'].wallDir(path.concat('WSD'), dir, geometry);
		}
		if(dir === 'N')
		{
			this['ENU'].wallDir(path.concat('ENU'), dir, geometry);
			this['WNU'].wallDir(path.concat('WNU'), dir, geometry);
			this['END'].wallDir(path.concat('END'), dir, geometry);
			this['WND'].wallDir(path.concat('WND'), dir, geometry);
		}
		if(dir === 'S')
		{
			this['ESU'].wallDir(path.concat('ESU'), dir, geometry);
			this['WSU'].wallDir(path.concat('WSU'), dir, geometry);
			this['ESD'].wallDir(path.concat('ESD'), dir, geometry);
			this['WSD'].wallDir(path.concat('WSD'), dir, geometry);
		}
		if(dir === 'U')
		{
			this['ENU'].wallDir(path.concat('ENU'), dir, geometry);
			this['WNU'].wallDir(path.concat('WNU'), dir, geometry);
			this['ESU'].wallDir(path.concat('ESU'), dir, geometry);
			this['WSU'].wallDir(path.concat('WSU'), dir, geometry);
		}
		if(dir === 'D')
		{
			this['END'].wallDir(path.concat('END'), dir, geometry);
			this['WND'].wallDir(path.concat('WND'), dir, geometry);
			this['ESD'].wallDir(path.concat('ESD'), dir, geometry);
			this['WSD'].wallDir(path.concat('WSD'), dir, geometry);
		}
	}
	else
	{
		wallArray(path, dir, geometry);
	}

}

OctreeNode.prototype.wallDirBound = function(path, dir, geometry)
{
	if(this.leaf !== true)
	{
		if(dir === 'E')
		{
			this['ENU'].wallDir(path.concat('ENU'), dir, geometry);
			this['ESU'].wallDir(path.concat('ESU'), dir, geometry);
			this['END'].wallDir(path.concat('END'), dir, geometry);
			this['ESD'].wallDir(path.concat('ESD'), dir, geometry);
		}
		if(dir === 'W')
		{
			this['WNU'].wallDir(path.concat('WNU'), dir, geometry);
			this['WSU'].wallDir(path.concat('WSU'), dir, geometry);
			this['WND'].wallDir(path.concat('WND'), dir, geometry);
			this['WSD'].wallDir(path.concat('WSD'), dir, geometry);
		}
		if(dir === 'N')
		{
			this['ENU'].wallDir(path.concat('ENU'), dir, geometry);
			this['WNU'].wallDir(path.concat('WNU'), dir, geometry);
			this['END'].wallDir(path.concat('END'), dir, geometry);
			this['WND'].wallDir(path.concat('WND'), dir, geometry);
		}
		if(dir === 'S')
		{
			this['ESU'].wallDir(path.concat('ESU'), dir, geometry);
			this['WSU'].wallDir(path.concat('WSU'), dir, geometry);
			this['ESD'].wallDir(path.concat('ESD'), dir, geometry);
			this['WSD'].wallDir(path.concat('WSD'), dir, geometry);
		}
		if(dir === 'U')
		{
			this['ENU'].wallDir(path.concat('ENU'), dir, geometry);
			this['WNU'].wallDir(path.concat('WNU'), dir, geometry);
			this['ESU'].wallDir(path.concat('ESU'), dir, geometry);
			this['WSU'].wallDir(path.concat('WSU'), dir, geometry);
		}
		if(dir === 'D')
		{
			this['END'].wallDir(path.concat('END'), dir, geometry);
			this['WND'].wallDir(path.concat('WND'), dir, geometry);
			this['ESD'].wallDir(path.concat('ESD'), dir, geometry);
			this['WSD'].wallDir(path.concat('WSD'), dir, geometry);
		}
	}
	else
	{
		wallArray(path, dir, geometry);
	}

}

OctreeNode.prototype.makeFaces = function(path, contents, dir, geometry)
{
	if(this[path.slice(this.level * 3, this.level * 3 + 3)])
	{
		this[path.slice(this.level * 3, this.level * 3 + 3)].makeFaces(path, contents, dir, geometry);
	}
	else if(this.leaf === true)
	{
		if(this.contents !== contents)
		{
			wallArray(path, dir, geometry);
		}
	}
	else
	{
		this.wallDir(path, dir, geometry);
	}
};

OctreeNode.prototype.drawNextTo = function(path, contents, geometry)
{
	var WE = '';
	var SN = '';
	var DU = '';
	for(var i = 0; i < path.length; i+=3)
	{
		WE = WE.concat(path[i]);
		SN = SN.concat(path[i+1]);
		DU = DU.concat(path[i+2]);
	}
	var i = WE.length - 1;
	var WE1 = WE;
	while(WE1[i] === 'E' && i >= 0)
	{
		WE1[i] = 'W';
		i--;
	}
	if(i >= 0)
	{
		WE1[i] = 'E';
		var pathWE1SNDU = mix(WE1, SN, DU);
		scene.octree.head.makeFaces(pathWE1SNDU, contents, 'E', geometry);
	}

	i = SN.length - 1;
	var SN1 = SN;
	while(SN1[i] === 'N' && i >= 0)
	{
		SN1[i] = 'S';
		i--;
	}
	if(i >= 0)
	{
		SN1[i] = 'N';
		var pathWESN1DU = mix(WE, SN1, DU);
		scene.octree.head.makeFaces(pathWESN1DU, contents, 'N', geometry);
	}

	i = DU.length - 1;
	var DU1 = DU;
	while(DU1[i] === 'U' && i >= 0)
	{
		DU1[i] = 'D';
		i--;
	}
	if(i >= 0)
	{
		DU1[i] = 'U';
		var pathWESNDU1 = mix(WE, SN, DU1);
		scene.octree.head.makeFaces(pathWESNDU1, contents, 'U', geometry);
	}

}

OctreeNode.prototype.toGeometryBuffer2 = function(geometry, path)
{
	if(this.leaf === false)
	{
		this['ENU'].toGeometryBuffer2(geometry, path + 'ENU');
		this['WNU'].toGeometryBuffer2(geometry, path + 'WNU');
		this['ESU'].toGeometryBuffer2(geometry, path + 'ESU');
		this['WSU'].toGeometryBuffer2(geometry, path + 'WSU');
		this['END'].toGeometryBuffer2(geometry, path + 'END');
		this['WND'].toGeometryBuffer2(geometry, path + 'WND');
		this['ESD'].toGeometryBuffer2(geometry, path + 'ESD');
		this['WSD'].toGeometryBuffer2(geometry, path + 'WSD');
	}
	else if(this.leaf === true)
	{
		scene.octree.head.drawNextTo(path, this.contents, geometry);
		// drawOctreePath2(geometry, path);
	}
}


Octree = function(size)
{
	this.level = -1;
	this.head = new OctreeNode(true, this);
};

Octree.prototype.toGeometryBuffer2 = function(geometry)
{
	// this.head.toGeometryBuffer2(geometry, '');
	this.head.wallDir('', 'E', geometry);
	this.head.wallDir('', 'W', geometry);
	this.head.wallDir('', 'N', geometry);
	this.head.wallDir('', 'S', geometry);
	this.head.wallDir('', 'U', geometry);
	this.head.wallDir('', 'D', geometry);
	return geometry;
}

Octree.prototype.deleteNode = function(path)
{
	this.head.deleteNode(path);
};

Octree.prototype.addNode = function(path)
{
	// console.log("addNode");
	this.head.addNode(path);
};

Octree.prototype.toGeometryBuffer = function()
{
	var geometry = [];
	this.head.toGeometryBuffer(geometry, '');
	return geometry;
};



