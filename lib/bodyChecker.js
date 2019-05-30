import { BadRequest } from 'http-errors';
import { isNil } from 'lodash';

export const checkData = (requiredFields, optionalFields, data = {}) => {
    const keys = new Set(Object.keys(data));
    for (let i = 0; i < (requiredFields || []).length; i += 1) {
        const field = requiredFields[i];
        const value = data[field];
        if (isNil(value) || value === '') {
            return new BadRequest(`${field} is required`);
        }
        keys.delete(field);
    }
    (optionalFields || []).forEach(field => keys.delete(field));
    if (keys.size > 0) {
        return new BadRequest(`Invalid field(s) ${[...keys].join(', ')}`);
    }
    return null;
};

export default (requiredFields, optionalFields) => (req, res, next) => {
    const err = checkData(requiredFields, optionalFields, req.body);
    if (err) {
        return res.error(err);
    }
    return next();
};

export const checkQuery = (requiredFields, optionalFields) => (req, res, next) => {
    const err = checkData(requiredFields, optionalFields, req.query);
    if (err) {
        return res.error(err);
    }
    return next();
};
