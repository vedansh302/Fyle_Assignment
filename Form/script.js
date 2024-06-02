document.getElementById('showFormBtn').addEventListener('click', function() {
    document.getElementById('contactFormContainer').style.display = 'block';
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Form submitted!');
    // Handle form submission logic here
});