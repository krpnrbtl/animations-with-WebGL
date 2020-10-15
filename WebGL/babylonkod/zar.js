var canvas = document.getElementById("zar");

var engine = null;
var scene = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    //scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 1, 30, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);

    var ground = BABYLON.Mesh.CreateGround("ground1", 15, 40, 1, scene);
    ground.position.y = -4.6 ;
    ground.position.x = -3;

    var material = new BABYLON.StandardMaterial(scene);
    material.diffuseColor = new BABYLON.Color3(0.97, 0.56, 0.03);

    var material1 = new BABYLON.StandardMaterial("material1",scene);
    material1.diffuseColor = new BABYLON.Color3(1, 1, 1);
    
    var material2 = new BABYLON.StandardMaterial("material2",scene);
    material2.diffuseColor = new BABYLON.Color3(0.97, 0.96, 0.03);

    var materialWood = new BABYLON.StandardMaterial("wood", scene);
    materialWood.diffuseTexture = new BABYLON.Texture("../image/zaryeni.png", scene);
    materialWood.emissiveColor = new BABYLON.Color3(1, 1, 1);

    var faceUV = new Array(6);
    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i/3, i/2, (i+1)/3, (i+1)/2);
    } 

    var options = {
        width: 2.5,
        height: 2.5,
        depth: 2.5,
        faceUV: faceUV
    };
    
    var zar = BABYLON.MeshBuilder.CreateBox("Zar", options, scene);
    zar.position = new BABYLON.Vector3(-3, -3.255, -13);
    zar.rotation.y = Math.PI / 3 * 0.2 ;
    zar.material = materialWood;

    var pivot = BABYLON.MeshBuilder.CreateBox("pivot", {height: 4.55, width: 2, depth: 0.2}, scene)
    pivot.position.x = -3;
    pivot.position.y = -2.25;
    pivot.position.z = 5;

    var box = BABYLON.MeshBuilder.CreateBox("Box", {height: 0.2, width: 2, depth: 20}, scene);
    
    var myPath = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 0.2, 0),
    ];
    var pouch1 = BABYLON.MeshBuilder.CreateTube("pouch1", {path: myPath, radius: 1, cap:1, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true}, scene);
    var pouch2 = BABYLON.MeshBuilder.CreateTube("pouch2", {path: myPath, radius: 1, cap:1, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true}, scene);
    pouch1.material = material;	
    pouch2.material = material;

    var mass = BABYLON.MeshBuilder.CreateBox("mass", { width: 1, depth: 1, height: 1}, scene);
    var mass2 = BABYLON.MeshBuilder.CreateBox("mass2", { width: 1, depth: 1, height: 1}, scene);
    mass.material = material1 ;
    mass2.material = material2 ;

    pouch1.parent = box ;
    pouch2.parent = box ;
    mass.parent = box;
    mass2.parent = box;
    
    pouch1.position.y = 0.11 ;
    pouch1.position.z = 9 ;
    pouch2.position.y = 0.11 ;
    pouch2.position.z = -9 ;
    mass.position.y = 0.7;
    mass.position.z = 9 ;
    mass2.position.y = 0.7;
    mass2.position.z = -9 ;
    
    box.position.x = -3;
    box.position.z = 5;
    box.rotation.x = ((Math.PI/4)* 1.5/3 ) / 3 * (3.5);
    mass2.isVisible = false;

    var cdflineK = BABYLON.Mesh.CreateLines("cdfLineK",[
        new BABYLON.Vector3(-3, -4.55, -7),
        new BABYLON.Vector3(-3, -4.55, 17)
    ], scene);
    cdflineK.color = new BABYLON.Color3(0.97, 0.56, 0.03);

    scene.enablePhysics();

    // Add Imposters
    zar.physicsImpostor = new BABYLON.PhysicsImpostor(zar, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, friction: 0, restitution: 0. }, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0.7 }, scene);

    //Impulse Settings
    var impulseDirection = new BABYLON.Vector3(0, 0.7, 0);
    var impulseMagnitude = 30;
    var contactLocalRefPoint = BABYLON.Vector3.Zero();
    contactLocalRefPoint.x=0.5;
    contactLocalRefPoint.y=0.3;
    contactLocalRefPoint.z=0.6;

    var Pulse = function() {
        zar.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), zar.getAbsolutePosition().add(contactLocalRefPoint));
    }

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var lSlider = new BABYLON.GUI.Slider();
    lSlider.height = "30px";
    lSlider.width = 0.3;
    lSlider.paddingTop = "5px";
    lSlider.paddingBottom = "5px";
    lSlider.color = "Orange";
    lSlider.minimum = 0 ;
    lSlider.maximum = 100 ;
    lSlider.value = 0 ;
    lSlider.onValueChangedObservable.add((v)=>{
        lSlider.value = parseInt(v);
        header.text = "Atış Sayısı : " + lSlider.value ;
    });
    advancedTexture.addControl(lSlider); 
    lSlider.linkWithMesh(ground);
    lSlider.linkOffsetY = 110;

    var header = new BABYLON.GUI.TextBlock();
    header.text = "Atış Sayısı : " + lSlider.value ;
    header.height = "40px";
    header.color = "Orange";
    header.paddingTop = "10px";
    advancedTexture.addControl(header);
    header.linkWithMesh(ground);
    header.linkOffsetY = 75;

    var textblock2 = new BABYLON.GUI.TextBlock("textblock2", "");
    textblock2.width = 0.1;
    textblock2.height = "40px";
    textblock2.color = "Black";
    //textblock2.text = "3.5" ;
    advancedTexture.addControl(textblock2);
    textblock2.linkWithMesh(ground);
    textblock2.linkOffsetX = -80 ;
    textblock2.linkOffsetY = 30 ;

    var button = BABYLON.GUI.Button.CreateSimpleButton("but", "Zar At");
    button.width = 0.15;
    button.height = "30px";
    button.color = "white";
    button.background = "Orange";
    button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    button.top = "-30px";
    button.left = "-10";

    var atisCounter = 0 ;
    var tempCounter = 0 ; 
    var sumValue = 0 ; 
    var sum = 0 ;
    button.onPointerClickObservable.add(function (){
        if( lSlider.value === 0){
            alert("Sıfırdan büyük bir değer seçiniz!");
        }else{
            Pulse();
            tempCounter = lSlider.value ; 
            atisCounter += tempCounter ; 
            var tepmSum = 0;
            for (var i=0; i<tempCounter; i++){
                var zarValue = Math.floor(Math.random()*6)+1 ;
                tepmSum += zarValue ;
            }
            sumValue += tepmSum ; 
            sum = sumValue / atisCounter ;
            textblock2.text = (sum.toPrecision(3)).toString() ;
            if( sum > 0 ){
                mass2.isVisible = true ;
                box.rotation.x = ((Math.PI/4)* 1.5/3 ) / 3 * (3.5- sum);
            }
        }
    });
    advancedTexture.addControl(button);
    button.linkWithMesh(ground);
    button.linkOffsetY = 150;

    var textblock = new BABYLON.GUI.TextBlock("textblock", "");
    textblock.width = 0.2;
    textblock.height = "40px";
    textblock.color = "Black";
    textblock.text = "3.5" ;
    advancedTexture.addControl(textblock);
    textblock.linkWithMesh(ground);
    textblock.linkOffsetX = 240 ;
    textblock.linkOffsetY = 30 ; 

        

    return scene;
};

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