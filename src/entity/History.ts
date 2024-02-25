import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity()
export class History {

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    NameTitle: string

    @Column()
    NameCustomer: string

    @Column()
    Date: String

}
