const express = require("express");
const Property = require("../models/propertyModel");
const Users = require('../models/userModel')

const router = express.Router();

router.get('/:id', async (req, res) => {
    const user_id = req.params.id;
    try {
    const user = await Users.findById(user_id).populate('favorites');
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const favoriteProducts = user.favorites;
    res.json(favoriteProducts);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/add/:id', async (req, res) => {
    const productId = req.params.id; // Access the parameter "id"
    const { user_id } = req.body;
    console.log(user_id)
    try {
      const user = await Users.findById(user_id);
      
      console.log(user)
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.favorites.includes(productId)) {
        return res.status(400).json({ message: 'Product already in favorites' });
      }
  
      user.favorites.push(productId);
      await user.save();
  
      res.json({ message: 'Product added to favorites' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.post('/remove/:id', async (req, res) => {
    const productId = req.params.id;
    const { user_id } = req.body;
  
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            user_id,
            { $pull: { favorites: productId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Product removed from favorites' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
