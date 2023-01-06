# Midterm Project - Movie Mapper

A web app that allows users to collaboratively create maps which display custom, user-created map markers referencing movie filming locations.

This app was built as a mid-term group project during the Lighthouse Labs Web Development bootcamp. It was created with a combination HTML, CSS, Javascript, jQuery, Ajax, PostgreSQL and the Google Maps API, the server-side skeleton was provided to us by Lighthouse as part of the project foundation.

Our Movie Mapper app allows users to see a list of maps showing the shooting locations of various films in that area. If the user is logged in, they can create new maps, and add or delete markers on an existing map. A marker contains a title, description, and image provided by the user via web form; users are also able to select a custom map marker from a list of icons that best represents the genre of the associated film(s).

Anyone can view the full list of maps currently created without logging into the app. In addition, users can view all their created maps in a convenient view, and can also save maps as faves, which lists any maps a user has favorited.

## Final Product

!["Screenshot of Home"]()
!["Screenshot of Create Map"]()
!["Screenshot of Edit Map"]()

## Dependencies

- Chalk
- Dotenv
- EJS
- Express
- JQuery
- Morgan
- Sass
- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Gulp
- Bootstrap 5.2

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the build step using the `npm run gulp` command.
- Start the web server using the `npm run local` command.
- Go to <http://localhost:8080/> in your browser.
- Start adding your favorite film locations!
