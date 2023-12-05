/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

// Body query selector
const body = document.querySelector("body");
// Robohash image selector
const robohashImage = document.querySelector("#robohashImage");

// URL for the Robohash
const baseURl = 'https://robohash.org/';
let url;

/* Functions
-------------------------------------------------- */
// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    // STEP 3b: Update the charging status
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    // STEP 3c: Update the charge level
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;
}

function changeImage(battery) {
    // Declare img element
    const image = document.createElement("img");

    // Set id for query selector
    image.id = "robohashImage"

    // Removes the image child if it is present
    if (body.contains(robohashImage))
        body.removeChild(robohashImage);

    // Create the full URL with the battery level
    url = `${baseURl}${battery.level * 100}`;

    // Sets the src of the image to url
    image.setAttribute("src", url);

    console.log(url);

    // Appends the image to the body
    body.appendChild(image);
}

// STEP 2a: Using the getBattery() method of the navigator object, 
//create a promise to retrieve the battery information
navigator.getBattery().then(battery => {
    // STEP 2b: See what the battery object contains
    console.log(battery);
    // STEP 3d: Update the battery information when the promise resolves
    updateBatteryStatus(battery);

    changeImage(battery);

    // STEP 4a: Event listener for changes to the charging status
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });
    // STEP 4b: Event listener for changes to the charge level
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
        changeImage(battery);
    });
})

/* This script adapted from the excellent code examples found at https://www.w3.org/TR/battery-status/#examples and https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API */