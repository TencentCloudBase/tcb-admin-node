import { SYMBOL_GEO_POLYGON } from '../helper/symbol'
import { isArray, isNumber } from '../utils/type'
import { Polygon } from './polygon';


/**
 * 多个面
 *
 * @author starkewang
 */
export class MultiPolygon {

    readonly polygons: Polygon[]

    /**
     * 初始化
     *
     * @param polygons    - Polygon[]
     */
    constructor(polygons: Polygon[]) {
        for (let polygon of polygons) {
            if (!(polygon instanceof Polygon)) {
                throw new TypeError(`"polygon" must be of type Polygon. Received ${typeof polygon}`)
            }
        }

        this.polygons = polygons;
    }

    parse(key) {
        return {
            [key]: {
                type: 'MultiPolygon',
                coordinates: this.polygons.map(polygon => {
                    return polygon.lines.map(line => {
                        return line.points.map(point => [point.longitude, point.latitude])
                    })
                })
            }
        }
    }

    toJSON() {
        return {
            type: 'MultiPolygon',
            coordinates: this.polygons.map(polygon => {
                return polygon.lines.map(line => {
                    return line.points.map(point => [point.longitude, point.latitude])
                })
            })
        }
    }

    static validate(multiPolygon) {
        if (multiPolygon.type !== 'MultiPolygon' || !isArray(multiPolygon.coordinates)) {
            return false
        }
        for (let polygon of multiPolygon.coordinates) {
            for (let line of polygon) {
                for (let point of line) {
                    if (!isNumber(point[0]) || !isNumber(point[1])) {
                        return false
                    }
                }
            }
        }
        return true
    }

    get _internalType() {
        return SYMBOL_GEO_POLYGON
    }
}
