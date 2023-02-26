## Project title

Book library - an exercise of Sequelize Model. Sequelize can perform **CRUD** operations in relational database (postgres SQL). And Sequelize can perform foreign key association with tables.

## Project setup

### Environment setup

1. Docker - run
   ```
   docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
   ```
2. pgAdmin - setup database serviers 'postgres'
3. Postman

### API setup

1. change to working directory, i.e. /projects
2. run
   ```
   git clone https://github.com/DavidCheungTW/book-library.git
   cd book-library
   npm install
   ```
3. Environment variables

   Create a `.env` file in the root of the repo with the following values:

   ```
   PGPASSWORD=password
   PGDATABASE=book_library_dev
   PGUSER=postgres
   PGHOST=localhost
   PGPORT=5433
   ```

   Create a `.env.test` file in the root of the repo with the following values:

   ```
   PGPASSWORD=password
   PGDATABASE=book_library_dev_test
   PGUSER=postgres
   PGHOST=localhost
   PGPORT=5433
   ```

## Tests

### Test by node

1. use 'book_library_dev_test' database
2. change to book-library directory
3. run 'npm test' to execute the test
4. add test case to \*.test.js files
5. run 'npm test' to execute the test again

### Test by Postman

1. use 'book_library_dev' database
2. change to book-library directory
3. run 'npm start' to start testing
4. input test cases in Postman and check results (remark: suggest to use \*.test.js test cases first, then you can add your own test case)

## Outstanding question

For `Book.belongsTo(Author) and Book.belongsTo(Genre)`, when Book record is created with foreign key that is not existed in Author or Genre tables, API cannot handle.

## Credits

### Recommended Reading List

- [Sequelize](https://sequelize.org/)
- [Sequelize with Express](https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz)
- [Sequelize - Pre-attribute validations](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
- [associations in the Sequelize](https://sequelize.org/docs/v6/core-concepts/assocs/)

### Special help from Will Hodgkinson

- [Op.or Sequelize](https://www.loom.com/share/bde8892663434dd48fb47ee19afcc4e8)
- [Sequelize Not Null Validation for foreign key](https://www.loom.com/share/800a0ef1b8d843009407e63316e79d76)

## License

Free license

MCRCODES © [David Cheung]()
