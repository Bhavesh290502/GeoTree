document.addEventListener('DOMContentLoaded', function() {
    // Existing drawer functionality
    var openBtn = document.getElementById('openBtn');
    var closeBtn = document.getElementById('closeBtn');
    var drawer = document.getElementById('drawer');
    var mainContent = document.querySelector('.main-content');

    openBtn.addEventListener('click', function() {
        drawer.style.width = '250px';
        mainContent.classList.add('drawer-open');
        document.getElementById("drawer").classList.add("drawer-opened");
        openBtn.style.display = "none";
    });

    closeBtn.addEventListener('click', function() {
        drawer.style.width = '0';
        mainContent.classList.remove('drawer-open');
        document.getElementById("drawer").classList.remove("drawer-opened");
        setTimeout(function() {
            openBtn.style.display = "block";
        }, 50);
    });

    // Map initialization with Leaflet
    var map = L.map('map').setView([51.505, -0.09], 13); // Default view (e.g., London)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Function to update map with user's location
    function updateMapLocation(lat, lng, accuracy) {
        map.setView([lat, lng], 13); // Update map view to user's location

        // Add a marker for user's location
        var marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`<b>Your Location</b><br>Latitude: ${lat.toFixed(2)}<br>Longitude: ${lng.toFixed(2)}`).openPopup();

        // Add a circle to indicate accuracy
        L.circle([lat, lng], {
            radius: accuracy,
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.5
        }).addTo(map);
    }

    // Get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var accuracy = position.coords.accuracy;
            updateMapLocation(lat, lng, accuracy); // Update map with user's location
        }, function(error) {
            console.error('Error getting location: ' + error.message);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});
