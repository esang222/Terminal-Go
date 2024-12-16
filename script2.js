document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.querySelector(".sidebar");
  const closeIcon = document.querySelector(".close-icon");

  // Toggle sidebar
  menuIcon.addEventListener("click", () => {
    sidebar.classList.add("open");
  });

  closeIcon.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });

  // Initialize the map
  const map = L.map("map").setView([14.3122, 121.1117], 13);

  // Adding OpenStreetMap layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Terminal data (name and coordinates)
  const terminals = {
    sinabtoda: { coords: [14.3140, 121.1090], name: "SINABTODA", eta: "10mins", distance: "10km", transport: "Tricycle", fare: "15.00" },
    balibago: { coords: [14.2946, 121.1054], name: "Balibago Complex Terminal", eta: "5mins", distance: "15km", transport: "Jeepney", fare: "13.00" },
  };

  // Possible paths with their coordinates
  const possiblePaths = {
    "SM Santa Rosa": [14.3145, 121.0971],
    "Enchanted Kingdom": [14.2824, 121.1101],
    "Brgy Malitlit": [14.2444, 121.1214],
    "Brgy Sinalhan": [14.3281, 121.1126],
    "Santa Rosa City Hall": [14.3123, 121.1115],
  };

  // Retrieve data from localStorage
  const locationsData = JSON.parse(localStorage.getItem("locationsData"));

  // Custom icon for markers
  const createLocationIcon = () => {
    return L.divIcon({
      className: "location-icon",
      iconSize: [30, 30], // Adjust the size of the icon
      html: '<span class="location-marker">&#128205;</span>', // Using a location pin icon
    });
  };

  // Function to add styled terminal markers
  Object.values(terminals).forEach((terminal) => {
    L.marker(terminal.coords, {
      icon: createLocationIcon(), // Custom location icon
    })
      .addTo(map)
      .bindTooltip(
        `${terminal.name}`, // Simple text without the box
        { permanent: true, className: "terminal-tooltip" }
      );
  });

  if (locationsData) {
    const { fromLocation, toLocation, terminalName } = locationsData;

    if (possiblePaths[fromLocation] && possiblePaths[toLocation]) {
      const fromCoords = possiblePaths[fromLocation];
      const toCoords = possiblePaths[toLocation];
      const terminalCoords = terminals[terminalName].coords;

      // Update the terminal information dynamically
      const terminalData = terminals[terminalName];
      document.getElementById("terminal-name").textContent = terminalData.name;
      document.getElementById("eta").textContent = `Approximate Time of Arrival: ${terminalData.eta}`;
      document.getElementById("distance").textContent = `Distance: ${terminalData.distance}`;
      document.getElementById("transportation").textContent = `Transportation Mode: ${terminalData.transport}`;
      document.getElementById("fare").textContent = `Fare: ${terminalData.fare}`;

      // Add markers for locations with custom location icons
      L.marker(fromCoords, { icon: createLocationIcon() })
        .addTo(map)
        .bindTooltip(
          `${fromLocation}`, // Simple text without the box
          { permanent: true, className: "path-tooltip" }
        );

      L.marker(toCoords, { icon: createLocationIcon() }) // Ensure this marker also gets the location icon
        .addTo(map)
        .bindTooltip(
          `${toLocation}`, // Simple text without the box
          { permanent: true, className: "path-tooltip" }
        );

      // Add marker for terminal with custom location icon
      L.marker(terminalCoords, { icon: createLocationIcon() })
        .addTo(map)
        .bindTooltip(
          `${terminalName}`, // Simple text without the box
          { permanent: true, className: "terminal-tooltip" }
        );

      // Create a routing control (polyline) for the path
      const routeControl = L.Routing.control({
        waypoints: [
          L.latLng(fromCoords),
          L.latLng(terminalCoords),
          L.latLng(toCoords),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "#FF5733", weight: 6 }],
        },
        createMarker: function () {
          return null; // Disable default markers on the route
        },
      }).addTo(map);

      map.fitBounds(routeControl.getBounds());
    } else {
      alert("The selected locations are not available in the list of possible paths.");
    }
  }
});