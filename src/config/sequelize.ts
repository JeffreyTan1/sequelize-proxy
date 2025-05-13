import { Sequelize } from "sequelize";
import { createSequelize } from "./createSequelize";

const TEST_STATEMENT_TIMEOUT_MS = 1000;
const sequelizeInstance = createSequelize(TEST_STATEMENT_TIMEOUT_MS);
export const sequelize = createSequelizeProxy(sequelizeInstance);

function createSequelizeProxy(sequelizeInstance: Sequelize) {
  return new Proxy(sequelizeInstance, {
    get: (target, prop, receiver) => {
      const originalValue = Reflect.get(target, prop, receiver);
      if (typeof originalValue === 'function') {
        return function(...args: any[]) {
          return originalValue.apply(target, args);
        };
      }
      return originalValue;
    }
  });
}