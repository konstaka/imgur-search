console.log('Imgur viral search engine v0.1')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

const axios = require('axios')
const auth = 'Client-ID cdb134ace1696e1'
const request_url = 'https://api.imgur.com/3/gallery/hot/viral/1/'

const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db_url = process.env.MONGODB_URI
mongoose.connect(db_url)



const Imagemeta = mongoose.model('Imagemeta', {
  id: String,
  title: String,
  description: String,
  datetime: Number,
  cover: String,
  cover_width: Number,
  cover_height: Number,
  account_url: String,
  account_id: Number,
  privacy: String,
  layout: String,
  views: Number,
  link: String,
  ups: Number,
  downs: Number,
  points: Number,
  score: Number,
  is_album: Boolean,
  vote: String,
  favorite: Boolean,
  nsfw: Boolean,
  section: String,
  comment_count: Number,
  favorite_count: Number,
  topic: String,
  topic_id: Number,
  images_count: Number,
  in_gallery: Boolean,
  is_ad: Boolean,
  tags: Array,
  ad_type: Number,
  ad_url: String,
  in_most_viral: Boolean,
  images: Array
})

Imagemeta.collection.drop()


axios.get(request_url, { 'headers': {
  'Authorization': auth
}})
  .then(res => {
    console.log('Connected to Imgur')
    for (i = 0; i < 100; i++) {
      const data = res.data.data[i]
      const newdatapoint = new Imagemeta({
        id: data.id,
        title: data.title,
        description: data.description,
        datetime: data.number,
        cover: data.cover,
        cover_width: data.cover_width,
        cover_height: data.cover_height,
        account_url: data.account_url,
        account_id: data.account_id,
        privacy: data.privacy,
        layout: data.layout,
        views: data.views,
        link: data.link,
        ups: data.ups,
        downs: data.downs,
        points: data.points,
        score: data.score,
        is_album: data.is_album,
        vote: data.vote,
        favorite: data.favorite,
        nsfw: data.nsfw,
        section: data.section,
        comment_count: data.comment_count,
        favorite_count: data.favorite_count,
        topic: data.topic,
        topic_id: data.topic_id,
        images_count: data.images_count,
        in_gallery: data.in_gallery,
        is_ad: data.is_ad,
        tags: data.tags,
        ad_type: data.ad_type,
        ad_url: data.ad_url,
        in_most_viral: data.in_most_viral,
        images: data.images
      })

      newdatapoint.save()
    }

    console.log('Image metadata retrieved')


  })
  .catch(error => {
    console.log(error)
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/search', (req, res) => {
  const searchTerm = req.body.search

  const query = Imagemeta.find({
    "title": { $regex: searchTerm, $options: 'i'}
  }, 'id', (err, entry) => {
    if (err) {
      console.log(err)
      console.log('error 9000')
    } else {
      console.log(entry)

      res.send(entry)
    }
  }
)})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Search API server running on port ${PORT}`)
})
