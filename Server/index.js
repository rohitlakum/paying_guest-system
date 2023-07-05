const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();
const port = 5000;
app.use(
  cors({
    origin: "*",
  })
);
const secret = "JKBHFDSVBFKJBFGWEdbsgHSFHDFGSDHFcbsdh";
const connection = require("./DBConfig");
const e = require("express");
app.use(express.json());
app.listen(port);

//<----------------😫Registration Start😉--------------->

app.post("/registration", (req, res) => {
  const name = req.body.name;
  const num = req.body.num;
  const email = req.body.email;
  let password = req.body.password;
  const admin = false;
  const salt = bcrypt.genSaltSync(10);
  const newpass = bcrypt.hashSync(password, salt);
  const isbooked = false;

  connection.query(
    "select * from registration where email = ?",
    [email],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        res.send({ Message: "email address is already in use" });
      } else {
        connection.query(
          "insert into registration (name,pno,email,password,admin,isbooked) values (?,?,?,?,?,?)",
          [name, num, email, newpass, admin,isbooked],
          (error, result) => {
            if (error) {
              throw error;
            } else {
              res.send({
                created: "your account has been created successfully",
              });
            }
          }
        );
      }
    }
  );
});
//<----------------💯Registration End❗--------------->

//<----------------😫Login Start😉--------------->

app.post("/login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  connection.query(
    "select * from registration where email = ? ",
    [email],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result.length > 0) {
          const testpassword = JSON.parse(JSON.stringify(result));
          const hashPass = testpassword[0].password;
          const matchpass = bcrypt.compareSync(pass, hashPass);
          if (matchpass === true) {
            res.send(result);
          } else {
            res.send({ LoginNotDone: "You entered incorrect Password" });
          }
        } else {
          res.send({ invalidEmail: "you entered invalid email address" });
        }
      }
    }
  );
});

//<----------------💯Login End❗--------------->

//<----------------😫Get User Data Start😉--------------->

app.get("/getuser:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "select * from registration where id = ?",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    }
  );
});

//<----------------💯End End❗--------------->

//<----------------😫Manage Rooms Start😉--------------->

// <-------🔥Get Room Details❗ ----------->

app.get("/getroom", (req, res) => {
  connection.query("select * from room", (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
app.use("/photo", express.static("./Image"));

// <-------🔥Send Room Details for Update❗ ----------->

app.get("/sendroom:id", (req, res) => {
  const id = req.params.id;
  connection.query("select * from room where id = ? ", [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// <-------🔥Add Room Details❗ ----------->

app.use("/photo", express.static("./Image/Room"));
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./Image/Room");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  }),
});

app.post("/setroom", upload.single("FileUpload"), (req, res) => {
  const id = req.body.roomid;
  const title = req.body.title;
  const description = req.body.description;
  const capacity = req.body.capacity;
  const vacancy = req.body.capacity;
  const image = req.file.originalname;
  const category = req.body.category;
  const price = req.body.price;
  connection.query(
    "select * from room where id = ?",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        res.send({ Message: "Room is already in use" });
      }
      else{
        connection.query(
          "insert into room (id,title,description,capacity,vacancy,image,category,price) values (?,?,?,?,?,?,?,?)",
          [id, title, description, capacity, vacancy, image, category, price],
          (err, result) => {
            if (err) {
              throw err;
            }
            res.send(result);
          }
        );
      }
    
    })
});

// <-------🔥Delete Room Details❗ ----------->

app.delete("/removeroom:id", (req, res) => {
  const id = req.params.id;
  connection.query("delete from room where id = ?", [id], (error, result) => {
    if (error) throw error;
    res.send({ Message: "Record deleted successfully..." });
  });
});

// <-------🔥Update Room Details❗ ----------->

app.put("/updateroom:rid", upload.single("FileUpload"), (req, res) => {
  const roomid = req.params.rid;
  const id = req.body.uroomid;
  const title = req.body.utitle;
  const description = req.body.udescription;
  const capacity = req.body.ucapacity;
  const vacancy = req.body.ucapacity;
  const image = req.file.originalname;
  const category = req.body.ucategory;
  const price = req.body.uprice;
  connection.query(
    "update room SET id = ? , title = ? ,description = ? ,capacity = ? ,vacancy = ? ,image = ? ,category = ? ,price = ? where id = ?",
    [id, title, description, capacity, vacancy, image, category, price, roomid],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.send(result);
    }
  );
});

//<----------------💯Manage Room End❗--------------->

// <----------------😫Room Booking Start😉--------------->

const book = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./Image/Booking");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  }),
});
app.post("/booking", book.single("fileupload"), (req, res) => {
  const uid = req.body.uid;
  const room = req.body.room;
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const aadharcard = req.body.aadharcard;
  const bt = new Date();
  const todayObject = new Date();
  let tday = todayObject.getDate();
  let tmonth = todayObject.getMonth() + 1;
  let tyear = todayObject.getFullYear();
  const today = `${tmonth}-${tday}-${tyear}`;

  const durationObject = new Date(bt.setMonth(bt.getMonth() + 1));
  let dday = durationObject.getDate();
  let dmonth = durationObject.getMonth();
  let dyear = durationObject.getFullYear();
  const duration = `${dmonth + 1}-${dday}-${dyear}`;

  const btime = new Date(today);
  const dtime = new Date(duration);

  const image = req.file.originalname;
  const address = req.body.address;

  connection.query(
    "insert into booking (userid,roomno,name,email,pno,aadhar,bdate,duration,image,address) values (?,?,?,?,?,?,?,?,?,?)",
    [
      uid,
      room,
      name,
      email,
      mobile,
      aadharcard,
      btime,
      dtime,
      image,
      address,
    ],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Booking successfull......");
    }
  );
});

