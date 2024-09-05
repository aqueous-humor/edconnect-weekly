class DataModel {
    constructor() {
        this.data = [];
        this.errors = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        if (this.data.find(user => user.id == id)) {
            return this.data.find(user => user.id == id);
        }
        return null;
    }

    save(user) {
        if (this.validate(user)) {
            this.data.push(user);
            return true;
        }
        return false;
    }

    update(user, id) { 
        for (let key in user) {
            let matchingUser = this.data.find(user => user.id == id);
            if (!matchingUser) {
                return false;
            }
            matchingUser[key] = user[key];
        }
        return true;
    }

    delete(id) {
        if (this.data.find(user => user.id == id)) {
            this.data = this.data.filter(user => user.id != id);
            return true;
        }
        return false;
    }

    // this method will be overriden in the sub classes
    validate(user) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;