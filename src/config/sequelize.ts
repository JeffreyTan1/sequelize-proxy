import { Sequelize } from "sequelize";
import { createSequelize } from "./createSequelize";

const TEST_STATEMENT_TIMEOUT_MS = 1000 * 4;
const sequelizeInstance = createSequelize(TEST_STATEMENT_TIMEOUT_MS);
export const sequelize = createSequelizeProxy(sequelizeInstance);

const DUMMY_ERROR_MSG = "Caught a sequelize exception in the proxy";

function createSequelizeProxy(sequelizeInstance: Sequelize) {
  return new Proxy(sequelizeInstance, {
    get: (target, prop, receiver) => {
      const originalValue = Reflect.get(target, prop, receiver);
      if (typeof originalValue === 'function') {
        return function(...args: any[]) {
          try {
            const result = originalValue.apply(target, args);
            
            // Handle promises
            if (result && typeof result.then === 'function') {
              return result.catch((error: unknown) => {
                throw new Error(DUMMY_ERROR_MSG);
              });
            }
            
            return result;
          } catch (error) {
            console.log(DUMMY_ERROR_MSG);
            throw new Error(DUMMY_ERROR_MSG);
          }
        };
      }
      return originalValue;
    }
  });
}