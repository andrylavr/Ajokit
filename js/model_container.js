(function() {
    TRAFFICSIM_APP.ModelContainer = function(application) {
        var application = application;
        var models = {};

        var logger = TRAFFICSIM_APP.utils.logger;

        var loader = new THREE.JSONLoader();
        var modelsLoadedSum = 0;
        var allModelsSum = 19;

        this.loadModelsAsynchronously = function() {
            loader.load('models/road_vertical.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_vertical"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_horizontal.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_horizontal"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_down_left.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_down_left"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_down_right.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_down_right"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_up_left.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_up_left"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_up_right.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_up_right"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_crossroads.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_crossroads"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_up_left_down.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_up_left_down"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_up_left_right.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_up_left_right"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_up_right_down.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_up_right_down"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_down_left_right.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_down_left_right"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_right_end.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_right_end"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_left_end.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_left_end"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_down_end.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_down_end"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/road_up_end.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("road");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["road_up_end"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/traffic_light.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("metal");
                var material = new THREE.MeshLambertMaterial({map: texture});

                models["traffic_light"] = new THREE.Mesh(geometry, material);
                modelsLoadedSum++;
            });

            loader.load('models/car.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("car");
                var material = new THREE.MeshLambertMaterial({map: texture});
                var mesh = new THREE.Mesh(geometry, material);
                models["car"] = mesh;
                modelsLoadedSum++;
            });

            loader.load('models/car.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("car_slow");
                var material = new THREE.MeshLambertMaterial({map: texture});
                var mesh = new THREE.Mesh(geometry, material);
                models["car_slow"] = mesh;
                modelsLoadedSum++;
            });

            loader.load('models/car.json', function(geometry) {
                var texture = application.getTextureContainer().getTextureByName("car_fast");
                var material = new THREE.MeshLambertMaterial({map: texture});
                var mesh = new THREE.Mesh(geometry, material);
                models["car_fast"] = mesh;
                modelsLoadedSum++;
            });
        };

        this.allModelsLoaded = function() {
            return modelsLoadedSum >= allModelsSum;
        };

        this.getModelByName = function(name) {
            if (models.hasOwnProperty(name)) {
                return models[name];
            }

            var errorMessage = "Model " + name + " not found!";
            logger.log(logger.LogType.ERROR, errorMessage);
            throw new TRAFFICSIM_APP.exceptions.GeneralException(errorMessage);
        }

    };
})();