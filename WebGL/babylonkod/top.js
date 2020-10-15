var canvas = document.getElementById("top");

var engine = null;
var scene = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene  = function() {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3( 1, 1, 1);
    
    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(5, 3, 0), scene);
    camera.setPosition(new BABYLON.Vector3(5, 3, -13));
    camera.attachControl(canvas, true);
    
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
    light.intensity = 0.8;


    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 10, scene);
    ground.position.x = -3;
    ground.position.z = 2 ;
    ground.rotation.y = Math.cos(30);

    var boxSize = 1;
    var myPath = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, boxSize, 0)
    ]; 
    
    var material = new BABYLON.StandardMaterial(scene);
    material.diffuseColor = new BABYLON.Color3(0.97, 0.59, 0.03, 0);
    material.alpha=0.5;

    var box = BABYLON.MeshBuilder.CreateTube("box", {path: myPath, tessellation:4, cap:1, radius: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true}, scene);
    box.material = material;
    box.position = new BABYLON.Vector3(-3,0.01,2);

    var materialSphere1 = new BABYLON.StandardMaterial(scene);
    materialSphere1.diffuseColor = new BABYLON.Color3(1, 0, 0);

    var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 0.5}, scene);
    sphere1.material = materialSphere1;
    sphere1.position = new BABYLON.Vector3(-3, 0, 3);
    sphere1.position.y = 0.5;

    var materialSphere2 = new BABYLON.StandardMaterial(scene);
    materialSphere2.diffuseColor = new BABYLON.Color3(0, 1, 0);

    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 0.5}, scene);
    sphere2.material = materialSphere2;
    sphere2.position = new BABYLON.Vector3(-2.5, 0, 1);
    sphere2.position.y = 1.2;

    var materialSphere3 = new BABYLON.StandardMaterial(scene);
    materialSphere3.diffuseColor = new BABYLON.Color3(0, 0, 1);

    var sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 0.5}, scene);
    sphere3.material = materialSphere3;
    sphere3.position = new BABYLON.Vector3(-4, 0, 2);
    sphere3.position.y = 0.8;

    scene.enablePhysics();
    
    sphere1.physicsImpostor = new BABYLON.PhysicsImpostor(sphere1, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.7 }, scene);
    sphere2.physicsImpostor = new BABYLON.PhysicsImpostor(sphere2, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.7 }, scene);
    sphere3.physicsImpostor = new BABYLON.PhysicsImpostor(sphere3, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.7 }, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.7 }, scene);

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    
    var button = BABYLON.GUI.Button.CreateSimpleButton("button", "Top Seç");
    button.width ="100px";
    button.height = "30px";
    button.color = "white";
    button.background = "Orange";
    advancedTexture.addControl(button);
    button.linkWithMesh(ground);
    button.linkOffsetY = 60;
    button.linkOffsetX = -10;

    var makeTextPlane = function(text, color, size) {
        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 24px Arial", color , "transparent", true);
        
        var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
        plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        plane.material.backFaceCulling = false;
        plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        plane.material.diffuseTexture = dynamicTexture;
        return plane;
    };
        
    // show axisX
    var showAxisX = function(x,y, metin) {
        var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
            new BABYLON.Vector3(x,y,0), 
            new BABYLON.Vector3(x+5, y, 0), 
            new BABYLON.Vector3(x+4.5, y+0.3, 0), 
            new BABYLON.Vector3(x+5, y, 0), 
            new BABYLON.Vector3(x+4.5, y-0.3, 0)
        ], scene);
        axisX.color = new BABYLON.Color3(0, 0, 0);
        var xChar = makeTextPlane(metin, "blue", 0.8);
        xChar.position = new BABYLON.Vector3(x+5.5, y+0.1, 0);

        var xcor = [];
            xcor[x] = makeTextPlane(0 , "black", 0.6);
            xcor[x].position = new BABYLON.Vector3(x+0.15, y-0.2, 0);
            xcor[x+1] = makeTextPlane("K", "black", 0.6);
            xcor[x+1].position = new BABYLON.Vector3(x+1.15, y-0.2, 0);
            xcor[x+2] = makeTextPlane("Y", "black", 0.6);
            xcor[x+2].position = new BABYLON.Vector3(x+2.15, y-0.2, 0);
            xcor[x+3] = makeTextPlane("M", "black", 0.6);
            xcor[x+3].position = new BABYLON.Vector3(x+3.15, y-0.2, 0);
    };	

    // show axisY
    var showAxisY = function(x,y,metin) {
        var axisY = BABYLON.Mesh.CreateLines("axisY", [
            new BABYLON.Vector3(x,y,0), 
            new BABYLON.Vector3(x, y+6, 0), 
            new BABYLON.Vector3( x-0.3 , y+5.5 , 0), 
            new BABYLON.Vector3(x, y+6, 0), 
            new BABYLON.Vector3( x+0.3, y+5.5 , 0)
        ], scene);
        
        axisY.color = new BABYLON.Color3(0, 0, 0);
        var yChar = makeTextPlane(metin, "blue", 0.7);
        yChar.position = new BABYLON.Vector3(x+0.15, y+6.5 , 0);

        var ycor = [];
        for (i=y; i<=4; i++) {
            k = i/4;
            ycor[i] = makeTextPlane(k, "black", 0.6);
            ycor[i].position = new BABYLON.Vector3(x-0.4, i+0.1, 0);
        }		
    };

    var materialK = new BABYLON.StandardMaterial(scene);
    materialK.diffuseColor = new BABYLON.Color3(1, 0, 0);

    var discK = BABYLON.MeshBuilder.CreateDisc("discK", {radius: 0.1, arc: 1, tessellation: 0, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    discK.material = materialK;

    var discK2 = BABYLON.MeshBuilder.CreateDisc("discK", {radius: 0.1, arc: 1, tessellation: 0, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    discK2.material = materialK;

    var materialY = new BABYLON.StandardMaterial(scene);
    materialY.diffuseColor = new BABYLON.Color3(0, 1, 0);

    var discY = BABYLON.MeshBuilder.CreateDisc("discY", {radius: 0.1, arc: 1, tessellation: 0, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    discY.material = materialY;

    var discY2 = BABYLON.MeshBuilder.CreateDisc("discY", {radius: 0.1, arc: 1, tessellation: 0, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    discY2.material = materialY;

    var materialM = new BABYLON.StandardMaterial(scene);
    materialM.diffuseColor = new BABYLON.Color3(0, 0, 1);

    var discM = BABYLON.MeshBuilder.CreateDisc("discM", {radius: 0.1, arc: 1, tessellation: 0, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    discM.material = materialM;

    var discM2 = BABYLON.MeshBuilder.CreateDisc("discM", {radius: 0.1, arc: 1, tessellation: 0, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    discM2.material = materialM;

    discK.position = new BABYLON.Vector3(4, 0.1, 0);
    discY.position = new BABYLON.Vector3(4, 0, 0);
    discM.position = new BABYLON.Vector3(4.1, 0, 0);
    discK2.position = new BABYLON.Vector3(12, 0.1, 0);
    discY2.position = new BABYLON.Vector3(12, 0, 0);
    discM2.position = new BABYLON.Vector3(12.1, 0, 0);

    var counter1 = 0;
    var counter2 = 0;
    var counter3 = 0;
    var counterSum = 0 ;

    var discKPoY = (counter1 / counterSum)*4 ;
    var discYPoY = (counter2 / counterSum)*4 ;
    var discMPoY = (counter3 / counterSum)*4 ;
    var discY2PoY = discKPoY + discYPoY ;
    var discM2PoY = discKPoY + discYPoY + discMPoY;

    
    var cdflineK = BABYLON.Mesh.CreateLines("cdfLineK",[
        new BABYLON.Vector3(12, 0, 0),
        new BABYLON.Vector3(13, 0, 0)
    ], scene);
    cdflineK.color = new BABYLON.Color3(1,0,0);

    var cdflineY = BABYLON.Mesh.CreateLines("cdfLineY",[
        new BABYLON.Vector3(13, 0, 0),
        new BABYLON.Vector3(14, 0, 0)
    ], scene);
    cdflineY.color = new BABYLON.Color3(0,1,0);

    var cdflineM = BABYLON.Mesh.CreateLines("cdfLineM",[
        new BABYLON.Vector3(14, 0, 0),
        new BABYLON.Vector3(15, 0, 0)
    ], scene);
    cdflineM.color = new BABYLON.Color3(0,0,1);

    button.onPointerUpObservable.add( function (){
        var sphere = Math.floor(Math.random()*3)+1 ;
        var impulseDirection = new BABYLON.Vector3(0, 1, 0);
        var impulseMagnitude = 10;
        var contactLocalRefPoint = BABYLON.Vector3.Zero();
        if(sphere === 1){
            sphere1.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), sphere1.getAbsolutePosition().add(contactLocalRefPoint));
            counter1++;
        }
        if(sphere === 2){
            sphere2.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), sphere2.getAbsolutePosition().add(contactLocalRefPoint));
            counter2++;
        }
        if(sphere === 3){
            sphere3.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), sphere3.getAbsolutePosition().add(contactLocalRefPoint));
            counter3++;
        }
        counterSum++;
        // sphere ,counterSum, değişen counter değerini ve ya hepsini(counter1, counter2, counter3) döndürücez.


        discKPoY = (counter1 / counterSum)*4 ;
        discYPoY = (counter2 / counterSum)*4 ;
        discMPoY = (counter3 / counterSum)*4 ;
        discY2PoY = discKPoY + discYPoY ;
        discM2PoY = discKPoY + discYPoY + discMPoY;

        discK.position = new BABYLON.Vector3(5, discKPoY, 0);
        cdflineK.position.y = discKPoY;
        discK2.position = new BABYLON.Vector3(12, discKPoY, 0);
    
        discY.position = new BABYLON.Vector3(6, discYPoY, 0);
        cdflineY.position.y = discY2PoY ;
        discY2.position = new BABYLON.Vector3(13, discY2PoY, 0);
    
        discM.position = new BABYLON.Vector3(7, discMPoY, 0);
        cdflineM.position.y = discM2PoY ;
        discM2.position = new BABYLON.Vector3(14, discM2PoY, 0);
    });


    var konum = function (){

    };

    showAxisX(4,0,"x");
    showAxisY(4,0,"p(x)");
    showAxisX(12,0, "x");
    showAxisY(12,0,"F(x)");
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