const { Kategori } = require('../models')

class KategoriController {

  static async getKategori(req, res) {
    try {
      const kategoriData = await Kategori.find()
      res.status(200).json(kategoriData)
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async getKategoriById(req, res) {
    try {
      await Kategori.findOne({_id : req.params.id})
      .then(kategori => {
        if(!kategori) {
          res.sendStatus(404)
        }
        res.status(200).json(kategori)
      })
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async postKategori(req, res) { 
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const kategoriData = await req.body;
          const newKategori = new Kategori(kategoriData)
          await newKategori.save()
          .then(result => {
            res.status(201).json({
              message : "kategori added",
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

  static async updateKategori(req, res) {
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
          await Kategori.findOneAndUpdate({_id : req.params.id}, req.body, opt)
          .then(kategori => {
            if(!kategori) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "kategori updated"
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

  static async deleteKategori(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const kategori = Kategori.findOneAndDelete({_id : req.params.id})
          .then(result => {
            if (!kategori) {
              res.status(404).json({
                message : "kategori not found",
              })
            }
            res.status(201).json({
              message : "kategori deleted",
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

module.exports = KategoriController