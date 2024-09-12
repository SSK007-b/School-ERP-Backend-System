const httpStatus = require('http-status');
const { userServices, tokenServices, authService } = require('../services');

const register = async(req, res) => {

    const user = await userServices.createUser(req.body);
    const token = await tokenServices.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({user, token});

};

const login = async(req, res) => {

    const {email, password} = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = await tokenServices.generateAuthTokens(user);
    res.status(httpStatus.OK).send({user, token});

};

const logout = async(req, res) => {

    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
    register,
    login,
    logout,
}