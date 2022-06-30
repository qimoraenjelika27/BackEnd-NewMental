const { TestiPsikolog } = require('../models')

class TestiPsikologController {

  static async getTestiPsikolog(req, res) {
    try {
      const TestiPsikologData = await TestiPsikolog.find().populate("psikolog")
      res.status(200).json(TestiPsikologData)
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async getTestiPsikologById(req, res) {
    try {
      await TestiPsikolog.findOne({_id : req.params.id}).populate("psikolog")
      .then(testiPsikolog => {
        if(!testiPsikolog) {
          res.sendStatus(404)
        }
        res.status(200).json(testiPsikolog)
      })
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async postTestiPsikolog(req, res) { 
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const TestiPsikologData = await req.body;
          const newTestiPsikolog = new TestiPsikolog(TestiPsikologData)
          await newTestiPsikolog.save()
          .then(result => {
            res.status(201).json({
              message : "Testi Psikolog added",
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

  static async updateTestiPsikolog(req, res) {
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
          await TestiPsikolog.findOneAndUpdate({_id : req.params.id}, req.body, opt)
          .then(testiPsikolog => {
            if(!testiPsikolog) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "Testi Psikolog updated"
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

  static async deleteTestiPsikolog(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const testiPsikolog = TestiPsikolog.findOneAndDelete({_id : req.params.id})
          .then(result => {
            if (!testiPsikolog) {
              res.status(404).json({
                message : "Testi Psikolog not found",
              })
            }
            res.status(201).json({
              message : "Testi Psikolog deleted",
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

module.exports = TestiPsikologController