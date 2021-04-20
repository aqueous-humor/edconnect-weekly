const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName() {
        return this.firstname +' '+ this.lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
        if (this.data.find(object =>  object.email == email)) {
            let index = this.data.indexOf(this.data.find(object => object.email == email));
            let object = this.data[index];
            if (object.password == password) {
                return true;
            }
        }
        return false;
    }

    getByEmail(email) {
        if (this.data.find(object =>  object.email == email).length === 0) {
            return null;
        } else {
        return this.data.find(object =>  object.email == email);
        }
    }

    getByMatricNumber(matricNumber) {
        if (this.data.find(object =>  object.matricNumber == matricNumber).length === 0) {
            return null;
        }
        return this.data.find(object =>  object.matricNumber == matricNumber);
    }

    validate(obj) {
        if (this.data.find(object =>  object.email == obj.email) || this.data.find(object =>  object.matricNumber == obj.matricNumber)) {
            return false;
        }
        if (Object.values(obj).some(x => (x == null || x == '')) || obj.password.length < 7) {
            return false;
        }
        return true
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};