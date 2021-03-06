'use strict';

module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    connectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Connections'
        },
      },
    },
  })

  Album.associate = function(models) {
    Album.belongsTo(models.Connection, { foreignKey: 'connectionId' })
    Album.hasMany(models.Photo, { foreignKey: 'albumId' })
  };

  return Album;

};
