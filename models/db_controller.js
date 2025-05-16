var mysql = require('mysql');
var express = require('express');
require('dotenv').config();


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})



con.connect(function(err) {
    if (err) {
        console.error('❌ Database Connection Failed! Error:', err);
    } else {
        console.log('✅ You are connected to the database');
    }
});

module.exports.signup = function (username, email, password, status, callback) {
    var query =
      "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ('" +
      username +
      "','" +
      email +
      "','" +
      password +
      "','" +
      status +
      "')";
    con.query(query, callback);
  };

module.exports.verify = function(username,email,token,callback){
    var query = "insert into `verify` (`username`,`email`,`token`)  VALUES('"+username+"','"+email+"','"+token+"')";
    con.query(query,callback);
}

module.exports.getuserid = function(email,callback){
    var query = "select * from verify where email = '"+email+"'"
    con.query(query,callback);
}

module.exports.matchtoken = function (id, token, callback) {
    var query = "select * from `verify` where id='" + id + "' and token='" + token + "' ";
    con.query(query, callback);
    console.log(query);
  };
  
  module.exports.updateverify = function (email, email_status, callback) {
    var query =
      "update `users` set `email_status`='" +
      email_status +
      "' where `email`='" +
      email +
      "'";
    con.query(query, callback);
  };

  module.exports.findOne = function (email, callback) {
    var query = "select *from users where email='" + email + "'";
    con.query(query, callback);
    console.log(query);
  };

  module.exports.temp = function (id, email, token, callback) {
    var query =
      "insert into `temp` (`id`,`email`,`token`) values ('" +
      id +
      "','" +
      email +
      "','" +
      token +
      "')";
    con.query(query, callback);
  };

  module.exports.add_doctor = function (
    first_name,
    last_name,
    email,
    dob,
    gender,
    address,
    phone,
    image,
    department,
    biography,
    callback
  ) {
    var query =
      "INSERT INTO `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) values ('" +
      first_name +
      "','" +
      last_name +
      "','" +
      email +
      "','" +
      dob +
      "','" +
      gender +
      "','" +
      address +
      "','" +
      phone +
      "','" +
      image +
      "','" +
      department +
      "','" +
      biography +
      "')";
    con.query(query, callback);
    console.log(query);
  };

  module.exports.getAllDoc = function (callback) {
    var query = "select * from doctor";
    con.query(query, callback);
  };

  module.exports.getDocbyId = function (id, callback) {
    var query = "select * from doctor where id =" + id;
    con.query(query, callback);
  };

  
  module.exports.editDoc = function (
    id,
    first_name,
    last_name,
    email,
    dob,
    gender,
    address,
    phone,
    image,
    department,
    biography,
    callback
  ) {
    var query =
      "update `doctor` set `first_name`='" +
      first_name +
      "', `last_name`='" +
      last_name +
      "', `email`='" +
      email +
      "', `dob`='" +
      dob +
      "',`gender`='" +
      gender +
      "',`address`='" +
      address +
      "',`phone`='" +
      phone +
      "',`image`='" +
      image +
      "',`department`='" +
      department +
      "',`biography`='" +
      biography +
      "' where id=" +
      id;
    con.query(query, callback);
    // console.log(query);
  };

  module.exports.deleteDoc = function (id, callback) {
    //console.log("i m here");
    var query = "delete from doctor where id=" + id;
    con.query(query, callback);
  };

  module.exports.searchDoc = function (key, callback) {
    var query = 'SELECT  *from doctor where first_name like "%' + key + '%"';
    con.query(query, callback);
    console.log(query);
  };

  module.exports.getalldept = function (callback) {
    var query = "select * from departments";
    con.query(query, callback);
  };

  module.exports.getleavebyid = function (id, callback) {
    var query = "select * from leaves where id=" + id;
    con.query(query, callback);
  };

  module.exports.deleteleave = function (id, callback) {
    var query = "delete  from leaves where id=" + id;
    con.query(query, callback);
  };

  module.exports.add_leave = function (
    name,
    id,
    type,
    from,
    to,
    reason,
    callback
  ) {
    var query =
      "Insert into `leaves` (`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) values ('" +
      name +
      "','" +
      id +
      "','" +
      type +
      "','" +
      from +
      "','" +
      to +
      "','" +
      reason +
      "')";
    console.log(query);
    con.query(query, callback);
  };

  module.exports.getAllemployee = function (callback) {
    var query = "select * from employee";
    con.query(query, callback);
  };

  module.exports.add_employee = function (
    name,
    email,
    contact,
    join_date,
    role,
    salary,
    callback
  ) {
    var query =
      "Insert into `employee` (`name`,`email`,`contact`,`join_date`,`role`,`salary`) values ('" +
      name +
      "','" +
      email +
      "','" +
      contact +
      "','" +
      join_date +
      "','" +
      role +
      "','" +
      salary +
      "')";
    con.query(query, callback);
    console.log(query);
  };

  module.exports.searchEmp = function (key, callback) {
    var query = 'SELECT  *from employee where name  like "%' + key + '%"';
    con.query(query, callback);
    console.log(query);
  };

  module.exports.deleteEmp = function (id, callback) {
    //console.log("i m here");
    var query = "delete from employee where id=" + id;
    con.query(query, callback);
  };

  module.exports.editEmp = function (
    id,
    name,
    email,
    contact,
    join_date,
    role,
    callback
  ) {
    var query =
      "update `employee` set `name`='" +
      name +
      "', `email`='" +
      email +
      "', `contact`='" +
      contact +
      "', `join_date`='" +
      join_date +
      "', `role`='" +
      role +
      "' where id=" +
      id;
    con.query(query, callback);
  };

  module.exports.getEmpbyId = function (id, callback) {
    var query = "select * from employee where id =" + id;
    con.query(query, callback);
  };

  module.exports.edit_leave = function (
    id,
    name,
    leave_type,
    from,
    to,
    reason,
    callback
  ) {
    var query =
      "update leaves set employee='" +
      name +
      "',leave_type='" +
      leave_type +
      "',date_from='" +
      from +
      "',date_to='" +
      to +
      "',reason='" +
      reason +
      "' where id=" +
      id;
    con.query(query, callback);
  };

  module.exports.add_appointment = function (
    p_name,
    department,
    d_name,
    date,
    time,
    email,
    phone,
    callback
  ) {
    var query =
      "insert into appointment (patient_name,department,doctor_name,date,time,email,phone) values ('" +
      p_name +
      "','" +
      department +
      "','" +
      d_name +
      "','" +
      date +
      "','" +
      time +
      "','" +
      email +
      "','" +
      phone +
      "')";
    con.query(query, callback);
  };
  
  module.exports.getallappointment = function (callback) {
    var query = "select * from appointment";
    con.query(query, callback);
  };
  
  module.exports.editappointment = function (
    id,
    p_name,
    department,
    d_name,
    date,
    time,
    email,
    phone,
    callback
  ) {
    var query =
      "update appointment set patient_name='" +
      p_name +
      "',department='" +
      department +
      "',doctor_name='" +
      d_name +
      "',date='" +
      date +
      "',time='" +
      time +
      "',email='" +
      email +
      "',phone='" +
      phone +
      "' where id=" +
      id;
    con.query(query, callback);
  };


