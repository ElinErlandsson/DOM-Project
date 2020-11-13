/* =================== Selecting DOM Elements =================== */

const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const inputCourse = document.querySelector('#course');
const inputSchool = document.querySelector('#school');
const btn = document.querySelector('#btn');
const cardsContainer = document.querySelector('.cards-container')

/* =================== Add Event Listeners =================== */

form.addEventListener('submit', submitForm);
form.addEventListener('input', checkInputs);


/* =================== Function Submit Form =================== */

function submitForm(event) {
    event.preventDefault();

    if (inputName.value.length > 2 && inputCourse.value.length > 2 && inputSchool.value.length > 2) {

        const random = Math.floor(Math.random() * 5) + 1;

        btn.disabled = false;
        const htmlCode = `
                <div class="card">
                <img src="/img/img_${random}.jpg" class="img-container"></img>
                    <div class="text-container">
                        <ul class="info-list">
                            <div class="li-wrapper">
                                <h3 class="li-title">Name:</h3>
                                <li class="list-items">
                                    <p class="input-value">${inputName.value}</p>
                                </li>
                            </div>
                            <div class="li-wrapper">
                                <h3 class="li-title">Course:</h3>
                                <li class="list-items">
                                    <p class="input-value">${inputCourse.value}</p>
                                </li>
                            </div>
                            <div class="li-wrapper">
                                <h3 class="li-title">School:</h3>
                                <li class="list-items">
                                    <p class="input-value">${inputSchool.value}</p>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>`;

        cardsContainer.innerHTML += htmlCode;
        /* ------------ Clear input box ------------ */
        inputName.value = '';
        inputCourse.value = '';
        inputSchool.value = '';
    } else {
        btn.disabled = true;
    }
    checkInputs();
}
/* =================== Function Check inputs =================== */

function checkInputs() {

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

    if (inputName.value.length > 2 && inputCourse.value.length > 2 && inputSchool.value.length > 2) {
        btn.style.color = 'orange';
        btn.style.textShadow = '4px 3px 2px rgb(12, 12, 12)';
        btn.style.fontWeight = '700';
        btn.style.cursor = 'pointer';
    } else {
        btn.style.color = '#5e5e5f';
        btn.style.textShadow = 'none';
        btn.style.fontWeight = '400';
        btn.style.cursor = 'no-drop';
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

