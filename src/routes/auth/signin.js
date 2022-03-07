
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {userCollection} = require('../../models/index');

const routerSignin = express.Router();

routerSignin.post('/signin',signinFunc);

async function signinFunc(req,res){
    if(req.headers['authorization']){
        let bsicHeaderParts = req.headers.authorization.split(' ');
        // console.log('basicHeadersParts >>> ',bsicHeaderParts);
        let encodedData = bsicHeaderParts.pop();
        // console.log('encodedPart ', encodedData);
        let decodedData = base64.decode(encodedData);
        // console.log('decodeddata ', decodedData);
        let [username,password]=decodedData.split(':');
        // console.log('username',username);
        try{
            const getUser = await userCollection.createUserSignin(username);
            // console.log('username9999',getUser.password);
            const validUser = await bcrypt.compare(password,getUser.password);
            if(validUser){
                res.status(200).json({username:username});
            }else{
                res.status(401).send('invalid user');
            }
        }catch(error){
            res.status(401).send(error);
            console.log(error);
        }
    }
}

module.exports = routerSignin;