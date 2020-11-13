/* =================== Selecting DOM Elements =================== */

const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const inputCourse = document.querySelector('#course');
const inputSchool = document.querySelector('#school');
const btn = document.querySelector('.btn');
const cardsContainer = document.querySelector('.cards-container');
const loadingContainer = document.querySelector('.loading-container');

/* =================== Add Event Listeners =================== */

form.addEventListener('submit', submitForm);
form.addEventListener('input', checkInputs);
document.addEventListener('DOMContentLoaded', saveDataPageReload);

/* =================== Utilities Function =================== */

/* ------------ Function Cars HTMLcode ------------ */
function cardHtml(inputObjects) {
    const htmlCode = `
            <div class="card">
            <img src="/img/img_${inputObjects.image}.jpg" class="img-container"></img>
                <div class="text-container">
                    <ul class="info-list">
                        <div class="li-wrapper">
                            <h3 class="li-title">Name:</h3>
                            <li class="list-items">
                                <p class="input-value">${inputObjects.name}</p>
                            </li>
                        </div>
                        <div class="li-wrapper">
                            <h3 class="li-title">Course:</h3>
                            <li class="list-items">
                                <p class="input-value">${inputObjects.course}</p>
                            </li>
                        </div>
                        <div class="li-wrapper">
                            <h3 class="li-title">School:</h3>
                            <li class="list-items">
                                <p class="input-value">${inputObjects.school}</p>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>`;

    return htmlCode;
}

/* ------------ Function for Local Storage ------------ */
function loadDataFromLocalStorage() {

    let data;

    if (localStorage.getItem('cards')) {
        data = JSON.parse(localStorage.getItem('cards'));
    } else {
        data = [];
    }

    return data;
}




/* =================== Function Submit Form =================== */

function submitForm(event) {
    event.preventDefault();
    checkInputs()

    let randomImg = Math.floor(Math.random() * 10) + 1;

    /* ------------ Save the inputs values to Local storage ------------ */
    const data = loadDataFromLocalStorage(); // <-- Get the localstorage function //

    const inputObjects = { // <-- Get the title and text value an put in an object //
        name: inputName.value,
        course: inputCourse.value,
        school: inputSchool.value,
        image: randomImg
    };

    data.push(inputObjects); // <-- Add the inputs values into the data structure //

    localStorage.setItem('cards', JSON.stringify(data)); // <-- Save data back to local storage //


    /* ------------ If the input are not empty ------------ */
    if (inputName.value !== '' && inputCourse.value !== '' && inputSchool.value !== '') {

        btn.disabled = false; //<-- Button is enabled //

        /* ------------ Show Calculating box ------------ */
        loadingContainer.style.display = 'flex';

        /* ------------ Button Loading Effect ------------ */
        btn.classList.toggle('loading-btn');

        /* ------------ Get the HTMLcard ------------ */
        let getCard = cardHtml(inputObjects);

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


function saveDataPageReload() {

    const data = loadDataFromLocalStorage();

    let result = '';

    for (let i = 0; i < data.length; i++) { // <-- Loop through the data and save it in the DOM //

        result += cardHtml(data[i]);
    }

    cardsContainer.innerHTML = result; // <-- Append the generated html code inside the ul //
}