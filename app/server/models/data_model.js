class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        if (this.data.find(object => object.id == id)) {
            return this.data.find(object => object.id == id);
        }
        return null;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) { 
        for (let key in obj) {
            let object = this.data.find(object => object.id == id);
            if (object.length == 0) {
                return false;
            } else {
            object[key] = obj[key];
            }
        }
        return true;
    }

    delete(id) {
        if (this.data.find(object => object.id == id)) {
            this.data = this.data.filter(object => object.id != id);
            return true;
        }
        return false;
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;