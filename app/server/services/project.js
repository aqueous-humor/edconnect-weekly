const Project = require('../models/project');
const helper = require('../models/mongo_helper');

/* Create new project */
const create = async ({
  name,
  abstract,
  authors,
  tags,
  createdBy
}) => {
  try {
    const project = new Project({
      name,
      abstract,
      authors,
      tags,
      createdBy
    });
    const validProject = await project.save();
    if (validProject) {
      return [true, project];
    }
  } catch (error) {
    return [false, helper.translateError(error)]
  }
};

/* Return project with specified id */
const getById = async (id) => {
  try {
    const project = await Project.findById(id);
    return project;
  } catch (error) {
    return helper.translateError(error);
  }
};
/* Return all projects */
const getAll = async () => {
  try {
    const projects = await Project.find({});
    return projects;
  } catch (error) {
    return helper.translateError(error);
  }
};

module.exports = {
  getAll,
  create,
  getById
};