//<----------------💯Room Booking End❗--------------->

// <----------------😫Set is Boooked Room Start😉--------------->
app.get("/setisbooked:em", (req, res) => {
  const email = req.params.em;
  connection.query(
    "update registration set isbooked = 1 where email = ? ",
    [email],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send({ isBookedtrue: "Yes..." });
    }
  );
});

//<----------------💯Set is Boooked Room End❗--------------->

//<----------------😫Get Payment Start😉--------------->

app.post("/getpayment", (req, res) => {
  const id = req.body.id;
  connection.query(
    "select price from room where id = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      let data = JSON.parse(JSON.stringify(result));
      var price = data[0].price;
      var instance = new Razorpay({
        key_id: "rzp_test_Cl1G7wgRpRqdBD",
        key_secret: "40UYLte1UxnJbWlusNVjOipQ",
      });
      
      var options = {
        amount: price * 100 * 2, 
        currency: "INR",
        receipt: "order_rcptid_11",
      };
      instance.orders.create(options, function (err, order) {
        res.send(order);
      });
    }
  );
});

//<----------------💯Get Payment End❗--------------->

//<----------------😫Verify Payment Start😉--------------->

app.post("/varifypayment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const exprectedSign = crypto
    .createHmac("sha256", "40UYLte1UxnJbWlusNVjOipQ")
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === exprectedSign) {
    return res.status(200).json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid signature send !" });
  }
});

//<----------------💯Verify Payment End❗--------------->

//<----------------😫Set vacancy  Start😉--------------->
app.post("/vacancy", (req, res) => {
  const id = req.body.id;
  connection.query(
    "select vacancy,id from room where id = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      let data = JSON.parse(JSON.stringify(result));
      var getvacancy = data[0].vacancy - 1;
      var getid = data[0].id;
      connection.query(
        "update room set vacancy = ? where id = ? ",
        [getvacancy, getid],
        (err, result) => {
          if (err) {
            throw err;
          }
          res.send({ isBookedtrue: "Yes..." });
        }
      );
    }
  );
});
//<----------------💯Set Vanacancy End❗--------------->

//<----------------😫Set Data in payment Table Start😉--------------->
app.post("/payment", (req, res) => {
  const uid = req.body.id;
  const name = req.body.name;
  const roomid = req.body.rid;
  const bt = new Date();
  const todayObject = new Date();
  let tday = todayObject.getDate();
  let tmonth = todayObject.getMonth() + 1;
  let tyear = todayObject.getFullYear();
  const today = `${tmonth}-${tday}-${tyear}`;

  const durationObject = new Date(bt.setMonth(bt.getMonth() + 1));
  let dday = durationObject.getDate();
  let dmonth = durationObject.getMonth();
  let dyear = durationObject.getFullYear();
  const duration = `${dmonth + 1}-${dday}-${dyear}`;

  const btime = new Date(today);
  const dtime = new Date(duration);

  connection.query(
    "select price from room where id = ? ",
    [roomid],
    (err, result) => {
      if (err) {
        throw err;
      }
      let data = JSON.parse(JSON.stringify(result));
      var price = data[0].price * 2;

      connection.query(
        "insert into payment (userid,roomid,uname,dop,duration,payment) values (?,?,?,?,?,?)",
        [uid, roomid, name, btime, dtime, price],
        (err, result) => {
          if (err) {
            throw err;
          }
          res.send(result);
        }
      );
    }
  );
});

//<----------------💯Set Data in payment Table End❗--------------->

//<----------------😫Get Admin Start😉--------------->
app.post("/admindata", (req, res) => {
  const id = 1;
  connection.query(
    "select * from registration where admin = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    }
  );
});
//<----------------💯Get Admin End❗--------------->

//<----------------😫Update Admin Profile Start😉--------------->

app.post("/aprofile", (req, res) => {
  const name = req.body.name;
  const num = req.body.pno;
  const email = req.body.email;
  const admin = 1;
  connection.query(
    "update registration set name = ? ,pno = ? ,email = ? where admin = ?",
    [name, num, email, admin],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send({ Message: "Data updated successfully" });
    }
  );
});

//<----------------💯Update Admin Profile End❗--------------->

//<----------------😫Get Booking Data Start😉--------------->
app.use("/img", express.static("./Image/Booking"));

