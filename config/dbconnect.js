const { default: mongoose } = require("mongoose");

const dbconnect = () => {
	try {
		const conn = mongoose.connect(process.env.MONGODB_URL);
		console.log("Database connection successfull...");
	} catch (error) {
		console.log(`Database connection failed!: ${error}`);
	}
};

module.exports = dbconnect;
