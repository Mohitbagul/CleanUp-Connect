// Add event listener to the edit icon
document.getElementById('edit-icon').addEventListener('click', function(event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();
    
    // Prompt the user to select a new image
    var newImage = prompt("Enter the URL of the new image:");
    
    // If the user entered a new image URL
    if (newImage !== null && newImage !== "") {
        // Update the image source
        document.getElementById('profile-image').src = newImage;
    }
});
