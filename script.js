var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    effect: "fade",
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
        delay: 5000,   // 30 seconds delay between slides
        disableOnInteraction: false,  // Keeps autoplay active even after user interaction
    },
    loop: true,
    speed: 1000,  // Optional: Transition speed between slides (in milliseconds)
});

document.querySelector('a[href="#about"]').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    document.querySelector(".about").style.display = "block";
});

document.getElementById("close-about").addEventListener("click", function () {
    document.querySelector(".about").style.display = "none";
});

document.querySelector('a[href="#contact"]').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    document.querySelector(".contact").style.display = "block";
});

document.getElementById("close-contact").addEventListener("click", function () {
    document.querySelector(".contact").style.display = "none";
});

document.querySelector('a[href="#help"]').addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    document.querySelector(".help").style.display = "block";
});

document.getElementById("close-help").addEventListener("click", function () {
    document.querySelector(".help").style.display = "none";
});

document.querySelector(".calendar").addEventListener("click", function(){
    document.querySelector("#calendar").style.display = "block";
});

document.querySelector(".cal-close").addEventListener("click", function(){
    document.querySelector("#calendar").style.display = "none";
});

// Function to display all stored dates from localStorage
function displayStoredDates() {
    const storedDatesContainer = document.getElementById('storedDates');
    storedDatesContainer.innerHTML = ''; // Clear the container

    let dates = JSON.parse(localStorage.getItem('dates')) || [];

    // Loop through the stored dates and display them
    dates.forEach((date) => {
        const dateElement = document.createElement('p');
        dateElement.textContent = `Saved date: ${date}`; // Add the "Saved date: " text
        storedDatesContainer.appendChild(dateElement);
    });
}

// Function to check if the selected date is in the future
function isFutureDate(selectedDate) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return selectedDate > today; // Compare the selected date with today's date
}

// Event listener for adding date
document.getElementById('submitDate').addEventListener('click', function() {
    const dateInput = document.getElementById('dateInput').value;
    const errorMessage = document.getElementById('errorMessage');

    if (dateInput) {
        if (isFutureDate(dateInput)) {
            // If the selected date is in the future, show the error message
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'You cannot add a future date!';
        } else {
            // Hide the error message if the date is valid
            errorMessage.style.display = 'none';

            let dates = JSON.parse(localStorage.getItem('dates')) || [];
            dates.push(dateInput); // Add the new valid date

            // Save the updated list to localStorage
            localStorage.setItem('dates', JSON.stringify(dates));

            // Display the updated dates list
            displayStoredDates();

            // Clear the date input field
            document.getElementById('dateInput').value = '';
        }
    } else {
        alert('Please select a date.');
    }
});

// Event listener for clearing all dates
document.getElementById('clearAll').addEventListener('click', function() {
    // Clear dates from localStorage
    localStorage.removeItem('dates');

    // Clear the displayed dates
    document.getElementById('storedDates').innerHTML = '';

    // Hide the error message if displayed
    document.getElementById('errorMessage').style.display = 'none';
});

// Call displayStoredDates when the page loads to show previously stored dates
window.onload = function() {
    displayStoredDates();
};

document.querySelector(".flow").addEventListener("click", function(){
    document.querySelector("#flow").style.display = "block";
});

document.querySelector(".flo-close").addEventListener("click", function(){
    document.querySelector("#flow").style.display = "none";
});

// Function to display all stored flow data from localStorage
function displayStoredFlows() {
    const storedFlowsContainer = document.getElementById('storedFlows');
    storedFlowsContainer.innerHTML = ''; // Clear the container

    let flows = JSON.parse(localStorage.getItem('flows')) || [];
    console.log("Currently stored flows:", flows); // Debugging line

    // Loop through the stored flows and display them
    flows.forEach((flow) => {
        const flowElement = document.createElement('p');
        flowElement.textContent = `Date: ${flow.date}, Flow: ${flow.flowType}`; 
        storedFlowsContainer.appendChild(flowElement);
    });
}

// Function to check if the selected date is in the future
function isFutureDate(selectedDate) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return selectedDate > today; // Compare the selected date with today's date
}

// Function to check if the date already exists in the stored flows
function isDateDuplicate(selectedDate) {
    let flows = JSON.parse(localStorage.getItem('flows')) || [];
    console.log("Checking for duplicate date:", selectedDate); // Debugging line
    console.log("Stored flows for duplicate check:", flows); // Debugging line

    // Check if the selected date already exists
    const isDuplicate = flows.some(flow => flow.date === selectedDate);
    console.log("Is date duplicate?", isDuplicate); // Debugging line
    return isDuplicate; 
}