module.exports.deleteappointment = function (id, callback) {
  var query = "delete from appointment where id=" + id;
  con.query(query, callback);
};

module.exports.getallmed = function (callback) {
  var query = "select *from store order by id desc";
  console.log(query);
  con.query(query, callback);
};

module.exports.addMed = function (
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "Insert into `store` (name,p_date,expire,expire_end,price,quantity) values('" +
    name +
    "','" +
    p_date +
    "','" +
    expire +
    "','" +
    e_date +
    "','" +
    price +
    "','" +
    quantity +
    "')";
  console.log(query);
  con.query(query, callback);
};

module.exports.getMedbyId = function (id, callback) {
  var query = "select * from store where id=" + id;
  con.query(query, callback);
};

module.exports.editmed = function (
  id,
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "update store set name='" +
    name +
    "', p_date='" +
    p_date +
    "',expire='" +
    expire +
    "' ,expire_end='" +
    e_date +
    "',price='" +
    price +
    "',quantity='" +
    quantity +
    "' where id=" +
    id;
  console.log(query);
  con.query(query, callback);
};

module.exports.deletemed = function (id, callback) {
  var query = "delete from store where id=" + id;
  con.query(query, callback);
};

module.exports.searchmed = function (key, callback) {
  var query = 'SELECT  *from store where name like "%' + key + '%"';
  con.query(query, callback);
};

module.exports.postcomplain = function (
  message,
  name,
  email,
  subject,
  callback
) {
  var query =
    "insert into complain (message,name,email,subject) values ('" +
    message +
    "','" +
    name +
    "','" +
    email +
    "','" +
    subject +
    "')";
  console.log(query);
  con.query(query, callback);
  console.log("sucessfully done")
};

module.exports.getcomplain = function (callback) {
  var query = "select * from complain";
  con.query(query, callback);
};


module.exports.checktoken = function (token, callback) {
  var query = "select *from temp where token='" + token + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.getappointmentbyid = function (id, callback) {
  var query = "select * from appointment where id=" + id;
  con.query(query, callback);
};

module.exports.getdeptbyId = function (id, callback) {
  var query = "select * from department where id=" + id;
  con.query(query, callback);
};

module.exports.getAllLeave = function (callback) {
  var query = "Select * from leaves";
  con.query(query, callback);
};



module.exports.createUpcomingAppointment = function (
  Pname,
  email,
  service,
  time,
  note,
  callback
) {
  var query = 
  "insert into newAppointments (name,email,service,time,note) values ('" +
   Pname +
   "' , '" +
   email +
   "' , '" +
   service +
   "' , '" +
   time +
   "' , '" +
   note +
   "')";

   con.query(query,callback)
};


module.exports.getAllNewAppointments = function(callback) {
  var query = "SELECT * FROM newAppointments";
  con.query(query, callback);
};

module.exports.getuserdetails = function (username, callback) {
  var query = "select * from users where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};