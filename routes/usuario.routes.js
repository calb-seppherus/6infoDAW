module.exports = (app) => {
    const usuarios = require("../controllers/usuario.controller");
    var router = require("express").Router();

    // Rota que cria uma usuario
    router.post("/", usuarios.create);
    // Rota que retorna todas as usuarios
    router.get("/", usuarios.findAll);
    // Rota que retorna uma usuario pelo id
    router.get("/:id", usuarios.findOne,);
    // Rota que atualiza uma usuario pelo id
    router.put("/:id", usuarios.update);
    // Rota para deletar uma usuario pelo id
    router.delete("/:id", usuarios.delete);
    // Rota para deletar todas as usuarios
    router.delete("/", usuarios.deleteAll);

    app.use("/usuarios", router);
};