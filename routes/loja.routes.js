module.exports = (app) => {
    const lojas = require("../controllers/loja.controller");
    var router = require("express").Router();

    // Rota que cria uma loja
    router.post("/", lojas.create);
    // Rota que retorna todas as lojas
    router.get("/", lojas.findAll);
    // Rota que retorna uma loja pelo id
    router.get("/:id", lojas.findOne,);
    // Rota que atualiza uma loja pelo id
    router.put("/:id", lojas.update);
    // Rota para deletar uma loja pelo id
    router.delete("/:id", lojas.delete);
    // Rota para deletar todas as lojas
    router.delete("/", lojas.deleteAll);

    app.use("/lojas", router);
};