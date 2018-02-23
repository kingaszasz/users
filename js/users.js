function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = (JSON.parse(xhttp.responseText))[0].users;
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!



      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    createTable(userDatas);
  
}

getData('/js/users.json', successAjax);

function generateHead(headData) {
    var tr = document.createElement('tr');
    headData.forEach(function (element) {
        var th = document.createElement('th');
        th.textContent = element;
        tr.appendChild(th);
    });
    return tr;
}

function generateRow(objElement, arrElement) {
    var td = document.createElement('td');
    var element = objElement[arrElement];
    td.textContent = element;
    return td;
}

function createTable(userData) {
    document.querySelector('body').innerHTML = '';
    var table = document.createElement('table');
    var headData = ['Azonosító', 'Felhasználónév', 'Jelszó', 'Vezetéknév', 'Keresztnév', 
        'Ország', 'Állam/Megye', 'Irányítószám', 'Város', 'Cím', 'Nem', 'Születési dátum', 
        'Email cím', 'Telefonszám'];
    var dataProps = ['id', 'username', 'password', 'firstname', 'lastname', 'country', 
        'state', 'zipcode', 'city', 'address', 'sex', 'birthdate', 'email', 'phone'];
    table.appendChild(generateHead(headData));
    for (var i = 0; i < userData.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < dataProps.length; j++) {
            tr.appendChild(generateRow(userData[i], dataProps[j]));
            table.appendChild(tr);
        }
        document.querySelector('body').appendChild(table);
    }
}


// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */