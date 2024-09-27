document.addEventListener('DOMContentLoaded', function() {
    // Function to validate the form
    function validateForm(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get field values
        const name = document.getElementById("name") ? document.getElementById("name").value : "";
        const email = document.getElementById("email") ? document.getElementById("email").value : "";
        const phone = document.getElementById("phone") ? document.getElementById("phone").value : "";
        const message = document.getElementById("message") ? document.getElementById("message").value : "";
        let isValid = true; // Track overall validity

        // Name validation
        if (name.trim() === "" || name.length > 100) {
            if (document.getElementById("namemsg")) {
                document.getElementById("namemsg").innerHTML = "<em>Name is not valid. Must be 1 to 100 characters.</em>";
                document.getElementById("namemsg").classList.add("text-danger");
            }
            isValid = false; // Mark as invalid
        } else {
            if (document.getElementById("namemsg")) {
                document.getElementById("namemsg").innerHTML = "Valid name entered.";
                document.getElementById("namemsg").classList.remove("text-danger");
                document.getElementById("namemsg").classList.add("text-success");
            }
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            if (document.getElementById("emailmsg")) {
                document.getElementById("emailmsg").innerHTML = "<em>Email is not valid.</em>";
                document.getElementById("emailmsg").classList.add("text-danger");
            }
            isValid = false; // Mark as invalid
        } else {
            if (document.getElementById("emailmsg")) {
                document.getElementById("emailmsg").innerHTML = "Valid email entered.";
                document.getElementById("emailmsg").classList.remove("text-danger");
                document.getElementById("emailmsg").classList.add("text-success");
            }
        }

        // Phone validation
        const phonePattern = /^\d{10}$/;
        if (phone && !phonePattern.test(phone)) {
            if (document.getElementById("phonemsg")) {
                document.getElementById("phonemsg").innerHTML = "<em>Phone number is not valid. Must be 10 digits.</em>";
                document.getElementById("phonemsg").classList.add("text-danger");
            }
            isValid = false; // Mark as invalid
        } else {
            if (document.getElementById("phonemsg")) {
                document.getElementById("phonemsg").innerHTML = "Valid phone number entered.";
                document.getElementById("phonemsg").classList.remove("text-danger");
                document.getElementById("phonemsg").classList.add("text-success");
            }
        }

        // Message validation
        if (message.trim() === "") {
            if (document.getElementById("messagemsg")) {
                document.getElementById("messagemsg").innerHTML = "<em>Message is required.</em>";
                document.getElementById("messagemsg").classList.add("text-danger");
            }
            isValid = false; // Mark as invalid
        } else {
            if (document.getElementById("messagemsg")) {
                document.getElementById("messagemsg").innerHTML = "Valid message entered.";
                document.getElementById("messagemsg").classList.remove("text-danger");
                document.getElementById("messagemsg").classList.add("text-success");
            }
        }

        // If all fields are valid, submit the form
        if (isValid) {
            const feedbackForm = document.getElementById("feedbackForm");
            if (feedbackForm) {
                feedbackForm.submit(); // Ensure feedbackForm is not null
            } else {
                console.error('Feedback form not found!');
            }
        }
    }

    // Function to reset the form
    function resetForm() {
        document.getElementById("feedbackForm").reset();
        const messageFields = document.querySelectorAll('.form-text');
        messageFields.forEach(field => {
            field.innerHTML = "";
            field.classList.remove("text-danger", "text-success");
        });
    }

    // Add event listeners
    const submitButton = document.querySelector('.btn-primary');
    if (submitButton) {
        submitButton.addEventListener('click', validateForm);
    }

    const resetButton = document.querySelector('.btn-secondary');
    if (resetButton) {
        resetButton.addEventListener('click', resetForm);
    }
});
