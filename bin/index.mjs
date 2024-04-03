#!/usr/bin/env node
import { promisify } from "util";
import cp from "child_process";
import fs, { existsSync, mkdirSync } from "fs";
import path from "path";
import clc from "cli-color";

const exec = promisify(cp.exec);

const inquirer = require("inquirer");
const { Command } = require("commander");
const program = new Command();
const prompt = inquirer.prompt;

const { newController, newCrudController } = require("./controllers");
const { questions, newModel } = require("./models");

const controllersDir = path.join(process.cwd(), "controllers");
const modelsDir = path.join(process.cwd(), "models");

program
  .name("coelhojs")
  .description("CLI for CoelhoJs framework")
  .version("1.0.9", "-v, -V, --version");

program
  .command("new-app")
  .description("Create a new CoelhoJs app")
  .argument("<name>", "name of the new app to create")
  .action((name) => {
    if (fs.existsSync(name)) {
      console.log(
        "🚨" +
          clc.red.bold("Oops :") +
          clc.red(
            `The folder ${name} already exists in the current directory, please give your new app another name.`
          )
      );
      process.exit(1);
    }
    exec(`npx new-coelhojs-app ${name}`);
  });

program
  .command("new-controller")
  .description("Create a new controller")
  .argument("<name>", "name of the controller to create")
  .option("-c, --crud", "Create a new CRUD controller")
  .action((name, options) => {
    const newControllerPath = `${controllersDir}/${name}.controller.js`;

    // Check if the controller already exists
    if (fs.existsSync(newControllerPath)) {
      console.log(
        `The file ${newControllerPath} already exists in the current directory, please give it another name.`
      );
      process.exit(1);
    }

    // Create the controllers folder if it doesn't already exists
    if (!fs.existsSync(controllersDir)) {
      fs.mkdirSync(controllersDir);
    }

    // Create the new controller
    let content = "";
    if (options.crud) {
      content = newCrudController(name);
    } else {
      content = newController(name);
    }

    fs.writeFile(newControllerPath, content, function (err) {
      if (err) throw err;
      console.log(clc.green("Created") + `: controllers/${name}.controller.js`);
      if (options.crud) {
        console.log(
          clc.xterm(214)(`\nDon't forget to add`) +
            ` "API /v1/${name}": {action: "${name}Controller", middlewares: []}` +
            clc.xterm(214)(` to the routes/api.route.js file.`)
        );
      }
    });
  });

program
  .command("new-model")
  .description("Create a new model")
  .argument("<name>", "name of the model to create")
  .option("-c, --crud", "Create the corresponding CRUD controller")
  .action(async (name, options) => {
    const newModelPath = `${modelsDir}/${name}.model.js`;
    const newControllerPath = `${controllersDir}/${name}.controller.js`;
    let newField = true;

    // Check if the model already exists
    if (fs.existsSync(newModelPath)) {
      console.log(
        `The file ${newModelPath} already exists in the current directory, please give it another name.`
      );
      process.exit(1);
    }

    // Create the models folder if it doesn't already exists
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir);
    }

    console.log("");
    console.log("Great ! Let's add some fields to this model !");
    console.log("");

    // Create each of the model properties
    const fields = [];

    while (newField) {
      await prompt(questions).then((answers) => {
        if (answers.fieldname == "") {
          newField = false;
        } else {
          fields.push(answers);
        }
      });
      console.log("");
    }

    // Create the new model
    fs.writeFile(newModelPath, newModel(name, fields), function (err) {
      if (err) throw err;
      console.log(clc.green("Created") + `: models/${name}.model.js`);
    });

    // Create the new controller
    if (options.crud) {
      if (!fs.existsSync(controllersDir)) {
        fs.mkdirSync(controllersDir);
      }
      fs.writeFile(newControllerPath, newCrudController(name), function (err) {
        if (err) throw err;
        console.log(
          clc.green("Created") + `: controllers/${name}.controller.js`
        );
      });
    }
  });

program.parse();
