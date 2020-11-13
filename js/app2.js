/* =================== Selecting DOM Elements =================== */

const form = document.querySelector('#form');
const inputs = document.querySelector('input');
const inputName = document.querySelector('#name');
const inputCourse = document.querySelector('#course');
const inputSchool = document.querySelector('#school');
const btn = document.querySelector('.btn');
const cardsContainer = document.querySelector('.cards-container');
const loadingContainer = document.querySelector('.loading-container');

/* =================== Add Event Listeners =================== */

form.addEventListener('submit', submitForm);
form.addEventListener('input', checkInputs);

/* =================== Utilities Function =================== */

function cardHtml(nameInput, courseInput, schoolInput) {
    const htmlCode = `
            <div class="card">
            <img src="/img/img_${mathRandom()}.jpg" class="img-container"></img>
                <div class="text-container">
                    <ul class="info-list">
                        <div class="li-wrapper">
                            <h3 class="li-title">Name:</h3>
                            <li class="list-items">
                                <p class="input-value">${nameInput}</p>
                            </li>
                        </div>
                        <div class="li-wrapper">
                            <h3 class="li-title">Course:</h3>
                            <li class="list-items">
                                <p class="input-value">${courseInput}</p>
                            </li>
                        </div>
                        <div class="li-wrapper">
                            <h3 class="li-title">School:</h3>
                            <li class="list-items">
                                <p class="input-value">${schoolInput}</p>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>`;

    return htmlCode;
}

/* =================== Function Math Random Number =================== */

function mathRandom() {
    const random = Math.floor(Math.random() * 10) + 1;

    return random;
}


/* =================== Function Submit Form =================== */

function submitForm(event) {
    event.preventDefault();
    checkInputs()

    if (inputName.value !== '' && inputCourse.value !== '' && inputSchool.value !== '') {

        btn.disabled = false; //<-- Button is enabled //

        /* ------------ Show Calculating box ------------ */
        loadingContainer.style.display = 'flex';

        /* ------------ Button Loading Effect ------------ */
        btn.classList.toggle('loading-btn');

        /* ------------ Get the HTMLcard ------------ */
        let getCard = cardHtml(inputName.value, inputCourse.value, inputSchool.value);

        /* ------------ After 3,8s this happens ------------ */
        setTimeout(function () {
            btn.classList.remove('loading-btn'); //<-- Removes the reload button //
            loadingContainer.style.display = 'none'; //<-- Removes the reload container //
            checkInputs() //<-- Changing back the original colors on btn and icons //
            cardsContainer.innerHTML += getCard; //<-- Puts the card into cards-container //
        }, 3800);

        // Empty the inputs
        inputName.value = '';
        inputCourse.value = '';
        inputSchool.value = '';

    }

}

/* =================== Function Icon color =================== */

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const icon = formControl.querySelector('i');

    icon.style.color = 'orange';
}

function setBackIcon(input) {
    const formControl = input.parentElement;
    const icon = formControl.querySelector('i');

    icon.style.color = '#f0f0f3';

}

/* =================== Function Check inputs =================== */

function checkInputs() {
    /* ------------ Icon styling ------------ */
    if (inputName.value.length > 2) {
        setSuccessFor(inputName);
    } else {
        setBackIcon(inputName);
    }


    if (inputCourse.value.length > 2) {
        setSuccessFor(inputCourse);
    } else {
        setBackIcon(inputCourse);
    }


    if (inputSchool.value.length > 2) {
        setSuccessFor(inputSchool);
    } else {
        setBackIcon(inputSchool);
    }

    /* ------------ Button styling ------------ */
    if (inputName.value.length > 2 && inputCourse.value.length > 2 && inputSchool.value.length > 2) {
        btn.style.color = 'orange';
        btn.style.textShadow = '4px 3px 2px rgb(12, 12, 12)';
        btn.style.fontWeight = '700';

    } else {
        btn.style.color = '#5e5e5f';
        btn.style.textShadow = 'none';
        btn.style.fontWeight = '400';

    }

}