app.get("/bookingdata", (req, res) => {
  connection.query("select userid,roomno,name,email,pno,aadhar,image,address,date_format(bdate,'%d-%m-%Y') AS 'bdate',date_format(duration,'%d-%m-%Y') AS 'duration' from booking", (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
//<----------------💯Get Booking Data End❗--------------->

//<----------------😫Delete Guest Datat Start😉--------------->
app.delete("/deleteguest:uid", (req, res) => {
  const id = req.params.uid;
  connection.query(
    "delete from booking where userid = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send({ Message: "Record deleted successfully..." });
    }
  );
});
//<----------------💯Delete Guest Data End❗--------------->

//<----------------😫Reset Is booked Start😉--------------->
app.post("/resetisbooked:uid", (req, res) => {
  const id = req.params.uid;
  const test = 0;
  connection.query(
    "update registration set isbooked = ? where id = ? ",
    [test, id],
    (err, result) => {
      res.status(200).send({ Message: "Record deleted successfully..." });
    }
  );
});
//<----------------💯Reset Is booked End❗--------------->

//<----------------😫Increase Vacancy Start😉--------------->
app.post("/increasevacancy", (req, res) => {
  const id = req.body.id;
  connection.query(
    "select vacancy,id from room where id = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      let data = JSON.parse(JSON.stringify(result));
      var getvacancy = data[0].vacancy + 1;
      var getid = data[0].id;
      connection.query(
        "update room set vacancy = ? where id = ? ",
        [getvacancy, getid],
        (err, result) => {
          if (err) {
            throw err;
          }
          res.send({ isBookedtrue: "Yes..." });
        }
      );
    }
  );
});
//<----------------💯Increase Vacancy End❗--------------->

//<----------------😫Get Guest Data Start😉--------------->
app.post("/userdata:uid", (req, res) => {
  const id = req.params.uid;
  connection.query(
    "select * from booking where userid = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    }
  );
});
app.post("/useralldata", (req, res) => {
  connection.query("select * from booking",(err,result)=>{
   if(err){
    throw err;
   }
   res.json(result)
  })
});
//<----------------💯Get Guest Data End❗--------------->

//<----------------😫Get Guest Data Start😉--------------->
app.post("/userprofile", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const pno = req.body.pno;
  const email = req.body.email;
  const address = req.body.address;
  connection.query(
    "update registration set name = ? ,pno = ? ,email = ? where id = ?",
    [name, pno, email, id],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        connection.query(
          "update booking set name = ?,email = ? ,pno = ?,address = ? where userid = ? ",
          [name, email, pno, address, id],
          (err, result) => {
            if (err) {
              throw err;
            } else {
              res.status(200).send({ Message: "Data updated successfully" });
            }
          }
        );
      }
    }
  );
});
//<----------------💯Get Guest Data End❗--------------->

//<----------------😫Get User Room Data Start😉--------------->
app.post("/getroomdata:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "select userid,roomno,name,email,pno,aadhar,image,address,date_format(bdate,'%d-%m-%Y') AS 'bdt',date_format(duration,'%d-%m-%Y') AS 'dura',duration from booking where userid = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    }
  );
});
//<----------------💯Get User Room Data End❗--------------->

//<----------------😫Add Food Menu Start😉--------------->
app.post("/addfood", (req, res) => {
  const sdate = req.body.dt;
  const breakfast = req.body.breakfast;
  const lunch = req.body.lunch;
  const dinner = req.body.dinner;
  connection.query(
    "insert into foodmenu (date,morning,afternoon,evening) values (?,?,?,?)",
    [sdate, breakfast, lunch, dinner],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send({ Message: "Data inserted successfully" });
    }
  );
});
//<----------------💯Add Food Menu End❗--------------->

//<----------------😫Get Food Menu Start😉--------------->
app.get("/getfood", (req, res) => {
  connection.query("select * from foodmenu", (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
app.post("/getfoodforupdate:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "select * from foodmenu where id = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    }
  );
});
//<----------------💯Get Food Menu End❗--------------->

//<----------------😫Update Food Menu Start😉--------------->
app.post("/updatefood", (req, res) => {
  const fid = req.body.fid;
  const sdate = req.body.dt;
  const breakfast = req.body.breakfast;
  const lunch = req.body.lunch;
  const dinner = req.body.dinner;
  connection.query(
    "update foodmenu set date = ?,morning = ? ,afternoon = ?,evening = ? where id = ? ",
    [sdate, breakfast, lunch, dinner, fid],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send({ Message: "Data updated successfully" });
    }
  );
});
//<----------------💯Update Food Menu End❗--------------->

//<----------------😫Remove Food Menu Start😉--------------->
app.delete("/deletefood:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "delete from foodmenu where id = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send({ Message: "Record deleted successfully" });
    }
  );
});
//<----------------💯Remove Food Menu End❗--------------->

