window.onload = function () {
    let findUserData = JSON.parse(localStorage.getItem(`curentUser`));
    let name = findUserData.name;

    let span = document.getElementById("box");
    span.textContent = name;

}