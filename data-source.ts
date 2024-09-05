import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_DATABASE } = process.env;

const dbPassword = String(process.env.DB_PASSWORD);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: dbPassword,
  database: DB_DATABASE,
  synchronize: false,
  logging: true,
  entities:  [__dirname + '/../**/infra/adapters/entities/*.entity.{ts,js}'],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
});
