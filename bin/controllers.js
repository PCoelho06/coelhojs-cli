const { capitalize } = require("../lib/utils");

module.exports = {
  newController: function (name) {
    controllerName = `${capitalize(name)}Controller`;
    return `const { AbstractController } = require("coelhojs-core");

/*
 *
 * If you need to call an CRUD controller to fetch some data from a database :
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
  },
  newCrudController: function (name) {
    modelName = capitalize(name);
    controllerName = `${capitalize(name)}Controller`;
    return `const { AbstractController } = require("coelhojs-core");

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
  },
};
