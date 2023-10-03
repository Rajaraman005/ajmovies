// Function to retrieve URL parameters
function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Retrieve the movie ID from the URL parameter 'id'
const movieId = getUrlParameter("id");

// Movie database with multiple movies
const movieDatabase = [
  {
    id: "TiDyv53adt0",
    title: "Viswasam",
    description:
      "A village ruffian, who settles disputes in his native, takes on a big shot when he tries to sort out the rough patch in his marriage after several years.",
    imageUrl: "mainimg/vs.WebP",
  },
  {
    id: "qN3wfuPYTI4",
    title: "LEO",
    description:
      "Leo is an upcoming Indian Tamil-language action thriller film directed by Lokesh Kanagaraj...",
    imageUrl: "mainimg/leo.WebP",
  },
  {
    id: "1F3hm6MfR1k",
    title: "Jawan",
    description:
      "Jailer is a 2023 Indian Tamil-language action comedy film directed by Nelson Dilipkumar and produced by Kalanithi Maran of Sun Pictures.",
    imageUrl: "mainimg/jailer.webP",
  },
  {
    id: "COv52Qyctws",
    title: "Jawan",
    description:
      "Jawan is a 2023 Indian Hindi-language action thriller film co-written and directed by Atlee as his first Hindi film",
    imageUrl: "mainimg/jw.WebP",
  },
  {
    id: "OKBMCL-frPU",
    title: "Vikram",
    description:
      "Vikram is an Indian film actor, voice actor and a playback singer.",
    imageUrl: "mainimg/vikram.WebP",
  },
  {
    id: "ppYoIoW73PI",
    title: "kantara",
    description:
      "The film stars Shetty as a Kambala champion who is at loggerheads with an upright forest officer, Murali (played by Kishore). Kantara.",
    imageUrl: "mainimg/kantara.WebP",
  },
  {
    id: "22R0j8UKRzY",
    title: "Naruto",
    description:
      "Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition ...",
    imageUrl: "mainimg/naruto.WebP",
  },
];

// Function to find movie details by ID
function findMovieById(id) {
  return movieDatabase.find((movie) => movie.id === id);
}

// Function to display movie details
function displayMovieDetails(movieId) {
  const movieDetails = findMovieById(movieId);

  if (movieDetails) {
    document.getElementById("movieTitle").textContent = movieDetails.title;
    document.getElementById("movieDescription").textContent =
      movieDetails.description;
    document.getElementById("movieImage").src = movieDetails.imageUrl;
  } else {
    document.getElementById("movieTitle").textContent = "Movie Not Found";
    document.getElementById("movieDescription").textContent =
      "Sorry, the requested movie was not found.";
    document.getElementById("movieImage").src = "placeholder-image.jpg";
  }
}

// Call the function to display movie details
displayMovieDetails(movieId);

// Call the function to display movie details
displayMovieDetails(movieId);
document.addEventListener("DOMContentLoaded", function () {
  // Get the clicked movie title from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("id");
  const movieData = JSON.parse(localStorage.getItem("movieData"));

  // Debugging: Check the value of videoId
  console.log("videoId:", videoId);

  // Debugging: Check the value of movieData
  console.log("movieData:", movieData);

  if (videoId) {
    const embedCode = `<iframe width="640" height="360" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = embedCode;
  } else {
    // Handle the case where videoId is not found
    console.log("Video not found.");
  }
});
