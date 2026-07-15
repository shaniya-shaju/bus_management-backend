const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb://shaniya:Secure123@ac-4wfxdro-shard-00-00.g3vrd2v.mongodb.net:27017,ac-4wfxdro-shard-00-01.g3vrd2v.mongodb.net:27017,ac-4wfxdro-shard-00-02.g3vrd2v.mongodb.net:27017/busdb?ssl=true&replicaSet=atlas-3b00x8-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// ====================== BUS SCHEMA ======================

const BusSchema = new mongoose.Schema({
  busNumber: String,
  busName: String,
  registrationNumber: String,
  capacity: Number,
  driverId: String,
  routeName: String,
  startingPoint: String,
  endingPoint: String,
  distance: Number,
  status: String
});

const Bus = mongoose.model("Bus", BusSchema);


// ==================== DRIVER SCHEMA =====================

const DriverSchema = new mongoose.Schema({
  driverId: String,
  driverName: String,
  phone: String,
  licenseNumber: String,
  experience: Number,
  address: String,
  email: String,
  status: String
});

const Driver = mongoose.model("Driver", DriverSchema);


// ==================== STUDENT SCHEMA ====================

const StudentSchema = new mongoose.Schema({
  studentId: String,
  fullName: String,
  department: String,
  assignedBusNumber: String,
  feeId: String,
  semester: String,
  amount: Number,
  dueDate: Date,
  paymentMode: String,
  academicYear: String,
  feeStatus: String
});

const Student = mongoose.model("Student", StudentSchema);


// ====================== BUS APIs ========================

// Add Bus
app.post("/add-bus", async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();

    res.json({
      status: "success",
      message: "Bus Added Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// View All Buses
app.get("/view-bus", async (req, res) => {
  try {
    const data = await Bus.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ==================== DRIVER APIs =======================

// Add Driver
app.post("/add-driver", async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();

    res.json({
      status: "success",
      message: "Driver Added Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// View All Drivers
app.get("/view-driver", async (req, res) => {
  try {
    const data = await Driver.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ==================== STUDENT APIs ======================

// Add Student
app.post("/add-student", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    res.json({
      status: "success",
      message: "Student Added Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// View All Students
app.get("/view-student", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Delete Bus 
app.delete("/delete-bus/:busNumber", async (req, res) => {
    try {
      await Bus.findOneAndDelete({ busNumber: req.params.busNumber });
  
      res.json({
        status: "success",
        message: "Bus Deleted Successfully"
      });
  
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  });

  //Delete Driver

  app.delete("/delete-driver/:driverId", async (req, res) => {
    try {
      await Driver.findOneAndDelete({ driverId: req.params.driverId });
  
      res.json({
        status: "success",
        message: "Driver Deleted Successfully"
      });
  
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  });

  //Delete student

  app.delete("/delete-student/:studentId", async (req, res) => {
    try {
      await Student.findOneAndDelete({
        studentId: req.params.studentId
      });
  
      res.json({
        status: "success",
        message: "Student Deleted Successfully"
      });
  
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message
      });
    }
  });

  // Search Bus
app.post("/search-bus", async (req, res) => {
    try {
      const data = await Bus.findOne({
        busNumber: req.body.busNumber
      });
  
      if (data) {
        res.json(data);
      } else {
        res.json({
          status: "Not Found",
          message: "Bus not found"
        });
      }
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Search Driver
app.post("/search-driver", async (req, res) => {
    try {
      const data = await Driver.findOne({
        driverId: req.body.driverId
      });
  
      if (data) {
        res.json(data);
      } else {
        res.json({
          status: "Not Found",
          message: "Driver not found"
        });
      }
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Search Student
app.post("/search-student", async (req, res) => {
    try {
      const data = await Student.findOne({
        studentId: req.body.studentId
      });
  
      if (data) {
        res.json(data);
      } else {
        res.json({
          status: "Not Found",
          message: "Student not found"
        });
      }
  
    } catch (err) {
      res.status(500).json(err);
    }
  });



// ====================== SERVER ==========================

app.listen(4000, () => {
  console.log("Server Running on Port 4000");
});