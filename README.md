# ð² Northcoders House of Games APâï¸

ð¹ï¸ Hello and welcome to my Games API project! ð¹ï¸

I have built a backend service to host Games, which provides data and information to the front end architecture.
You can access the application programmatically by fetching, posting, updating, and deleting data through a client/user.

You can also access my Games API live by clicking on this link ð [here](https://nayems-be-nc-games.onrender.com/api) or by copying the following url to your browser ð `https://nayems-be-nc-games.onrender.com/api`, which describes all the possible end points for this API.

To use and test this API please follow the steps below.
Important Notes: You will need to have PostgreSQL v12.0 and Node.js v19.3.0 or later!

## ð¥ Getting started

First you need to clone this repository to your local machine by using ð `git clone https://github.com/Nayem59/Nayems-BE-NC-Games.git`

Next we need to install the following dependencies by using `npm install `:

`dotenv`

`express`

`pg`

`pg-format`

To test the API, I would recommend you installing the following devDependencies by using `npm install `:

`jest`

`jest-extended`

`supertest`

## ð§© Setting up Environment Variables

You need to connect to 2 databases locally, please add some.env files to your local project.
The 3rd File is only necessary if you want to host and render the API online.

1. dev File

`.env.development`

This connects to your development database.

Write this into the file: PGDATABASE=data_base_name

2. test File

`.env.test`

This connects to your test database.

Write this into the file: PGDATABASE=data_base_name_test

3. prod File

To host your database online visit this free service using this website ð `https://www.elephantsql.com/` and create your instance.

Create this .env file:

`.env.production`

This connects and sets up your production database.

Write this into the file and paste your instance URL: DATABASE_URL=yourInstanceURL

## ð± Setting up the database

To set up and seed your database please run the following commands:

`npm run setup-dbs`

ð±  `npm run seed`

## ð Running tests

I am using `supertest` and `jest` to carry out all my tests.

ð Please check the steps `Getting started` above to make sure you have installed the right devDependencies.

ð Please check the steps `Setting up Environment Variables` above to make sure you have created the right .env test file.

Supertest does the database seeding automatically for us.

To run the test please use the following command:

`npm test app`

## ð Hosting and running the server

To host your API and render it online you can use a free service on ð `https://render.com/`. Create an new web service where you can connect your elephantsql instance database and connect your repository.

Please use the following command to run your server:

`npm run start`

Finally you can deploy your API on render dashboard.