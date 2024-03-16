document.addEventListener("DOMContentLoaded", function() {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID"
    };
    
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
  
    const feedbackForm = document.getElementById("feedbackForm");
  
    feedbackForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const rating = feedbackForm.elements["rating"].value;
      const feedback = feedbackForm.elements["feedback"].value;
  
      // Add feedback to Firestore
      db.collection("feedback").add({
        rating: rating,
        feedback: feedback,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function(docRef) {
        console.log("Feedback added with ID: ", docRef.id);
        // Show a success message or redirect to a thank you page
        alert("Thank you for your feedback!");
        // Reset the form after submission
        feedbackForm.reset();
      })
      .catch(function(error) {
        console.error("Error adding feedback: ", error);
        // Show an error message if needed
      });
    });
});
