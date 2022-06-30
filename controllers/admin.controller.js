const { User } = require('../models')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

class AdminController {

  static async getUsers(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const userData = await User.find()
          res.status(200).json(userData)
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

  static async getUserById(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          await User.findOne({_id : req.params.id})
          .then(user => {
            if(!user) {
              res.sendStatus(404)
            }
            res.status(200).json(user)
          })
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

  static async addUser(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const {name, email, password, gender, no_hp, role, member} = await req.body;
          const hashpw = bcrypt.hashSync(password, salt)
          const newUser = new User({
            name: name,
            email: email,
            password : hashpw,
            gender: gender,
            no_hp: no_hp,
            role : role,
            member : member
          })
          await newUser.save()
          .then(result => {
            res.status(201).json({
              message : "user added",
              result
            })
          })
          break;
        case 'psikolog':
          res.sendStatus(403);
          break;
        default:
          res.sendStatus(404)
      }
    } catch (error) {
      res.status(500).json({msg : error.message})
    }
  }

  static async updateUser(req, res) {
    try {
      const {role} = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const opt = {
            new : true
          }
          const {name, email, gender, no_hp, role, member} = await req.body;
          const newUser = {
            name: name,
            email: email,
            gender: gender,
            no_hp: no_hp,
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
        case 'psikolog':
          res.sendStatus(403);
          break;
        default:
          res.sendStatus(404)
      }      
    } catch (error) {
      res.status(500).json({msg : error.message})
    }
  }

  static async updatePassword(req, res) {
    try {
      const {role} = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
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
        case 'psikolog':
          res.sendStatus(403);
          break;
        default:
          res.sendStatus(404)
      }      
    } catch (error) {
      res.status(500).json({msg : error.message})
    }
  }

  static async deleteUser(req, res) {
    try {
      const {role} = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const user = User.findOneAndDelete({_id : req.params.id})
          .then(result => {
            if (!user) {
              res.status(404).json({
                message : "user not found",
              })
            }
            res.status(201).json({
              message : "user deleted",
            })
          })
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

module.exports = AdminController