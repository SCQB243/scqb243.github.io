// Data for foods (14 items)
const foods = [
    { name: "Pizza aux tomates", price: 11, image: "images/pizza.jpeg" },
    { name: "Steak", price: 3, image: "images/steak.jpeg" }, 
    { name: "Sandwich amercain", price: 3, image: "images/sandwich.jpeg" }, 
    { name: "Saucisse", price: 2, image: "images/saucisse.jpeg" }, 
    { name: "Takos à la viande", price: 7, image: "images/Takos.jpeg" }, 
    { name: "Souchi chinoise", price: 13, image: "images/souchi.jpeg" }, 
    { name: "Liboko Ngolo", price: 7, image: "images/liboke.jpeg" }, 
    { name: "Poulet roti", price: 15, image: "images/pouletRoti.jpeg" }, 
    { name: "Poulet mayo", price: 11, image: "images/pouletMayo.jpeg" }, 
    { name: "Frites", price: 6, image: "images/frit.jpeg" },
    { name: "Pouding", price: 6, image: "images/pouding.jpeg" },
    { name: "Poisson du fleuve Congo", price: 14, image: "images/poisson.jpeg" },
    { name: "Shawarma à la viande", price: 7, image: "images/shawarma.jpg" },
    { name: "brochette au boeuf", price: 7, image: "images/brochette.jpeg" }, 
];

// Data for alcoholic drinks (14 items)
const alcoholicDrinks = [
    { name: "Jus d'ananas", price: 2, image: "images/drinks/jusananas.jpeg" }, 
    { name: "Jus de pomme", price: 2, image: "images/drinks/juspomme.jpeg" }, 
    { name: "Jus d'orange", price: 2, image: "images/drinks/jusorange.jpeg" }, 
    { name: "Yaourt", price: 2, image: "images/drinks/yaourt.jpeg" }, 
    { name: "Smoothie", price: 3, image: "images/drinks/smoothie.jpeg" }, 
    { name: "Coca", price: 3, image: "images/drinks/coca.jpeg" }, 
    { name: "Coca zero", price: 4, image: "images/drinks/CocaZero.jpeg" }, 
    { name: "Fanta", price: 3, image: "images/drinks/fanta.jpeg" }, 
    { name: "Redbull", price: 4, image: "images/drinks/redbull.jpeg" }, 
    { name: "Sprite", price: 3, image: "images/drinks/sprite.jpeg" }, 
    { name: "pepsi", price: 3, image: "images/drinks/pepsi.jpeg" }, 
    { name: "Bavaria", price: 3, image: "images/drinks/bavaria.jpeg" }, 
    { name: "Mirinda", price: 3, image: "images/drinks/mirinda.jpeg" }, 
    { name: "Vitalo", price: 3, image: "images/drinks/vitalo.jpeg" }, 
];

// Data for juices (14 items)
const juices = [
    { name: "Jameson", price: 15, image: "images/drinks/alcoolisee/jameson.jpeg" }, 
    { name: "Vodka absolute", price: 13, image: "images/drinks/alcoolisee/vodka.jpeg" }, 
    { name: "Moet champagne", price: 20, image: "images/drinks/alcoolisee/moet.jpeg" }, 
    { name: "Tequilla", price: 13, image: "images/drinks/alcoolisee/tequila.jpeg" }, 
    { name: "vin rouge", price: 12, image: "images/drinks/alcoolisee/vinrouge.jpeg" }, 
    { name: "Hennessy", price: 15, image: "images/drinks/alcoolisee/hennesy.jpeg" }, 
    { name: "Gin", price: 12, image: "images/drinks/alcoolisee/gin1.jpeg" }, 
    { name: "Castel", price: 3, image: "images/drinks/alcoolisee/castel.jpeg" }, 
    { name: "tembo", price: 4, image: "images/drinks/alcoolisee/tembo.jpeg" }, 
    { name: "Primus", price: 3, image: "images/drinks/alcoolisee/primus.jpeg" }, 
    { name: "Beaufort", price: 3, image: "images/drinks/alcoolisee/beaufort.jpeg" }, 
    { name: "33 Export", price: 3, image: "images/drinks/alcoolisee/33export.jpeg" }, 
    { name: "heineken", price: 3, image: "images/drinks/alcoolisee/heineken.png" }, 
    { name: "Savana", price: 3, image: "images/drinks/alcoolisee/savana.jpeg" }, 
];

// Selected items and their quantities
let selectedItems = [];

