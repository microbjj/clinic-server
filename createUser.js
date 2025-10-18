const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require("dotenv");

dotenv.config();

async function createUser(email, password) {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('MongoDB connected'))
            .catch((err) => console.error('MongoDB connection error:', err));

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('Хешированный пароль:', hashedPassword);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Пользователь с таким email уже существует:', email);
            return;
        }

        const user = new User({
            email: email,
            password: hashedPassword,
        });

        await user.save();
        console.log('Пользователь успешно создан:', { email });

        await mongoose.connection.close();
        console.log('MongoDB соединение закрыто');
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

createUser('admin@mail.ru', 'qwe123');