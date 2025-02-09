const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("./models");

async function register(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Usuário registrado!" });
}

async function login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Credenciais inválidas!" });
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.json({ token });
}

module.exports = { register, login };
