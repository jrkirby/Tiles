
/*
A tri will just be an array that is 9 numbers long
The first 3 will be the first point
and so on.

A ray will just be an array that is 6 numbers
the first 3 are the start vector
the last three are direction vector

*/

// function cross(A, B)
// {
// 	ret = [A[1]*B[2] - A[2]*B[1], A[2]*B[0] - A[0]*B[2], A[0]*B[1] - A[1]*B[0]];
// 	return ret;
// }

// function dot(A, B)
// {
// 	return A[0]*B[0] + A[1]*B[1] + A[2]*B[2];
// }


//negative intersection means it's not in front of the ray
//it'll either be behind ray or not intersecting with line segment
//otherwise returns distance from ray start to tri

// function intersectRayTri(ray, tri)
// {
// 	diff = [ray[0*3+0] - tri[0*3+0], ray[0*3+1] - tri[0*3+1], ray[0*3+2] - tri[0*3+2]];
// 	edge1 = [tri[1*3+0] - tri[0*3+0], tri[1*3+1] - tri[0*3+1], tri[1*3+2] - tri[0*3+2]];
// 	edge2 = [tri[2*3+0] - tri[0*3+0], tri[2*3+1] - tri[0*3+1], tri[2*3+2] - tri[0*3+2]];
// 	normal = cross(edge1, edge2);

// 	var DdN = dot(ray.slice(3), normal);
// 	var sign;
// 	if(DdN > 0.000001)
// 	{
// 		sign = 1.0;
// 	}
// 	else if(DdN < -0.000001)
// 	{
// 		sign = -1.0;
// 		DdN = -1.0 * DdN;
// 	}
// 	else	//parallel
// 	{
// 		//negative intersection means it's not in front of the ray
// 		return -1.0;
// 	}

// 	var DdQxE2 = sign * dot(ray.slice(3), cross(diff, edge2));
// 	if (DdQxE2 >= 0.0)
// 	{
// 		var DdE1xQ = sign*dot(ray.slice(3), cross(edge1, diff));
// 		if (DdE1xQ >= 0.0)
// 		{
// 			var DdE1xQ = sign*dot(ray.slice(3), cross(edge1, diff));
// 			if (DdE1xQ >= 0.0)
// 			{
// 				if (DdQxE2 + DdE1xQ <= DdN)
// 				{
// 					// Line intersects triangle, check if ray does.
// 					var QdN = -sign*dot(diff, normal);
// 					return QdN;
// 				}
// 			}
// 		}
// 	}
// 	return -1.0;
// }

to_degrees = function(radians) {
    return radians*(180.0/Math.PI);
}

to_rad = function(degrees) {
    return degrees/(180.0/Math.PI);
}

// intersectRayTri = function(ray, tri) {

// 	var rayPos = vec3.create();
// 	var rayDir = vec3.create();
// 	rayPos[0] = ray[0];
// 	rayPos[1] = ray[1];
// 	rayPos[2] = ray[2];
// 	rayDir[0] = ray[3];
// 	rayDir[1] = ray[4];
// 	rayDir[2] = ray[5];

// 	var a = vec3.create();
// 	var b = vec3.create();
// 	var c = vec3.create();
// 	a[0] = tri[0];
// 	a[1] = tri[1];
// 	a[2] = tri[2];
// 	b[0] = tri[3];
// 	b[1] = tri[4];
// 	b[2] = tri[5];
// 	c[0] = tri[6];
// 	c[1] = tri[7];
// 	c[2] = tri[8];

