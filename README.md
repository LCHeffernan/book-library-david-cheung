## Project title

Book library - an exercise of Sequelize Model. Sequelize can perform **CRUD** operations in relational database (postgres SQL). And Sequelize can perform foreign key association with tables.

### User Stories

Here are the user stories for the application:

1. Create library account

```
As a library customer
I want to create an account with my name, email address and password
So I can list and borrow books from the online library
```

2. Don't return library account password

```
As a library customer
I want my password to not be returned from the API
So my account is more secure
```

3. Email validation on sign up

```
As a library customer
I want to receive an error if the email address I sign up with is not valid
So I can receive emails
```

4. Password length validation on sign up

```
As a library customer
I want to receive an error if the password I sign up with is less than 8 characters long
So my account is secure
```

5. Add book listings for lending

```
As a book lender
I want to be able to create a book listing on my account with a title, author, genre and ISBN number
So people can loan out my books
```

6. Title and author should be mandatory

```
As a library customer
I want all book listings to have at least a title and an author
So I know what I'm looking at
```

7. Display books for lending

```
As a library customer
I want to see a list of all books
So I can find books to borrow
```

8. Search for books by fields

```
As a library customer
I want to be able to search for books with a specific title, author, genre or ISBN
So I can find books I am interested in
```

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
   PGPORT=5432
   PORT=3000
   ```

   Create a `.env.test` file in the root of the repo with the following values:

   ```
   PGPASSWORD=password
   PGDATABASE=book_library_dev_test
   PGUSER=postgres
   PGHOST=localhost
   PGPORT=5432
   PORT=3000
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
5. Example:

Add Author record:
POST : http://localhost:3000/authors
BODY/RAW/JSON :
{
"author":"J. K. Bowling"
}
Response Body:

```
{
"id": 1,
"author": "J. K. Rowling",
"createdAt": "2023-02-27T09:32:56.215Z",
"updatedAt": "2023-02-27T09:32:56.215Z"
}
```

Add Genre record:
POST : http://localhost:3000/genres
BODY/RAW/JSON :
{
"genre":"Fiction"
}
Response Body:

```
{
"id": 1,
"genre": "Fiction",
"updatedAt": "2023-02-27T09:51:31.388Z",
"createdAt": "2023-02-27T09:51:31.388Z"
}
```

Add Book record:
POST : http://localhost:3000/books
BODY/RAW/JSON :
{
"title":"harry potter and the deathly hallows",
"ISBN":"9780329499983",
"AuthorId":1,
"GenreId":1
}

```
Response Body:
{
"id": 2,
"title": "harry potter and the deathly hallows",
"ISBN": "9780329499983",
"AuthorId": 1,
"GenreId": 1,
"updatedAt": "2023-02-27T09:50:49.470Z",
"createdAt": "2023-02-27T09:50:49.470Z"
}
```

Add Reader record:
POST : http://localhost:3000/readers
BODY/RAW/JSON :
{
"name":"David Cheung",
"email":"davidcheung@gmail.com",
"password":"12345678"
}
Response Body:

```
{
"id": 1,
"name": "David Cheung",
"email": "davidcheung@gmail.com",
"updatedAt": "2023-02-27T09:40:11.047Z",
"createdAt": "2023-02-27T09:40:11.047Z"
}
```

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
