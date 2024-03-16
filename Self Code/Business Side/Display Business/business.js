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
  
    // Get the business ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('id');
  
    // Reference to the specific business document
    const businessRef = db.collection("businesses").doc(businessId);
  
    // Get the business details
    businessRef.get().then((doc) => {
      if (doc.exists) {
        const businessData = doc.data();
        const businessDetails = document.getElementById("businessDetails");
        
        // Create HTML to display business details
        const html = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${businessData.name}</h5>
              <p class="card-text"><strong>Type:</strong> ${businessData.type}</p>
              <p class="card-text"><strong>Location:</strong> ${businessData.location}</p>
              <p class="card-text"><strong>Email:</strong> ${businessData.email}</p>
              <p class="card-text"><strong>Contact:</strong> ${businessData.contact}</p>
              <p class="card-text"><strong>Interested in Sponsoring:</strong> ${businessData.sponsorship ? 'Yes' : 'No'}</p>
              <p class="card-text"><strong>Interested in Collecting Waste:</strong> ${businessData.collectWaste ? 'Yes' : 'No'}</p>
              <p class="card-text"><strong>Preferred Waste Type:</strong> ${businessData.preferredWaste}</p>
            </div>
          </div>
        `;
        
        businessDetails.innerHTML = html;
      } else {
        // Doc doesn't exist
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  });
