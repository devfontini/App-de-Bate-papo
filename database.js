const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("🟢 Banco de dados conectado!");
    } catch (err) {
        console.error("❌ Erro ao conectar no MongoDB", err);
    }
};

module.exports = connectDB;
