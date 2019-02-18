import { SYMBOL_GEO_POLYGON } from '../helper/symbol'
import { isArray, isNumber } from '../utils/type'
import { LineString } from "./lineString";

/**
 * 线段
 *
 * @author starkewang
 */
export class Polygon {

    readonly lines: LineString[]

    /**
     * 初始化
     *
     * @param lines    - GeoPoint
     */
    constructor(lines: LineString[]) {
        lines.forEach(line => {
            LineString.validate(line)
        })

        this.lines = lines;
    }

    parse(key) {
        return {
            [key]: {
                type: 'Polygon',
                coordinates: this.lines.map(line => {
                    return line.points.map(point => [point.longitude, point.latitude])
                })
            }
        }
    }

    toJSON() {
        return {
            type: 'Polygon',
            coordinates: this.lines.map(line => {
                return line.points.map(point => [point.longitude, point.latitude])
            })
        }
    }

    static validate(polygon) {
        if (polygon.type !== 'Polygon' || !isArray(polygon.coordinates)) {
            return false
        }
        for (let line of polygon.coordinates) {
            for (let point of line) {
                if (!isNumber(point[0]) || !isNumber(point[1])) {
                    return false
                }
            }
        }
        return true
    }

    get _internalType() {
        return SYMBOL_GEO_POLYGON
    }
}
