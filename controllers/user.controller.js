const { User } = require('../models')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

class UserController {
  static async registerUser(req, res) {
    try {
      const {name, email, email_Ortu, password, gender, no_hp, birthdate, role, member, jadwalKonsultasi} = await req.body;
      const hashpw = bcrypt.hashSync(password, salt)
      const newUser = new User({
        name: name,
        email: email,
        email_Ortu: email_Ortu,
        password : hashpw,
        gender: gender,
        birthdate: birthdate,
        no_hp: no_hp,
        role : role,
        member : member,
        jadwalKonsultasi : jadwalKonsultasi
      })
      await newUser.save()
      .then(result => {
        res.status(201).json({
          message : "Register success",
          result
        })
    })    
    } catch (error) {
      console.log(error);
      res.status(500).json({msg : error.message})
    }
  }

  static async updateUser(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          const opt = {
            new : true
          }
          const {name, email, email_Ortu, gender, no_hp, birthdate, profpic, role, member} = await req.body;
          const newUser = {
            name: name,
            email: email,
            email_Ortu: email_Ortu,
            gender: gender,
            no_hp: no_hp,
            birthdate: birthdate,
            profpic: profpic,
            role : role,
            member : member
          }
          await User.findOneAndUpdate({_id : req.params.id}, newUser, opt)
          .then(user => {
            if (!user) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "user updated"
            })
          })
          break;
        case 'admin':
          res.sendStatus(403);
          break;
        case 'psikolog':
          res.sendStatus(403);
          break;
        default:
          res.sendStatus(404);
      }
    } catch (error) {
      res.status(500).json({msg : error.message})
    }
  }

  static async updatePassword (req, res) {
    try {
      const {role} = req.user
      switch(role) {
        case 'user':
          const opt = {
            new : true
          }
          const { password } = await req.body;
          const hashpw = bcrypt.hashSync(password, salt)
          const newUser = {
            password : hashpw,
          }
          await User.findOneAndUpdate({_id : req.params.id}, newUser, opt)
          .then(user => {
            if (!user) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "user updated"
          })
        })
          break;
        case 'admin':
          res.sendStatus(403);
          break;
        default:
          res.sendStatus(404)
      }      
    } catch (error) {
      res.status(500).json({msg : error.message})
    }
  }

  static async getUsers(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          const userData = await User.find({
            role : 'psikolog'
          })
          let data = []
          for(let i = 0; i < userData.length; i++) {
            let forData = {
              name : userData[i].name,
              _id : userData[i]._id
            }
            data.push(forData)
          }
          res.status(200).json(data)
          break;
        case 'admin':
          res.sendStatus(403);
          break;
        case 'psikolog':
          res.sendStatus(403);
          break;
        default:
          res.sendStatus(404)
      }
    } catch (error) {
      res.status(500).json({msg : "internal server error"})  
      console.log(error);
    }
  }

  static async getUserById(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          await User.findOne(
            {_id : req.params.id}
          )
          .then(user => {
            if(!user) {
              res.sendStatus(404)
            }
            const data = user.name
            res.status(200).json(data)
          })
          break;
        case 'admin':
          res.sendStatus(403);
          break;
        case 'psikolog':
          res.sendStatus(403);
          break;
        default:
          res.sendStatus(404)
      }
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }
}

module.exports = UserController