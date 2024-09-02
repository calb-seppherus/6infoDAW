const config = require("../config/db.config.js");


const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    config
);

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.produtos = require("./produto.model.js")(sequelize, Sequelize);
db.lojas = require("./loja.model.js")(sequelize, Sequelize);
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.categorias = require("./categoria.model.js")(sequelize, Sequelize);

//Relacionamento 1:1
db.usuarios.hasOne(db.lojas);
db.lojas.belongsTo(db.usuarios);

//Relacionamento 1:*
db.lojas.hasMany(db.produtos);
db.produtos.belongsTo(db.lojas);

//Relacionamento *:*
db.produtos.belongsToMany(db.categorias, {through:"produtos_categoria"});
db.categorias.belongsToMany(db.produtos, {through:"produtos_categoria"});

module.exports = db;