const express = require('express')
const cors = require('cors')
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.route('/api/fileanalyse')
  .post(upload.single('upfile'), (req, res) => {
    if (req.file) {
      res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
      })
    } else {
      res.json({ error: 'No file selected' })
    }
  })

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
