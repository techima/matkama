var km = 0;
var h = 0;
var raskus = "";

var hikeToggled = false;
var bikeToggled = false;
var kayakToggled = false;

function rangeSlide(value) {
    km = value
    document.getElementById('rangeValueKilometres').innerHTML = km + " km";
    updateTracks()
}

function rangeSlideHours(value) {
    h = value
    document.getElementById('rangeValueHours').innerHTML = h + " h";
    updateTracks()
}

function selectionButtonClicked(id) {
    if (id === "hike") {
        if (hikeToggled) {
            hikeToggled = false
        } else {
            hikeToggled = true
            bikeToggled = false
            kayakToggled = false
        }
    }
    if (id === "bike") {
        if (bikeToggled) {
            bikeToggled = false
        } else {
            bikeToggled = true
            hikeToggled = false
            kayakToggled = false
        }
    }
    if (id === "kayak") {
        if (kayakToggled) {
            kayakToggled = false
        } else {
            kayakToggled = true
            bikeToggled = false
            hikeToggled = false
        }
    }
    updateIcons()
    updateTracks()
}

function showContents(id) {
    document.getElementById("info_logo").src = getLogo(id)
    document.getElementById("pikkus").innerHTML = getPikkus(id)
    document.getElementById("kestus").innerHTML = getKestus(id)
    document.getElementById("raskus").innerHTML = getRaskus(id)
    document.getElementById("descriptive_text").innerHTML = getDescription(id);
    updateMap(id)
    document.querySelector('.bg-modal').style.display = "flex";
}

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});

function updateIcons() {
    document.getElementById("hike").src = "resources/hiking_black_48dp 1.png"
    document.getElementById("bike").src = "resources/directions_bike_black_48dp 1.png"
    document.getElementById("kayak").src = "resources/kayaking_black_48dp 1.png"
    if (hikeToggled) {
        document.getElementById("hike").src = "resources/hiking_selected.png"
    } else if (bikeToggled) {
        document.getElementById("bike").src = "resources/biking_selected.png"
    } else if (kayakToggled) {
        document.getElementById("kayak").src = "resources/kayaking_selected.png"
    }
}

function updateTracks() {

    let paukjarv = document.getElementById("rada1")
    let ontika = document.getElementById("rada2")
    let turba = document.getElementById("rada3")
    let vortsjarv = document.getElementById("rada4")
    const allUnToggled = !hikeToggled && !bikeToggled && !kayakToggled

    if (km <= 3 && h <= 1 && (hikeToggled || allUnToggled) && (raskus == "" || raskus == "kerge")) {
        paukjarv.style.display = "block";
    } else {
        paukjarv.style.display = "none";
    }

    if (km <= 4 && h < 2 && (hikeToggled || allUnToggled) && (raskus == "" || raskus == "kerge")) {
        ontika.style.display = "block";
    } else {
        ontika.style.display = "none";
    }

    if (km <= 47 && h <= 3 && (bikeToggled || allUnToggled) && (raskus == "" || raskus == "keskmine")) {
        turba.style.display = "block";
    } else {
        turba.style.display = "none";
    }

    if (km <= 25 && h <= 4 && (kayakToggled || allUnToggled) && (raskus == "" || raskus == "raske")) {
        vortsjarv.style.display = "block";
    } else {
        vortsjarv.style.display = "none";
    }

    if (noTracksShown(paukjarv, ontika, turba, vortsjarv)) {
        document.getElementById("no_tracks").style.visibility = "visible"
    } else {
        document.getElementById("no_tracks").style.visibility = "hidden"
    }
}

var map;
var marker;
function initMap() {
    const location = { 
        lat: 0,
        lng: 0 
    };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: location,
    });
    marker = new google.maps.Marker({
      position: location,
      map: map,
    });
}

function noTracksShown(paukjarv, ontika, turba, vortsjarv) {
    if (paukjarv.style.display == "none" &&
         ontika.style.display == "none" && 
         turba.style.display == "none" &&
         vortsjarv.style.display == "none") {
        return true
    } else {
        return false
    }
}

function updateMap(id) {
    latitude = getLat(id)
    longtitude = getLong(id)
    myLatlng = new google.maps.LatLng(latitude, longtitude);
    marker.setPosition(myLatlng);
    map.setCenter(myLatlng);
}

function getLat(id) {
    if (id === "rada1") {
        return "59.3896"
    } else if (id === "rada2") {
        return "59.4406"
    } else if (id === "rada3") {
        return "59.08008"
    } else {
        return "58.3104"
    } 
}

function getLong(id) {
    if (id === "rada1") {
        return "25.6801"
    } else if (id === "rada2") {
        return "27.2166"
    } else if (id === "rada3") {
        return "24.236195"
    } else {
        return "26.0114"
    } 
}

function getLogo(id) {
    if (id === "rada1") {
        return "resources/hiking_black_48dp 1.png"
    } else if (id === "rada2") {
        return "resources/hiking_black_48dp 1.png"
    } else if (id === "rada3") {
        return "resources/directions_bike_black_48dp 1.png"
    } else {
        return "resources/kayaking_black_48dp 1.png"
    }
}

function getPikkus(id) {
    if (id === "rada1") {
        return "3,5 km"
    } else if (id === "rada2") {
        return "4 km"
    } else if (id === "rada3") {
        return "47 km"
    } else {
        return "25 km"
    }
}

function getKestus(id) {
    if (id === "rada1") {
        return "1 h"
    } else if (id === "rada2") {
        return "1,5 h"
    } else if (id === "rada3") {
        return "3 h"
    } else {
        return "4 h"
    }
}

function getRaskus(id) {
    if (id === "rada1") {
        return "Kerge"
    } else if (id === "rada2") {
        return "Kerge"
    } else if (id === "rada3") {
        return "Keskmine"
    } else {
        return "Raske"
    }
}

function getDescription(id) {
    if (id === "rada1") {
        return "Loodusrada kulgeb mööda Paukjärve äärseid oose ning ooside vahelisi orgusid. Vahelduvad erinevad metsatüübid - niiske ja hämar laanemets ning valguseküllane männi-palumets. Rada on tähistatud kollaste värvimärkidega."
    } else if (id == "rada2") {
        return "Eesti kõrgeim kuni 55 meetrit üle merepinna ulatuv Ontika pankrannik on kui kivist loodusraamat, paljastades vaatajatele erinevad ajastu kihid. Kõige parem vaade pankrannikule avaneb Valaste joa juurest trepiplatvormilt või tutvudes unikaalse klindimetsaga rannikule rajatud Valasteõppe- ja  matkarajal."
    } else if (id == "rada3") {
        return "Turba - Vinnuki matkaraja kohta informatsiooni leidmiseks külasta matkarada ennast!"
    } else {
        return "Võrtsjärv on Eesti suurim siseveekogu. Kaunid vaated järvele avanevad nii põhjakaldal külastuskeskuse juurest kui ka ümber järve rajatud puhkekohtadest. Järve kaldad on madalad ja kohati soisedki, siiski ootavad mõnusad liivased ujumiskohad Vaibla kandis. Jõesuus, külastuskeskuse kõrval on avatud vaatetorn, kust kaunis, sillerdav järvepind kaugele näha ja väike piknikukoht."
    }
}

function selectedDifficulty(selectObject) {
    raskus = selectObject.value;  
    updateTracks()
}
