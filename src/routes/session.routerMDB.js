const express = require("express");
const User = require("../dao/models/user.models.js")
const passport = require("passport");
const { isAuthenticated } = require("../public/js/auth.js");

const router = express.Router()

router.post('/register', passport.authenticate('register', {failureRedirect:'failregister'}), async(req,res) =>{
        try {
            res.send({status: "success",  message: "usuario registrado"})
        } catch (err) {
            res.status(500).send('Error al registrar usuario');
        }
})
router.get('/failregister' , async(req,res) =>{
    console.log("estrategia fallida")
    res.send({error: "Fallo"})
})

router.post('/login', passport.authenticate('login', {failureRedirect: 'faillogin'}), async (req, res) => {
    console.log("Usuario autenticado:", req.user); // Verifica si req.user está definido y contiene la información del usuario autenticado
    if(!req.user) return res.status(400).send({status: "error", error:"Datos incompletos"}) 
    try {
        req.session.user = {
            nombre: req.user.nombre,
            apellido: req.user.apellido,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        };
        console.log("Sesión establecida:", req.session.user); // Verifica si la sesión del usuario se establece correctamente
        // Redirigir basado en el rol del usuario
        console.log("Redirigiendo a admin:", req.user); // Verifica si se redirige correctamente a la página de admin
        if (req.user.role === 'admin') {
            return res.redirect('/api/views/realtimeProducts');
        } else {
            console.log("Redirigiendo a home:", req.user); // Verifica si se redirige correctamente a la página de inicio
            return res.redirect('/api/views/home');
        }

    } catch (err) {
        console.error("Error al establecer la sesión:", err); // Manejo de errores al establecer la sesión del usuario
        res.status(500).send('Error al iniciar sesión');
    }
});
router.get('/faillogin' , async(req,res) =>{
    console.log("login fallido")
    res.send({error: "Login fallido"})
})
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/api/views/login');
    });
})

router.post('/changepassword', async (req, res) => {
    const { email, 'current-password': currentPassword, 'new-password': newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        // Verificar que la contraseña actual coincida
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).send('Contraseña actual incorrecta');
        }
        // Actualizar la contraseña
        user.password = newPassword; // El gancho `pre('save')` manejará el hash de la contraseña
        await user.save();
        res.send('Contraseña actualizada exitosamente');
    } catch (err) {
        res.status(500).send('Error al actualizar la contraseña');
    }
});

router.get('/github', passport.authenticate('github', {scope: 'user.email'}), async(req,res) =>{
    
})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async(req,res) =>{
    req.session.user = req.user
    res.redirect('/api/views/home');
})


module.exports = router;