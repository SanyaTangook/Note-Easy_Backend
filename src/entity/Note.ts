import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity()
export class Note {

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    Title: string

    @Column()
    content: string

    @Column()
    Date: String

}
