function handleGetFormData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value;
    const zipCode = document.getElementById('zip-code').value;
    const status = document.getElementById('status').checked;
    
    return {
        name: name,
        email: email,
        city: city,
        zipCode: zipCode,
        status: status
    };
}

function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function checkboxIsChecked() {
    const formData = handleGetFormData();
    return formData.status;
}

function validateFormData(obj) {
    if (obj === null) return false;
    
    const isZipCodeValid = isNumber(obj.zipCode);
    const isCheckboxChecked = checkboxIsChecked();
    
    return obj !== null && isZipCodeValid && isCheckboxChecked;
}

function submit(event) {
    event.preventDefault();
    
    const formData = handleGetFormData();
    const isValid = validateFormData(formData);
    const warningDiv = document.getElementById('warning');
    
    if (!isValid) {
        warningDiv.textContent = 'Periksa form anda sekali lagi';
        warningDiv.classList.remove('success');
        warningDiv.classList.add('show');
    } else {
        warningDiv.textContent = 'Pendaftaran berhasil! Terima kasih telah bergabung dengan program literasi kami.';
        warningDiv.classList.add('success', 'show');
        
        setTimeout(() => {
            document.getElementById('registration-form').reset();
            warningDiv.classList.remove('show', 'success');
        }, 3000);
    }
}

document.getElementById('registration-form').addEventListener('submit', submit);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});