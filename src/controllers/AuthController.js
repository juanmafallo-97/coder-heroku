const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        console.log("Usuario logueado");
        res.redirect("/");
    } else {
        console.log("El usuario no está registrado");
        res.render("login");
    }
};

const failLogin = (req, res) => {
    console.log("Error en el login");
    res.render("login-error", {});
};

const getLogout = (req, res) => {
    req.logout();
    res.redirect("/");
};

const getSignup = (req, res) => {
    res.render("signup");
};

const failSignup = (req, res) => {
    console.log("Error en el registro");
    res.render("signup-error", {});
};

module.exports = {
    getLogin,
    getLogout,
    failLogin,
    getSignup,
    failSignup
};