// Event listener for adding flow data
document.getElementById('submitFlowDate').addEventListener('click', function() {
    const flowDateInput = document.getElementById('flowdateInput').value;
    const flowType = document.querySelector('input[name="flow"]:checked')?.value; // Use .value instead of nextElementSibling
    const errorMessage = document.getElementById('flowErrorMessage');

    if (flowDateInput && flowType) {
        if (isFutureDate(flowDateInput)) {
            // Show error if future date is selected
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'You cannot add a future date!';
        } else if (isDateDuplicate(flowDateInput)) {
            // Show error if the same date is added again
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'This date has already been saved!';
        } else {
            // Hide the error message if the date is valid
            errorMessage.style.display = 'none';

            let flows = JSON.parse(localStorage.getItem('flows')) || [];
            flows.push({ date: flowDateInput, flowType: flowType.trim() });

            // Save the updated flow data to localStorage
            localStorage.setItem('flows', JSON.stringify(flows));

            // Display the updated flow data
            displayStoredFlows();

            // Clear the date input field
            document.getElementById('flowdateInput').value = '';
        }
    } else {
        alert('Please select a date and a flow type.');
    }
});

// Event listener for clearing all flow data
document.getElementById('clearAllFlows').addEventListener('click', function() {
    // Clear flow data from localStorage
    localStorage.removeItem('flows');
    console.log("Cleared all flows from localStorage."); // Debugging line

    // Clear the displayed flows
    document.getElementById('storedFlows').innerHTML = '';

    // Hide the error message if displayed
    document.getElementById('flowErrorMessage').style.display = 'none';
});

// Call displayStoredFlows when the page loads to show previously stored flows
window.onload = function() {
    displayStoredFlows();
};


document.querySelector(".mood").addEventListener("click", function(){
    document.querySelector("#mood").style.display = "block";
});

document.querySelector(".moo-close").addEventListener("click", function(){
    document.querySelector("#mood").style.display = "none";
});

// Function to display all stored mood data from localStorage
function displayStoredMoods() {
    const storedMoodsContainer = document.getElementById('storedMoods');
    storedMoodsContainer.innerHTML = ''; // Clear the container

    let moods = JSON.parse(localStorage.getItem('moods')) || [];

    // Loop through the stored moods and display them
    moods.forEach((mood) => {
        const moodElement = document.createElement('p');
        moodElement.textContent = `Date: ${mood.date}, Mood: ${mood.moodType}`;
        storedMoodsContainer.appendChild(moodElement);
    });
}

// Function to check if the selected date is in the future
function isFutureDate(selectedDate) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return selectedDate > today; // Compare the selected date with today's date
}

// Function to check if the date already exists in the stored moods
function isDateDuplicate(selectedDate) {
    let moods = JSON.parse(localStorage.getItem('moods')) || [];
    return moods.some(mood => mood.date === selectedDate); // Check if the selected date already exists
}

// Event listener for adding mood data
// Event listener for adding mood data
document.getElementById('submitMoodDate').addEventListener('click', function() {
    const moodDateInput = document.getElementById('mooddateInput').value;
    const moodCheckboxes = document.querySelectorAll('input[name="mood"]:checked'); // Get all checked mood checkboxes
    const moodTypes = Array.from(moodCheckboxes).map(checkbox => checkbox.value); // Create an array of selected moods
    const errorMessage = document.getElementById('moodErrorMessage');

    if (moodDateInput && moodTypes.length > 0) {
        if (isFutureDate(moodDateInput)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'You cannot add a future date!';
            document.getElementById('mooddateInput').value = ''; // Clear input
        } else if (isDateDuplicate(moodDateInput)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'This date has already been saved!';
        } else {
            errorMessage.style.display = 'none'; // Hide error message if valid

            let moods = JSON.parse(localStorage.getItem('moods')) || [];
            moods.push({ date: moodDateInput, moodTypes: moodTypes }); // Store as an array

            // Save the updated mood data to localStorage
            localStorage.setItem('moods', JSON.stringify(moods));

            // Display the updated mood data
            displayStoredMoods();

            // Clear the date input field and checkboxes
            document.getElementById('mooddateInput').value = '';
            moodCheckboxes.forEach(checkbox => checkbox.checked = false); // Clear selected moods
        }
    } else {
        alert('Please select a date and at least one mood type.');
    }
});