//<----------------😫Add Review Start😉--------------->
app.post("/addreview", (req, res) => {
  const id = req.body.id;
  connection.query("select image from booking where userid = ?",[id],(err,result)=>{
    if(err){
      throw err;
    }
    let data = JSON.parse(JSON.stringify(result));
      var img = data[0].image;
const name = req.body.name;
  const message = req.body.message;
  const todayObject = new Date();
  let tday = todayObject.getDate();
  let tmonth = todayObject.getMonth() + 1;
  let tyear = todayObject.getFullYear();
  const today = `${tday}-${tmonth}-${tyear}`;
  connection.query(
    "insert into review (uid,name,message,date,image) values (?,?,?,?,?)",
    [id, name, message, today,img],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send({ Message: "Review added successfully" });
    }
  );
  })
  
});
//<----------------💯Add Review End❗--------------->

//<----------------😫Get Review Data Start😉--------------->
app.post("/getreview:id",(req,res)=>{
  const id = req.params.id;
    
  connection.query("select * from review where uid = ?",[id],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).json(result)
  })
  })
  app.post("/getallreview",(req,res)=>{
    connection.query("select * from review",(err,result)=>{
      if(err){
        throw err;
      }
      res.status(200).json(result)
    })
    })
//<----------------💯Get Review Data End❗--------------->

//<----------------😫Delete Review Data Start😉--------------->
app.delete("/deletereview:id",(req,res)=>{
  const uid = req.params.id;
  connection.query("delete from review where id = ?",[uid],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send({Message:"Review deleted successfully"})
  })
  })
//<----------------💯Delete Review Data End❗--------------->

//<----------------😫Add Complaint Data Start😉--------------->

app.post("/addcomplaint",(req,res)=>{
  const id = req.body.id;
  const name = req.body.name;
  const message = req.body.message;
  const replay = " "
  const todayObject = new Date();
  let tday = todayObject.getDate();
  let tmonth = todayObject.getMonth() + 1;
  let tyear = todayObject.getFullYear();
  const today = `${tday}-${tmonth}-${tyear}`;
  connection.query("insert into complaint (uid,name,message,replay,date) values (?,?,?,?,?)",[id,name,message,replay,today],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send({Message:"Your complaint has been successfully submitted"})
  })
})
//<----------------💯Add Complaint Data End❗--------------->

//<----------------😫Get Complaint Data Start😉--------------->
app.post("/getcomplaint:id",(req,res)=>{
  const id = req.params.id;
    
  connection.query("select * from complaint where uid = ?",[id],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).json(result)
  })
  })

 app.post("/getallcomplaint",(req,res)=>{
    connection.query("select * from complaint ",(err,result)=>{
      if(err){
        throw err;
      }
      res.status(200).json(result)
    })
    })
//<----------------💯Get Complaint Data End❗--------------->

//<----------------😫Delete Complaint Data Start😉--------------->
app.delete("/deletecomplaint:id",(req,res)=>{
  const uid = req.params.id;
  connection.query("delete from complaint where id = ?",[uid],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send({Message:"Complaint deleted successfully"})
  })
  })
//<----------------💯Delete Complaint Data End❗--------------->

//<----------------😫Complaint Replay Start😉--------------->
app.post("/replaycomplaint:id",(req,res)=>{
  const uid = req.params.id;
  const message = req.body.message;
  connection.query("update complaint set replay = ? where id = ?",[message,uid],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send({Message:"Your replay has been submitted"})
  })
  })
//<----------------💯Complaint Replay End❗--------------->

//<----------------😫Add Notice Data Start😉--------------->
app.post("/addnotice",(req,res)=>{
  const id = req.body.id;
  connection.query("select name from registration where id = ?",[id],(err,result)=>{
    if(err){
      throw err
    }
    else{
      let data = JSON.parse(JSON.stringify(result));
      var name = data[0].name;
      const message = req.body.message;
      const admin = req.body.admin;
      const todayObject = new Date();
      let tday = todayObject.getDate();
      let tmonth = todayObject.getMonth() + 1;
      let tyear = todayObject.getFullYear();
      const today = `${tday}-${tmonth}-${tyear}`;
      connection.query("insert into notice (uid,name,message,date,isadmin) values (?,?,?,?,?)",[id,name,message,today,admin],(err,result)=>{
        if(err){
          throw err;
        }
        res.status(200).send({Message:"Your notice has been successfully submitted"})
      })
    }
  })
})
//<----------------💯Add Notice Data End❗--------------->

//<----------------😫Get Admin Notice Data Start😉--------------->
app.get("/adminnotice",(req,res)=>{
  const admin = true;
  connection.query("select * from notice where isadmin = ?",[admin],(err,result)=>{
    if(err){
      throw err;
    }
   res.json(result)
  })
})
//<----------------💯Get Admin Notice Data End❗--------------->

//<----------------😫Get User Notice Data Start😉--------------->
app.get("/usernotice",(req,res)=>{
  const admin = false;
  connection.query("select * from notice where isadmin = ?",[admin],(err,result)=>{
    if(err){
      throw err;
    }
   res.json(result)
  })
})
app.get("/guestnotice:id",(req,res)=>{
  const id = req.params.id;
  connection.query("select * from notice where uid = ?",[id],(err,result)=>{
    if(err){
      throw err;
    }
   res.json(result)
  })
})
//<----------------💯Get User Notice Data End❗--------------->


