To run the app: 
1. Clone or download the repository.

2. 'cd $folder_name'

3. run 'npm install'

4. run 'npm start'

This application allows users to search for News information based on the value selected from toggle(Guardian or New York Time). Detail description is provided using an interactive UI using React Bootstrap cards. On clicking individual card, user is redirected to detail article ,where user can bookmark, share and comment on the article. Also, user can search for any news from the top search bar and the result will be in form of cards again. In the bookmarks tab all the favorites can be seen and deleted if needed.

I chose to go with React for the entire application as it is versatile and efficient and more adaptable to third party APIs. I have used CSS with glamor for styling components. I chose to keep the components distinct and separate as it's reusable for future scaling. 
Several different plugins in React were used: For user aesthetic and ease of use, I chose CommentBox.io. 
For each article I have also added the share button to Facebook, Twitter and Email using 'react-share' plugin.

- I have used New York Times API as well as Guardian API for the diversity in news. There is also a bookmark tab which will display the bookmarks using browser data(local storage). 
- There are tabs for different types of news -World, Technology, Politics, etc..
- I have retrieved the top 10 news headlines of the day for each.

The NY Times API provides the headline and an image for each news item.
The Guardian API provides the entire article along with an image and headline.

I have also added tags to the headlines so it's easier for the user to identify as well as for future development(Search Filters)


Future development: 
1. Sign in/ Authenticate users.
2. Complete the comment section and store it in a DB.
3. Filtering comments.
4. Retrieve more data-news articles per each GET request. 

BY - Sanjana Raj


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
