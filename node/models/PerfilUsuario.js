
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Usuario } from "./Usuario.js";

export const PerfilUsuario = sequelize.define(
  "PerfilUsuario",
  {
    id_usuario: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      references: {
        model: Usuario,
        key: "id",
      },
    },
    saldo_inicial: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.0,
    },
    perfil_inversion: {
      type: DataTypes.ENUM("CONSERVADOR", "MODERADO", "AGRESIVO"),
      defaultValue: "MODERADO",
    },
    telefono: {
      type: DataTypes.STRING(30),
    },
  },
  {
    tableName: "perfil_usuario",
    timestamps: false,
  }
);

// Relación 1:1
Usuario.hasOne(PerfilUsuario, { foreignKey: "id_usuario" });
PerfilUsuario.belongsTo(Usuario, { foreignKey: "id_usuario" });
