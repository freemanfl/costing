// Saves options to chrome.storage
const saveOptions = () => {
  const likesColor = document.getElementById("like").checked;

  chrome.storage.sync.set({ likesColor: likesColor }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(() => {
      status.textContent = "";
    }, 750);
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get({ likesColor: true }, (items) => {
    document.getElementById("like").checked = items.likesColor;
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
