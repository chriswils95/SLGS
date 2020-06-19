module.exports = class Address{
    /*constructor(street_address, town, city, region, country) {
        this._street_address = street_address;
        this._town = town;
        this._city = city;
        this._region = region;
        this._country = country;
    }*/

    constructor() {

    }
    #_street_address;
    #_town;
    #_city;
    #_region;
    #_country;




    get street_address() {
        return this.#_street_address;
    }

    set street_address(value) {
        this.#_street_address = value;
    }

    get town() {
        return this.#_town;
    }

    set town(value) {
        this.#_town = value;
    }

    get city() {
        return this.#_city;
    }

    set city(value) {
        this.#_city = value;
    }

    get region() {
        return this.#_region;
    }

    set region(value) {
        this.#_region = value;
    }

    get country() {
        return this.#_country;
    }

    set country(value) {
        this.#_country = value;
    }
}
