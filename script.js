const work = document.querySelector(".work");
const slider = document.querySelector(".slider");
const firstCardWidth = slider.querySelector(".card").offsetWidth;
const sliderChildrens = [...slider.children];
const dots = document.querySelectorAll(".dot");

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(slider.offsetWidth / firstCardWidth);

sliderChildrens.slice(-cardPerView).reverse().forEach(card => {
    slider.insertAdjacentHTML("afterbegin", card.outerHTML);
});

sliderChildrens.slice(0, cardPerView).forEach(card => {
    slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

slider.classList.add("no-transition");
slider.scrollLeft = slider.offsetWidth;
slider.classList.remove("no-transition");

const dragStart = (e) => {
    isDragging = true;
    slider.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = slider.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;

    slider.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    slider.classList.remove("dragging");
}

const updateDots = () => {
    console.log("in the function");

    let currentIndex = Math.round(slider.scrollLeft / firstCardWidth) % (sliderChildrens.length / 3);

    if (currentIndex === 0) {
        let changeTo = null;
        let x_card = Math.round(slider.scrollLeft / firstCardWidth);

        if (x_card > 9) {
            console.log("index is " + x_card);
            x_card = x_card % 9;
        }

        changeTo = x_card / 3;
        console.log(changeTo);
        console.log("Current index is " + currentIndex);

        dots.forEach((dot, index) => {
            if (index === changeTo - 1) {
                dot.classList.add("red-dot");
                dot.classList.remove("black-dot");
            } else {
                dot.classList.add("black-dot");
                dot.classList.remove("red-dot");
            }
        });
    }
}

const infiniteScroll = () => {

    if (slider.scrollLeft === 0) {
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.scrollWidth - (2 * slider.offsetWidth);
        slider.classList.remove("no-transition");
    }

    else if (Math.ceil(slider.scrollLeft) === slider.scrollWidth - slider.offsetWidth) {
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.offsetWidth;
        slider.classList.remove("no-transition");
    }

    updateDots();

    clearTimeout(timeoutId);
    if (!work.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;

    timeoutId = setTimeout(() => {
        slider.scrollLeft += firstCardWidth;
        updateDots();
    }, 2500);
}

updateDots();

autoPlay();

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
slider.addEventListener("scroll", infiniteScroll);
work.addEventListener("mouseenter", () => clearTimeout(timeoutId));
work.addEventListener("mouseleave", autoPlay);


// ----------------------form-----------------------


document.addEventListener('DOMContentLoaded', function () {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(formGroup => {
        const input = formGroup.querySelector('input');

        input.addEventListener('blur', function () {
            const inputValue = this.value.trim();
            const label = formGroup.querySelector('label');

            console.log('Input value:', inputValue);
            console.log('Label:', label);

            if (inputValue !== '') {
                label.classList.add('filled');
            } else {
                label.classList.remove('filled');
            }
        });
    });

    // Rest of your JavaScript code...

    const closeFormBtn = document.getElementById('closeFormBtn');
    const formContainer = document.getElementById('contactFormContainer');
    const header = document.getElementById('header');

    closeFormBtn.addEventListener('click', function () {
        formContainer.style.opacity = 0;
        formContainer.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            formContainer.style.display = 'none';
        }, 800);

        header.style.opacity = 1;
        header.style.filter = 'none';
        document.body.classList.remove('no-scroll');
    });

    document.getElementById('showFormBtn').addEventListener('click', function () {
        formContainer.style.display = 'block';
        // Trigger the transition by updating opacity and scale
        setTimeout(() => {
            formContainer.style.opacity = 1;
            formContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 0);

        header.style.opacity = 0.5;
        header.style.filter = 'blur(5px)';
        document.body.classList.add('no-scroll');
    });

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        fetch("https://getform.io/f/qalodrmb", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    alert('Form submitted successfully!');
                    form.reset();

                    formContainer.style.opacity = 0;
                    formContainer.style.transform = 'translate(-50%, -50%) scale(0)';
                    setTimeout(() => {
                        formContainer.style.display = 'none';
                    }, 800);

                    header.style.opacity = 1;
                    header.style.filter = 'none';
                    document.body.classList.remove('no-scroll');
                } else {
                    alert('Form submission failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                alert('An error occurred. Please try again.');
            });
    });
});



function changeImage(imagePath) {
    document.getElementById('mainImage').src = imagePath;
}

function selectElement(element) {

    var elements = document.querySelectorAll('.about-photos');
    elements.forEach(function (el) {
        el.classList.remove('selected');
    });

    element.classList.add('selected');
}

document.querySelectorAll('.about-photos').forEach(function (el) {
    el.addEventListener('click', function () {
        selectElement(el);
    });
});

const contentArray = [
    {
        imagePath: 'Assets/images/japan1.jpg',
        title: 'Genderless Kei - Japan\'s Hot',
        description: 'Set to launch on the manufacturer\'s new A330neo aircraft in 2017, it\'s offering lots of'
    },
    {
        imagePath: 'Assets/images/image.png',
        title: 'Better Strategy & Quality',
        description: 'Set to launch on the manufacturer\'s new A330neo aircraft in 2017, it\'s offering lots of'
    },
    {
        imagePath: 'Assets/images/japan3.jpg',
        title: 'Genderless Kei - Japan\'s Hot',
        description: 'Set to launch on the manufacturer\'s new A330neo aircraft in 2017, it\'s offering lots of'
    }
];

let currentIndex = 0;

function changeImageAndContent() {
    const mainImage = document.getElementById('mainImage');
    const aboutPhotos = document.querySelectorAll('.about-photos');

    mainImage.src = contentArray[currentIndex].imagePath;

    aboutPhotos.forEach((el, index) => {
        if (index === currentIndex) {
            el.classList.add('selected');
        } else {
            el.classList.remove('selected');
        }
    });

    currentIndex = (currentIndex + 1) % contentArray.length;
}

setInterval(changeImageAndContent, 3000);

document.querySelectorAll('.about-photos').forEach((el, index) => {
    el.addEventListener('click', function () {
        currentIndex = index;
        changeImageAndContent();
    });
});

window.onload = function () {
    changeImageAndContent();
};