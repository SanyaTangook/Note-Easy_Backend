import "reflect-metadata"
import { DataSource } from "typeorm"



export const AppDataSource = new DataSource({
    type: "mongodb",
    host:"localhost",
    port: 27017,
    database: "NoteEasy",
    synchronize: true,
    logging: true,
    entities: ['src/entity/*.ts'],
    migrations: [],
    subscribers: [],
})
