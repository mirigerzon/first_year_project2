window.onload = function () {
    let findUserData = JSON.parse(localStorage.getItem(`curentUser`));
    let name = findUserData.email
    let userData = JSON.parse(localStorage.getItem(name));
    let point = userData.points;
    let span = document.getElementById("point");
    span.textContent = point;
    let levelSpan = document.getElementById("level");
    span.textContent = point;
    if (point === 0) {
        let currentUserLevel = document.createElement("p");
        document.getElementById("level").appendChild(currentUserLevel)
        currentUserLevel.innerText += ("- חייל -");
    }
    else if (point > 0 && point <= 20) {
        let currentUserLevel = document.createElement("p");
        document.getElementById("level").appendChild(currentUserLevel)
        currentUserLevel.innerText += (" - מפקד -");
    }
    else if (point > 20 && point <= 40) {
        let currentUserLevel = document.createElement("p");
        document.getElementById("level").appendChild(currentUserLevel)
        currentUserLevel.innerText += ("- סגן אלוף -");
    }
    else if (point > 40 && point <= 60) {
        let currentUserLevel = document.createElement("p");
        document.getElementById("level").appendChild(currentUserLevel)
        currentUserLevel.innerText += ("- אלוף -");
    }
    else if (point > 60 && point <= 80) {
        let currentUserLevel = document.createElement("p");
        document.getElementById("level").appendChild(currentUserLevel)
        currentUserLevel.innerText += ("- רמטכל -");
    }

}