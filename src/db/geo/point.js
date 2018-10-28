"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../validate");
class Point {
    constructor(longitude, latitude) {
        validate_1.Validate.isGeopoint("latitude", latitude);
        validate_1.Validate.isGeopoint("longitude", longitude);
        this.latitude = latitude;
        this.longitude = longitude;
    }
    toJSON() {
        return {
            type: 'Point',
            coordinates: [
                this.longitude,
                this.latitude,
            ],
        };
    }
}
exports.Point = Point;
