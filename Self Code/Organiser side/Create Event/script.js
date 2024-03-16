document.addEventListener("DOMContentLoaded", function() {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyA1NgEx9i0gCwGvA97ouWZWQBkwuiAsrm0",
        authDomain: "cleanup-connect-ebaae.firebaseapp.com",
        databaseURL: "https://cleanup-connect-ebaae-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "cleanup-connect-ebaae",
        storageBucket: "cleanup-connect-ebaae.appspot.com",
        messagingSenderId: "206124027034",
        appId: "1:206124027034:web:423e5574fce9877e562323"
      };
    
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    
    // Check authentication status on page load
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in
        console.log('User is signed in:', user.displayName);
        // Show the form or any other content
        document.getElementById("createForm").style.display = "block";
      } else {
        // User is not signed in
        console.log('User is not signed in');
        // Redirect to the login page or show a message
        window.location.href = 'login.html'; // Redirect to the login page
        // Alternatively, you can display a message
        // document.getElementById("errorMessages").innerText = "Please sign in to create an event.";
      }
    });
    
    const form = document.getElementById("createForm");
    const errorMessages = document.getElementById("errorMessages");
    
    form.addEventListener("submit", function(event) {
      // Reset error messages
      errorMessages.innerHTML = "";
      
      let errors = [];
    
      // Validate Event Title
      const eventTitle = form.elements["eventTitle"].value;
      if (!eventTitle.trim()) {
        errors.push("Please enter an Event Title");
      }
    
      // Validate Organizer's Gmail/Email
      const organizerEmail = form.elements["organizerEmail"].value;
      if (!isValidEmail(organizerEmail)) {
        errors.push("Please enter a valid Organizer's Gmail/Email");
      }
    
      // Validate Event Date
      const eventDate = form.elements["eventDate"].value;
      if (!isValidDate(eventDate)) {
        errors.push("Please enter a valid Event Date");
      }
    
      // Validate Event Time
      const eventTime = form.elements["eventTime"].value;
      if (!isValidTime(eventTime)) {
        errors.push("Please enter a valid Event Time");
      }
    
      // Display Error Messages
      if (errors.length > 0) {
        event.preventDefault();
        errors.forEach(function(error) {
          const errorElement = document.createElement("div");
          errorElement.classList.add("alert", "alert-danger");
          errorElement.textContent = error;
          errorMessages.appendChild(errorElement);
        });
      }
    });
    
    // Custom Email Validation Function
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Custom Date Validation Function
    function isValidDate(date) {
      const today = new Date().toISOString().split("T")[0];
      return date >= today;
    }
    
    // Custom Time Validation Function
    function isValidTime(time) {
      // Add your custom time validation logic here
      return true;
    }
  });
  
  // Redirect to login page if user is not signed in
  if (!user) {
    console.log('User is not signed in');
    window.location.href = 'login.html'; // Redirect to the login page
  }
  