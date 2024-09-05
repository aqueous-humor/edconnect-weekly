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
        let user = this.data.find(user =>  user.email == email);
        if (user) {
            if (user.password == password) {
                return true;
            }
        }
        return false;
    }

    getByEmail(email) {
        let user = this.data.find(user =>  user.email == email);
        if (!user) {
            return null;
        } else {
        return user;
        }
    }

    getByMatricNumber(matricNumber) {
        let user = this.data.find(user =>  user.matricNumber == matricNumber);
        if (!user) {
            return null;
        }
        return user;
    }

    validate(obj) {
        this.errors = [];
        for (let key in obj) {
            if (obj[key] == '' || obj[key] == null) {
                this.errors.push(`${key} should not be empty`);
            }
        }
        if (this.data.find(user =>  user.email == obj.email)) {
            this.errors.push('A user with specified email address already exists');
        } 
        if (this.data.find(user =>  user.matricNumber == obj.matricNumber)){
            this.errors.push('A user with specified matric number already exists');
        }
        if (obj.password.length < 7) {
            this.errors.push('Password should have at least 7 characters');
        }


        if (this.errors.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};