// 	var edge1 = vec3.create();
// 	edge1 = vec3.subtract(edge1, b, a );
// 	var edge2 = vec3.create();
// 	edge2 = vec3.subtract(edge2, c, a );
// 	// console.log("p1 Edge1: " + edge1[0] + " " + edge1[1] + " " + edge1[2]);
// 	var normal = vec3.create();
// 	normal = vec3.cross( normal, vec3.create(edge1), vec3.create(edge2) );
// 	// console.log(normal[0] + ' ' + normal[1] + ' ' + normal[2]);
// 	// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
// 	// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
// 	//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
// 	//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
// 	//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
// 	var DdN = vec3.dot(rayDir, normal);
// 	// console.log("DdN: " + DdN);
// 	var sign;
// 	if ( DdN > 0 ) {
// 		sign = 1;
// 	} else if ( DdN < 0 ) {
// 		sign = - 1;
// 		DdN = - DdN;
// 	} else {
// 		return false;
// 	}
// 	var diff = vec3.subtract( rayPos, a );
// 	// var DdQxE2 = sign * vec3.dot( rayDir, vec3.cross( vec3.create(edge2), vec3.create(diff) ) );
// 	var DdQxE2 = sign * vec3.dot( rayDir, vec3.cross( vec3.create(edge2), vec3.create(diff) ) );
	
// 	console.log("DdQxE2: " + DdQxE2);
// 	// b1 < 0, no intersection
// 	if ( DdQxE2 < 0 ) {
// 		return false;
// 	}

// 	var E1xQ = vec3.cross( vec3.create(diff), vec3.create(edge1));
// 	// console.log("E1xQ: " + E1xQ[0] + " " + E1xQ[1] + " " + E1xQ[2]);

// 	var DdE1xQ = sign * vec3.dot( rayDir, vec3.cross( vec3.create(diff), vec3.create(edge1) ) );
// 	console.log("DdE1xQ: " + DdE1xQ);

// 	// b2 < 0, no intersection
// 	if ( DdE1xQ < 0 ) {
// 		return false;
// 	}
// 	console.log(DdQxE2 + ' ' + DdE1xQ + " " + DdN);
// 	// b1+b2 > 1, no intersection
// 	if ( DdQxE2 + DdE1xQ > DdN ) {
// 		return false;
// 	}
// 	// Line intersects triangle, check if ray does.
// 	var QdN = - sign * vec3.dot( diff, normal );
// 	// t < 0, no intersection
// 	if ( QdN > 0 ) {
// 		return false;
// 	}
// 	// var ret = vec3.add(vec3.scale( rayDir, QdN / DdN), rayPos);
// 	// Ray intersects triangle.
// 	// console.log("returns");
// 	return QdN / DdN;
// }

intersectRayTri = function(ray, tri) {

	var rayPos = vec3.fromValues(ray[0], ray[1], ray[2]);
	var rayDir = vec3.fromValues(ray[3], ray[4], ray[5]);

	var a = vec3.fromValues(tri[0], tri[1], tri[2]);
	var b = vec3.fromValues(tri[3], tri[4], tri[5]);
	var c = vec3.fromValues(tri[6], tri[7], tri[8]);

	var edge1 = vec3.create();
	edge1 = vec3.subtract(edge1, b, a );
	var edge2 = vec3.create();
	edge2 = vec3.subtract(edge2, c, a );
	// console.log("p1 Edge1: " + edge1[0] + " " + edge1[1] + " " + edge1[2]);
	var normal = vec3.create();
	vec3.cross( normal, edge1, edge2 );
	// console.log(normal[0] + ' ' + normal[1] + ' ' + normal[2]);
	// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
	// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
	//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
	//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
	//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
	var DdN = vec3.dot(rayDir, normal);
	// console.log("DdN: " + DdN);
	var sign;
	if ( DdN > 0 ) {
		sign = 1;
	} else if ( DdN < 0 ) {
		sign = - 1;
		DdN = - DdN;
	} else {
		return false;
	}
	var diff = vec3.create();
	vec3.subtract( diff, rayPos, a );
	// var DdQxE2 = sign * vec3.dot( rayDir, vec3.cross( vec3.create(edge2), vec3.create(diff) ) );
	var QxE2 = vec3.create();
	vec3.cross( QxE2, diff, edge2 )
	var DdQxE2 = sign * vec3.dot( rayDir, QxE2 );
	
	// console.log("DdQxE2: " + DdQxE2);
	// b1 < 0, no intersection
	if ( DdQxE2 < 0 ) {
		return false;
	}

	var E1xQ = vec3.create();
	vec3.cross( E1xQ, edge1, diff);
	// console.log("E1xQ: " + E1xQ[0] + " " + E1xQ[1] + " " + E1xQ[2]);
	var DdE1xQ = sign * vec3.dot( rayDir, E1xQ );
	// console.log("DdE1xQ: " + DdE1xQ);

	// b2 < 0, no intersection
	if ( DdE1xQ < 0 ) {
		return false;
	}
	// console.log(DdQxE2 + ' ' + DdE1xQ + " " + DdN);
	// b1+b2 > 1, no intersection
	if ( DdQxE2 + DdE1xQ > DdN ) {
		return false;
	}
	// Line intersects triangle, check if ray does.
	var QdN = - sign * vec3.dot( diff, normal );
	// t < 0, no intersection
	if ( QdN < 0 ) {
		return false;
	}
	// var ret = vec3.add(vec3.scale( rayDir, QdN / DdN), rayPos);
	// Ray intersects triangle.
	// console.log("returns");
	return QdN / DdN;
}

