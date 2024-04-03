const { capitalize } = require("../lib/utils");

function newController(name) {
  controllerName = `${capitalize(name)}Controller`;
  return `const { AbstractController } = require("coelhojs-core");

/*
 *
 * If you need to call a CRUD controller to fetch some data from a database :
 * - add the controllers requirement : replace the first line with "const { AbstractController, controllers } = require("coelhojs-core");"
 * - declare your controller : const { <nameController> } = controllers;
 *
 */

class ${controllerName} extends AbstractController {
    /*
     *
     * Feel free to add all the methods you need here
     *
     */
}

module.exports = { ${controllerName} };
        `;
}

function newCrudController(name) {
  modelName = capitalize(name);
  controllerName = `${capitalize(name)}Controller`;
  return `const { AbstractController, models } = require("coelhojs-core");

const { ${modelName} } = models;

class ${controllerName} extends AbstractController {
    constructor() {
        super(
            ${modelName}
            // add your model includes array
        );
    }
    /*
    *
    * Feel free to add all the methods you need here
    *
    */
}

module.exports = { ${controllerName} };
        `;
}

module.exports = {
  newController,
  newCrudController,
};
