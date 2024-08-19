module.exports = (sequelize, Sequelize) => {
    const Produto = sequelize.define( "produto", {
        nome: { type: sequelize.STRING  },
        preco: { type: sequelize.FLOAT },
        descricao: { type: sequelize.STRING },
    },
//Garante que o nome da tabela no banco seja igual ao que informamos entre 
//aspas com o sequelize.define()
    { freezeTableName: true }
);
return Produto;
};