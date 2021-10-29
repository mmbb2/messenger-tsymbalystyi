const UserModel = require('../models/user-model.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dtos/user-dto.js');
const { off } = require('../models/user-model.js');

class UserService{
    async registration(email, password, name){
         const candidate = await UserModel.findOne({email});
         if(candidate){
             throw new Error(`Пользователь с таким почтовым адресом уже существует`);
         }
         const hashPassword = await bcrypt.hash(password, 3);
         const activationLink = uuid.v4();
         const user = await UserModel.create({email, password: hashPassword, name, activationLink});
         await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

         const userDto = new UserDto(user)
         const tokens = tokenService.generateTokens({...userDto});
         await tokenService.saveToken(userDto.id, tokens.refreshToken);

         return{
             ...tokens,
             user: userDto
         }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw new Error('Invalid link');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password){
        const user = await UserModel.findOne({email})
        if(!user){
            throw new Error('Invalid email');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals){
            throw new Error('Invalid password');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

         return{
             ...tokens,
             user: userDto
         }
    }

    async logout(refreshToken){
        const token  = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw new Error('Invalid token');
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb){
            throw new Error('Invalid token');
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

         return{
             ...tokens,
             user: userDto
         }
    }

    async findByName(name){
        const findedUsers = await UserModel.find({name});
        return findedUsers;
    }
}

module.exports = new UserService();