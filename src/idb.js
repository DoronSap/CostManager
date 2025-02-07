export const demo = {};

if (!window.indexedDB) {
    console.error("The web browser doesn't support IndexedDB.");
} else {
    demo.data = [];
    demo.currentId = 1;

    demo.request = indexedDB.open("expenses", 1);

    demo.request.onerror = function (event) {
        console.error("Error creating database:", event.target.error);
    };

    demo.request.onsuccess = function () {
        demo.db = demo.request.result;
        console.log("Database opened successfully", demo.db);
        demo.initializeIdCounter();
    };

    demo.request.onupgradeneeded = function (event) {
        demo.db = event.target.result;
        const objectStore = demo.db.createObjectStore("expensesStorage", { keyPath: "id" });
        demo.data.forEach((cost) => objectStore.add(cost));
    };

    // Ensure the database is initialized and ready before proceeding
    const ensureDbReady = () => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (demo.db) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    };

    // Add cost
    demo.addCost = async function (cost) {
        await ensureDbReady();
        return new Promise((resolve, reject) => {
            cost.id = demo.currentId.toString();
            demo.currentId++;

            const request = demo.db.transaction(["expensesStorage"], "readwrite")
                .objectStore("expensesStorage").add(cost);

            request.onsuccess = function () {
                console.log("addCost(): adding "+ cost.id +"st cost item succeeded");
                resolve(cost);
            };

            request.onerror = function (event) {
                console.error("Error adding new item to the database", event.target.error, cost.id);
                reject(event.target.error);
            };
        });
    };

    // Read all expenses
    demo.readAllExpenses = async function () {
        await ensureDbReady();
        const objectStore = demo.db.transaction("expensesStorage").objectStore("expensesStorage");
        const costs = [];
        return new Promise((resolve, reject) => {
            objectStore.openCursor().onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    costs.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(costs);
                }
            };
            objectStore.openCursor().onerror = (event) => reject(event.target.error);
        });
    };

    // Remove cost
    demo.removeCost = async function (id) {
        await ensureDbReady();
        return new Promise((resolve, reject) => {
            const request = demo.db.transaction(["expensesStorage"], "readwrite")
                .objectStore("expensesStorage").delete(id);

            request.onsuccess = () => {
                console.log("Item removed successfully.");
                resolve(id);
            };

            request.onerror = (event) => {
                console.error("Error removing item:", event.target.error);
                reject(event.target.error);
            };
        });
    };

    // Read expenses by month and year
    demo.readExpensesByMonth = async function (month, year) {
        await ensureDbReady();
        return new Promise((resolve, reject) => {
            const objectStore = demo.db.transaction("expensesStorage").objectStore("expensesStorage");
            const costs = [];
            const request = objectStore.openCursor();

            request.onsuccess = function (event) {
                const cursor = event.target.result;

                if (cursor) {
                    const data = cursor.value;

                    if (Number(data.month) === Number(month) && Number(data.year) === Number(year)) {
                        costs.push(data);
                    }

                    cursor.continue();
                } else {
                    resolve(costs);
                }
            };

            request.onerror = function (event) {
                console.error("Error reading costs from object store", event.target.error);
                reject(event.target.error);
            };
        });
    };
}
