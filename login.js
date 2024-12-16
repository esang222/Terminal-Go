document.getElementById('loginForm').addEventListener('submit', function(event){
   event.preventDefault();

   const emailOrPhone = document.getElementById('email').value.trim();
   const password = document.getElementById('password').value.trim();
   
   const termsError = document.getElementById('termsError');
   termsError.textContent = '';

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const phoneRegex = /^09\d{9}$/; 

   if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
        termsError.textContent = "Please enter a valid email address or phone number.";
       return;
   }

   if (!password) {
      termsError.textContent = "Please enter your password.";
       return;
  }
     const rememberMe = document.querySelector('.options input[type="checkbox"]').checked;
     if (!rememberMe) {
        termsError.textContent = "You must agree to the Remember Me option.";
        return;
     }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => (user.email === emailOrPhone || user.phone === emailOrPhone) && user.password === password);

    if (!user) {
      termsError.textContent = "Invalid email/phone or password.";
      return;
    }
   
    localStorage.setItem('terminalGoUser', JSON.stringify(user));

    const modal = document.getElementById('successModal');
    modal.style.display = 'block';

    document.getElementById('modalOkBtn').addEventListener('click', function() {
      modal.style.display = 'none';
      window.location.href = 'welcomepage.html'; 
      });

      window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
   
});