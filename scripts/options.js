const saveOptions = () => {
  const newTab = document.getElementById("newTab").checked;

  chrome.storage.sync.set({ newTab: newTab }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Options saved.";

    setTimeout(() => {
      status.textContent = "";
    }, 750);
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get("newTab", function (data) {
    document.getElementById("newTab").checked = data.newTab;
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