// Function to show a custom pop-up
function showCustomPopup(message, icon = "info", onClose = null) {
    const popup = document.createElement("div");
    popup.id = "custom-popup";
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon ${icon}">${icon === "success" ? "✓" : "ℹ"}</div>
            <p>${message}</p>
            <button id="close-custom-popup" class="close-button">Fermer</button>
        </div>
    `;
    document.body.appendChild(popup);

    const backdrop = document.createElement("div");
    backdrop.id = "popup-backdrop";
    document.body.appendChild(backdrop);

    document.getElementById("close-custom-popup").addEventListener("click", () => {
        closeCustomPopup();
        if (onClose) onClose();
    });
}

// Function to close the custom pop-up
function closeCustomPopup() {
    const popup = document.getElementById("custom-popup");
    const backdrop = document.getElementById("popup-backdrop");
    if (popup) popup.remove();
    if (backdrop) backdrop.remove();
}

// Function to show the pop-up box for item selection
function showPopup(item) {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.innerHTML = `
        <div class="popup-content">
            <h3>${item.name}</h3>
            <p>Prix: $${item.price}</p>
            <input type="number" id="quantity" placeholder="Quantité" min="1" value="1">
            <button id="confirm-popup">Confirmer</button>
            <button id="close-popup" class="close-button">Fermer</button>
        </div>
    `;
    document.body.appendChild(popup);

    const backdrop = document.createElement("div");
    backdrop.id = "popup-backdrop";
    document.body.appendChild(backdrop);

    document.getElementById("confirm-popup").addEventListener("click", () => {
        let quantity = parseInt(document.getElementById("quantity").value) || 1;

        if (quantity < 1) {
            quantity = 1;
        }

        const total = item.price * quantity;
        selectedItems.push({ ...item, quantity, total });
        updateTotal();
        updateSelectedItemsList();
        closePopup();
    });

    document.getElementById("close-popup").addEventListener("click", () => {
        const selectedItemElement = document.querySelector(`[data-name="${item.name}"]`);
        if (selectedItemElement) {
            selectedItemElement.classList.remove("selected");
        }
        closePopup();
    });
}

// Function to close the pop-up
function closePopup() {
    const popup = document.getElementById("popup");
    const backdrop = document.getElementById("popup-backdrop");
    if (popup) popup.remove();
    if (backdrop) backdrop.remove();
}

// Function to update the total
function updateTotal() {
    const total = selectedItems.reduce((sum, item) => sum + item.total, 0);
    document.getElementById("total-amount").textContent = `$${total}`;
}

// Function to update the selected items list
function updateSelectedItemsList() {
    const selectedItemsList = document.getElementById("selected-items-list");
    selectedItemsList.innerHTML = "";

    selectedItems.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("selected-item");
        itemElement.innerHTML = `
            <span class="item-text">${item.name}: ${item.quantity} x $${item.price} = $${item.total}</span>
            <span class="cancel-item" data-index="${index}">✕</span>
        `;
        selectedItemsList.appendChild(itemElement);
    });

    document.querySelectorAll(".cancel-item").forEach(cancelButton => {
        cancelButton.addEventListener("click", () => {
            const index = cancelButton.getAttribute("data-index");
            selectedItems.splice(index, 1);
            updateTotal();
            updateSelectedItemsList();

            const selectedItemElement = document.querySelector(`[data-name="${selectedItems[index]?.name}"]`);
            if (selectedItemElement) {
                selectedItemElement.classList.remove("selected");
            }
        });
    });
}

// Function to create menu items
function createMenuItem(item, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
    }

    const itemElement = document.createElement("div");
    itemElement.classList.add("menu-item");
    itemElement.dataset.name = item.name;
    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>${item.name}</div>
        <div>$${item.price}</div> 
    `;
    itemElement.addEventListener("click", () => {
        document.querySelectorAll(".menu-item.selected").forEach(selectedItem => {
            selectedItem.classList.remove("selected");
        });

        itemElement.classList.add("selected");
        showPopup(item);
    });
    container.appendChild(itemElement);
}

// Load menu items
foods.forEach(item => createMenuItem(item, "food-grid"));
alcoholicDrinks.forEach(item => createMenuItem(item, "alcoholic-grid"));
juices.forEach(item => createMenuItem(item, "juice-grid"));

// Function to clear old orders
function clearOldOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const now = new Date().getTime();

    const freshOrders = orders.filter(order => {
        const orderTime = new Date(order.timestamp).getTime();
        return now - orderTime <= 3600000;
    });

    localStorage.setItem("orders", JSON.stringify(freshOrders));
}

