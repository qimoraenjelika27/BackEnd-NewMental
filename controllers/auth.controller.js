const accessTokenSecret = 'youraccesstokensecret';
const { User } = require('../models')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

class AuthController {
  static async authenticationJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }
  
  static async loginUser(req, res) {
    try {
      // search user
      User.findOne({ email: req.body.email }).then(
        (user) => {      
          if (!user) {
            return res.status(401).json({
              error: 'User not found!'
            });
          }
          bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
              if(!valid) {
                return res.status(401).json({
                  error: 'Incorrect password!'
                });
              }
              const token = jwt.sign({email: user.email, role: user.role}, accessTokenSecret)
              const id = user.id
              const role = user.role
              const name = user.name
              const email = user.email
              const email_Ortu = user.email_Ortu
              const gender = user.gender
              const no_hp = user.no_hp
              const birthdate = user.birthdate
              const profpic = user.profpic
              const member = user.member
              const jadwalKonsultasi = user.jadwalKonsultasi
              res.status(200).json({
                token: token,
                role: role,
                id: id,
                name: name,
                email: email,
                email_Ortu: email_Ortu,
                gender: gender,
                no_hp: no_hp,
                birthdate: birthdate,
                profpic: profpic,
                member: member,
                jadwalKonsultasi: jadwalKonsultasi
              });
            }
          )   
        })            
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }
}

module.exports = AuthController