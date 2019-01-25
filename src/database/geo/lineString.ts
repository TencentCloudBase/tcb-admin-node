import { Validate } from "../validate";
import { SYMBOL_GEO_LINE_STRING } from '../helper/symbol'
import { Point } from './point'
import { isArray, isNumber } from '../utils/type'

/**
 * 线段
 *
 * @author starkewang
 */
export class LineString {

    readonly points: Point[]

    /**
     * 初始化
     *
     * @param points    - GeoPoint
     */
    constructor(points: Point[]) {
        points.forEach(point => {
            Validate.isGeopoint("longitude", point.longitude)
            Validate.isGeopoint("latitude", point.latitude)
        })

        this.points = points;
    }

    parse(key) {
        return {
            [key]: {
                type: 'LineString',
                coordinates: this.points.map(point => point.toJSON().coordinates)
            }
        }
    }

    toJSON() {
        return {
            type: 'LineString',
            coordinates: this.points.map(point => point.toJSON().coordinates)
        }
    }

    static validate(lineString) {
        if (lineString.type !== 'LineString' || !isArray(lineString.coordinates)) {
            return false
        }
        for (let i = 0; i < lineString.coordinates.length; i++) {
            const point = lineString.coordinates[i]
            if (!isNumber(point[0]) || !isNumber(point[1])) {
                return false
            }
        }
        return true
    }

    get _internalType() {
        return SYMBOL_GEO_LINE_STRING
    }
}