//<----------------😫Delete Notice Start😉--------------->
app.delete("/deletenotice:id",(req,res)=>{
  const uid = req.params.id;
  connection.query("delete from notice where id = ?",[uid],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send({Message:"Notice deleted successfully"})
  })
  })
//<----------------💯Delete Notice End❗--------------->


//<----------------😫Add Service Start😉--------------->
app.post("/addservice",(req,res)=>{
  const title = req.body.title;
  const message = req.body.message;
  connection.query("insert into service (title,description) values(?,?)",[title,message],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send({Message:"Service added successfully"})
  })
  })
  
//<----------------💯Add Service End❗--------------->

//<----------------😫Get Service Start😉--------------->
app.post("/getservice",(req,res)=>{
  connection.query("select * from service",(err,result)=>{
    if(err){
      throw err;
    }
    res.json(result);
  })
  })
//<----------------💯Get Service End❗--------------->

//<----------------😫Remove Service Start😉--------------->
app.delete("/deleteservice:id",(req,res)=>{
  const id = req.params.id;
  connection.query("delete from service where id = ?",[id],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send({Message:"Service deleted successfully"})
  })
  })
//<----------------💯Remove Service End❗--------------->

//<----------------😫Add Extra Service Start😉--------------->
app.post("/addextraservice",(req,res)=>{
  const title = req.body.title;
  const message = req.body.message;
  const price = req.body.price;
  connection.query("insert into extraservice   (title,description,price) values(?,?,?)",[title,message,price],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send({Message:"Service added successfully"})
  })
  })
//<----------------💯Add Extra Service End❗--------------->

//<----------------😫Get Extra Service Start😉--------------->
app.post("/getextraservice",(req,res)=>{
  connection.query("select * from extraservice",(err,result)=>{
    if(err){
      throw err;
    }
    res.json(result);
  })
  })
//<----------------💯Get Extra Service End❗--------------->

//<----------------😫Remove Extra Service Start😉--------------->
app.delete("/deleteextraservice:id",(req,res)=>{
  const id = req.params.id;
  connection.query("delete from extraservice where id = ?",[id],(err,result)=>{
    if(err){
      throw err;
    }
    res.status(200).send({Message:"Service deleted successfully"})
  })
  })
//<----------------💯Remove Extra Service End❗--------------->

//<----------------😫Get Extra Service Payment Start😉--------------->
app.post("/servicepayment:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "select price from extraservice where id = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      let data = JSON.parse(JSON.stringify(result));
      var price = data[0].price;
      var instance = new Razorpay({
        key_id: "rzp_test_Cl1G7wgRpRqdBD",
        key_secret: "40UYLte1UxnJbWlusNVjOipQ",
      });

      var options = {
        amount: price * 100, 
        currency: "INR",
        receipt: "order_rcptid_11",
      };
      instance.orders.create(options, function (err, order) {
        res.send(order);
      });
    }
  );
});
//<----------------💯Get Extra Service Payment End❗--------------->

//<----------------😫Verify Extra Service Payment Start😉--------------->
app.post("/varifyservicepayment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const exprectedSign = crypto
    .createHmac("sha256", "40UYLte1UxnJbWlusNVjOipQ")
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === exprectedSign) {
    return res.status(200).json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid signature send !" });
  }
});
//<----------------💯Verify Extra Service Payment End❗--------------->


//<----------------😫Set Extra Service Payment Start😉--------------->
app.post("/servicepayment", async (req, res) => {
 const uid = req.body.uid;
 const id = req.body.id;
 connection.query(
  "select * from extraservice where id = ? ",
  [id],
  (err, result) => {
    if (err) {
      throw err;
    }
    let data = JSON.parse(JSON.stringify(result));
    var price = data[0].price;
    var title = data[0].title;
    connection.query("select name from registration where id = ?",[uid],(err,result)=>{
      if(err){
        throw err;
      }
      const dt = JSON.parse(JSON.stringify(result));
      var name = dt[0].name;
     connection.query("select duration from booking where userid = ?",[uid],(err,result)=>{
      if(err){
        throw err;
      }
      bookingData = JSON.parse(JSON.stringify(result));
      var duration = bookingData[0].duration;
      const todayObject = new Date();
      let tday = todayObject.getDate();
      let tmonth = todayObject.getMonth() + 1;
      let tyear = todayObject.getFullYear();
      const today = `${tmonth}-${tday}-${tyear}`;

      const stime = new Date(today);
    
     connection.query("insert into servicepayment (uid,name,service,bdate,duration,price) values (?,?,?,?,?,?)",[uid,name,title,stime,duration,price],(err,result)=>{
      if(err){
        throw err;
      }
        connection.query("insert into servicebuyer (uid,name,service,bdate,duration) values (?,?,?,?,?)",[uid,name,title,stime,duration],(err,result)=>{
      if(err){
        throw err;
      }
         res.status(200).send({Message:"You booked service successfully."})

        })
      })
     })
    })
  }
);
});
//<----------------💯Set Extra Service Payment End❗--------------->

