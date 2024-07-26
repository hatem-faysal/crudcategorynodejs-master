const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const Category = require('../../app/Models/CategoryModel');
const dbConnection = require('../../config/database');


dotenv.config({
    path: '../../config.env'
});

//connect to DB
dbConnection();

//Read data
const categories = JSON.parse(fs.readFileSync('../factories/category.json'));

//Insert data into DB
const insertData = async () => {
    try {
        await Category.create(categories);
        console.log('Data Inserted'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    };
}

//Delete data from DB
const destroyData = async () => {
    try {
        await Category.deleteMany();
        console.log('Data Destroyed'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    };
}

// need seeder.js
if(process.argv[2] === '-i'){
    insertData();
} else if(process.argv[2] === '-d') {
    destroyData();
}
