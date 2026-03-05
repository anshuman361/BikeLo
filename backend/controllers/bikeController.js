import expressAsyncHandler from "express-async-handler";
import Bike from "../model/Bike.js";
import cloudinary from "../config/cloudinary.js";

//Add bike
export const addBike = async (req, res) => {
  try {
    const bike = await Bike.create(req.body);
    res.status(201).json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all bikes
export const getBikes = expressAsyncHandler(async (req, res) => {
  let filter = {};

  //Filter by category
  if (req.query.category) {
    filter.category = req.query.category;
  }
  if (req.query.city) {
    filter.city = req.query.city;
  }
  //Filter by price
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) {
      filter.price.$gte = Number(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      filter.price.$lte = Number(req.query.maxPrice);
    }
  }

  //Search by keyword using regex
  if (req.query.keyword) {
    filter.$or = [
      { name: { $regex: req.query.keyword, $options: "i" } },
      { description: { regex: req.query.keyword, $options: "i" } },
      { category: { regex: req.query.keyword, $options: "i" } },
    ];
  }

  const bikes = await Bike.find(filter);
  res.json(bikes);
});

//Get a bike
export const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    res.json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update bike
export const updateBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Bike
export const deleteBike = async (req, res) => {
  try {
    await Bike.findByIdAndDelete(req.params.id);
    res.json({ message: "Bike deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getBikesNearMe = expressAsyncHandler(async (req, res) => {
//   const { lat, lng, distance } = req.query;

//   if (!lat || !lng || !distance) {
//     res.status(400);
//     throw new Error("Please provide lat,lng and distance");
//   }

//   const radius = Number(distance) * 1000;

//   const bikes = await Bike.find({
//     location: {
//       $near: {
//         $geometry: {
//           type: "Point",
//           coordinates: [Number(lng), Number(lat)],
//         },
//         $maxDistance: radius,
//       },
//     },
//   });
//   res.json(bikes);
// });

export const createBike = async (req, res) => {
  console.log(req.file);
  try {
    const { name, brand, city, price } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const bike = await Bike.create({
      name,
      brand,
      city,
      price,
      image: result.secure_url,
      isAvailable: true,
      user: req.user._id,
    });

    res.status(201).json(bike);
    console.log(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getRevenue = async (req, res) => {
  const bookings = await Booking.find({ paymentStatus: "paid" });

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0,
  );

  res.json({
    totalRevenue,
    totalBookings: bookings.length,
  });
};