// Update displayStoredMoods function
function displayStoredMoods() {
    const storedMoodsContainer = document.getElementById('storedMoods');
    storedMoodsContainer.innerHTML = ''; // Clear the container

    let moods = JSON.parse(localStorage.getItem('moods')) || [];

    // Loop through the stored moods and display them
    moods.forEach((mood) => {
        const moodElement = document.createElement('p');
        moodElement.textContent = `Date: ${mood.date}, Moods: ${mood.moodTypes.join(', ')}`; // Join mood types with a comma
        storedMoodsContainer.appendChild(moodElement);
    });
}

// Event listener for clearing all mood data
document.getElementById('clearAllMoods').addEventListener('click', function() {
    // Clear mood data from localStorage
    localStorage.removeItem('moods');

    // Clear the displayed moods
    document.getElementById('storedMoods').innerHTML = '';

    // Optionally, hide the error message if displayed
    document.getElementById('moodErrorMessage').style.display = 'none';
});

// Call displayStoredMoods when the page loads to show previously stored moods
window.onload = function() {
    displayStoredMoods();
};


document.querySelector(".notes").addEventListener("click", function(){
    document.querySelector("#notes").style.display = "block";
});

document.querySelector(".notes-close").addEventListener("click", function(){
    document.querySelector("#notes").style.display = "none";
});

// Function to display all stored notes from localStorage
function displayStoredNotes() {
    const storedNotesContainer = document.getElementById('storedNotes');
    storedNotesContainer.innerHTML = ''; // Clear the container

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Loop through the stored notes and display them
    notes.forEach((note) => {
        const noteElement = document.createElement('p');
        noteElement.textContent = note; // Display the note
        storedNotesContainer.appendChild(noteElement);
    });
}

// Event listener for adding notes
document.getElementById('submitNote').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput').value;
    const errorMessage = document.getElementById('notesErrorMessage');

    if (noteInput) {
        errorMessage.style.display = 'none'; // Hide error message if valid

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteInput.trim()); // Store the note

        // Save the updated notes to localStorage
        localStorage.setItem('notes', JSON.stringify(notes));

        // Display the updated notes
        displayStoredNotes();

        // Clear the input field
        document.getElementById('noteInput').value = '';
    } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please enter a note!';
    }
});

// Event listener for clearing all notes
document.getElementById('clearAllNotes').addEventListener('click', function() {
    // Clear notes from localStorage
    localStorage.removeItem('notes');

    // Clear the displayed notes
    document.getElementById('storedNotes').innerHTML = '';

    // Hide the error message if displayed
    document.getElementById('notesErrorMessage').style.display = 'none';
});

// Call displayStoredNotes when the page loads to show previously stored notes
window.onload = function() {
    displayStoredNotes();
};

const monthYear = document.getElementById('month-year');
const calendarDays = document.querySelector('.calendar-days');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');
const prevYear = document.getElementById('prev-year');
const nextYear = document.getElementById('next-year');
const selectedDateContainer = document.getElementById('selected-date');
const clearAllButton = document.getElementById('clear-all');
const bleedDaysInput = document.getElementById('bleed-days');
const submitBleedDaysButton = document.getElementById('submit-bleed-days');
const cycleLengthInput = document.getElementById('cycle-length');
const submitCycleLengthButton = document.getElementById('submit-cycle-length');

let date = new Date();
let selectedDates = JSON.parse(localStorage.getItem('selectedDates')) || [];
let bleedDays = JSON.parse(localStorage.getItem('bleedDays')) || {};
let cycleLength = JSON.parse(localStorage.getItem('cycleLength')) || null;
let storedBleedDays = JSON.parse(localStorage.getItem('storedBleedDays')) || 5; // Default bleed days

