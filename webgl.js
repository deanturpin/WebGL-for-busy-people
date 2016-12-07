"use strict"

onload = function() {

	var canvas = document.getElementById("canvas")

	// Create WebGL rendering context
	var gl = canvas.getContext("webgl")

	// Create vertex shader
	var vertexShaderSource = `

		attribute vec4 a_position;
		void main() {
			gl_Position = a_position;
			gl_PointSize = 10.0;
		}`

	var vertexShader = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vertexShader, vertexShaderSource)
	gl.compileShader(vertexShader)
	gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)

	// Create fragment shader
	var fragmentShaderSource = `

		precision mediump float;
		void main() {
			gl_FragColor = vec4(1, 0.5, 0.2, 1);
		}`

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fragmentShader, fragmentShaderSource)
	gl.compileShader(fragmentShader)
	gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)

	// Create program
	var program = gl.createProgram()
	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)
	gl.getProgramParameter(program, gl.LINK_STATUS)

	var positionAttributeLocation = gl.getAttribLocation(program, "a_position")
	var positionBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Array of points
	var positions = []
	for (var i = 0; i < 1; i += .1) {

		positions[positions.length] = i
		positions[positions.length] = i/2
	}

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
	gl.useProgram(program)
	gl.enableVertexAttribArray(positionAttributeLocation);

	// Bind the position buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	 
	gl.vertexAttribPointer(
		positionAttributeLocation,
		2,							// Components per iteration
		gl.FLOAT,					// 32-bit floats
		false,						// Don't normalise
		0,							// Stride
		0							// Offset
	)

	gl.drawArrays(gl.POINTS, 0, positions.length/2);
}
