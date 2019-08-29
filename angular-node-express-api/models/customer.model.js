class CustomerModel{
    constructor(uid,firstName,lastName,email,password){
        this.uid=uid;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
    }
}

module.exports=CustomerModel;