function renderCalendar() {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
    calendarDays.innerHTML = '';

    // Create empty slots for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += `<div></div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        const day = new Date(year, month, i).getDate();
        const today = new Date();
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const isMarked = selectedDates.includes(`${year}-${month + 1}-${day}`);
        const isFuture = new Date(year, month, day) > today;
        const isBleed = bleedDays[`${year}-${month + 1}-${day}`];

        // Determine if the day is a cycle date (specific date after the bleed period)
        const isCycleDate = cycleLength && selectedDates.length > 0 && selectedDates.some(selected => {
            const selectedDate = new Date(selected);
            const bleedEndDate = new Date(selectedDate);
            // Add the stored bleed days to the selected date to get the end of the bleeding period
            bleedEndDate.setDate(bleedEndDate.getDate() + storedBleedDays);
            // Color the cycle length date, starting from the day after the bleeding period ends
            const cycleDate = new Date(bleedEndDate);
            cycleDate.setDate(cycleDate.getDate() + cycleLength);
            return cycleDate.getFullYear() === year && cycleDate.getMonth() === month && cycleDate.getDate() === day;
        });

        calendarDays.innerHTML += `<div class="${isToday ? 'today' : ''} ${isMarked ? 'marked' : ''} ${isBleed ? 'bleed' : ''} ${isCycleDate ? 'next-cycle' : ''}" data-date="${year}-${month + 1}-${day}" ${isFuture ? 'disabled' : ''}>${day}</div>`;
    }

    document.querySelectorAll('.calendar-days div').forEach(day => {
        day.addEventListener('click', () => {
            if (day.dataset.date && !day.hasAttribute('disabled')) {
                const selectedDate = new Date(day.dataset.date);

                // Check if the selected date is within any bleed days
                if (isWithinBleedingPeriod(selectedDate)) {
                    alert("This date falls within your bleeding days. Please select a different date.");
                    return; // Stop further execution if within bleed period
                }

                // Popup asking if user wants to add a new cycle
                const addNewCycle = confirm("Add new cycle?");
                if (addNewCycle) {
                    // Fetch stored bleed days and use it
                    const bleedDaysCount = storedBleedDays;

                    // Mark the selected date and store it
                    selectedDates.push(day.dataset.date);
                    localStorage.setItem('selectedDates', JSON.stringify(selectedDates));
                    updateSelectedDates();

                    // Mark the next 5-7 days in red (bleed days)
                    const [year, month, dayNum] = day.dataset.date.split('-').map(Number);
                    for (let i = 0; i < bleedDaysCount; i++) {
                        const bleedDate = new Date(year, month - 1, dayNum + i);
                        const bleedDateString = `${bleedDate.getFullYear()}-${bleedDate.getMonth() + 1}-${bleedDate.getDate()}`;
                        bleedDays[bleedDateString] = true;
                    }
                    localStorage.setItem('bleedDays', JSON.stringify(bleedDays));

                    // Color the next cycle date (28th day or any cycle length)
                    if (cycleLength) {
                        const bleedEndDate = new Date(year, month - 1, dayNum + bleedDaysCount);
                        const cycleDate = new Date(bleedEndDate);
                        cycleDate.setDate(cycleDate.getDate() + cycleLength);
                        const cycleDateString = `${cycleDate.getFullYear()}-${cycleDate.getMonth() + 1}-${cycleDate.getDate()}`;
                        // Store this date as the cycle date
                        selectedDates.push(cycleDateString);
                        localStorage.setItem('selectedDates', JSON.stringify(selectedDates));
                    }

                    renderCalendar();
                }
            }
        });
    });
}

function isWithinBleedingPeriod(selectedDate) {
    for (let bleedDate in bleedDays) {
        const currentBleedDate = new Date(bleedDate);
        if (selectedDate.getTime() === currentBleedDate.getTime()) {
            return true; // Date falls within the bleed period
        }
    }
    return false;
}

function updateSelectedDates() {
    selectedDateContainer.innerHTML = selectedDates.length ? `Selected Dates: ${selectedDates.join(', ')}` : 'No dates selected';
}

// Save bleed days when the user submits the input
submitBleedDaysButton.addEventListener('click', () => {
    const bleedDaysCount = parseInt(bleedDaysInput.value);
    if (bleedDaysCount >= 3 && bleedDaysCount <= 7) {
        storedBleedDays = bleedDaysCount; // Store the input value
        localStorage.setItem('storedBleedDays', JSON.stringify(storedBleedDays));
        alert('Bleed days saved.');
    } else {
        alert('Please enter a number between 3 and 7.');
    }
});

clearAllButton.addEventListener('click', () => {
    selectedDates = [];
    bleedDays = {};
    localStorage.removeItem('selectedDates');
    localStorage.removeItem('bleedDays');
    localStorage.removeItem('cycleLength');
    localStorage.removeItem('storedBleedDays');
    updateSelectedDates();
    renderCalendar();
});

submitCycleLengthButton.addEventListener('click', () => {
    const userCycleLength = parseInt(cycleLengthInput.value);
    if (userCycleLength > 0) {
        cycleLength = userCycleLength;
        localStorage.setItem('cycleLength', JSON.stringify(cycleLength));
        renderCalendar();
    } else {
        alert('Please enter a valid number greater than 0.');
    }
});

prevMonth.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

prevYear.addEventListener('click', () => {
    date.setFullYear(date.getFullYear() - 1);
    renderCalendar();
});

nextYear.addEventListener('click', () => {
    date.setFullYear(date.getFullYear() + 1);
    renderCalendar();
});

updateSelectedDates();
renderCalendar();
