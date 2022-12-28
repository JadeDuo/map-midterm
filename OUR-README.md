# Midterm Project - Wiki Map

A web app that allows users to collaboratively create maps which display custom, user-created map markers referencing movie filming locations.

This app was built as a mid-term group project during the Lighthouse Labs Web Development bootcamp. It was created with a combination HTML, CSS, Javascript, jQuery, Ajax, PostgreSQL and the Google Maps API, the server-side skeleton was provided to us by Lighthouse as part of the project foundation.

Our Wiki Map app allows users to see a list of maps showing the shooting locations of various films in that area If the user is logged in, they can create new maps, or add/edit/delete pins on an existing map. A pin contains a title, description, and image provided by the user via web form; users are also able to select a custom map pin from a list of icons that best represents the genre of the associated film(s).

Users also have a profile page, which highlights any maps a user has favorited, and also any maps they have directly contributed to by adding a custom marker(s). A non-logged in user has access to view maps, but does not have the ability to make any kind of changes to a map or the existing markers. 

## Final Product

!["Screenshot of Wiki Map view map section"]()
!["Screenshot of Wiki Map creating new map marker"]()
!["Screenshot of Wiki Map profile section"]()

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

## Getting Started

- Install all dependencies (using the `npm install` command).
- Start the web server using the `npm run local` command.
- Go to <http://localhost:8080/> in your browser.
- Start adding your favorite film locations!