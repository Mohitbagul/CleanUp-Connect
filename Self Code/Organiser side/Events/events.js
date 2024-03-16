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
  
    // Reference to the events collection
    const eventsRef = db.collection("events");
  
    // Get all events and display them as cards
    eventsRef.get().then((querySnapshot) => {
      const eventsList = document.getElementById("eventsList");
      
      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
  
        // Create HTML for each event card
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
  
        const cardHtml = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${eventData.title}</h5>
              <p class="card-text"><strong>Date:</strong> ${eventData.date}</p>
              <p class="card-text"><strong>Time:</strong> ${eventData.time}</p>
              <p class="card-text"><strong>Location:</strong> ${eventData.location}</p>
              <a href="event.html?id=${doc.id}" class="btn btn-primary">View Details</a>
            </div>
          </div>
        `;
  
        card.innerHTML = cardHtml;
        eventsList.appendChild(card);
      });
    }).catch((error) => {
      console.log("Error getting events: ", error);
    });
  });
