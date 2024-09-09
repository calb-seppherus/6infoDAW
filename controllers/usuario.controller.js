const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    };

    Usuario.create(usuario)
    .then(data => res.send(data))
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao criar a usuario"})
    );

};

exports.findAll = (req, res) => {
    Usuario.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
       res
    .status(500)
    .send({ message: err.message || "Erro ao buscar usuario" })
    );
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Usuario.findByPk(id).then(data => {
        if(data){
            res.send(data)
        }
        else{
            res.status(404).send({message:"não foi possivel encontrar esta usuario com o id" + id});
        }
    })
    .catch(err => 
        res
        .status(500)
        .send({mesage: err.message || "erro ao buscar por usuario"}))
};

exports.update = (req, res) => {
    const id = req.params.id

    Usuario.update(req.body, {where: {id: id}})
    .then((num) => {
        if(num == 1){
            res.send({message:"Usuario atualizada com sucesso"})
        }
        else{
            res.status(404).send({message:"Não foi possivel atualizar. Req,body vazio ou usuario não encontrada."});
        }
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro ao atualizar" });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id

    Usuario.destroy({ where: {id: id}}).then((num) => {
        if (num == 1){
            res.send({message:"usuario removida"})
        }
        else{
            res.send({message: "Usuario não encontrada. Id " + id})
        }
    })
    .catch(err => 
        res.status(500).send({ message: err.message || "erro ao deletar usuario" })
    );
};

exports.deleteAll = (req, res) => {
    Usuario.destroy({
        where: {},
        truncate: false,
    })
    .then((num) => {
        res.send({ message: `${num} usuarios foram removidos`});
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "erro a deletar todas as usuarios "});
    });
};