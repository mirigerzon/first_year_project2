window.onload = function () {
    let findUserData = JSON.parse(localStorage.getItem(`curentUser`));
    let name = findUserData.name;
    if (name != null)
        alert(`שלום ${name} 🤩`)
    let currentUserName = document.createElement("p");
    document.getElementById("helloUser").appendChild(currentUserName)
    currentUserName.innerText += (name);
} 
