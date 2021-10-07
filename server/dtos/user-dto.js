module.exports = class UserDto {
    email;
    id;
    isActivated;
    name;
    pfp;

    constructor(model){
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.pfp = model.pfp;
    }
}