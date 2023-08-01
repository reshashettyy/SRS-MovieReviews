
# My Page - Explanation

**How To Use**

To watch a movie trailer, the user can click on the movie poster, and it will open the trailer link in a new tab.

*To add a new trailer link for a movie:*
- Select the movie from the "Select Movie" dropdown list.Enter the URL of the trailer in the "Trailer Link" text field.
- Click on the "Add Trailer" button to add the trailer link to the database.

*To view the trailer link for a selected movie:*

- Click on the "Show Trailer Link" button.
- If a trailer link is available for the selected movie, it will be displayed below the button.
- If the trailer link is not available, an error message will be shown.

In the "Current News" section, the user will find news articles related to movies. Clicking on a news article will open the respective article link in a new tab.

The user can also navigate to other pages using the navigation links in the top-right corner of the page.

**The following APIs are used on this page:**

*Load Movies API:* This API fetches a list of movies from the server. It is used to populate the "Select Movie" dropdown list on the frontend.

*Add Trailer API:* This API allows users to add a new trailer link for a selected movie. The movieID and trailerLink are sent as JSON data in the request body.
