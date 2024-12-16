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
        sinabtoda: { coords: [14.3140, 121.1090], name: "SINABTODA" },
        balibago: { coords: [14.2922,121.1011], name: "Balibago Complex Terminal" },
    };

    // Function to add markers for all available terminals
    Object.values(terminals).forEach((terminal) => {
        const marker = L.marker(terminal.coords)
            .addTo(map)
            .bindTooltip(terminal.name, { permanent: true, className: "terminal-tooltip" });
    });

    // Get all "Navigate" buttons and add event listener
    const navigateButtons = document.querySelectorAll('.navigate');
    
    navigateButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the terminal name from the button's data-terminal attribute
            const terminalName = button.getAttribute("data-terminal");

            // Get user input from the location fields
            const fromLocation = document.getElementById("from-location").value;
            const toLocation = document.getElementById("to-location").value;

            // Store the location and terminal data in an array
            const locationsData = {
                fromLocation: fromLocation,
                toLocation: toLocation,
                terminalName: terminalName,
            };

            // Store this data in localStorage
            localStorage.setItem("locationsData", JSON.stringify(locationsData));

            // Redirect to mainpage2.html
            window.location.href = "mainpage2.html";  // Redirect to another page
        });
    });
});
