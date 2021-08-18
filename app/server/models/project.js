const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        name: { type: String, required: true },
        abstract: { type: String, required: true },
        authors: { type: [String], required: true, unique: true },
        tags: { type: [String], required: false },
        createdBy: { type: mongoose.ObjectId, required: true }
    },
    { timestamps: true }
);

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;