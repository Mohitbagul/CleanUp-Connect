document.addEventListener("DOMContentLoaded", function() {
    const db = firebase.firestore();
    const auth = firebase.auth();
  
    // Check if user is logged in
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is logged in
        const userId = user.uid;
  
        // Display Hosted Events
        displayHostedEvents(userId);
  
        // Edit Event Button
        const editEventBtn = document.getElementById("editEventBtn");
        editEventBtn.addEventListener("click", function() {
          // Redirect to Edit Event Page
          window.location.href = "edit_event.html";
        });
  
        // Collaboration Button
        const collaborateBtn = document.getElementById("collaborateBtn");
        collaborateBtn.addEventListener("click", function() {
          // Redirect to All Businesses Page
          window.location.href = "all_businesses.html";
        });
  
        // Upload Image Button
        const uploadBtn = document.getElementById("uploadBtn");
        uploadBtn.addEventListener("click", function() {
          // Handle Image Upload
          handleImageUpload();
        });
  
        // Display Participants
        displayParticipants(userId);
  
      } else {
        // User is not logged in
        window.location.href = "login.html"; // Redirect to Login Page
      }
    });
  
    // Function to Display Hosted Events
    function displayHostedEvents(userId) {
      const eventDetailsDiv = document.getElementById("eventDetails");
  
      // Query to get hosted events
      db.collection("events")
        .where("organizerId", "==", userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const eventData = doc.data();
  
            // Create HTML for Event Card
            const eventCard = `
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${eventData.title}</h5>
                  <p class="card-text"><strong>Description:</strong> ${eventData.description}</p>
                  <p class="card-text"><strong>Date:</strong> ${eventData.date}</p>
                  <p class="card-text"><strong>Time:</strong> ${eventData.time}</p>
                  <p class="card-text"><strong>Location:</strong> ${eventData.location}</p>
                  <p class="card-text"><strong>Goals and Objectives:</strong> ${eventData.goals}</p>
                  <p class="card-text"><strong>Special Instructions:</strong> ${eventData.instructions}</p>
                  <p class="card-text"><strong>Equipment Needed:</strong> ${eventData.equipment.join(', ')}</p>
                  <p class="card-text"><strong>Organizer's Name:</strong> ${eventData.organizerName}</p>
                  <p class="card-text"><strong>Organizer's Email:</strong> ${eventData.organizerEmail}</p>
                </div>
              </div>
            `;
  
            eventDetailsDiv.innerHTML += eventCard;
          });
        })
        .catch((error) => {
          console.error("Error getting hosted events: ", error);
        });
    }
  
    // Function to Display Participants
    function displayParticipants(userId) {
      const participantsTable = document.getElementById("participantsTable");
      const totalRegistrations = document.getElementById("totalRegistrations");
      const genderDistribution = document.getElementById("genderDistribution");
  
      // Query to get participants
      db.collection("participants")
        .where("organizerId", "==", userId)
        .get()
        .then((querySnapshot) => {
          let total = 0;
          let maleCount = 0;
          let femaleCount = 0;
  
          const tableHeaders = `
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>City</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
          `;
  
          let tableRows = "";
          querySnapshot.forEach((doc) => {
            const participantData = doc.data();
            total++;
  
            // Count Male and Female participants
            if (participantData.gender === "Male") {
              maleCount++;
            } else if (participantData.gender === "Female") {
              femaleCount++;
            }
  
            // Create HTML for Participant Table Rows
            tableRows += `
              <tr>
                <td>${participantData.name}</td>
                <td>${participantData.email}</td>
                <td>${participantData.contact}</td>
                <td>${participantData.city}</td>
                <td>${participantData.gender}</td>
              </tr>
            `;
          });
  
          const tableFooter = `
              </tbody>
            </table>
          `;
  
          // Display Total Registrations
          totalRegistrations.innerText = total;
  
          // Display Gender Distribution Chart (For example, using a simple text display)
          genderDistribution.innerHTML = `
            <p>Male: ${maleCount} (${((maleCount / total) * 100).toFixed(2)}%)</p>
            <p>Female: ${femaleCount} (${((femaleCount / total) * 100).toFixed(2)}%)</p>
          `;
  
          // Combine Table Headers, Rows, and Footer
          participantsTable.innerHTML = tableHeaders + tableRows + tableFooter;
        })
        .catch((error) => {
          console.error("Error getting participants: ", error);
        });
    }
  
    // Function to Handle Image Upload
    function handleImageUpload() {
      const fileInput = document.getElementById("imageUpload");
      const imageGallery = document.getElementById("imageGallery");
  
      const file = fileInput.files[0];
      const storageRef = firebase.storage().ref();
      const imagesRef = storageRef.child("event_images/" + file.name);
  
      // Upload file to Firebase Storage
      imagesRef.put(file).then((snapshot) => {
        console.log("Uploaded a file!", snapshot);
  
        // Get the download URL for the uploaded file
        imagesRef.getDownloadURL().then((url) => {
          // Create HTML for Image Card
          const imageCard = `
            <div class="card" style="width: 200px; margin: 10px;">
              <img src="${url}" class="card-img-top" alt="Uploaded Image">
            </div>
          `;
  
          // Append Image Card to Image Gallery
          imageGallery.innerHTML += imageCard;
        });
      }).catch((error) => {
        console.error("Error uploading image: ", error);
      });
    }
  });
  