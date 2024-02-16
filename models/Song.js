const { db, DataTypes, Model} = require('../db');

// TODO - define the Song model
class Song extends Model {};

Song.init({
    title: DataTypes.STRING,
    year: DataTypes.NUMBER,
    length: DataTypes.NUMBER
}, {
    sequelize: db,
    modelName: "Song"
})

module.exports = {
    Song
};