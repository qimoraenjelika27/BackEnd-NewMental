const { Paket } = require('../models')

class PaketController {

  static async getPaket(req, res) {
    try {
      const PaketData = await Paket.find()
      res.status(200).json(PaketData)
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async getPaketById(req, res) {
    try {
      await Paket.findOne({_id : req.params.id})
      .then(paket => {
        if(!paket) {
          res.sendStatus(404)
        }
        res.status(200).json(paket)
      })
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async postPaket(req, res) { 
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const PaketData = await req.body;
          const newPaket = new Paket(PaketData)
          await newPaket.save()
          .then(result => {
            res.status(201).json({
              message : "Paket Konsultasi added",
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

  static async updatePaket(req, res) {
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
          await Paket.findOneAndUpdate({_id : req.params.id}, req.body, opt)
          .then(paket => {
            if(!paket) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "Paket Konsultasi updated"
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

  static async deletePaket(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const paket = Paket.findOneAndDelete({_id : req.params.id})
          .then(result => {
            if (!paket) {
              res.status(404).json({
                message : "Paket Konsultasi not found",
              })
            }
            res.status(201).json({
              message : "Paket Konsultasi deleted",
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

module.exports = PaketController