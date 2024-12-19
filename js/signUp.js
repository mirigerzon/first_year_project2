
registerEvents();

function registerEvents() {
    let signUpButton = document.querySelector('#sendValueSignUp');
    signUpButton.addEventListener('click', signUp);

    //check if there was a user in our game 
    let userData = localStorage.getItem('userData');
    if (userData) {
        let user = JSON.parse(userData)
    }
}

function signUp(e) {
    e.preventDefault();
    console.log('sign up clicked');

    // Get user input values.
    let userName = document.querySelector('#userName').value;
    let userEmale = document.querySelector('#userMale').value;
    let password = document.querySelector('#pwd').value;
    let check = JSON.parse(localStorage.getItem(userEmale));

    //Checks if all sections are complete
    if (!userName || !userEmale || !userEmale.match(/^(?=.*[a-zA-Z])(?=.*[@]).+$/) || !password)
        return alert("יש לוודא שכל הנתונים הוזנו תקין.")

    // Check if the entered email already exists in the users array and send a worng massage in case its happend.
    if (check != null)
        alert("המשתמש שהזנת קיים. אנא התחבר");
    else {
        let name = "userData";
        let userData = {
            name: userName,
            email: userEmale,
            password: password,
            points: 0
        }

        localStorage.setItem(userEmale, JSON.stringify(userData));
        localStorage.setItem("curentUser", JSON.stringify(userData))
        alert(`הי ${userName}, ההרשמה בוצעה בהצלחה!`)
        window.location.href = "../html/mainPage.html";
    }

}

