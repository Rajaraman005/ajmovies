// Get the search input
const searchInput = document.getElementById("search");

// Get the container for displaying search results
const searchResults = document.getElementById("search-results");

// Function to filter and display movies
function filterMovies(query) {
  // Get all movie list items
  const movieListItems = document.querySelectorAll(".movie-list-item");

  // Clear previous search results
  searchResults.innerHTML = "";

  // Create a flag to check if any movie matches the query
  let foundMovie = false;

  // Loop through each movie list item
  movieListItems.forEach((item) => {
    const title = item
      .querySelector(".movie-list-item-title")
      .textContent.toLowerCase();

    // Check if the movie title contains the search query
    if (title.includes(query.toLowerCase())) {
      // If it contains the query, show the movie item
      item.style.display = "block";

      // Create a result element for this movie
      const resultItem = document.createElement("div");
      resultItem.textContent = title;
      searchResults.appendChild(resultItem);

      foundMovie = true;
    } else {
      // If it doesn't contain the query, hide the movie item
      item.style.display = "none";
    }
  });

  // Display a message when no movie is found
  if (!foundMovie) {
    const noResultItem = document.createElement("div");
    noResultItem.textContent = "Movie not found";
    searchResults.appendChild(noResultItem);
  }
}

// Event listener for input in the search field
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim();
  filterMovies(searchTerm);
});

// Event listener to close search results when clicking outside
document.addEventListener("click", (event) => {
  if (
    event.target !== searchInput &&
    event.target !== searchResults &&
    !searchResults.contains(event.target)
  ) {
    // Clicked outside the search input and search results
    searchResults.innerHTML = "";
  }
});

// Get all the arrows
const arrows = document.querySelectorAll(".arrow");

// Define the number of items to move for each container
const itemsToMove = [1, 2]; // Move 1 item for the first container and 2 items for the second container

// Initialize click counters for each container
const clickCounters = [0, 0];

arrows.forEach((arrow, i) => {
  const movieList = document.querySelector(`.movie-list:nth-child(${i + 1})`);
  const itemNumber = movieList.querySelectorAll("img").length;

  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);

    // Increment the click counter for the current container
    clickCounters[i] += itemsToMove[i];

    // Calculate the maximum number of items that can be moved
    const maxItemsToMove = itemNumber - (4 + clickCounters[i]) + (4 - ratio);

    // Check if it's within bounds
    if (maxItemsToMove >= 0) {
      // Calculate the new X position based on the number of items to move
      const newX =
        movieList.computedStyleMap().get("transform")[0].x.value -
        300 * itemsToMove[i];

      // Apply the new transform
      movieList.style.transform = `translateX(${newX}px)`;
    } else {
      // If out of bounds, reset to the initial position
      movieList.style.transform = "translateX(0)";

      // Reset the click counter
      clickCounters[i] = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

// JavaScript to make movie list items draggable
const movieList = document.getElementById("draggable-movie-list");

let isDragging = false;
let initialX;
let offsetX = 0;

movieList.addEventListener("mousedown", (e) => {
  isDragging = true;
  initialX = e.clientX - offsetX;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const newX = e.clientX - initialX;
  movieList.style.transform = `translateX(${newX}px)`;
  offsetX = e.clientX - initialX;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Function to handle infinite loop
function handleInfiniteLoop() {
  const movieListWidth = movieList.offsetWidth;
  const containerWidth = movieList.parentElement.offsetWidth;

  if (containerWidth < movieListWidth) {
    if (movieList.getBoundingClientRect().right <= containerWidth) {
      const firstItem = movieList.children[0];
      movieList.appendChild(firstItem.cloneNode(true));
    }
  }
}

// Call handleInfiniteLoop when the user scrolls within the container
movieList.parentElement.addEventListener("scroll", handleInfiniteLoop);

// Initial call to handleInfiniteLoop
handleInfiniteLoop();

// Get movie list containers
const movieListContainers = document.querySelectorAll(".movie-list-container");

movieListContainers.forEach((container) => {
  // Get the movie list inside the container
  const movieList = container.querySelector(".movie-list");

  // Add a scroll event listener to the container
  container.addEventListener("scroll", () => {
    // Calculate the scroll amount and move the movie items accordingly
    const scrollAmount = container.scrollLeft;
    movieList.style.transform = `translateX(-${scrollAmount}px)`;
  });
});

// TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle,.menu-list-item,.logo"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});
const content = [
  {
    description: "Viswasam",
    background: "url('mainimg/vs.WebP')",
  },
  {
    description: "dil bechara",
    background: "url('mainimg/SS.WebP')",
  },

  {
    description: "Leo",
    background: "url('mainimg/leo.WebP')",
  },
];

// Check if there's a stored index in local storage, and use it if available
let currentIndex = localStorage.getItem("currentIndex");
if (currentIndex === null || currentIndex >= content.length) {
  currentIndex = 0; // Default to 0 if no stored index or out of bounds
}

function changeFeaturedContent() {
  const featuredDesc = document.querySelector(".featured-desc");
  const featuredContent = document.querySelector(".featured-content");

  // Get the content item at the current index
  const currentItem = content[currentIndex];

  // Set the background image
  featuredContent.style.backgroundImage = currentItem.background;

  // Set the description text
  featuredDesc.textContent = currentItem.description;

  // Increment the index for the next iteration
  currentIndex = (currentIndex + 1) % content.length;

  // Store the updated index in local storage
  localStorage.setItem("currentIndex", currentIndex);
}

// Call the changeFeaturedContent function initially
window.addEventListener("load", () => {
  changeFeaturedContent();

  const featuredContent = document.querySelector(".featured-content");
  featuredContent.style.marginLeft = "5px";
  featuredContent.style.height = "50vh";
  featuredContent.style.backgroundRepeat = "no-repeat";
  featuredContent.style.backgroundSize = "cover";
  featuredContent.style.backgroundPosition = "center center";
});

// Rest of your code remains the same

// Increase the font size for the featured-desc element
const featuredDesc = document.querySelector(".featured-desc");
featuredDesc.style.fontSize = "50px";
featuredDesc.style.fontWeight = "bold";
featuredDesc.style.marginTop = "50px";

const toggleButton = document.querySelector(".toggle");
const menuContainer = document.querySelector(".menu-container");

toggleButton.addEventListener("click", () => {
  // Toggle the 'black-text' class on the menu container
  menuContainer.classList.toggle("black-text");
});

// Get all "WATCH" buttons
const watchButtons = document.querySelectorAll(".movie-list-item-button");

// Add a click event listener to each button
watchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the YouTube video URL from the custom attribute
    const youtubeLink = button.getAttribute("data-youtube-link");

    // Redirect to the "video.html" page with the YouTube video URL as a query parameter
    window.location.href = `video.html?youtubeLink=${encodeURIComponent(
      youtubeLink
    )}`;
  });
});

//sidemenu
