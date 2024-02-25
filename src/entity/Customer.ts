import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity()
export class Customer {

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    Title: string

}
