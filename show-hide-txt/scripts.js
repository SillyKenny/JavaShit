function TextHide() {
  var textElement = document.getElementById("TextHide");
  // Toggle between hiding and showing the text
  if (textElement.style.display === "none") {
    textElement.style.display = "block"; // Show the text
  } else {
    textElement.style.display = "none"; // Hide the text
  }
}