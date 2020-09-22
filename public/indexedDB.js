const request = window.indexedDB.open("transaction", 1);
let db;

request.onupgradeneeded = function(e) {
    db= e.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function(e) {
db = e.target.result;
if(navigator.onLine) {
    checkDatabase();
};

request.onerror = function(e) {
console.log("There was an error", e.target.errorCode);
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
