var canvas = document.getElementById("para");

var engine = null;
var scene = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var createScene  = function() {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3( 1, 1, 1);

    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(5, 3, 0), scene);
    camera.setPosition(new BABYLON.Vector3(5.3, 3, -17));
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
    light.intensity = 0.8;
    
    var cylinderMaterial = new BABYLON.StandardMaterial("material1", scene);
    cylinderMaterial.diffuseTexture = new BABYLON.Texture("../image/para.jpg",scene);
    
    var columns = 3;  // columns
    var rows = 1;  // rows
    var faceUV = new Array(2);
    for (var i = 0; i < 3; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height:0.2, diameter:2, tessellation:0, subdivisions:1, faceUV: faceUV}, scene);
    cylinder.position = new BABYLON.Vector3(-4, 5, 0);
    cylinder.material = cylinderMaterial;
    cylinder.rotation.x = - Math.PI / 2;

    var cylinder2 = BABYLON.MeshBuilder.CreateCylinder("cylinder2", {height:0.2, diameter:2, tessellation:0, subdivisions:1, faceUV: faceUV}, scene);
    cylinder2.position = new BABYLON.Vector3(-1, 5, 0);
    cylinder2.material = cylinderMaterial;
    cylinder2.rotation.x = - Math.PI / 2;
    
    //GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var input = new BABYLON.GUI.InputText();
    input.width = "160px";
    input.height = "30px";
    input.placeholderText = "Atış sayısı giriniz! ";
    input.color = "Orange";
    input.background = "White";
    input.onPointerClickObservable.add(function(){
        input.text = " ";
    });
    advancedTexture.addControl(input);
    input.linkWithMesh(cylinder);
    input.linkOffsetY = 65;
    input.linkOffsetX = 45;

    var frameRate = 10;
    //Rotation Animation
    var yRot = new BABYLON.Animation("yRot", "rotation.y", 10, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keyFramesR = []; 
    keyFramesR.push({
    frame: 0,
    value: 0
    });
    keyFramesR.push({
    frame: frameRate,
    value: Math.PI
    });
    yRot.setKeys(keyFramesR);
    
    var button = BABYLON.GUI.Button.CreateSimpleButton("button", "Start");
    button.width = "60px";
    button.height = "30px";
    button.color = "black";
    button.background = "Orange";
    button.cornerRadius = 5 ;
    advancedTexture.addControl(button);
    button.linkWithMesh(cylinder);
    button.linkOffsetY = 100; 
    button.linkOffsetX = 45;

    var makeTextPlane = function(text, color, size) {
        var dynamicTexture2 = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture2.hasAlpha = true;
        dynamicTexture2.drawText(text, 5, 40, "bold 24px Arial", color , "transparent", true);
        
        var plane2 = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
        plane2.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        plane2.material.backFaceCulling = false;
        plane2.material.specularColor = new BABYLON.Color3(0, 0, 0);
        plane2.material.diffuseTexture = dynamicTexture2;
        return plane2;
    };
    
    // show axisX
    var showAxisX = function() {
        var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
            new BABYLON.Vector3(4, -3, 0), 
            new BABYLON.Vector3(16, -3, 0), 
            new BABYLON.Vector3(15.7, -2.7, 0), 
            new BABYLON.Vector3(16, -3, 0), 
            new BABYLON.Vector3(15.7, -3.3, 0)
        ], scene);
        axisX.color = new BABYLON.Color3(0, 0, 0);
        var xChar = makeTextPlane("X", "blue", 1.3);
        xChar.position = new BABYLON.Vector3(17, -3, 0);

        var x1 = makeTextPlane("1.Yazı", "black", 0.6);
        x1.position = new BABYLON.Vector3(4.6, -3.5, 0);
        var x2 =  makeTextPlane("1.Tura", "black", 0.6);
        x2.position = new BABYLON.Vector3(5.6, -3.5, 0);
        var x3= makeTextPlane("2.Yazı", "black", 0.6);
        x3.position = new BABYLON.Vector3(6.6, -3.5, 0);
        var x4= makeTextPlane("2.Tura", "black", 0.6);
        x4.position = new BABYLON.Vector3(7.6, -3.5, 0);
        var x5= makeTextPlane("Yazı", "black", 0.6);
        x5.position = new BABYLON.Vector3(8.6, -3.5, 0);
        var x12= makeTextPlane("Beklenen", "black", 0.6);
        x12.position = new BABYLON.Vector3(8.6, -3.8, 0);
        var x6= makeTextPlane("Tura", "black", 0.6);
        x6.position = new BABYLON.Vector3(9.6, -3.5, 0);
        var x13= makeTextPlane("Beklenen", "black", 0.6);
        x13.position = new BABYLON.Vector3(9.7, -3.8, 0);
        var x7 = makeTextPlane("TT", "black", 0.6);
        x7.position = new BABYLON.Vector3(10.9, -3.5, 0);
        var x8 =  makeTextPlane("TY", "black", 0.6);
        x8.position = new BABYLON.Vector3(11.9, -3.5, 0);
        var x9= makeTextPlane("YT", "black", 0.6);
        x9.position = new BABYLON.Vector3(12.9, -3.5, 0);
        var x10= makeTextPlane("YY", "black", 0.6);
        x10.position = new BABYLON.Vector3(13.9, -3.5, 0);
        var x11= makeTextPlane("Beklenen", "black", 0.6);
        x11.position = new BABYLON.Vector3(14.8, -3.5, 0)
    };	

    // show axisY
    var showAxisY = function() {
        var axisY = BABYLON.Mesh.CreateLines("axisY", [
            new BABYLON.Vector3(4, -3, 0), 
            new BABYLON.Vector3(4, 8, 0), 
            new BABYLON.Vector3( 3.5 , 7.5 , 0), 
            new BABYLON.Vector3(4, 8, 0), 
            new BABYLON.Vector3( 4.5, 7.5 , 0)
        ], scene);
        
        axisY.color = new BABYLON.Color3(0, 0, 0);
        var yChar = makeTextPlane("Y", "blue", 1.3);
        yChar.position = new BABYLON.Vector3(4.2, 9 , 0);
        
        var y;
        var ycor = [];
        for (y=-3; y<=7; y++) {
            var k = (y+3)/10;
            ycor[y] = makeTextPlane(k, "black", 0.6);
            ycor[y].position = new BABYLON.Vector3(3.5, y+0.1, 0);
        }		
    };
    var inputValue = 0 ;
    var floatInputValue = 0;

    var material1 = new BABYLON.StandardMaterial(scene);
    material1.diffuseColor = new BABYLON.Color3(1, 0.38, 0.02);
    
    var box1 = BABYLON.Mesh.CreateBox("box1", '1' , scene);
    box1.scaling.x=0.5;
    box1.scaling.y = 0.1 ;
    box1.position.x = 4.6;
    box1.position.y = -3;
    box1.material=material1;

    var box2 = BABYLON.Mesh.CreateBox("box2", '1', scene);
    box2.scaling.x=0.5;
    box2.scaling.y = 0.1 ;
    box2.position.x = 5.6;
    box2.position.y = -3;
    box2.material=material1;

    var material2 = new BABYLON.StandardMaterial(scene);
    material2.diffuseColor = new BABYLON.Color3(0.97, 0.07, 0.07);
    
    var box3 = BABYLON.Mesh.CreateBox("box3", '1', scene);
    box3.scaling.x=0.5;
    box3.scaling.y = 0.1 ;
    box3.position.x = 6.6;
    box3.position.y = -3;
    box3.material=material2;

    var box4 = BABYLON.Mesh.CreateBox("box4", '1', scene);
    box4.scaling.x=0.5;
    box4.scaling.y = 0.1 ;
    box4.position.x = 7.6;
    box4.position.y = -3;
    box4.material=material2;
    
    var material4 = new BABYLON.StandardMaterial(scene);
    material4.diffuseColor = new BABYLON.Color3(0.93, 1, 0.02);

    var box7 = BABYLON.Mesh.CreateBox("box1", '1', scene);
    box7.scaling.x=0.5;
    box7.scaling.y = 0.1 ;
    box7.position.x = 10.6;
    box7.position.y = -3;
    box7.material=material4;

    var material5 = new BABYLON.StandardMaterial(scene);
    material5.diffuseColor = new BABYLON.Color3(0.77, 1, 0.24);

    var box8 = BABYLON.Mesh.CreateBox("box2", '1', scene);
    box8.scaling.x=0.5;
    box8.scaling.y = 0.1 ;
    box8.position.x = 11.6;
    box8.position.y = -3;
    box8.material=material5;

    var material6 = new BABYLON.StandardMaterial(scene);
    material6.diffuseColor = new BABYLON.Color3(0.33, 0.83, 0.04);

    var box9 = BABYLON.Mesh.CreateBox("box3", '1', scene);
    box9.scaling.x=0.5;
    box9.scaling.y = 0.1 ;
    box9.position.x = 12.6;
    box9.position.y = -3;
    box9.material=material6;

    var material7 = new BABYLON.StandardMaterial(scene);
    material7.diffuseColor = new BABYLON.Color3(0.02, 0.6, 0.02);
    
    var box10 = BABYLON.Mesh.CreateBox("box4", '1', scene);
    box10.scaling.x=0.5;
    box10.scaling.y = 0.1 ;
    box10.position.x = 13.6;
    box10.position.y = -3;
    box10.material=material7;

    var animationFunction = function ( scalingValue, positionValue, box){
        var animation = new BABYLON.Animation("anim", "scaling.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        animation.setKeys([
            { frame: 0, value: 0 },
            { frame: 100, value: scalingValue }]);
        box.animations.push(animation);
        
        animation = new BABYLON.Animation("anim2", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        animation.setKeys([
            { frame: 0, value: -3 },
            { frame: 100, value: positionValue }]);
        box.animations.push(animation);            
        scene.beginAnimation(box, 0, 100, false, 2.0);
    }

    var olasilik = function(value){
        var sayacY1 = 0;
        var sayacT1 = 0;
        var sayacY2 = 0;
        var sayacT2 = 0;
        var sayacSum = 1;
        var olasilikY1 = 0;
        var olasilikT1 = 0;
        var olasilikY2 = 0;
        var olasilikT2 = 0;
        
        while ( (sayacSum-1) !== value ){
            paraG1 = Math.floor(Math.random()*2) ;
            paraG2 = Math.floor(Math.random()*2) ;
            if( paraG1 === 0){
                sayacY1++;
            }
            else{
                sayacT1++;
            }
            olasilikY1 = (1/sayacSum)*sayacY1;
            var box1ScalingY = olasilikY1*10;
            var box1PositionY = (olasilikY1*5)-3 ; // center point of box x-axis is -5 and y axis is 3.
            animationFunction(box1ScalingY, box1PositionY, box1);
            
            olasilikT1 = (1/sayacSum)*sayacT1;
            var box2ScalingY = olasilikT1*10;
            var box2PositionY = (olasilikT1*5)-3 ; // center point of box x-axis is -5 and y axis is 3.
            animationFunction(box2ScalingY, box2PositionY, box2);
            
            if( paraG2 === 0){
                sayacY2++;
            }
            else{
                sayacT2++;
            }
            olasilikY2 = (1/sayacSum)*sayacY2;
            var box3ScalingY = olasilikY2*10;
            var box3PositionY = (olasilikY2*5)-3 ; // center point of box x-axis is -5 and y axis is 3.
            animationFunction(box3ScalingY, box3PositionY, box3);
            
            olasilikT2 = (1/sayacSum)*sayacT2;
            var box4ScalingY = olasilikT2*10;
            var box4PositionY = (olasilikT2*5)-3 ; // center point of box x-axis is -5 and y axis is 3.
            animationFunction(box4ScalingY, box4PositionY, box4);
            
            var olasilikTT = (olasilikT1*olasilikT2);
            var box7ScalingY = olasilikTT*10;
            var box7PositionY = (olasilikTT*5)-3 ; // center point of box x-axis is -5 and y axis is 3.
            animationFunction(box7ScalingY, box7PositionY, box7);
            
            var olasilikTY = (olasilikT1 * olasilikY2) ;
            var box8ScalingY = olasilikTY*10;
            var box8PositionY = (olasilikTY*5)-3 ; // center point of box x-axis is -5 and y axis is 3.
            animationFunction(box8ScalingY, box8PositionY, box8);
            
            var olasilikYT = (olasilikY1 * olasilikT2) ;
            var box9ScalingY = olasilikYT*10;
            var box9PositionY = (olasilikYT*5)-3 ; // center point of box x-axis is -5 and y axis is 3.
            animationFunction(box9ScalingY, box9PositionY, box9);
            
            var olasilikYY = (olasilikY1 * olasilikY2) ;
            var box10ScalingY = olasilikYY*10;
            var box10PositionY = (olasilikYY*5)-3 ; // center point of box x-axis is -5 and y axis is 3.
            animationFunction(box10ScalingY, box10PositionY, box10);
            
            sayacSum++ ;
        }
    }
        
    button.onPointerUpObservable.add( function (){ 
        inputValue = parseInt(input.text);
        floatInputValue = parseFloat(input.text);
        if( inputValue > 0){
            if( (floatInputValue - inputValue ) === 0 ){
                scene.beginDirectAnimation(cylinder, [ yRot], 0, 2*frameRate, true, 3);
                scene.beginDirectAnimation(cylinder2, [ yRot], 0, 2*frameRate, true, 3);
                olasilik(inputValue);
                setTimeout(function(){
                    scene.animationsEnabled = false ;
                    if( (paraG1+1) ===  1 ){
                    cylinder.rotation.y = Math.PI;
                    console.log(paraG1);
                    }else{
                        cylinder.rotation.y = 0 ;
                    }
                    if( (paraG2+1) == 1){
                        cylinder2.rotation.y = Math.PI ;
                    }else{
                        cylinder2.rotation.y = 0 ;
                    }
                } ,1750);
                scene.animationsEnabled = true;
            }else{
                alert("Tam sayı değeri giriniz!");
            }   
        }else{
            alert("Sıfırdan büyük bir değer giriniz!");
        }
    });
        
    var material3 = new BABYLON.StandardMaterial(scene);
    material3.diffuseColor = new BABYLON.Color3(0, 0, 0);

    var box5 = BABYLON.Mesh.CreateBox("box5", '1', scene);
    box5.scaling.x=0.5;
    box5.scaling.y=5;
    box5.position = new BABYLON.Vector3(8.6, -0.5, 0);
    box5.material=material3;

    var box6 = BABYLON.Mesh.CreateBox("box6", '1', scene);
    box6.scaling.x=0.5;
    box6.scaling.y=5;
    box6.position = new BABYLON.Vector3(9.6, -0.5, 0); 
    box6.material=material3;

    var box11 = BABYLON.Mesh.CreateBox("box5", '1', scene);
    box11.scaling.x=0.5;
    box11.scaling.y=2.5;
    box11.position = new BABYLON.Vector3(14.6, -1.75, 0);
    box11.material=material3;
    
    showAxisX();
    showAxisY();
    olasilik(inputValue);
    //olasilik(10);
  
    return scene;
}

engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});