//<----------------😫Check Service Booked Or Not Start😉--------------->
app.post("/checkisbuy", (req, res) => {
  const uid = req.body.userid;
  const title = req.body.title;
 connection.query("select * from servicebuyer where uid = ? AND service LIKE ? ",[uid,title],(err,result)=>{
  if(err){
    throw err;
  }
   if(result.length>0){
    res.status(200).send({Message:"You alredy booked this service."})
   }
   else{
    res.status(202).send({Error:"Not booked"});
   }
 })
 });
 //<----------------💯Check Service Booked Or Not End❗--------------->

 //<----------------😫Get Service Buyer data Start😉--------------->
app.post("/servicebuyer:id",(req, res) => {
 const id = req.params.id;
 connection.query("select id,service,uid,name,date_format(duration,'%d-%m-%y') AS 'duration',date_format(bdate,'%d-%m-%y') AS 'bdate' from servicebuyer where uid = ?",[id],(err,result)=>{
  if(err){
    throw err;
  }
  res.json(result);
 })
 });

 app.get("/allservicebuyer",(req, res) => {
  connection.query("select id,service,uid,name,date_format(bdate,'%d-%m-%y') AS 'bdate',date_format(duration,'%d-%m-%y') AS 'duration'  from servicebuyer",(err,result)=>{
   if(err){
     throw err;
   }
   res.json(result);
  })
  });
 //<----------------💯Get Service Buyer data End❗--------------->

  //<----------------😫Remove Service Buyer data Start😉--------------->
app.delete("/removeserviceuser:id",(req, res) => {
  const id = req.params.id;
  connection.query("delete from servicebuyer where id = ?",[id],(err,result)=>{
   if(err){
     throw err;
   }
   res.status(200).send({Message:"Record deleted successfully."})
  })
  });

  //<----------------💯Remove Service Buyer data End❗--------------->
  //<----------------😫Booking Payment data Start😉--------------->
  app.get("/bookingpayment",(req, res) => {
    connection.query("select id,userid,roomid,uname,payment,date_format(dop,'%d-%m-%Y') AS 'dop',date_format(duration,'%d-%m-%Y') AS 'duration' from payment",(err,result)=>{
     if(err){
       throw err;
     }
    res.json(result);
    })
    });
  
    //<----------------💯Booking Payment data End❗--------------->

      //<----------------😫Service Payment data Start😉--------------->
  app.get("/servicepayment",(req, res) => {
    connection.query("select id,name,uid,service,price,date_format(bdate,'%d-%m-%y') AS 'bdate',date_format(duration,'%d-%m-%y') AS 'duration' from servicepayment",(err,result)=>{
     if(err){
       throw err;
     }
    res.json(result);
    })
    });
  
    //<----------------💯Service Payment data End❗--------------->

    //<----------------😫Remove Booking Payment data Start😉--------------->
app.delete("/removepayment:id",(req, res) => {
  const id = req.params.id;
  connection.query("delete from payment where id = ?",[id],(err,result)=>{
   if(err){
     throw err;
   }
   res.status(200).send({Message:"Record deleted successfully."})
  })
  });

  //<----------------💯Remove Booking Payment data End❗--------------->

   //<----------------😫Remove Service Payment data Start😉--------------->
app.delete("/removeservicepayment:id",(req, res) => {
  const id = req.params.id;
  connection.query("delete from servicepayment where id = ?",[id],(err,result)=>{
   if(err){
     throw err;
   }
   res.status(200).send({Message:"Record deleted successfully."})
  })
  });

  //<----------------💯Remove Service Payment data End❗--------------->

    //<----------------😫Remove Service Payment data Start😉--------------->
app.post("/addbokingcancel:id",(req, res) => {
  const id = req.params.id;
  connection.query("select * from bookingcancel where uid = ?",[id],(err,result)=>{
    if(err){
      throw err;
    }
    if(result.length>0){
      res.status(202).send({Error:"You alredy send request for booking cancellation"})
    }
    else{
      connection.query("select * from booking where userid = ?",[id],(err,result)=>{
        if(err){
          throw err;
        }
        const data = JSON.parse(JSON.stringify(result))
        const roomno = data[0].roomno;
        const name = data[0].name;
        const bdate = data[0].bdate;
        const duration = data[0].duration;
        const approve = false;
        connection.query("insert into bookingcancel (uid,roomid,name,bdate,duration,approve) values(?,?,?,?,?,?)",[id,roomno,name,bdate,duration,approve],(err,result)=>{
          if(err){
            throw err;
          }
          res.status(200).send({Message:"Your request has been submitted successfully"})
        })
       })
    }
  })
  });

  //<----------------💯Remove Service Payment data End❗--------------->

    //<----------------😫Get Booking Cancellation data Start😉--------------->
