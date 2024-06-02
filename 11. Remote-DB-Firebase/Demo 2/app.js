// Unique FireBase Object
const firebaseConfig = {
    apiKey: "AIzaSyCJUOMmL3tuw2TyEZ6nwiwJqcR3MU23Lqg",
    authDomain: "responsiveformdemoprojec-a954b.firebaseapp.com",
    projectId: "responsiveformdemoprojec-a954b",
    storageBucket: "responsiveformdemoprojec-a954b.appspot.com",
    messagingSenderId: "386672059494",
    appId: "1:386672059494:web:e9f69fc8052eea81f579a7",
    measurementId: "G-PK6QBJXVPX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

// Variable to access the DB
const db = firestore.collection("responsiveForm");

// Get submit button
let submitButton = document.getElementById("submit");

// Add eventListener to submit button
submitButton.addEventListener("click", (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Get form values
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let country = document.getElementById("country-input").value;

    // Save data to Firebase
    db.doc().set({
        fname: firstName,
        lname: lastName,
        email: email,
        country: country
    }).then(() => {
        console.log("Data is saved");
    }).catch((error) => {
        console.log(error);
    })


    // Alert
    alert("Forst is submitted successfully");
});

// Function to fetch the information and display from db
function fetchRecords() {
    const recordsLists = document.getElementById("records-list");
    recordsLists.innerHTML = "";

    db.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const record = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `First name: ${record.fname}, Last Name: ${record.lname}, Email: ${record.email}, Country: ${record.country}`
            recordsLists.appendChild(listItem);
        });
    }).catch((error) => {
        console.log("Error while fetching data", error);
    })
}

let getUsersButton = document.getElementById("getRecords");
getUsersButton.addEventListener("click", fetchRecords);

window.fetchRecords = fetchRecords;