let globalEmployees = [];

async function start() {
  await api();
  mapClasses();
  showEmployees();
  defaultEmployee();
}

async function api() {
  const resource = await fetch('./dados/dados.json');
  const resourceJson = await resource.json();
  globalEmployees = resourceJson;
}

function mapClasses() {
  //divContainer = document.querySelector('.container');
  divSelectedEmployees = document.querySelector('.selected-employee');
  divEmployees = document.querySelector('.employees');
}

function showEmployees() {
  globalEmployees.map(({ id, foto, nome, cargo }) => {
    const div = document.createElement('div');
    div.classList.add(`employee`);

    const img = `<img class='avatar' src=${foto} alt=${foto} title=${nome} />`;
    const name = `<div class='info'><p><span class='name'>${nome}</span></p>`;
    const job = `<p class='job'>${cargo}</p></div>`;

    div.innerHTML = `${img} ${name} ${job}`;

    div.addEventListener('click', () => selectEmployee(id, event));
    divEmployees.appendChild(div);
  });
  let firstChild = divEmployees.firstChild;
  firstChild.classList.add('selected');
}

function selectEmployee(id, event) {
  selectedEmployee = globalEmployees.find((employee) => {
    return id === employee.id;
  });

  selectedDiv = event.target;

  if (selectedDiv.classList.value === 'avatar') {
    selectedDiv = selectedDiv.parentElement;
  } else if (selectedDiv.classList.value === 'name') {
    selectedDiv = selectedDiv.parentElement.parentElement.parentElement;
  } else if (selectedDiv.classList.value === 'job') {
    selectedDiv = selectedDiv.parentElement.parentElement;
  }

  divEmployee = document.querySelectorAll('.employee');

  for (let i = 0; i < divEmployee.length; ++i) {
    if (divEmployee[i].classList.value == 'employee selected') {
      divEmployee[i].classList.remove('selected');
    }
  }
  selectedDiv.classList.add('selected');
  return setEmployee(selectedEmployee, event);
}

function setEmployee(selectedEmployee) {
  const { foto, nome, cargo, idade } = selectedEmployee;

  const img = `<img class='avatar' src=${foto} alt=${nome} title=${nome} />`;
  const info = `<div class='info'><p class='name'>NOME:</p><p class='job'>CARGO:</p><p class='age'>IDADE:</p></div>`;
  const data = `<div class='data'><span> ${nome}</span><span> ${cargo}</span><span> ${idade}</span></div>`;

  divSelectedEmployees.innerHTML = `${img} ${info} ${data}`;
}

function defaultEmployee() {
  const { foto, nome, cargo, idade } = globalEmployees[0];

  const img = `<img class='avatar' src=${foto} alt=${nome} title=${nome} />`;
  const info = `<div class='info'><p class='name'>NOME:</p><p class='job'>CARGO:</p><p class='age'>IDADE:</p></div>`;
  const data = `<div class='data'><span> ${nome}</span><span> ${cargo}</span><span> ${idade}</span></div>`;

  divSelectedEmployees.innerHTML = `${img} ${info} ${data}`;
}

start();
