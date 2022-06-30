const { Testimoni } = require('../models')

class TestimoniController {

  static async getTestimoni(req, res) {
    try {
      const testimoniData = await Testimoni.find()
      res.status(200).json(testimoniData)
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async getTestimoniById(req, res) {
    try {
      await Testimoni.findOne({_id : req.params.id})
      .then(testimoni => {
        if(!testimoni) {
          res.sendStatus(404)
        }
        res.status(200).json(testimoni)
      })
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async postTestimoni(req, res) { 
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const testimoniData = await req.body;
          const newTestimoni = new Testimoni(testimoniData)
          await newTestimoni.save()
          .then(result => {
            res.status(201).json({
              message : "testimoni added",
              result
            })
          })
          break;
        case 'psikolog':
          res.sendStatus(403);
        default:
          res.sendStatus(404)
      }    
    } catch (error) {
      res.status(500).json({msg : error.message})
    }
  }

  static async updateTestimoni(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const opt = {
            new : true
          }
          await Testimoni.findOneAndUpdate({_id : req.params.id}, req.body, opt)
          .then(testimoni => {
            if(!testimoni) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "testimoni updated"
            })
          })
          break;
        case 'psikolog':
          res.sendStatus(403);
        default:
          res.sendStatus(404)
      }   
    } catch (error) {
      res.status(500).json({msg : error.message})
    }
  }

  static async deleteTestimoni(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const testimoni = Testimoni.findOneAndDelete({_id : req.params.id})
          .then(result => {
            if (!testimoni) {
              res.status(404).json({
                message : "testimoni not found",
              })
            }
            res.status(201).json({
              message : "testimoni deleted",
            })
          })
          break;
        case 'psikolog':
          res.sendStatus(403);
        default:
          res.sendStatus(404)
      }    
    } catch (error) {
      console.log(error);
      res.status(500).json({msg : "internal server error"})
    }
  }
}

module.exports = TestimoniController