app.post("/cancellationdata:id",(req, res) => {
  const id = req.params.id;
  connection.query("select * from bookingcancel where uid = ?",[id],(err,result)=>{
   if(err){
     throw err;
   }
  res.json(result);
  })
  });
  app.get("/cancellationalldata",(req, res) => {
    connection.query("select id,uid,roomid,name,approve,date_format(bdate,'%d-%m-%y') AS 'bdate',date_format(duration,'%d-%m-%y') AS 'duration' from bookingcancel",(err,result)=>{
     if(err){
       throw err;
     }
    res.json(result);
    })
    });
  //<----------------💯Get Booking Cancellation data End❗--------------->

  //<----------------😫Approve booking cancellation request Start😉--------------->
  app.post("/approverequest:id",(req, res) => {
    const id = req.params.id;
    const approve = true;
    connection.query("update bookingcancel set approve = ? where id = ?",[approve,id],(err,result)=>{
     if(err){
       throw err;
     }
      res.status(200).send({Message:"You approved request successfully"})
    })
    });

    //<----------------💯Approve booking cancellation request End❗--------------->

//<----------------😫Update Password Start😉--------------->
  app.post("/updatepass:id",(req, res) => {
    const id = req.params.id;
    const Currentpass = req.body.Currentpass;
    let newPass = req.body.newpass;
    const confirmpass = req.body.confirmpass;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(newPass, salt);
    connection.query("select * from registration where id = ?",[id],(err,result)=>{
      if(err){
        throw err;
      }
      const data = JSON.parse(JSON.stringify(result))
      const oldpass=data[0].password;
      const match = bcrypt.compareSync(Currentpass,oldpass)
      if(match === true){
        connection.query("update registration set password = ? where id = ?",[password,id],(err,result)=>{
          if(err){
            throw err;
          }
          res.status(200).send({Message:"Password updated successfully"})
        })
      }
      else{
        res.status(202).send({Error:"Incorrect current password"})
      }
    })
    // const approve = true;
    // connection.query("update bookingcancel set approve = ? where id = ?",[approve,id],(err,result)=>{
    //  if(err){
    //    throw err;
    //  }
    //   res.status(200).send({Message:"You approved request successfully"})
    // })
    });

//<----------------💯Update Password End❗--------------->

//<----------------😫Get Room category Data Start😉--------------->
app.post("/getroomcategory:id", (req, res) => {
  const id = req.params.id;
  connection.query(
   "select category from room where id = ?",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    }
  );
});
//<----------------💯Get Room category Data❗--------------->

//<----------------😫Get Payment Data Start😉--------------->
app.post("/getpaymentdt:id", (req, res) => {
  const id = req.params.id;
  connection.query(
   "select * from payment where userid = ?",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    }
  );
});
//<----------------💯Get Payment Data❗--------------->


//<----------------😫Get Booking Data For Report Start😉--------------->
app.post("/bookingreport", (req, res) => {
  const Sdate = req.body.startDate;
  const Edate = req.body.endDate;

  connection.query(
   "select userid,roomno,name,email,pno,aadhar,image,address,date_format(bdate,'%d-%m-%y') AS 'bdate',date_format(duration,'%d-%m-%y') AS 'duration' from booking where bdate between ? AND ?",[Sdate,Edate],
    (err, result) => {
      if (err) {
        throw err;
      }
      if(result.length>0){
        res.json(result);
      }
      else{
        res.status(202).send({Message :"There in no record found from given date"})
      }
    }
  );
});
//<----------------💯Get Booking Data For Report❗--------------->

//<----------------😫Generate Booking Payment Report Start😉--------------->
app.post("/servicereport",(req,res)=>{
  const Sdate = req.body.startDate;
  const Edate = req.body.endDate;

  connection.query("select id,userid,roomid,uname,payment,date_format(dop,'%d-%m-%y') AS 'dop',date_format(duration,'%d-%m-%y') AS 'duration' from payment where dop between ? AND ?",[Sdate,Edate],
  (err, result) => {
    if (err) {
      throw err;
    }
    if(result.length>0){
      res.json(result);
    }
    else{
      res.status(202).send({Message :"There in no record found from given date"})
    }
  }
);
})

//<----------------💯Generate Booking Payment Report End❗--------------->

//<----------------😫Generate Service Payment Report Start😉--------------->
app.post("/spaymentreport",(req,res)=>{
  const Sdate = req.body.startDate;
  const Edate = req.body.endDate;

  connection.query("select id,uid,name,service,price,date_format(bdate,'%d-%m-%y') AS 'bdate',date_format(duration,'%d-%m-%y') AS 'duration' from servicepayment where bdate between ? AND ?",[Sdate,Edate],
  (err, result) => {
    if (err) {
      throw err;
    }
    if(result.length>0){
      res.json(result);
    }
    else{
      res.status(202).send({Message :"There in no record found from given date"})
    }
  }
);
})

//<----------------💯Generate Service Payment Report End❗--------------->

//<----------------😫Generate Service Users Report Start😉--------------->
app.post("/serviceuserreport",(req,res)=>{
  const Sdate = req.body.startDate;
  const Edate = req.body.endDate;
 
  connection.query("select id,uid,name,service,date_format(bdate,'%d-%m-%y') AS 'bdate',date_format(duration,'%d-%m-%y') AS 'duration' from servicebuyer where bdate between ? AND ?",[Sdate,Edate],
  (err, result) => {
    if (err) {
      throw err;
    }
    if(result.length>0){
      res.json(result);
    }
    else{
      res.status(202).send({Message :"There in no record found from given date"})
    }
  }
);
})

//<----------------💯Generate Service Users Report End❗--------------->



