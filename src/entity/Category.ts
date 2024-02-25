import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity()
export class Category {

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    Category: string

    @Column()
    Title: string
}