// Function to send data to the second page
function sendDataToSecondPage(event) {
    event.preventDefault();

    const tableNumber = document.getElementById("table-number").value;

    if (!tableNumber || tableNumber <= 0) {
        showCustomPopup("Veuillez renseigner le numéro de votre table s'il-vous-plaît.");
        return;
    }

    if (selectedItems.length === 0) {
        showCustomPopup("Veuillez bien choisir quelque chose s'il vous plait.");
        return;
    }

    const order = {
        tableNumber,
        items: selectedItems,
        total: selectedItems.reduce((sum, item) => sum + item.total, 0),
        timestamp: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    showCustomPopup("Votre commande a été envoyée avec succès.", "success", () => {
        showCustomPopup(
            "Au cas où vous voudriez annuler votre commande, Merci de vous rendre physiquement au guichet pour procèder à l'annulation",
            "info",
            () => {
                window.close();
            }
        );
    });
}

// Add event listener to confirm button
const confirmButton = document.getElementById("confirm-button");
if (confirmButton) {
    confirmButton.addEventListener("click", sendDataToSecondPage);
} else {
    console.error("Confirm button not found.");
}

// Auto-close after 10 minutes
setTimeout(() => {
    window.location.replace("session-ended.html");
}, 600000);

// Second Page Logic - ONLY PLACE WHERE NOTIFICATIONS EXIST
if (window.location.pathname.includes("menu.html")) {
    // Enhanced notification function with sound and vibration
    function showNotification(title, message) {
        // Check if notifications are supported
        if (!("Notification" in window)) {
            console.log("Ce navigateur ne supporte pas les notification.");
            return;
        }

        // Request permission if needed
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    createNotification(title, message);
                }
            });
        } else {
            createNotification(title, message);
        }
    }

    function createNotification(title, message) {
        // Vibrate if supported
        if ("vibrate" in navigator) {
            navigator.vibrate([200, 100, 200]);
        }

        // Play sound
        const audio = new Audio("commande.mp3");
        audio.play().catch(e => console.log("Audio play failed:", e));

        // Show notification
        const notification = new Notification(title, { 
            body: message,
            icon: "images/notification-icon.png"
        });

        // Focus window when notification is clicked
        notification.onclick = () => {
            window.focus();
        };
    }

    const orderContainer = document.getElementById("order-container");
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Register service worker for notifications
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registered');
            })
            .catch(err => {
                console.log('Service Worker registration failed: ', err);
            });
    }

    function displayOrders() {
        orderContainer.innerHTML = '';
        
        if (orders.length > 0) {
            orders.forEach((order, index) => {
                const orderElement = document.createElement("div");
                orderElement.classList.add("order-item");
                orderElement.innerHTML = `
                    <p class="table">Table Numéro: ${order.tableNumber}</p>
                    <p>Produit:</p>
                    <ol>
                        ${order.items.map(item => `
                            <li>${item.name}: ${item.quantity} x $${item.price} = $${item.total}</li>
                        `).join("")}
                    </ol>
                    <p class="total">Total: $${order.total}</p>
                    <button class="ok-button" data-index="${index}">Dèja servi</button>
                `;
                orderContainer.appendChild(orderElement);
            });

            // Add event listeners to OK buttons
            document.querySelectorAll(".ok-button").forEach(button => {
                button.addEventListener("click", (e) => {
                    const index = e.target.getAttribute("data-index");
                    orders.splice(index, 1);
                    localStorage.setItem("orders", JSON.stringify(orders));
                    displayOrders(); // Refresh the display
                });
            });
        } else {
            orderContainer.innerHTML = '<p style="text-align: center; color:gray; margin:auto;">Aucune commande trouvée pour le moment...</p>';
        }
    }

    // Initial display
    displayOrders();

    // Check for new orders every 10 seconds
    setInterval(() => {
        const newOrders = JSON.parse(localStorage.getItem("orders")) || [];
        if (newOrders.length !== orders.length) {
            orders = newOrders;
            displayOrders();
            
            // Show notification for new order (only when page is hidden)
            if (newOrders.length > 0 && document.hidden) {
                const latestOrder = newOrders[newOrders.length - 1];
                showNotification("Nouvelle commande", 
                    `Table ${latestOrder.tableNumber}: $${latestOrder.total}`);
            }
        }
    }, 10000);

    // Also check when page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            const newOrders = JSON.parse(localStorage.getItem("orders")) || [];
            if (newOrders.length !== orders.length) {
                orders = newOrders;
                displayOrders();
            }
        }
    });
}