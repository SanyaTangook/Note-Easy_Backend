'use strict'

import { Server } from "@hapi/hapi";
import { Note } from "./entity/Note";
import { History} from "./entity/History";
import { Customer } from "./entity/Customer";
import { Category } from "./entity/Category";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(()=>{
    console.log("Connected")
}).catch((err) =>{
    console.log(err)
}) 



const init = async () => {
    const server = new Server({
        port: 3001,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: '/Note',
        handler: async (require, h) => {
            var note = new Note()
            var history = new History()
            var customer = new Customer()
            var category = new Category()
            var info = require.payload
            note.Title = info['Title']
            note.content = info['content']
            note.Date = info['Date']

            history.NameTitle =info['Title']
            history.NameCustomer = info['FName']
            history.Date = info['Date']

            customer.firstName = info['FName']
            customer.lastName = info['LName']
            customer.Title = info['Title']

            category.Title = info['Title']
            category.Category = info['Category']
            AppDataSource.manager.save([note , history , customer , category])

            return 'Successful'
        },
    })

    server.route({
        method: 'DELETE',
        path: '/Note',
        handler: async (require , h)=>{
            const Title = require.payload['Title']

            const removenode = await AppDataSource.getMongoRepository(Note).deleteOne({Title: Title})
            return removenode
        }
    })


    server.route({
        method: 'GET',
        path: '/Tags',
        handler:async (require, h) => {
            var Tags = await AppDataSource.getMongoRepository(Category).find()
            return Tags;
        }
    })

    server.route({
        method: 'GET',
        path: '/Note',
        handler:async (require, h) => {
            var note = await AppDataSource.getMongoRepository(Note).find()
            return note
        }
    })

    server.route({
        method: 'GET',
        path: '/Note/{id}',
        handler:async (require, h) => {
            var note = await AppDataSource.getMongoRepository(Note).find({Title: require.params.id})
            return note
        }
    })

    server.route({
        method: 'GET',
        path: '/History',
        handler:async (require, h) => {
            var history = await AppDataSource.getMongoRepository(History).find()
            return history;
        }
    })

    server.route({
        method: 'GET',
        path: '/Customer',
        handler:async (require, h) => {
            var customer = await AppDataSource.getMongoRepository(Customer).find()
            return customer;
        }
    })

    await server.start();
    console.log('Server runing on %s', server.info.uri)
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();