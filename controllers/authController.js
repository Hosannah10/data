const jwt = require('jsonwebtoken');
const fs = require('fs');
const staffs = JSON.parse(fs.readFileSync('./data/staffs.json'));
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = staffs.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};

exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};