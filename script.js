/**
 * LUX STUDIO - Advanced Front-End & Email Engine
 * Handles URL parameters and triggers secure live reservation form processing.
 */
document.addEventListener("DOMContentLoaded", function () {
    
    /* ==========================================
       1. URL PARAMETER & DROPDOWN ENGINE
       ========================================== */
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const dropdown = document.getElementById("serviceDropdown");

    if (service && dropdown) {
        dropdown.value = service; 
    }
    
    /* ==========================================
       2. LIVE EMAIL SUBMISSION ENGINE (BOOKING)
       ========================================== */
    const bookingForm = document.getElementById("bookingForm");
    
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            // Prevent the default browser page refresh behavior
            event.preventDefault();

            const submitBtn = document.getElementById("submitBtn");
            const originalBtnText = submitBtn.innerText;
            
            // Visual Feedback: Switch button state immediately to look responsive
            submitBtn.innerText = "Processing Reservation...";
            submitBtn.style.background = "#bc9d02";
            submitBtn.disabled = true;

            // Collect variables to pass directly into your custom EmailJS parameters
            const templateParams = {
                from_name: document.getElementById("userName").value,
                phone_number: document.getElementById("userPhone").value,
                chosen_service: dropdown ? dropdown.value : "Custom Session",
                booking_date: document.getElementById("bookingDate").value,
                extra_details: document.getElementById("eventDetails").value
            };

            // Trigger transmission over the server API
            emailjs.send("service_nqvhc5f", "template_q8pzmje", templateParams)
                .then(function(response) {
                    console.log("SUCCESS!", response.status, response.text);
                    
                    // Show a luxury feedback message safely
                    alert(`Thank you, ${templateParams.from_name}! Your booking request for a ${templateParams.chosen_service} session has been sent. We will text you shortly.`);
                    
                    // Reset the form data completely
                    bookingForm.reset();
                    if (dropdown) dropdown.value = "Custom";
                })
                .catch(function(error) {
                    console.error("FAILED...", error);
                    alert("Oops! Booking transmission failed. Please try again or call our direct lines.");
                })
                .finally(function() {
                    // Restore button state back to original layout
                    submitBtn.innerText = originalBtnText;
                    submitBtn.style.background = "gold";
                    submitBtn.disabled = false;
                });
        });
    }

    /* ==========================================
    3. DYNAMIC PORTFOLIO FILTERING ENGINE
    ========================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function () {
                // Remove active class from all buttons and add to the clicked one
                filterButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");

                const targetFilter = this.getAttribute("data-filter");
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute("data-category");

                    if (targetFilter === "all" || targetFilter === itemCategory) {
                        item.style.display = "block";
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 10);
                    } else {
                        item.style.opacity = "0";
                        item.style.transform = "scale(0.9)";
                        setTimeout(() => {
                            item.style.display = "none";
                        }, 300);
                    }
                });
            });
        });
    }

    /* ==========================================
       4. LIVE CONTACT FORM SUBMISSION ENGINE
       ========================================== */
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const contactSubmitBtn = document.getElementById("contactSubmitBtn");
            const originalText = contactSubmitBtn.innerText;

            // Instantly transition the button layout to look busy
            contactSubmitBtn.innerText = "Sending Message...";
            contactSubmitBtn.style.background = "#bc9d02";
            contactSubmitBtn.disabled = true;

            // Gather the data variables from the contact fields
            const contactParams = {
                from_name: document.getElementById("contactName").value,
                from_email: document.getElementById("contactEmail").value,
                contact_subject: document.getElementById("contactSubject").value,
                contact_message: document.getElementById("contactMessage").value
            };

            // FIXED: Standardized Template ID format to lowercase 'ldc1s4e'
            emailjs.send("service_nqvhc5f", "template_ldc1s4e", contactParams)
                .then(function(response) {
                    console.log("CONTACT SUCCESS!", response.status, response.text);
                    
                    alert(`Message sent successfully! Thank you, ${contactParams.from_name}. The LUX STUDIO crew will get back to you shortly.`);
                    
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error("CONTACT FAILED...", error);
                    alert("System error. Your message could not go through. Please try again or use our direct phone lines.");
                })
                .finally(function() {
                    // Revert the action button back to pristine state
                    contactSubmitBtn.innerText = originalText;
                    contactSubmitBtn.style.background = "gold";
                    contactSubmitBtn.disabled = false;
                });
        });
    }
});
