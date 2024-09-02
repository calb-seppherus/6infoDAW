module.exports = (app) => {
    const lojas = require("../controllers/loja.controller");
    var router = require("express").Router();

    router.post("/", lojas.create);

    app.use("/lojas", router);
};