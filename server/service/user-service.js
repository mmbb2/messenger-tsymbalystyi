const UserModel = require('../models/user-model.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dtos/user-dto.js');

class UserService{
    async registration(email, password, name){
         const candidate = await UserModel.findOne({email});
         if(candidate){
             throw new Error(`Пользователь с таким почтовым адресом уже существует`);
         }
         const hashPassword = await bcrypt.hash(password, 3);
         const activationLink = uuid.v4();
         const user = await UserModel.create({email, password: hashPassword, name, activationLink});
         await mailService.sendActivationMail(email, activationLink);

         const userDto = new UserDto(user)
         const tokens = tokenService.generateTokens({...userDto});
         await tokenService.saveToken(userDto.id, tokens.refreshToken);

         return{
             ...tokens,
             user: userDto
         }
    }
}

module.exports = new UserService();