const { Deteksi } = require('../models')

class DeteksiController {

  static async getDeteksi(req, res) {
    try {
      const deteksiData = await Deteksi.find().populate({
        path : 'user',
        select : 'name _id'
      })
      .populate({
        path: 'questions'
      })
      res.status(200).json(deteksiData)
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async getDeteksiById(req, res) {
    try {
      await Deteksi.findOne({_id : req.params.id}).populate({
        path : 'user',
        select : 'name _id'
      })
      .populate({
        path: 'questions'
      })
      .then(deteksi => {
        if(!deteksi) {
          res.sendStatus(404)
        }
        res.status(200).json(deteksi)
      })
    } catch (error) {
      res.status(500).json({msg : "internal server error"})
    }
  }

  static async postDeteksi(req, res) { 
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const {user, score1, score2, score3, score4, score5, score6, score7, score8, score9, score10, score11, score12, score13, score14, score15, score16, score17, score18, score19, score20, totalScore} = await req.body;
          const deteksiData = {
            user : user,
            questions: [
              {
                question: 'Apakah kamu sering merasa sakit kepala?',
                score : score1
              },
              {
                question: 'Apakah kamu menderita ketegangan dan kekakuan di leher, bahu, rahang, lengan, tangan, kaki atau perut?',
                score : score2
              },
              {
                question: 'Apakah kamu suka menggigiti kukumu?',
                score : score3
              },
              {
                question: 'Apakah kamu sering merasa jantungmu berdetak kencang atau lebih cepat dari biasanya?',
                score : score4
              },
              {
                question: 'Apakah kamu cenderung banyak berkeringat?',
                score : score5
              },
              {
                question: 'Apakah kamu sering merasa sulit bernafas?',
                score : score6
              },
              {
                question: 'Apakah kamu sering merasa pusing?',
                score : score7
              },
              {
                question: 'Apakah kamu merasa lelah di pagi hari?',
                score : score8
              },
              {
                question: 'Apakah kamu mudah tersinggung atau marah?',
                score : score9
              },
              {
                question: 'Apakah kamu pikir kamu mungkin menderita kecemasan, kekhawatiran, agitasi, gugup?',
                score : score10
              },
            ],
            totalScore: totalScore
          }
          const newDeteksi = new Deteksi(deteksiData)
          await newDeteksi.save()
          .then(result => {
            res.status(201).json({
              message : "deteksi added",
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
      console.log(error);
    }
  }

  static async updateDeteksi(req, res) {
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
          await Deteksi.findOneAndUpdate({_id : req.params.id}, req.body, opt)
          .then(deteksi => {
            if(!deteksi) {
              res.sendStatus(404)
            }
            res.status(201).json({
              message : "deteksi updated"
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

  static async deleteDeteksi(req, res) {
    try {
      const { role } = req.user
      switch(role) {
        case 'user':
          res.sendStatus(403);
          break;
        case 'admin':
          const deteksi = Deteksi.findOneAndDelete({_id : req.params.id})
          .then(result => {
            if (!deteksi) {
              res.status(404).json({
                message : "deteksi not found",
              })
            }
            res.status(201).json({
              message : "deteksi deleted",
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

module.exports = DeteksiController