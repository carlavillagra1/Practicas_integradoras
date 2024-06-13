const isAuthenticated = (req, res, next) => {
    console.log('Verificando autenticación:', req.isAuthenticated(), req.session.user);
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/api/views/login');
    }
};

const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect('/api/views/profile');
    }
}
module.exports = { isAuthenticated, isNotAuthenticated };