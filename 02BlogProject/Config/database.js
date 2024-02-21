const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(
        () => { console.log(`connection with database is successfull`); }
    ).catch(
        (error) => {
            console.log(error.message);
            process.exit(1);
        }
    )
}
module.exports = dbConnect;   