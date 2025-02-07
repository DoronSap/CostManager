export const demo = {};

if (!window.indexedDB) {
    console.error("The web browser doesn't support IndexedDB.");
} else {
    demo.data = [];
    demo.currentId = 1;

    demo.request = indexedDB.open("expenses", 1);

    demo.request.onerror = function (event) {
        console.log("Error creating database:", event.target.error);
    };

    demo.request.onsuccess = function () {
        demo.db = demo.request.result;
        console.log("creating db succeeded", demo.db);

        demo.initializeIdCounter();
    };

    demo.request.onupgradeneeded = function (event) {
        demo.db = event.target.result;
        let objectStore = demo.db.createObjectStore("expensesStorage", { keyPath: "id" });
        demo.data.forEach((cost) => objectStore.add(cost));
    };
}

demo.initializeIdCounter = function () {
    const objectStore = demo.db.transaction("expensesStorage").objectStore("expensesStorage");
    let highestId = 0;

    objectStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            highestId = Math.max(highestId, parseInt(cursor.key));
            cursor.continue();
        } else {
            demo.currentId = highestId + 1;
            console.log("Highest ID:", highestId);
            console.log("Next ID:", demo.currentId);
        }
    };

    objectStore.openCursor().onerror = function () {
        console.error("Error opening cursor!");
    };
};

demo.addCost = function (cost) {
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
            console.log("addCost(): Error adding new item to the database", event.target.error, cost.id);
            reject(event.target.error);
        };
    });
};

demo.readAllExpenses = function () {
    const objectStore = demo.db.transaction("expensesStorage").objectStore("expensesStorage");
    const costs = [];
    return new Promise((resolve, reject) => {
        objectStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                console.log("readAllItems(): key=" + cursor.key + " amount=" + cursor.value.amount + " category=" + cursor.value.category + " id=" + cursor.value.id);
                costs.push(cursor.value);
                cursor.continue();
            } else {
                resolve(costs);
            }
        };
        objectStore.openCursor().onerror = (event) => reject(event.target.error);
    });
};

demo.removeCost = function (id) {
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

demo.readExpensesByMonth = function (month, year) {
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
