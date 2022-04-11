const mongoose = require('mongoose')
mongoose
  .connect(process.env.DB_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongo is now running')
  })
  .catch((err) => {
    console.log(err)
  })
