const express = require('express')
var cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()
var bodyParser = require('body-parser')

const usersRoutes = require('./routes/users')
const propertyRoutes = require('./routes/properties')
const favouritesRoutes = require('./routes/favourites')

// express app
const app = express()
app.use(cors({
    origin: ["http://localhost:4000","http://localhost:3000","https://evac-property.netlify.app"]
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())

app.get('/', (req, res) => {
    res.json({msg: "Welcome Bro"})
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/uploads', express.static('uploads'));
app.use('/api/users', usersRoutes)
app.use('/api/property', propertyRoutes)
app.use('/api/favourite', favouritesRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
    console.log('listening ya3am !!')
    })
})
.catch((error) => {
    console.log(error)
})
