# CoolMovieDB

Page not finished!

# Todo

-   [x] Movie page
-   [x] User profile page
-   [x] Connect MovieDatabaseAPI
-   [x] User Login/signup
-   [x] Add review
-   [x] Upload user avatar
-   [x] Show on main page top rated tvseries / upcoming movies
-   [x] Fix nav
-   [x] Update all reviews with new avatar img

## Tech Stack

**Client:** React
**Server:** Node

## Run Locally

Clone the project

```bash
  git clone https://github.com/K1337xz/Movie-database-react.git
```

Go to the project directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Press "o" to open in browser

The server will start at: http://localhost:3000/

## Run Server

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. To get API_KEY vistit https://www.themoviedb.org/settings/api

`VITE_API_KEY`

`DB`

`JWT_KEY`

Where DB is your [connect with moongodb](https://www.mongodb.com/docs/atlas/driver-connection/) for example :

```bash
  mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority
```
