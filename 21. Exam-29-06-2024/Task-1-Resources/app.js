window.addEventListener("load", solve);

function solve() {
    const numberOfTicketsElement = document.getElementById('num-tickets');
    const seatingPreferenceElement = document.getElementById('seating-preference');
    const fullNameElement = document.getElementById('full-name');
    const emailElement = document.getElementById('email');
    const phoneNumberElement = document.getElementById('phone-number');
    const purchaseButton = document.getElementById('purchase-btn');
    const ticketPreviewElement = document.getElementById('ticket-preview');
    const ticketPurchaseElement = document.getElementById('ticket-purchase');
    const bottomContentElement = document.querySelector('.bottom-content');
 
    purchaseButton.addEventListener('click', onAddClicked);
 
    function onAddClicked() {
        if (numberOfTicketsElement.value === '' ||
            seatingPreferenceElement.value === '' || 
            seatingPreferenceElement.value === 'seating-preference' || 
            fullNameElement.value === '' ||
            emailElement.value === '' ||
            phoneNumberElement.value === ''
        ) {
            return;
        }
 
        const numberOfTickets = numberOfTicketsElement.value;
        const seatingPreference = seatingPreferenceElement.value;
        const fullName = fullNameElement.value;
        const email = emailElement.value;
        const phoneNumber = phoneNumberElement.value;
 
        const ticketPurchaseArticleElement = document.createElement('article');
        const ticketPurchaseRowElement = document.createElement('li');
        ticketPurchaseRowElement.setAttribute('class', 'ticket-purchase');
        
        const countParagraphElement = document.createElement('p');
        countParagraphElement.textContent = `Count: ${numberOfTickets}`;
 
        const preferenceParagraphElement = document.createElement('p');
        preferenceParagraphElement.textContent = `Preference: ${seatingPreference}`;
        
        const nameParagraphElement = document.createElement('p');
        nameParagraphElement.textContent = `To: ${fullName}`;
 
        const emailParagraphElement = document.createElement('p');
        emailParagraphElement.textContent = `Email: ${email}`;
 
        const phoneParagraphElement = document.createElement('p');
        phoneParagraphElement.textContent = `Phone number: ${phoneNumber}`;
 
        const editButton = document.createElement('button');
        editButton.addEventListener('click', onEditClicked);
        editButton.setAttribute('class', 'edit-btn');
        editButton.textContent = "Edit";
 
        const nextButton = document.createElement('button');
        nextButton.addEventListener('click', onNextClicked);
        nextButton.setAttribute('class', 'edit-btn');
        nextButton.textContent = "Next";
 
        const buttonsContainer = document.createElement('div');
        buttonsContainer.setAttribute('class', 'btn-container');
 
        ticketPurchaseArticleElement.appendChild(countParagraphElement);
        ticketPurchaseArticleElement.appendChild(preferenceParagraphElement);
        ticketPurchaseArticleElement.appendChild(nameParagraphElement);
        ticketPurchaseArticleElement.appendChild(emailParagraphElement);
        ticketPurchaseArticleElement.appendChild(phoneParagraphElement);
 
        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(nextButton);
 
        ticketPurchaseRowElement.appendChild(ticketPurchaseArticleElement);
        ticketPurchaseRowElement.appendChild(buttonsContainer);
 
        ticketPreviewElement.appendChild(ticketPurchaseRowElement);
 
        purchaseButton.disabled = true;
 
        numberOfTicketsElement.value = '';
        seatingPreferenceElement.value = 'seating-preference'; 
        fullNameElement.value = '';
        emailElement.value = '';
        phoneNumberElement.value = '';
 
        function onEditClicked() {
            numberOfTicketsElement.value = numberOfTickets;
            seatingPreferenceElement.value = seatingPreference; 
            fullNameElement.value = fullName;
            emailElement.value = email;
            phoneNumberElement.value = phoneNumber;
 
            purchaseButton.disabled = false;
 
            ticketPurchaseRowElement.remove();
        }
 
        function onNextClicked() {
            const ticketConfirmationRowElement = document.createElement('li');
            ticketConfirmationRowElement.setAttribute('class', 'ticket-purchase');
 
            const buyButton = document.createElement('button');
            buyButton.addEventListener('click', onBuyClicked);
            buyButton.setAttribute('class', 'buy-btn');
            buyButton.textContent = "Buy";
 
            buttonsContainer.removeChild(editButton);
            buttonsContainer.removeChild(nextButton);
            buttonsContainer.appendChild(buyButton);
 
            ticketConfirmationRowElement.appendChild(ticketPurchaseArticleElement);
            ticketConfirmationRowElement.appendChild(buttonsContainer);
            ticketPurchaseElement.appendChild(ticketConfirmationRowElement);
 
            ticketPurchaseRowElement.remove();
 
            function onBuyClicked() {
                const headerElement = document.createElement('h2');
                headerElement.textContent = "Thank you for your purchase!";
 
                const backButton = document.createElement('button');
                backButton.addEventListener('click', () => window.location.reload());
                backButton.setAttribute('class', 'back-btn');
                backButton.textContent = "Back";
 
                bottomContentElement.appendChild(headerElement);
                bottomContentElement.appendChild(backButton);
 
                ticketConfirmationRowElement.remove();
            }
        }
    }
}