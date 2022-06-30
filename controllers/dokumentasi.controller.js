const { Dokumentasi } = require('../models')

class DokumentasiController {

  static async getDokumentasi(req, res) {
    try {
      const dokumentasiData = await Dokumentasi.find().populate("komunitas")
      res.status(200).json(dokumentasiData)
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async getDokumentasiById(req, res) {
    try {
      await Dokumentasi.findOne({_id : req.params.id}).populate("komunitas")
      .then(dokumentasi => {
        if(!dokumentasi) {
          res.sendStatus(404)
        }
        res.status(200).json(dokumentasi)
      })
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async postDokumentasi(req, res) { 
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const dokumentasiData = await req.body;
          const newDokumentasi = new Dokumentasi(dokumentasiData)
          await newDokumentasi.save()
          .then(result => {
            res.status(201).json({
              message : "dokumentasi added",
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

  static async updateDokumentasi(req, res) {
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
          await Dokumentasi.findOneAndUpdate({_id : req.params.id}, req.body, opt)
          .then(dokumentasi => {
            if(!dokumentasi) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "dokumentasi updated"
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

  static async deleteDokumentasi(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const dokumentasi = Dokumentasi.findOneAndDelete({_id : req.params.id})
          .then(result => {
            if (!dokumentasi) {
              res.status(404).json({
                message : "dokumentasi not found",
              })
            }
            res.status(201).json({
              message : "dokumentasi deleted",
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

module.exports = DokumentasiController