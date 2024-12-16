document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const emailOrPhone = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const termsError = document.getElementById('termsError');
    termsError.textContent = '';

    const termsAccepted = document.querySelector('input[type="checkbox"]').checked;
    if (!termsAccepted) {
        termsError.textContent = "You must agree to the Terms & Conditions.";
        return;
    }

    // Regular expressions to validate email, phone, and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^09\d{9}$/;
    const passwordRegex = /^.{6,}$/; // Updated regex for 6 or more characters

    // Validate the email or phone number
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
        termsError.textContent = "Please enter a valid email address or phone number.";
        return;
    }

    // Validate the password (6 or more characters)
    if (!passwordRegex.test(password)) {
        termsError.textContent = "Password must be at least 6 characters long.";
        return;
    }

    // Check if email or phone already exists in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some(user => user.email === emailOrPhone);

    if (emailExists) {
        termsError.textContent = "This email or phone number is already registered.";
        return;
    }

    // Create a new user object
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: emailOrPhone,
        password: password
    };

    // Save the new user in localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Show the success modal
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';

    // Reset the form
    document.getElementById('registerForm').reset();

    // Close the modal when the close button is clicked
    document.getElementById('closeModal').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Redirect to login page when the OK button is clicked in the modal
    document.getElementById('modalOkBtn').addEventListener('click', function() {
        modal.style.display = 'none';
        window.location.href = 'login.html'; // Redirect to the login page
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

document.getElementById('termsText').addEventListener('click', function() {
    // Show the modal when Terms & Conditions text is clicked
    document.getElementById('termsModal').style.display = 'flex';
});

// Close the modal when the close button is clicked
document.getElementById('closeTermsModal').addEventListener('click', function() {
    document.getElementById('termsModal').style.display = 'none';
});

