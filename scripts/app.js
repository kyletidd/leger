const addEntryButton = document.getElementById('add-entry');
const givenList = document.getElementById('given-list');
const receivedList = document.getElementById('received-list');

function loadEntries() {
  const data = JSON.parse(localStorage.getItem('ledger') || '{"given":[],"received":[]}');
  data.given.forEach(text => createListItem(text, givenList));
  data.received.forEach(text => createListItem(text, receivedList));
}

function createListItem(text, list) {
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
}

function saveEntries() {
  const given = Array.from(givenList.children).map(li => li.textContent);
  const received = Array.from(receivedList.children).map(li => li.textContent);
  localStorage.setItem('ledger', JSON.stringify({ given, received }));
}

addEntryButton.addEventListener('click', () => {
  const type = prompt("type 'given' or 'received'");
  const text = prompt("what exchange do you want to record?");
  if (type && text) {
    const list = type.toLowerCase() === 'given' ? givenList : receivedList;
    createListItem(text, list);
    saveEntries();
  }
});

window.addEventListener('load', loadEntries);
