const { Psikolog } = require('../models')

class PsikologController {

  static async getPsikolog(req, res) {
    try {
      const psikologData = await Psikolog.find().populate("testimoni")
      res.status(200).json(psikologData)
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
      console.log(error);
    }
  }

  static async getPsikologById(req, res) {
    try {
      await Psikolog.findOne({_id : req.params.id}).populate("testimoni")
      .then(psikolog => {
        if(!psikolog) {
          res.sendStatus(404)
        }
        res.status(200).json(psikolog)
      })
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async postPsikolog(req, res) { 
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const psikologData = await req.body;
          const newPsikolog = new Psikolog(psikologData)
          await newPsikolog.save()
          .then(result => {
            res.status(201).json({
              message : "psikolog added",
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

  static async updatePsikolog(req, res) {
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
          await Psikolog.findOneAndUpdate({_id : req.params.id}, req.body, opt)
          .then(psikolog => {
            if(!psikolog) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "psikolog updated"
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

  static async deletePsikolog(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const psikolog = Psikolog.findOneAndDelete({_id : req.params.id})
          .then(result => {
            if (!psikolog) {
              res.status(404).json({
                message : "psikolog not found",
              })
            }
            res.status(201).json({
              message : "psikolog deleted",
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
      console.log(error);
      res.status(500).json({msg : "internal server error"})
    }
  }
}

module.exports = PsikologController