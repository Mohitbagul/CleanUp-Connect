document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("businessForm");
    const errorMessages = document.getElementById("errorMessages");
    const otherBusinessTypeGroup = document.getElementById("otherBusinessTypeGroup");
  
    form.addEventListener("submit", function(event) {
      // Reset error messages
      errorMessages.innerHTML = "";
      
      let errors = [];
  
      // Validate Business Name
      const businessName = form.elements["businessName"].value;
      if (!businessName.trim()) {
        errors.push("Please enter a Business Name");
      }
  
      // Validate Contact Email
      const contactEmail = form.elements["contactEmail"].value;
      if (!isValidEmail(contactEmail)) {
        errors.push("Please enter a valid Contact Email");
      }
  
      // Validate Contact Number
      const contactNumber = form.elements["contactNumber"].value;
      if (!contactNumber.trim()) {
        errors.push("Please enter a Contact Number");
      }
  
      // Validate Business Location
      const businessLocation = form.elements["businessLocation"].value;
      if (!businessLocation.trim()) {
        errors.push("Please enter a Business Location");
      }
  
      // Validate Business Type
      const businessType = form.elements["businessType"].value;
      if (businessType === "Other") {
        const otherBusinessType = form.elements["otherBusinessType"].value;
        if (!otherBusinessType.trim()) {
          errors.push("Please enter Other Business Type");
        }
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
  
    // Show/hide Other Business Type field based on selection
    const businessTypeSelect = form.elements["businessType"];
    businessTypeSelect.addEventListener("change", function() {
      if (businessTypeSelect.value === "Other") {
        otherBusinessTypeGroup.style.display = "block";
      } else {
        otherBusinessTypeGroup.style.display = "none";
      }
    });
  
    // Custom Email Validation Function
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });
