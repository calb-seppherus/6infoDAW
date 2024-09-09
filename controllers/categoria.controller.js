const db = require("../models");
const Categoria = db.categorias;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const categoria = {
        nome: req.body.nome
    };

    Categoria.create(categoria)
    .then(data => res.send(data))
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao criar a categoria"})
    );

};

exports.findAll = (req, res) => {
    Categoria.findAll().then((data) => res.send(data))
    .catch((err) =>
       res.status(500).send({ message: err.message || "Erro ao buscar categoria" })
    );
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Categoria.findByPk(id).then(data => {
        if(data){
            res.send(data)
        }
        else{
            res.status(404).send({message:"não foi possivel encontrar esta categoria com o id" + id});
        }
    })
    .catch(err => 
        res
        .status(500)
        .send({mesage: err.message || "erro ao buscar por categoria"}))
};

exports.update = (req, res) => {
    const id = req.params.id

    Categoria.update(req.body, {where: {id: id}})
    .then((num) => {
        if(num == 1){
            res.send({message:"Categoria atualizada com sucesso"})
        }
        else{
            res.status(404).send({message:"Não foi possivel atualizar. Req,body vazio ou categoria não encontrada."});
        }
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro ao atualizar" });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id

    Categoria.destroy({ where: {id: id}}).then((num) => {
        if (num == 1){
            res.send({message:"categoria removida"})
        }
        else{
            res.send({message: "Categoria não encontrada. Id " + id})
        }
    })
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao deletar categoria" })
    );
};

exports.deleteAll = (req, res) => {
    Categoria.destroy({
        where: {},
        truncate: false,
    })
    .then((num) => {
        res.send({ message: `${num} categorias foram removidas`});
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro a deletar todas as categorias "});
    });
};