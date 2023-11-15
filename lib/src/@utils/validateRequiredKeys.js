"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredKeys = void 0;
function validateRequiredKeys(obj) {
    for (let key in obj) {
        if (obj[key] === undefined) {
            throw new Error(`${key} is required to initialize the logger class instance`);
        }
    }
}
exports.validateRequiredKeys = validateRequiredKeys;
