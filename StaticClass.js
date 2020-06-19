
module.exports = class StaticClass{
   static #_user;


   static get user() {
        return this.#_user;
    }

   static set user(value) {
        this.#_user = value;
    }
}