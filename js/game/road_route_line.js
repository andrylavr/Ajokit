(function () {
    TRAFFICSIM_APP.game = TRAFFICSIM_APP.game || {};
    TRAFFICSIM_APP.game.road_route_line = TRAFFICSIM_APP.game.road_route_line || {};

    var NS = TRAFFICSIM_APP.game.road_route_line;
    var math = TRAFFICSIM_APP.utils.math;
    var Vector3 = TRAFFICSIM_APP.utils.vector3.Vector3;

    NS.RoadRouteLine = function (worldController, road, startNode, endNode) {
        TRAFFICSIM_APP.game.road_route.RoadRoute.call(this, worldController, road, startNode, endNode);
    };

    NS.RoadRouteLine.prototype = Object.create(TRAFFICSIM_APP.game.road_route.RoadRoute.prototype);

    /** Returns a point which is a bit more near the end point than the given point. */
    NS.RoadRouteLine.prototype.getNextPoint = function (position) {
        return this.getNextPointAtDistance(position, 0.05);
    };

    /** Returns a point which is the given distance near the end point starting from the given position. */
    NS.RoadRouteLine.prototype.getNextPointAtDistance = function (position, distance) {
        // Make sure it does not go over the end point!
        if (distance > math.distance(position.x, 0, position.z, this.endNode.position.x, 0, this.endNode.position.z)) {
            return this.endNode.position;
        }

        return new Vector3(
            position.x + Math.cos(math.angleBetweenPointsWhenYIncreasesDown(
                position.x,
                position.z,
                this.endNode.position.x,
                this.endNode.position.z)) * distance,
            0,
            position.z - Math.sin(math.angleBetweenPointsWhenYIncreasesDown(
                position.x,
                position.z,
                this.endNode.position.x,
                this.endNode.position.z)) * distance);
    };

    /** Returns a point which is the given distance near the end point starting from the given position.
     * If the calculated next point goes over the end point, continues using the given nextRoute */
    NS.RoadRouteLine.prototype.getNextPointAtDistanceOrContinue = function (position, distance, nextRoute) {
        // If goes over the end point, continue using the next route.
        if (distance > math.distance(position.x, 0, position.z, this.endNode.position.x, 0, this.endNode.position.z)) {
            if (nextRoute) {
                return nextRoute.getNextPointAtDistanceOrContinue(
                    nextRoute.startNode.position,
                    distance - math.distance(position.x, 0, position.z, this.endNode.position.x, 0, this.endNode.position.z),
                    null);
            }

            return this.endNode.position;
        }

        return this.getNextPointAtDistance(position, distance);
    };

})();