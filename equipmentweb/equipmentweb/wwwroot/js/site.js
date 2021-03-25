// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const uri = 'http://localhost:51766/api/equipment';
let equipmentlist = [];

function getEquipments() {
    debugger;
    fetch(uri, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
    })
        .then(response => response.json())
        .then(data => _displayEquipmentList(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addEquipment() {
    debugger;

    const equipment = {
        equipmentName: document.getElementById('EquipmentName').value,
        equipmentAmount: document.getElementById('EquipmentAmount').value,
        purchaseDate: document.getElementById('PurchaseDate').value
    };
    //Fetch API
    //axios
    //jquery ajax
    //angular http service
    fetch(uri, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(equipment)
    })
        .then(response => response.json())
        .then(() => {
            getEquipments();
            ///addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}


function deleteItem(EquipmentId) {
    debugger;
    fetch(`${uri}/${EquipmentId}`, {
        method: 'DELETE'
    })
        .then(() => getEquipments())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id)
{
    debugger;
    const item = equipmentlist.find(item => item.equipmentId === id);

    document.getElementById('editEquipmentId').value = item.equipmentId;
    document.getElementById('editEquipmentName').value = item.equipmentName;
    document.getElementById('editEquipmentAmount').value = item.equipmentAmount;
    document.getElementById('editPurchaseDate').value = item.purchaseDate;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem()
{
    const equipmentid = document.getElementById('editEquipmentId').value;
    const equipment =
    {
        EquipmentName: document.getElementById('editEquipmentName').value,
        EquipmentAmount: document.getElementById('editEquipmentAmount').value,
        PurchaseDate: document.getElementById('editPurchaseDate').value
    };

    fetch(`${uri}/${equipmentid}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(equipment)
    })
        .then(() => getEquipments())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput()
{
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount)
{
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayEquipmentList(data)
{
    debugger;
    const tBody = document.getElementById('equipmentlist');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item =>
    {
        let lableforEquipmentId = document.createElement('label');
        lableforEquipmentId.innerHTML = item.equipmentId;

        let lableforEquipmentName = document.createElement('label');
        lableforEquipmentName.innerHTML = item.equipmentName;

        let lableforEquipmentAmount = document.createElement('label');
        lableforEquipmentAmount.innerHTML = item.equipmentAmount;

        let lableforPurchaseDate = document.createElement('label');
        lableforPurchaseDate.innerHTML = item.purchaseDate;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.equipmentId})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.equipmentId})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(lableforEquipmentId);

        let td2 = tr.insertCell(1);
        td2.appendChild(lableforEquipmentName);

        let td3 = tr.insertCell(2);
        td3.appendChild(lableforEquipmentAmount);

        let td4 = tr.insertCell(3);
        td4.appendChild(lableforPurchaseDate);

        //let td2 = tr.insertCell(1);
        //let textNode = document.createTextNode(item.name);
        //td2.appendChild(textNode);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    equipmentlist = data;
}
