export function useJsonTools() {
  return {
    exportJsonFile,
    readJsonFile,
    saveLocalStorage,
    retrieveLocalStorage,
    saveSessionStorage,
    retrieveSessionStorage
  }
}
//----------------------------------------------------------
async function exportJsonFile(fileName, data) {
  return new Promise((resolve, reject) => {
    try {
      // -----------------------------------
      const blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
      const blobUrl = URL.createObjectURL(blob);
      // -----------------------------------
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      // -----------------------------------
      document.body.appendChild(link);
      link.dispatchEvent(
        new MouseEvent('click', { 
          bubbles: true, 
          cancelable: true, 
          view: window 
        })
      );
      document.body.removeChild(link);
      // -----------------------------------
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
}


//----------------------------------------------------------
function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        let jsonString = event.target.result; 
        let fileData = JSON.parse(jsonString);
        resolve(fileData);
      });
      // -----------------------------------
      reader.readAsText(file);
      // -----------------------------------
    } catch (e) {
      reject(e);
    }
  });
}

//----------------------------------------------------------
function saveLocalStorage(keyName, data) {
  localStorage.setItem(keyName, JSON.stringify(data));
}

//----------------------------------------------------------
function retrieveLocalStorage(keyName) {
  const data = localStorage.getItem(keyName);
  return data ? JSON.parse(data) : null;
}

//----------------------------------------------------------
function saveSessionStorage(keyName, data) {
  sessionStorage.setItem(keyName, JSON.stringify(data));
}

//----------------------------------------------------------
function retrieveSessionStorage(keyName) {
  const data = sessionStorage.getItem(keyName);
  return data ? JSON.parse(data) : null;
}