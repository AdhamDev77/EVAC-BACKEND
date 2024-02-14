const Property = require('../models/propertyModel')
const mongoose = require('mongoose')


const getProperties = async (req, res) => {
    const properties = await Property.find({}).sort({createdAt: -1})
    res.status(200).json(properties)
}
const getProperty = async (req, res) => {
    const {id} = req.params
    const property = await Property.findOne({_id: id})
    res.status(200).json(property)
}
    

const deleteProperty = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "لا يوجد عقار"})
    }

    const property = await Property.findOneAndDelete({_id: id})

    if(!property){
        return res.status(404).json({error: "العقر غير موجود"})
    }

    res.status(200).json(property)
}

const updateProperty = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "لا يوجد عقار"})
    }

    const property = await Property.findOneAndUpdate({_id: id}, {...req.body})

    if(!property){
        return res.status(404).json({error: "العقار غير موجود"})
    }

    res.status(200).json(property)
}

module.exports = {getProperties,getProperty,deleteProperty,updateProperty}