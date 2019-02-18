import { Validate } from "../validate";
import { SYMBOL_GEO_MULTI_POINT } from '../helper/symbol'
import { Point } from './point'
import { isArray, isNumber } from '../utils/type'

/**
 * 多个 Point
 *
 * @author starkewang
 */
export class MultiPoint {

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
                type: 'MultiPoint',
                coordinates: this.points.map(point => point.toJSON().coordinates)
            }
        }
    }

    toJSON() {
        return {
            type: 'MultiPoint',
            coordinates: this.points.map(point => point.toJSON().coordinates)
        }
    }

    static validate(multiPoint) {
        if (multiPoint.type !== 'MultiPoint' || !isArray(multiPoint.coordinates)) {
            return false
        }
        for (let point of multiPoint.coordinates) {
            if (!isNumber(point[0]) || !isNumber(point[1])) {
                return false
            }
        }
        return true
    }

    get _internalType() {
        return SYMBOL_GEO_MULTI_POINT
    }
}