//returns the position of the nearest intersection
intersectRayGeometry = function(ray, geometryBuffer)
{
	var MaxT = false;
	for(var i = 0; i < geometryBuffer.length; i+=9)
	{
		var t = intersectRayTri(ray, geometryBuffer.slice(i, i+9));
		if(!t)
			continue;
		if(!MaxT)
			MaxT = t;
		if(t < MaxT)
		{
			MaxT = t;
		}
	}
	if(!MaxT)
		return false;
	if(scene.addBlocks)
	{
		MaxT -= Math.pow(0.5, scene.level);	
		// MaxT -= 0.2;
	}
	else
	{
		MaxT += Math.pow(0.5, scene.level);
	}
	return [MaxT*ray[3] + ray[0], MaxT*ray[4] + ray[1], MaxT*ray[5] + ray[2]];
};

getRayFromMouse = function(mouse, camera)
{
	// console.log("mouse: " + mouse.join(' '));
	var dx = ((mouse[0] / (gl.viewportWidth * 0.5)) - 1.0) / (gl.viewportWidth / gl.viewportHeight);
	var dy = 1.0 - (mouse[1] / (gl.viewportHeight * 0.5));
	// console.log("normalized: " + dx + ' ' + dy);


	dx = dx * Math.tan(to_rad(scene.cam.FOV*0.5)) * 1.333333;	//where the fuck does this 1.3333333 come from?
	dy = dy * Math.tan(to_rad(scene.cam.FOV*0.5)) * 1.333333;

	// console.log("distorted: " + dx + ' ' + dy);

	var viewMat = camera.view();
	var viewInverse = mat4.create();
	mat4.invert(viewInverse, viewMat);


	var rotate = mat4.create();
	var rotateInverse = mat4.create();
	mat4.rotateX(rotate, mat4.create(), Math.PI);
	mat4.invert(rotateInverse, rotate);

	// var p1 = vec3.fromValues(0.1*dx,0.1*dy,0.1);
	var p1 = vec3.fromValues(0.0,0.0,0.0);	
	var p2 = vec3.fromValues(1.0*dx,1.0*dy, -1.0);


	// vec3.transformMat4(p1, p1, rotateInverse);
	// vec3.transformMat4(p2, p2, rotateInverse);

	vec3.transformMat4(p1, p1, viewInverse);
	vec3.transformMat4(p2, p2, viewInverse);



	// console.log("P1: " + p1[0] + ' ' + p1[1] + ' ' + p1[2]);
	// console.log("P2: " + p2[0] + ' ' + p2[1] + ' ' + p2[2]);

	// console.log()

	dir = vec3.create();
	vec3.subtract(dir, p2, p1);
	vec3.normalize(dir, dir);



	var ray = [p1[0], p1[1], p1[2], dir[0], dir[1], dir[2]];
	// console.log("Ray: " + ray.join(' '));

	return ray;

};