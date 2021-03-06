(function() {
    TRAFFICSIM_APP.scenes = TRAFFICSIM_APP.scenes || {};
    TRAFFICSIM_APP.scenes.gameplay_scene = TRAFFICSIM_APP.scenes.gameplay_scene || {};

    var NS = TRAFFICSIM_APP.scenes.gameplay_scene;

    NS.GameplayScene = function (application) {
        var self = this;
        var application = application;
        var clock;

        var worldController;
        var worldRenderer;

        var fpsCounterTimestamp = 0;
        var frameCounter = 0;
        var deltaTime = 0;

        function constructor() {
            initialize();
        }

        function initialize() {
            clock = new THREE.Clock();
            worldController = new TRAFFICSIM_APP.game.world_controller.WorldController(self);
            worldRenderer = new TRAFFICSIM_APP.game.world_renderer.WorldRenderer(worldController);
        }

        this.update = function () {
            $(".loading").css("display", "none");
            worldController.update(deltaTime);
            worldRenderer.render();

            deltaTime = Math.min(clock.getDelta(), 0.05);
            handleFps();
        };

        function handleFps() {
            frameCounter++;

            if (Date.now() >= fpsCounterTimestamp + 1000) {
                $(".fps").text(frameCounter + "fps");
                frameCounter = 0;
                fpsCounterTimestamp = Date.now();
            }
        }

        this.getApplication = function () {
            return application;
        };

        constructor();
    };
})();