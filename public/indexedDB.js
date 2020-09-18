export function useIndexedDB(transaction, storeTransaction, method, object){
    
    new Promise((resolve, reject) => {
        const request = window.indexedDB.open(transaction, 1);
        const db = request.result;
        let tr,
            store;

        request.onupgradeneeded = function(e) {
            db.createObjectStore(storeTransaction, { keyPath: "_id" });
        };

        request.onerror = function(e) {
            console.log("There was an error", e.message);
        };

        request.onsuccess = function(e) {
            tr = db.transaction(storeTransaction, "readwrite");
            store = ts.objectStore(storeTransaction);

            db.onerror = function(e) {
                console.log("error", e.message);
            };

            if (method === "put"){
                store.put(object);
            };
            if (method === "get"){
                const all = store.getAll();
                all.onsuccess = function() {
                    resolve(all.result);
                };
            };
            tr.oncomplete = function() {
                db.close();
            };
        };
    });
};