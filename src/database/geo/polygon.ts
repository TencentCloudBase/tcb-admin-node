import { SYMBOL_GEO_MULTI_POLYGON } from '../helper/symbol'
import { isArray, isNumber } from '../utils/type'
import { LineString } from "./lineString";

/**
 * 面
 *
 * @author starkewang
 */
export class Polygon {

    readonly lines: LineString[]

    /**
     * 初始化
     *
     * @param lines    - LineString
     */
    constructor(lines: LineString[]) {
        lines.forEach(line => {
            LineString.validate(line)
            if (!LineString.isClosed(line)) {
                throw new Error(`LineString ${line.points.map(p => p.toReadableString())} is not a closed cycle`)
            }
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
            if (!this.isCloseLineString(line)) {
                return false
            }
            for (let point of line) {
                if (!isNumber(point[0]) || !isNumber(point[1])) {
                    return false
                }
            }
        }
        return true
    }

    static isCloseLineString(lineString) {
        const firstPoint = lineString[0]
        const lastPoint = lineString[lineString.length - 1]

        if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
            return false
        }

        return true
    }

    get _internalType() {
        return SYMBOL_GEO_MULTI_POLYGON
    }
}
