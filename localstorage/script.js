const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();

  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked': ''} />
        <label for="item${i}">${plate.text} <button class="delete" data-delete=${i}>X</button></label>
      </li>
    `;
  }).join('');
}

function action(e) {
  if(e.target.matches('input')){ toggleDone(e); return; }
  if(e.target.matches('button')){ deleteItem(e); return; }
  return;
}

function deleteItem(e) {
  const index = e.target.dataset.delete;
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function toggleDone(e) {
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', action);

populateList(items, itemsList);
