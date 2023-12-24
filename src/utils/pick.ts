import Joi, { Schema } from 'joi';
const pick = (object: any | { [k: string]: string } | Schema, keys: string[]) => {
  return keys.reduce((obj: any, key: any) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
export default pick;