//<----------------😫Forgot Password Start😉--------------->
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
      user: 'rohitlakum0562@gmail.com',
      pass: 'ndnfmiajhhilkpmt'
  }
});

app.post("/testemail",(req,res)=>{
  const email = req.body.email;
  connection.query("select * from registration where email = ?",[email],(err,result)=>{
    if(err){
      throw err;
    }
  if(result.length>0){
    res.status
    const data = JSON.parse(JSON.stringify(result))
    const pass = data[0].password;
    const id = data[0].id;
    const token = jwt.sign({pass},secret,{
      expiresIn:"1m"
    })
    connection.query("update registration set token = ? where id = ?",[token,id],(err,result)=>{
      if(err){
        throw err;
      }
      else{
        var mailOptions = {
          from :"rohitlakum0562@gmail.com",
          to :email,
          subject:"Reset your password using given link",
          text:`Password reset Link:👉http://localhost:3000/resetpass/${id}/${token}`
        }
        transporter.sendMail(mailOptions,(err,result)=>{
          if(err){
            throw err;
          }
          res.status(200).send({Message:"send"})
        })
      }
    })
  }
  else{
    res.status(210).send({Error:"User with given email does not exist !"})
  }
  })
})

//<----------------💯Forgot Password End❗--------------->

//<----------------😫Reset Password Start😉--------------->
app.post("/testuser",(req,res)=>{
  const  id = req.body.id
  const  token = req.body.token
  connection.query("select * from registration where id = ? AND token = ?",[id,token],(err,result)=>{
    if(err){
      throw err;
    }
    if(result.length>0){
       res.status(200).send({Message:"Valid user"})
    }
    else{
      res.status(201).send({Error:"Not valid"})
    }
  })
})

app.post("/resetpass",(req,res)=>{
  const  id = req.body.id
  const pass = req.body.pass;
  const salt = bcrypt.genSaltSync(10);
  const newpass = bcrypt.hashSync(pass, salt);
  connection.query("update registration set password = ? where id = ?",[newpass,id],(err,result)=>{
    if(err){
      throw err;
    }
     res.status(200).send({Message:"Your password has been reset successfully"})
  })
})
//<----------------💯Reset Password End❗--------------->


//<----------------😫Get Rebooking Payment Start😉--------------->

app.post("/rebookingpayment", (req, res) => {
  const id = req.body.id;
  connection.query(
    "select price from room where id = ? ",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      let data = JSON.parse(JSON.stringify(result));
      var price = data[0].price;
      var instance = new Razorpay({
        key_id: "rzp_test_Cl1G7wgRpRqdBD",
        key_secret: "40UYLte1UxnJbWlusNVjOipQ",
      });
      
      var options = {
        amount: price * 100, 
        currency: "INR",
        receipt: "order_rcptid_11",
      };
      instance.orders.create(options, function (err, order) {
        res.send(order);
      });
      
    }
  );
});

//<----------------💯Get Rebooking Payment End❗--------------->

//<----------------😫Verify Rebooking Payment Start😉--------------->

app.post("/testpayment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const exprectedSign = crypto
    .createHmac("sha256", "40UYLte1UxnJbWlusNVjOipQ")
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === exprectedSign) {
    return res.status(200).json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid signature send !" });
  }
});

//<----------------💯Verify Rebooking Payment End❗--------------->


//<----------------😫Set Duration Start😉--------------->

app.post("/setbookingdate:id", async (req, res) => {
 const id = req.params.id;
 const rid = req.body.rid;
 const bt = new Date();
 const todayObject = new Date();
 let tday = todayObject.getDate();
 let tmonth = todayObject.getMonth() + 1;
 let tyear = todayObject.getFullYear();
 const today = `${tmonth}-${tday}-${tyear}`;

 const durationObject = new Date(bt.setMonth(bt.getMonth() + 1));
 let dday = durationObject.getDate();
 let dmonth = durationObject.getMonth();
 let dyear = durationObject.getFullYear();
 const duration = `${dmonth + 1}-${dday}-${dyear}`;

 const btime = new Date(today);
 const dtime = new Date(duration);
 connection.query("update booking set bdate = ? ,duration = ? where userid = ?",[btime,dtime,id],(err,result)=>{
  if(err){
    throw err;
  }
  else{
  connection.query("select name from registration where id = ?",[id],(err,result)=>{
    if(err){
      throw err;
    }
    else{
      var dt = JSON.parse(JSON.stringify(result))
      const name =dt[0].name
      connection.query(
        "select price from room where id = ? ",
        [rid],
        (err, result) => {
          if (err) {
            throw err;
          }
          let data = JSON.parse(JSON.stringify(result));
          var price = data[0].price;
          connection.query("insert into payment (userid,roomid,uname,dop,duration,payment) values (?,?,?,?,?,?)",[id,rid,name,btime,dtime,price],(err,result)=>{
            if(err){
              throw err;
            }
            else{
               res.status(200).send({Message:"Booking Done"})
            }
          })
        }
      );
    }
  })
  }
 })

 
});

//<----------------💯VSet Duration End❗--------------->
