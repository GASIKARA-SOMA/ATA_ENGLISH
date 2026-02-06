// server.cjs
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir le front-end statique (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Routes (exemples)
const userRoutes = require('./routes/user.routes');  // routes utilisateurs
const adminRoutes = require('./routes/admin.routes'); // routes admin
const fileRoutes = require('./routes/file.routes');  // routes fichiers
const chatRoutes = require('./routes/chat.routes');  // routes chat

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/files', fileRoutes);
app.use('/chat', chatRoutes);

// Fallback pour front-end (si page non trouvée)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Démarrer le serveur
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
