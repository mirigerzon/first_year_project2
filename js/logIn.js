
registerEvents();

function registerEvents() {
    let logInButton = document.querySelector('#sendValueLogIn');
    logInButton.addEventListener('click', logIn);

    //check if there was a user in our game 
    let userData = localStorage.getItem('userData');
    if (userData) {
        let user = JSON.parse(userData)
    }
}

function logIn(e) {
    e.preventDefault();
    console.log('log in clicked');

    // Get user input values.
    const userName = document.querySelector('#userName').value;
    const userEmale = document.querySelector('#userMale').value.toString();
    const password = document.querySelector('#pwd').value;

    //Checks if all sections are complete
    if (!userName || !userEmale || !userEmale.match(/^(?=.*[a-zA-Z])(?=.*[@]).+$/) || !password)
        return alert("יש לוודא שכל הנתונים הוזנו תקין.")

    //Data for checking the correctness of the password.
    const checkIfCorrect = JSON.parse(localStorage.getItem(userEmale));

    //Checks if the email exists.
    if (!checkIfCorrect) alert("המשתמש אינו קיים אנא הירשם");

    //Checks the correctness of the password.
    if (checkIfCorrect.password !== password)
        alert("שם המשתמש או הססמא שגויים");

    else {
        localStorage.setItem("curentUser", JSON.stringify(checkIfCorrect))
        alert(`הי ${userName}, ההתחברות בוצעה בהצלחה!`)
        window.location.href = "../html/mainPage.html";
    }

}
