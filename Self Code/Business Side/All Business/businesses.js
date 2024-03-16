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
  
    // Reference to the businesses collection
    const businessesRef = db.collection("businesses");
  
    // Get all businesses and display them as cards
    businessesRef.get().then((querySnapshot) => {
      const businessesList = document.getElementById("businessesList");
      
      querySnapshot.forEach((doc) => {
        const businessData = doc.data();
  
        // Create HTML for each business card
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
  
        const cardHtml = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${businessData.name}</h5>
              <p class="card-text"><strong>Type:</strong> ${businessData.type}</p>
              <p class="card-text"><strong>Location:</strong> ${businessData.location}</p>
              <a href="business.html?id=${doc.id}" class="btn btn-primary">View Details</a>
            </div>
          </div>
        `;
  
        card.innerHTML = cardHtml;
        businessesList.appendChild(card);
      });
    }).catch((error) => {
      console.log("Error getting businesses: ", error);
    });
  });
