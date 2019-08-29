let Validator = require("fastest-validator");
const customerModel = require('../models/customer.model');

let customers = {};
let counter = 0;

let customerValidator = new Validator();

let namePattern = /([A-Za-z\-\’])*/;
let zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

/* customer validator shema */
const customerVSchema = {
    guid: { type: "string", min: 3 },

    firstName: { type: "string", min: 1, max: 50, pattern: namePattern },
    lastName: { type: "string", min: 1, max: 50, pattern: namePattern },
    email: { type: "email", max: 75 },
    password: { type: "string", min: 2, max: 50, pattern: passwordPattern }
};

class CustomerService {
    static create(data) {

        let vres = customerValidator.validate(data, customerVSchema);
        if (!vres) {
            let errors = {}, item;
            for (const index in vers) {
                item = vers[index];
                errors[item.field] = item.message;
            }
            throw {
                name: 'ValidationError',
                message: errors
            }
        }
        let uid = 'c' + counter++;
        let customer = new customerModel(uid, data.firstName, data.lastName, data.email, data.password);
        customer.uid=uid;
        customers[customer.uid] = customer;
        return customer;
    }
    static update(uid, data) {
        if (customers[uid] != null) {
            const customer = customers[uid];
            Object.assign(customer, data);
            return customer;
        }
        else {
            throw new Error('Unable to retrieve a customer by (uid:' + cuid + ')');

        }
    }
    static delete(uid) {
        if (customers[uid] != null) {
            delete customers[uid];
        }
        else {
            throw new Error('Unable to retrieve a customer by (uid:' + cuid + ')');

        }
    }
    static retrieve(uid) {
        if (customers[uid] != null) {
            return customers[uid];
        }
        else {
            throw new Error('Unable to retrieve a customer by (uid:' + uid + ')');
        }
    }

}

module.exports = CustomerService;