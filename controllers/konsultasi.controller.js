const { Konsultasi } = require('../models')

class KonsultasiController {

  static async getKonsultasi(req, res) {
    try {
      const KonsultasiData = await Konsultasi.find()
      .populate(
        {
        path: 'name',
        select : 'jadwalKonsultasi hasilDeteksi name email no_hp gender member _id'
        })
      .populate({
        path: 'psikolog',
        select : '_id name email no_hp gender jadwalKonsultasi'
      })
      res.status(200).json(KonsultasiData)
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
      console.log(error);
    }
  }

  static async getKonsultasiById(req, res) {
    try {
      await Konsultasi.findOne({_id : req.params.id}).populate('name psikolog')
      .then(konsultasi => {
        if(!konsultasi) {
          res.sendStatus(404)
        }
        res.status(200).json(konsultasi)
      })
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async postKonsultasi(req, res) { 
    try {
      const { role } = req.user
      switch(role) {
        case 'user': // ??
          const KonsultasiData = await req.body;
          const newKonsultasi = new Konsultasi(KonsultasiData)
          await newKonsultasi.save()
          .then(result => {
            res.status(201).json({
              message : "Jadwal Konsultasi added",
              result
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
          res.sendStatus(404)
      }    
    } catch (error) {
      res.status(500).json({msg : error.message})
    }
  }

  static async updateKonsultasi(req, res) {
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
          await Konsultasi.findOneAndUpdate({_id : req.params.id}, req.body, opt)
          .then(konsultasi => {
            if(!konsultasi) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "Jadwal Konsultasi updated"
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

  static async deleteKonsultasi(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const konsultasi = Konsultasi.findOneAndDelete({_id : req.params.id})
          .then(result => {
            if (!konsultasi) {
              res.status(404).json({
                message : "Jadwal Konsultasi not found",
              })
            }
            res.status(201).json({
              message : "Jadwal Konsultasi deleted",
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

module.exports = KonsultasiController