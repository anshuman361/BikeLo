import Bike from "../model/Bike.js";
import Booking from "../model/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { bikeId, startTime, endTime } = req.body;

    const bike = await Bike.findById(bikeId);
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return res.status(400).json({ message: "Invalid time range" });
    }

    // Overlap check
    const existingBooking = await Booking.findOne({
      bike: bikeId,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Bike already booked for selected time",
      });
    }

    const hours = (end - start) / (1000 * 60 * 60);
    const totalPrice = hours * bike.price;

    if (hours <= 0 || isNaN(hours)) {
      return res.status(400).json({ message: "Invalid booking duration" });
    }

    const booking = await Booking.create({
      user: req.user._id, // since req.user = decoded.id
      bike: bikeId,
      startTime: start,
      endTime: end,
      totalPrice,
    });

    const populatedBooking = await Booking.findById(booking._id).populate(
      "bike",
    );
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "bike",
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingByBike = async (req, res) => {
  try {
    const bookings = await Booking.find({ bike: req.params.id }).populate(
      "user",
      "name email",
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("bike", "name price")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRevenue = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const totalRevenue = booking.reduce(
      (acc, (booking) => acc + booking.totalPrice, 0),
    );
    res.json({
      totalBookings: bookings.length,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("bike");

  res.json(booking);
};
