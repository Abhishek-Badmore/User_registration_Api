const mongoose = require("mongoose");
//const DB = process.env.DATABASE;
const DB = process.env.DATABASE;

mongoose
  .connect(
    "mongodb+srv://abhi:abhi123@proshop.t47rc.mongodb.net/studentsapi?retryWrites=true&w=majority",
    {
      //   useNewUrlParsed: true,
      //   useCreateIndex: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: false,
    }
  )
  .then(() => {
    console.log(`connection successful....`);
  })
  .catch((err) => console.log(err));
