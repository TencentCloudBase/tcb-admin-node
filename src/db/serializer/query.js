"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../commands/query");
const logic_1 = require("../commands/logic");
const symbol_1 = require("../helper/symbol");
const type_1 = require("../utils/type");
const operator_map_1 = require("../operator-map");
const common_1 = require("./common");
class QuerySerializer {
    constructor() {
    }
    static encode(query) {
        const encoder = new QueryEncoder();
        return encoder.encodeQuery(query);
    }
}
exports.QuerySerializer = QuerySerializer;
class QueryEncoder {
    encodeQuery(query, key) {
        if (common_1.isConversionRequired(query)) {
            if (logic_1.isLogicCommand(query)) {
                return this.encodeLogicCommand(query);
            }
            else if (query_1.isQueryCommand(query)) {
                return this.encodeQueryCommand(query);
            }
            else {
                return { [key]: this.encodeQueryObject(query) };
            }
        }
        else {
            if (type_1.isObject(query)) {
                return this.encodeQueryObject(query);
            }
            else {
                return query;
            }
        }
    }
    encodeLogicCommand(query) {
        switch (query.operator) {
            case logic_1.LOGIC_COMMANDS_LITERAL.AND:
            case logic_1.LOGIC_COMMANDS_LITERAL.OR: {
                const $op = operator_map_1.operatorToString(query.operator);
                const subqueries = query.operands.map((oprand) => this.encodeQuery(oprand, query.fieldName));
                return {
                    [$op]: subqueries,
                };
            }
            default: {
                const $op = operator_map_1.operatorToString(query.operator);
                if (query.operands.length === 1) {
                    const subquery = this.encodeQuery(query.operands[0]);
                    return {
                        [$op]: subquery,
                    };
                }
                else {
                    const subqueries = query.operands.map(this.encodeQuery.bind(this));
                    return {
                        [$op]: subqueries,
                    };
                }
            }
        }
    }
    encodeQueryCommand(query) {
        if (query_1.isComparisonCommand(query)) {
            return this.encodeComparisonCommand(query);
        }
        else {
            return this.encodeComparisonCommand(query);
        }
    }
    encodeComparisonCommand(query) {
        if (query.fieldName === symbol_1.SYMBOL_UNSET_FIELD_NAME) {
            throw new Error(`Cannot encode a comparison command with unset field name`);
        }
        const $op = operator_map_1.operatorToString(query.operator);
        switch (query.operator) {
            case query_1.QUERY_COMMANDS_LITERAL.EQ:
            case query_1.QUERY_COMMANDS_LITERAL.NEQ:
            case query_1.QUERY_COMMANDS_LITERAL.LT:
            case query_1.QUERY_COMMANDS_LITERAL.LTE:
            case query_1.QUERY_COMMANDS_LITERAL.GT:
            case query_1.QUERY_COMMANDS_LITERAL.GTE: {
                return {
                    [query.fieldName]: {
                        [$op]: common_1.encodeInternalDataType(query.operands[0]),
                    },
                };
            }
            case query_1.QUERY_COMMANDS_LITERAL.IN:
            case query_1.QUERY_COMMANDS_LITERAL.NIN: {
                return {
                    [query.fieldName]: {
                        [$op]: common_1.encodeInternalDataType(query.operands),
                    },
                };
            }
            default: {
                return {
                    [query.fieldName]: {
                        [$op]: common_1.encodeInternalDataType(query.operands[0]),
                    },
                };
            }
        }
    }
    encodeQueryObject(query) {
        const flattened = common_1.flattenQueryObject(query);
        for (const key in flattened) {
            const val = flattened[key];
            if (logic_1.isLogicCommand(val)) {
                flattened[key] = val._setFieldName(key);
                const condition = this.encodeLogicCommand(flattened[key]);
                this.mergeConditionAfterEncode(flattened, condition, key);
            }
            else if (query_1.isComparisonCommand(val)) {
                flattened[key] = val._setFieldName(key);
                const condition = this.encodeComparisonCommand(flattened[key]);
                this.mergeConditionAfterEncode(flattened, condition, key);
            }
            else if (common_1.isConversionRequired(val)) {
                flattened[key] = common_1.encodeInternalDataType(val);
            }
        }
        return flattened;
    }
    mergeConditionAfterEncode(query, condition, key) {
        if (!condition[key]) {
            delete query[key];
        }
        for (const conditionKey in condition) {
            if (query[conditionKey]) {
                if (type_1.isArray(query[conditionKey])) {
                    query[conditionKey].push(condition[conditionKey]);
                }
                else if (type_1.isObject(query[conditionKey])) {
                    if (type_1.isObject(condition[conditionKey])) {
                        Object.assign(query, condition);
                    }
                    else {
                        console.warn(`unmergable condition, query is object but condition is ${type_1.getType(condition)}, can only overwrite`, condition, key);
                        query[conditionKey] = condition[conditionKey];
                    }
                }
                else {
                    console.warn(`to-merge query is of type ${type_1.getType(query)}, can only overwrite`, query, condition, key);
                    query[conditionKey] = condition[conditionKey];
                }
            }
            else {
                query[conditionKey] = condition[conditionKey];
            }
        }
    }
}
