const express = require("express");
const multer = require("multer");
const path = require("path");
const Property = require("../models/propertyModel");
const {
  getProperties,
  deleteProperty,
  updateProperty,
  getProperty,
} = require("../Controllers/propertyController");

const router = express.Router();

// Define custom storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/property_img') // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Use Date.now() to ensure unique filenames
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// Initialize Multer with custom storage
const upload = multer({ storage: storage })

router.get("/", getProperties);
router.get("/:id", getProperty);

router.post("/create", upload.array("images", 10000), async (req, res) => {
  try {
    const {
      title,
      description,
      square,
      price,
      rooms,
      bedrooms,
      bathrooms,
      isFurnitured,
      location,
      type,
      uploader_name,
      uploader_number,
    } = req.body;

    // Extract uploaded files from req.files
    const images = req.files;
    // Check if any images were uploaded
    if (!images || images.length === 0) {
      return res.status(400).send("No Images Uploaded");
    }

    // Map uploaded file paths
    const imagesArray = images.map((file) => file.path);
    const main_image = images[0].path; // Assuming the first image is the main image

    // Validate other required fields
    if (!title || !description || !square || !price || !location || !type || !bedrooms || !bathrooms || !rooms || !isFurnitured || !uploader_name || !uploader_number) {
      return res.status(400).json({ error: "يجب ملأ جميع الخانات من فضلك" });
    }

    // Create a new Property instance
    const newProperty = new Property({
      imagesArray,
      main_image,
      title,
      description,
      square,
      price,
      bedrooms,
      bathrooms,
      rooms,
      isFurnitured,
      location,
      type,
      uploader_name,
      uploader_number,
    });

    // Save the new property to the database
    await newProperty.save();

    res.status(201).json({ property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ أثناء إنشاء العقار" });
  }
});

router.post('/search', async (req, res) => {
  const { locationArr, minPrice, maxPrice, rooms, type } = req.body;
  console.log("LocationArr:", locationArr);
console.log("Min Price:", minPrice);
console.log("Max Price:", maxPrice);
console.log("Rooms:", rooms);
console.log("Type:", type);
  const query = {};
    if (Array.isArray(locationArr)) {
    location = locationArr.flat();
  }else{
    location = [locationArr]
  }

    if (locationArr == undefined) {
    location = []
  }
  

// Filter by multiple text-based locations
if (location && location.length > 0 && location !== undefined) {
  query.location = {
    $in: location.map(loc => new RegExp(loc.trim(), 'i')),
  };
}

  // Filter by price range
  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice) {
    query.price = { $gte: minPrice };
  } else if (maxPrice) {
    query.price = { $lte: maxPrice };
  }

  // Filter by rooms
  if (rooms) {
    query.type = { $regex: new RegExp(type, 'i') };
  }

  // Filter by type
  if (type) {
    query.type = { $regex: new RegExp(type, 'i') };
  }
  console.log(query)
  // Fetch and count matching properties
  const [properties, count] = await Promise.all([
    Property.find(query),
    Property.countDocuments(query),
  ]);

  // Send response with properties and count
  res.json({ properties, count });
});


router.delete("/:id", deleteProperty);

router.patch("/:id", updateProperty);

module.exports = router;
