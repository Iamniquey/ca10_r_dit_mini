# Welcome to the R'dit Mini App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is an app for a Codecademy Portfolio Project requiring the creation of a reddit application.

## View App

You can view the app live at [web address]().

## To Run Locally

The following dependencies must be installed for local running of this project:

```terminal
npm i @reduxjs/toolkit react-redux react-router-dom he
```

In the project directory, you can run the following command to start a local deployment:

```terminal
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

## Wireframe

The following wireframe was created in Figma.

[R'dit app wireframe on Figma](https://www.figma.com/proto/q3qgQUuMN1WKehqOD4fz9s/R'dit-Mini-Wireframe?node-id=2-2&p=f&t=FOeHOheM09Ij6K1U-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2)

## Technologies Used

This project used the following technologies:

- VSCode: coding environment
- Reddit JSON API: free API to get the json version of a reddit page
- Figma: wireframing
- Jest: test coverage
- Redux: global state management
- React-redux: pass the redux store throughout react components
- React-router-dom: routing
- He: html decoding

## Features

The app features **a home page with the main posts** from the subreddit **[r/SmallYTChannel](https://www.reddit.com/r/SmallYTChannel/)**.

Post are displayed with embedded html rendered as on the reddit site.

Upon clicking on the title of a post, the user is taken to a **post page** which shows all the post **comments** collected via the Reddit Json api.

Post comments are indented based on reply level.


https://markdownlivepreview.com/