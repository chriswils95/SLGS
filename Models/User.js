module.exports = class User{
    get authToken() {
        return this._authToken;
    }

    set authToken(value) {
        this._authToken = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
    #authToken;
    #username;
    #password;


    constructor() {

    }
}
