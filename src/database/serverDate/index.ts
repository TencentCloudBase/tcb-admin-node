import { SYMBOL_SERVER_DATE } from '../helper/symbol'

export class ServerDate {
    readonly offset: number;

    constructor({ offset }) {
        this.offset = offset
    }

    get _internalType() {
        return SYMBOL_SERVER_DATE
    }

    parse() {
        return {
            $date: {
                offset: this.offset
            }
        }
    }
}