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
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.categoria = require("./categoria.model.js")(sequelize, Sequelize);

//Relacionamento 1:1
db.usuario.hasOne(db.lojas);
db.lojas.belongsTo(db.usuario);

//Relacionamento 1:*
db.lojas.hasMany(db.produtos);
db.produtos.belongsTo(db.lojas);

//Relacionamento *:*
db.produtos.belongsToMany(db.categoria, {through:"produtos_categoria"});
db.categoria.belongsToMany(db.produtos, {through:"produtos_categoria"});

module.exports = db;