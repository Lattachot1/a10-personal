const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
/*
{
  "success": true,
  "_id": "68e72ebb65f189a0edd5b02a",
  "name": "test11",
  "email": "test@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTcyZWJiNjVmMTg5YTBlZGQ1YjAyYSIsImlhdCI6MTc1OTk4MTI0MywiZXhwIjoxNzkxNTE3MjQzfQ.cBVz1LtyGoRlQ1MYxUpEQkcod15I7Xw6L5RvOWSE7jA"
}*/