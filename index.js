console.log('toimii')

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

axios.get(request_url, { 'headers': {
  'Authorization': auth
}})
  .then(res => {
    console.log('yey')
    
    for (i = 1; i <= 100; i++) {
      counter++
    }



  })
  .catch(error => {
    console.log(error)
  })
