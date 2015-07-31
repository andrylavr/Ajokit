TRAFFICSIM_APP.WorldController = function (gameplayScene) {
    var self = this;

    var gameplayScene = gameplayScene;
    var map;
    var scene;
    var camera;

    var roads = [];
    var routeLines = [];

    function constructor() {
        initialize();
    }

    function initialize() {
        initializeScene();
        initializeCamera();
        initializeWorld();
    }

    function initializeScene() {
        scene = new THREE.Scene();
    }

    function initializeCamera() {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.x = 8;
        camera.position.y = 6;
        camera.position.z = 24;
        camera.rotation.x = -45 * Math.PI / 180;
    }

    function initializeMap() {
        map = new TRAFFICSIM_APP.game.Map();
        var mapLines = map.getMap().split("\n");
        for (var lineIndex = 0; lineIndex < mapLines.length; lineIndex++) {
            var line = mapLines[lineIndex];
            for (var charIndex = 0; charIndex < line.length; charIndex++) {
                insertGameplayObjectToWorld(line.charAt(charIndex), charIndex * map.getTileSize(), 0, lineIndex * map.getTileSize());
            }
        }

        // Floor
        var geometry = new THREE.PlaneGeometry(map.getWidth(), map.getHeight(), 1, 1);
        var material = new THREE.MeshBasicMaterial({map: gameplayScene.getApplication().getTextureContainer().getTextureByName("grass")});
        var floor = new THREE.Mesh(geometry, material);
        floor.position.x = map.getWidth() / 2 - (map.getTileSize() / 2);
        floor.position.z = map.getHeight() / 2 - (map.getTileSize() / 2);
        floor.rotation.x = -90 * Math.PI / 180;
        floor.castShadow = true;
        floor.receiveShadow = true;
        scene.add(floor);

        // Light
        var light = new THREE.DirectionalLight(0xf6e86d, 1);
        light.position.x = -map.getTileSize();
        light.position.y = map.getTileSize() * 3;
        light.position.z = -map.getTileSize();
        light.target.position.x = map.getTileSize() * 5;
        light.target.position.y = 80;
        light.target.position.z = map.getTileSize() * 5;
        light.castShadow = true;
        scene.add(light);
    }

    function initializeSky() {
        // TODO use skybox.png)
        var sky = new THREE.Mesh(
            new THREE.CubeGeometry(5000, 5000, 5000),
            new THREE.MeshFaceMaterial(gameplayScene.getApplication().getTextureContainer().getTextureByName("skybox")));
        sky.position.x = map.getWidth() / 2;
        sky.position.z = map.getHeight() / 2;
        scene.add(sky);
    }

    function insertGameplayObjectToWorld(id, x, y, z) {
        if (id == 'Y') {
            var road = new TRAFFICSIM_APP.game.Road(
                self,
                gameplayScene.getApplication().getModelContainer().getModelByName("road_vertical").clone(),
                "VERTICAL");
            road.setPosition(
                {
                    "x": x,
                    "y": 0,
                    "z": z
                });
            scene.add(road.getModel());

            road.getRoutes().forEach(function (route) {
                var line = new THREE.Geometry();
                line.vertices.push(new THREE.Vector3(route.getStartNode().position.x, 0, route.getStartNode().position.z));
                line.vertices.push(new THREE.Vector3(route.getEndNode().position.x, 0, route.getEndNode().position.z));
                var material = new THREE.LineBasicMaterial( { color: 0x00ff00, linewidth: 2 } ); // FIXME linewidth cannot be changed on Windows?
                line = new THREE.Line(line, material);
                scene.add(line);
            });
        }
    }

    function initializeWorld() {
        initializeMap();
        initializeSky();
    }

    this.update = function () {
    };

    this.getCamera = function () {
        return camera;
    };

    this.getThreeJSScene = function () {
        return scene;
    };

    this.getGameplayScene = function () {
        return gameplayScene;
    };

    this.getPlayer = function () {
        return player;
    };

    constructor();
};