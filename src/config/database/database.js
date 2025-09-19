import {Sequelize} from "sequelize"
const sequelize = new Sequelize("meubanco","root","",{
  host: "localhost",
  dialect: "mariadb"
  })
export default sequelize