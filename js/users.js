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
    writeStat(userDatas);
  
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
        document.querySelector('#table').appendChild(table);
    }
}




function searchOldest(userData) {
    var birthDate;
    var firstBirth = new Date(userData[0].birthdate);
    var oldestUser = userData[0];
    for (var i=0; i< userData.length; i++) {
            birthDate = new Date(userData[i].birthdate);
            if (firstBirth > birthDate) {
                firstBirth = birthDate;
                oldestUser = userData[i];
            }
        }
return oldestUser.username +', ' + formatBirthDate(firstBirth);  
}


function searchYoungest(userData) {
    var birthDate;
    var lastBirth = new Date(userData[0].birthdate);
    var youngestUser = userData[0];
    for (var i=0; i< userData.length; i++) {
            birthDate = new Date(userData[i].birthdate);
            if (lastBirth < birthDate) {
                lastBirth = birthDate;
                youngestUser = userData[i];
            }
        }
return youngestUser.username +', ' + formatBirthDate(lastBirth);
}


function formatBirthDate(date) {
var year, month, day;
var monthNames = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 
'augusztus', 'szeptember', 'október', 'november', 'december']
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();

return year +'. ' + monthNames[month] +'  '+ day +'.'

} 


function sumAge(userData) {
    var birthdate, months, age;
    var sumAge = 0;
    var today = new Date();
    for (var i=0; i< userData.length; i++) {
            birthdate = new Date(userData[i].birthdate);
            age = today.getFullYear() - birthdate.getFullYear();
            if (age > 0 && age < 110) {
                months = today.getMonth() - birthdate.getMonth();
                if (months < 0) { 
                    age -=1;
                }
                sumAge += age;
            }
        }
return sumAge;
}


function avgAge(userData) {
    return sumAge(userData)/userData.length;
}


function myStatistic(userData) {
    return {
        'A legidősebb ember felhasználóneve, születési ideje': searchOldest(userData),
        'A legfiatalabb ember felhasználóneve, születési ideje': searchYoungest(userData),
        'Átlagéletkor': avgAge(userData),
        'Össz életkor': sumAge(userData),
    }
}



function writeStat(userData) {
    var divElem = document.getElementById('stat');
    var stat = myStatistic(userData);
   console.log(stat);
    for (var i in stat) {
        var pElem = document.createElement('p');
        pElem.textContent = `${i}:`
        var spanElem = document.createElement('span'); 
        spanElem.textContent = ` ${stat[i]}`;
        pElem.appendChild(spanElem);
    divElem.appendChild(pElem);
    }
}

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */