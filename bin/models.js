const { capitalize } = require("../lib/utils");

const questions = [
  {
    type: "input",
    name: "fieldname",
    message: "Enter the name of the new field (or empty to stop): ",
  },
  {
    type: "list",
    name: "fieldtype",
    when: (answers) => answers.fieldname != "",
    message: "Choose the type of the field : ",
    choices: ["INTEGER", "FLOAT", "DATE", "BOOLEAN", "STRING", "TEXT"],
  },
  {
    type: "list",
    name: "nullable",
    when: (answers) => answers.fieldname != "",
    message: "Can this field be null in database ?",
    choices: ["yes", "no"],
  },
];

function newModel(name, fields) {
  let fieldsContent = "";

  fields.forEach((field) => {
    const nullable = field.nullable === "yes" ? true : false;
    fieldsContent += `
    ${field.fieldname}: {
        type: DataTypes.${field.fieldtype},
        allowNull: ${nullable},
    },
  `;
  });

  return `const { sequelize, DataTypes } = require("coelhojs-core");

const ${capitalize(name)} = sequelize.define(
  "${capitalize(name)}",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
${fieldsContent}
  },
  {
    indexes: [
      {
        fields: [/* You can add here the fields related to a field in an other model (associations) */],
      },
    ],
  }
);

module.exports = ${capitalize(name)};`;
}

module.exports = { questions, newModel };
