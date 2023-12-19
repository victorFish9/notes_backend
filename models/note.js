const mongoose = require('mongoose')

//const password = process.argv[2]
mongoose.set('strictQuery', false)

//`mongodb+srv://victorcherkasov222:${password}@cluster0.kkdi9xk.mongodb.net/noteApp?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url).then(result => {
  console.log('connected to Mongodb')
})
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
