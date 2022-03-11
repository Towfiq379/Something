document.getElementById("createBtn").addEventListener("click", goToAddPage);

function goToAddPage() {
    document.getElementById("placeListPage").style.display = "none";
    document.getElementById("addPlacePage").style.display = "block";
}

document.getElementById("listPage").addEventListener("click", goToListPage);

function goToListPage() {
    document.getElementById("placeListPage").style.display = "block";
    document.getElementById("addPlacePage").style.display = "none";
}

function checkValidity() {
    if (document.getElementById("name").value == "") return false;
    if(document.getElementById("address").value == "") return false;
    const rating = document.getElementById("rating").value;
    if (isNaN(rating) || rating < 1 || rating > 5) return false;
    if (document.getElementById("img").value) return true;
    else return false;
}

function checkExistence(text) {
    const placeList = document.getElementById("list");
    const rows = placeList.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        const currentName = rows[i].cells[0].innerText;
        if (currentName.toLowerCase() == text.toLowerCase()) {
            return true;
        }
    }
}

document.getElementById("submitBtn").addEventListener("click", () => {
    if (checkValidity() == false) {
        alert("Fill each of the input field correctly!!!");
        return;
    }
    let text = document.getElementById("name").value;
    if(currentRow == undefined && checkExistence(text) == true) {
        alert(`"${text}" already exists!!!`);
        return;
    }
    const list = document.getElementById("list");
    const newRow = document.createElement("tr");
    const nameCol = document.createElement("td");
    const nameNode = document.createTextNode(text);
    nameCol.appendChild(nameNode);
    newRow.appendChild(nameCol);
    const addressCol = document.createElement("td");
    text = document.getElementById("address").value;
    const addressNode = document.createTextNode(text);
    addressCol.appendChild(addressNode);
    newRow.appendChild(addressCol);
    const ratingCol = document.createElement("td");
    text = document.getElementById("rating").value;
    const ratingNode = document.createTextNode(text);
    ratingCol.appendChild(ratingNode);
    newRow.appendChild(ratingCol);
    const imgCol = document.createElement("td");
    const img = document.createElement("img");
    const file = document.getElementById("img").files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        img.src = reader.result;
        imgCol.appendChild(img);
        newRow.insertBefore(imgCol, btnCol);
    });
    reader.readAsDataURL(file);
    const btnCol = document.createElement("td");
    const updateBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    updateBtn.setAttribute("class", "update-btn");
    deleteBtn.setAttribute("class", "delete-btn");
    updateBtn.innerHTML = "Update";
    deleteBtn.innerHTML = "delete";
    btnCol.appendChild(updateBtn);
    btnCol.appendChild(deleteBtn);
    newRow.appendChild(btnCol);

    if (currentRow == undefined) {
        list.appendChild(newRow);
    } else {
        currentRow.replaceWith(newRow);
        currentRow = undefined;
    }

    deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete selected row?") == true) {
            deleteBtn.parentElement.parentElement.remove();
        }
    });

    updateBtn.addEventListener("click", () => {
        row = updateBtn.parentElement.parentElement;
        document.getElementById("name").value = row.cells[0].innerHTML;
        document.getElementById("address").value = row.cells[1].innerHTML;
        document.getElementById("rating").value = row.cells[2].innerHTML;
        currentRow = row;
        goToAddPage();
    });

    goToListPage();
})

dltBtn = document.getElementsByClassName("delete-btn");
for (let i = 0; i < dltBtn.length; i++) {
    dltBtn[i].addEventListener("click", () => {
        if (confirm("Are you sure you want to delete selected row?") == true) {
            dltBtn[i].parentElement.parentElement.remove();
        }
    });
}

currentRow = undefined;

document.getElementById("listPage").addEventListener("click", () => {
    currentRow = undefined;
});

updtBtn = document.getElementsByClassName("update-btn");
for (let i = 0; i < updtBtn.length; i++) {
    updtBtn[i].addEventListener("click", () => {
        const row = updtBtn[i].parentElement.parentElement;
        document.getElementById("name").value = row.cells[0].innerHTML;
        document.getElementById("address").value = row.cells[1].innerHTML;
        document.getElementById("rating").value = row.cells[2].innerHTML;
        let x = row.cells[3].getElementsByTagName("img");
        alert(x[0].src);
        document.getElementById("img").value = x;
        currentRow = row;
        goToAddPage();
    });
}

document.getElementById("searchBar").addEventListener("keyup", () => {
    const searchName = document.getElementById("searchBar").value. toLowerCase();
    const placeList = document.getElementById("list");
    const rows = placeList.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        const currentName = rows[i].cells[0].innerText.toLowerCase();
        if (currentName.indexOf(searchName) > -1) {
            rows[i].style.visibility = "visible";
        } else {
            rows[i].style.visibility = "collapse";
        }
    }
});

document.getElementById("nameHeader").addEventListener("click", () => {sortList(0);});
document.getElementById("ratingHeader").addEventListener("click", () => {sortList(2);});

function sortList(col) {
    let flag = true, direction = "asc";
    const placeList = document.getElementById("list");
    const rows = placeList.getElementsByTagName("tr");
    while(flag) {
        let swapCnt = 0;
        for (let i = 0; i < rows.length - 1; i++) {
            for (let j = 1; j < rows.length - i - 1; j++) {
                const value1 = rows[j].cells[col].innerText.toLocaleLowerCase();
                const value2 = rows[j + 1].cells[col].innerText.toLocaleLowerCase();
                if (direction = "asc" && value1 > value2 || direction == "disc" && value1 < value2) {
                    rows[j].parentNode.insertBefore(rows[j + 1], rows[j]);
                    swapCnt++;
                }
            }
        }
        if (swapCnt == 0 && direction == "asc") {
            direction = "disc";
        } else {
            flag = false;
        }
    }
    flag[col] = flase;
}