# My Page

**Top Movies Display:** The component displays a section with a list of top movies. Each movie in the list is represented by an image, title, and description. The images are initially displayed in grayscale and enlarge slightly on hover. Clicking on a movie's image opens the corresponding movie trailer link in a new tab.

**Movie Selection:** The component provides a dropdown menu that allows users to select a movie from a list of available movies. The movies available in the dropdown are fetched from a server API during component initialization.

**Add Movie Trailer:** Users can add a movie trailer link by selecting a movie from the dropdown menu and providing a trailer link in a text field. Clicking the "Add Trailer" button triggers an action, and the selected movie and trailer link are logged to the console. The input fields are then reset for the next entry.

**API Integration:** The component fetches a list of movies from a server API using fetch and populates the dropdown menu with the retrieved movie names.