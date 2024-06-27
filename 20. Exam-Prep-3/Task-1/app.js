window.addEventListener('load', solve);

function solve() {
    // initial map of elements
    let timeElement = document.getElementById('time');
    let dateElement = document.getElementById('date');
    let placeElement = document.getElementById('place');
    let eventElement = document.getElementById('event-name');
    let emailElement = document.getElementById('email');
    let addButtonElement = document.getElementById('add-btn');

    // all of the form elements
    let checkListElement = document.getElementById('check-list');
    let upcomingListElement = document.getElementById('upcoming-list');
    let finishedListElement = document.getElementById('finished-list');

    // clear button
    let clearButtonElement = document.getElementById('clear');


    // when addEvent button is clicked functionality
    addButtonElement.addEventListener('click', onNext)

    function onNext(e) {
        e.preventDefault(); // Remove the default behaviour of the browser (refreshing removed)

        // check if all fields are filled
        if (
            timeElement.value == '' ||
            dateElement.value == '' ||
            placeElement.value == '' ||
            eventElement.value == '' ||
            emailElement.value == ''
        ) {
            return;
        }

        // build 'li' element with all children inside
        let liElement = document.createElement('li');
        liElement.setAttribute('class', 'event-content');

        let articleElement = document.createElement('article');

        let timePar = document.createElement('p');
        timePar.textContent = `Begins: ${dateElement.value} at: ${timeElement.value}`;

        let placePar = document.createElement('p');
        placePar.textContent = `In: ${placeElement.value}`;

        let eventNamePar = document.createElement('p');
        eventNamePar.textContent = `Event: ${eventElement.value}`;

        let emailPar = document.createElement('p');
        emailPar.textContent = `Contact: ${emailElement.value}`;

        let editButton = document.createElement('button');
        editButton.setAttribute('class', 'edit-btn');
        editButton.textContent = 'Edit';

        let continueButton = document.createElement('button');
        continueButton.setAttribute('class', 'continue-btn');
        continueButton.textContent = 'Continue';

        // appending
        articleElement.appendChild(timePar);
        articleElement.appendChild(placePar);
        articleElement.appendChild(eventNamePar);
        articleElement.appendChild(emailPar);

        liElement.appendChild(articleElement);
        liElement.appendChild(editButton);
        liElement.appendChild(continueButton);

        checkListElement.appendChild(liElement);

        // disabled the button AddEvent when successfuly add event
        addButtonElement.disabled = true;

        // save the data in variables
        let editedTimeElement = timeElement.value;
        let editedDateElement = dateElement.value;
        let editedPlaceElement = placeElement.value;
        let editedEventElement = eventElement.value;
        let editedEmailElement = emailElement.value;

        // clear all inputs
        timeElement.value = '';
        dateElement.value = '';
        placeElement.value = '';
        eventElement.value = '';
        emailElement.value = '';

        // when click edit button functionality
        editButton.addEventListener('click', onEdit);

        function onEdit() {
            timeElement.value = editedTimeElement;
            dateElement.value = editedDateElement;
            placeElement.value = editedPlaceElement;
            eventElement.value = editedEventElement;
            emailElement.value = editedEmailElement;

            liElement.remove();

            addButtonElement.disabled = false;
        };

        // when click continue button functionality
        continueButton.addEventListener('click', onContinue);

        function onContinue() {
            let liElementContinue = document.createElement('li');
            liElementContinue.setAttribute('class', 'event-content');

            let articleElementContinue = document.createElement('article');

            // Here we set the previous article to the new article 
            articleElementContinue = articleElement;

            let moveToFinishButton = document.createElement('button');
            moveToFinishButton.setAttribute('class', 'finished-button');
            moveToFinishButton.textContent = 'Move to Finished';

            // now we appending
            liElementContinue.appendChild(articleElementContinue);
            liElementContinue.appendChild(moveToFinishButton);
            upcomingListElement.appendChild(liElementContinue);

            addButtonElement.disabled = false;
            liElement.remove();


            // when moveToFinish button is clicked functionality
            moveToFinishButton.addEventListener('click', moveToFinish);

            function moveToFinish() {
                let liElementFinished = document.createElement('li');
                liElementFinished.setAttribute('class', 'event-content');

                let articleElementFinished = document.createElement('article');
                articleElementFinished = articleElementContinue;

                liElementFinished.appendChild(articleElementFinished);
                finishedListElement.appendChild(liElementFinished);

                liElementContinue.remove();

                // when clearButton is clicked functionality
                clearButtonElement.addEventListener('click', onClear);

                function onClear() {
                    liElementFinished.remove();
                };
            };
        };
    };
};