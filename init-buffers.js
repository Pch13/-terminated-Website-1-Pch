//Buffer file
//拡張性を高めるために、別ファイルでバッファ作成
function initBuffers(gl){
    const positionBuffer=initPositionBuffer(gl);

    const colorBuffer=initColorBuffer(gl);

    return{
        position: positionBuffer,
        color: colorBuffer,
    }
}

function initPositionBuffer(gl){
    //create a buffer for a new object
    const positionBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    //create a position of the new object
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

    //pass data to CPU
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        return positionBuffer;
}

export { initBuffers };

//create new colours
//new color to vertices
function initColorBuffer(gl){
    const colors=[
        1.0,
        1.0,
        1.0,
        1.0, // white
        1.0,
        0.0,
        0.0,
        1.0, // red
        0.0,
        1.0,
        0.0,
        1.0, // green
        0.0,
        0.0,
        1.0,
        1.0, // blue
    ];

    const colorBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}