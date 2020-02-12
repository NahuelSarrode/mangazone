const fs = require('fs');
const router = require('express').Router();
const logger = require('./common/logger');
//const middlewares = require('./common/middlewares');

logger.info('Initializing Router');

// Gets all module names
fs.readdir(`${__dirname}/modules`, (err, files) => {
    for (const name of files) {
        // Loads the module index file
        const module = require(`${__dirname}/modules/${name}`);

        logger.info(`Loading "${name}" module routes`);

        if (module && module.routes) {
            // Loads each module routes
            for (const route of module.routes) {
                // "handlers" will be an array of functions (middlewares and controllers)
                const handlers = [];

                // Checks if controller name exists in the controller file
                if (!module.controller || !module.controller[route.handler]) {
                    logger.warn(`Attempting to add controller "${route.handler}" to path "${route.path}" but doesn't exist`);
                } else {
                    // If the route has middlewares configured, we add this middlewares to the "handlers" array
                    /* if (route.middlewares && route.middlewares.length) {

                        for (const middleware of route.middlewares) {
                            logger.debug(`Added middleware "${middleware}" to path "${route.path}"`);
                            handlers.push(middlewares[middleware]);
                        }
                    } */

                    // Finally, the last handler item need to be the controller
                    logger.debug(`Added controller "${route.handler}" to path "${route.path}"`);
                    handlers.push(module.controller[route.handler]);
                }
                
                // Adds the route configuration with express router
                router[route.method](route.path, handlers);
            }
        }
    }
});

module.exports = router;