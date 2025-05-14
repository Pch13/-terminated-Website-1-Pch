//カメラに写す
function drawScene(gl, programInfo, buffers){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    //clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView=(45 * Math.PI) / 180;
    const aspect=gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear=0.1;
    const zFar=100.0;
    const projectionMatrix=mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    //set the drawing position to centre
    const modelViewMatrix=mat4.create();

    //move the drawing position to start it drawing
    mat4.translate(
        modelViewMatrix,
        modelViewMatrix,
        [-0.0, 0.0, -6.0],
    );

    //tell GPU how to find the position 
    //in buffer
    setPositionAttribute(gl, buffers, programInfo);

    setColorAttribute(gl, buffers, programInfo);
    //validate this program
    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix,);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix,);

    {
        const offset=0;
        const vertexCount=4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}

    function setPositionAttribute(gl, buffers, programInfo){
        const numComponents=2;
        const type=gl.FLOAT;
        const normalize=false;
        const stride=0;
        const offset=0;

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition,  numComponents, type, normalize, stride, offset,);

        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    export { drawScene };


function setColorAttribute(gl, buffers, programInfo){
    const numComponents=4;
    const type=gl.FLOAT;
    const normalize=false;
    const stride=0;
    const offset=0;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );

    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);

}