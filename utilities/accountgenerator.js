"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = void 0;
const getRandom = async (length) => {
    let accountNumbers = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    return accountNumbers;
};
exports.getRandom = getRandom;
exports.default = exports.getRandom;
