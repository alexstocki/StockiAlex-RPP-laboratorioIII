const data = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis", "publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica", "publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central", "publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500, "asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750, "asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25, "asesinatos":1}]';
let newData = [];

const fields = [
    {"id":"id", "name":"ID", "type":"number", "required":true},
    {"id":"nombre", "name":"Nombre", "type":"string", "required":true},
    {"id":"apellido", "name":"Apellido", "type":"string", "required":true},
    {"id":"edad", "name":"Edad", "type":"number", "required":true},
    {"id":"alterEgo", "name":"Alter Ego", "type":"string", "required":false},
    {"id":"ciudad", "name":"Ciudad", "type":"string", "required":false},
    {"id":"publicado", "name":"Pulicado", "type":"string", "required":false},
    {"id":"enemigo", "name":"Enemigo", "type":"string", "required":false},
    {"id":"robos", "name":"Robos", "type":"number", "required":false},
    {"id":"asesinatos", "name":"Asesinatos", "type":"number", "required":false}
];

class Persona {
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    toString() {
        return `Persona: ${this.nombre} - ${this.apellido} - ${this.edad}`;
    }
}

class Heroe extends Persona {
    constructor(id, nombre, apellido, edad, alterEgo, ciudad, publicado) {
        super(id, nombre, apellido, edad);
        this.alterEgo = alterEgo;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }

    toString() {
        return `${super.toString()} - ${this.alterEgo} - ${this.ciudad} - ${this.publicado}`;
    }
}

class Villano extends Persona {
    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
        super(id, nombre, apellido, edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }

    toString() {
        return `${super.toString()} - ${this.enemigo} - ${this.robos} - ${this.asesinatos}`;
    }
}

function getDataJSON() {
    return JSON.parse(data);
}

function abrirForm(modoDeApertura = null, item = null) {
    const formDatos = document.getElementById('form-datos');
    const formAbm = document.getElementById('form-abm');

    if (formDatos.style.display === 'none') {
        formDatos.style.display = 'block';
        abrirAbm(modoDeApertura, item);
    }
    else {
        formDatos.style.display = 'none';
        abrirAbm(modoDeApertura, item);
    }
}

function abrirAbm(modo, item) {
    const formAbm = document.getElementById('form-abm');
    const btnAdd = document.getElementById('btn-a');
    const btnEdit = document.getElementById('btn-m');
    const btnDelete = document.getElementById('btn-e');
    const inputId = document.getElementById('div-input-id');
    
    fillInputs(item);

    if (formAbm.style.display === 'none') {
        formAbm.style.display = 'block';
    }
    else {
        formAbm.style.display = 'none';
    }

    if (modo) {
        btnAdd.style.display = 'none';
        btnEdit.style.display = 'block';
        btnDelete.style.display = 'block';
        inputId.style.display = 'block';
    } 
    else {
        btnAdd.style.display = 'block';
        btnEdit.style.display = 'none';
        btnDelete.style.display = 'none';
        inputId.style.display = 'none';
    }
}

function fillInputs(item = null) {
    const selectedType = document.getElementById('select-personas-abm');
    const inputId = document.getElementById('idElement');
    const nombreInput = document.getElementById('nombreElement');
    const apellidoInput = document.getElementById('apellidoElement');
    const edadInput = document.getElementById('edadElement');

    const alterEgoInput = document.getElementById('alterEgoElement');
    const ciudadInput = document.getElementById('ciudadElement');
    const publicadoInput = document.getElementById('publicadoElement');

    const enemigoInput = document.getElementById('enemigoElement');
    const robosInput = document.getElementById('robosElement');
    const asesinatosInput = document.getElementById('asesinatosElement');

    if (item) {
        const id = item.firstChild.textContent;
        const persona = getPersonaById(id);
        
        inputId.value = persona.id;
        nombreInput.value = persona.nombre;
        apellidoInput.value = persona.apellido;
        edadInput.value = persona.edad;
    
        if (persona instanceof Heroe) {
            hideOtherTypeInputsABM('Heroe');
            alterEgoInput.value = persona.alterEgo;
            ciudadInput.value = persona.ciudad;
            publicadoInput.value = persona.publicado;
            selectedType.value = 'Heroe';
        } else if (persona instanceof Villano) {
            hideOtherTypeInputsABM('Villano');
            selectedType.value = 'Villano';
            enemigoInput.value = persona.enemigo;
            robosInput.value = persona.robos;
            asesinatosInput.value = persona.asesinatos;
        }
      }
}

function hideOtherTypeInputsABM(type) {
    const inputsHeroe = document.getElementById('inputs-heroe');
    const inputsVillano = document.getElementById('inputs-villano');

    if (type === 'Heroe') {
        inputsHeroe.style.display = 'block';
        inputsVillano.style.display = 'none';
    }
    else if (type === 'Villano') {
        inputsHeroe.style.display = 'none';
        inputsVillano.style.display = 'block';
    }
}

function getPersonas() {
    let personas = [];
    let data = getDataJSON();

    data.forEach(element => {
        if (element.alterego) {
            personas.push(new Heroe(element.id, element.nombre, element.apellido, element.edad, element.alterego, element.ciudad, element.publicado));
        } else {
            personas.push(new Villano(element.id, element.nombre, element.apellido, element.edad, element.enemigo, element.robos, element.asesinatos));
        }
    });

    return personas;
}

function getPersonasByType(type) {
    const personas = newData.length > 0 ? newData : getPersonas();

    if (type === 'Todos') {
        return personas;
    }

    else if (type === Heroe || type === 'Heroe') {
        return personas.filter(persona => persona instanceof Heroe);
    }

    else {
        return personas.filter(persona => persona instanceof Villano);
    }
}

function getPersonaById(id) {
    const personas = newData.length > 0 ? newData : getPersonas();
    return personas.find(persona => persona.id == id);
}

function createCheckbox(field) {
    const div = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.type = 'checkbox';
    input.id = field.id;
    input.value = field.name;
    input.checked = true;
    input.classList.add('form-check-input');

    label.htmlFor = field.id;
    label.classList.add('form-check-label');
    label.textContent = field.name;

    div.classList.add('form-check', 'form-check-inline');
    div.appendChild(input);
    div.appendChild(label);

    return div;
}

function showCheckboxes() {
    const checkboxes = document.getElementById('checkboxes');
    const checks = fields.map(createCheckbox);

    checks.forEach(check => checkboxes.appendChild(check));
}

function orderTable(column) {
    let selectPersonas = document.getElementById('select-personas').value;
    let personas = getPersonasByType(selectPersonas);
    let idColumn = fields.find(field => field.name == column.textContent).id;

    // primero los ordeno por el campo y si no existe considero a ese mayor, para que me
    // queden en el fondo las lineas que no poseen dato en esa columna
    // despues cuando esa primera division la tengo hecha, ahi si comparo por la columna
    personas.sort((a, b) => {
        if (a[idColumn] == null || b[idColumn] == null) {
          return a[idColumn] == null ? 1 : -1;
        } 
    }).sort((a,b) => {
        if (typeof a[idColumn] === 'string' && typeof b[idColumn] === 'string') {
            return a[idColumn].localeCompare(b[idColumn]);
          } else {
            return a[idColumn] - b[idColumn];
          }
    }) 

    newData = personas;

    showTable(newData);
}

function showTable(data = null) {
    let selectPersonas = document.getElementById('select-personas').value;
    let personas = Array.isArray(data) ? data : getPersonasByType(selectPersonas);
    let checkboxes = document.querySelectorAll('.form-check-input');
    let table = document.getElementById('table-personas');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let th = null;
    let td = null;
    let flag = false;

    table.innerHTML = '';

    checkboxes.forEach(element => {
        if (element.checked) {
            th = document.createElement('th');
            th.textContent = element.value;
            tr.appendChild(th);
            flag = true;
        }
    });

    if (flag) {
        thead.appendChild(tr);
        table.appendChild(thead);
        personas.forEach(element => {
            tr = document.createElement('tr');

            checkboxes.forEach(check => {
                if (check.checked) {
                    td = document.createElement('td');
                    td.textContent = element[check.id];
                    tr.appendChild(td);
                }
            });

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
    }
}

function getPromedio() {
    event.preventDefault();

    const selectedType = document.getElementById('select-personas').value;
    const elements = getPersonasByType(selectedType);
    const inputReadOnly = document.getElementById('input-promedio-read-only');

    if (elements.length === 0) {
        return 0;
    }
    else {
        inputReadOnly.value = elements.reduce((acc, element) => acc + element.edad, 0) / elements.length;
    }
}

function showInputsAbm() {
    const inputsHeroe = document.getElementById('inputs-heroe');
    const inputsVillano = document.getElementById('inputs-villano');
    const selectAbm = document.getElementById('select-personas-abm').value;

    if (selectAbm === 'Heroe') {
        inputsHeroe.style.display = 'block';
        inputsVillano.style.display = 'none';
    }
    else if (selectAbm === 'Villano') {
        inputsHeroe.style.display = 'none';
        inputsVillano.style.display = 'block';
    }
}

function getRandomId() {
    return Math.floor(Math.random() * 100);
}

function addItem() {
    event.preventDefault();
    const personas = newData.length > 0 ? newData : getPersonas();
    const selectedType = document.getElementById('select-personas-abm').value;

    const idInput = document.getElementById('idElement');
    idInput.display = 'none';

    const id = getRandomId();
    const nombre = document.getElementById('nombreElement').value;
    const apellido = document.getElementById('apellidoElement').value;
    const edad = document.getElementById('edadElement').value;

    const alterEgo = document.getElementById('alterEgoElement').value;
    const ciudad = document.getElementById('ciudadElement').value;
    const publicado = document.getElementById('publicadoElement').value;

    const enemigo = document.getElementById('enemigoElement').value;
    const robos = document.getElementById('robosElement').value;
    const asesinatos = document.getElementById('asesinatosElement').value;
    
    if (validateFields(selectedType)) {
        if (selectedType === 'Heroe') {
            let heroe = new Heroe(id, nombre, apellido, edad, alterEgo, ciudad, publicado);
            personas.push(heroe);
        }
        else if (selectedType === 'Villano') {
            let villano = new Villano(id, nombre, apellido, edad, enemigo, robos, asesinatos);
            personas.push(villano);
        }
        
        newData = personas;
        const formDatos = document.getElementById('form-datos');
        const formAbm = document.getElementById('form-abm');
        formAbm.style.display = 'none';
        formDatos.style.display = 'block';

        document.getElementById('nombreElement').value = '';
        document.getElementById('apellidoElement').value = '';
        document.getElementById('edadElement').value = '';
        document.getElementById('alterEgoElement').value = '';
        document.getElementById('ciudadElement').value = '';
        document.getElementById('publicadoElement').value = '';
        document.getElementById('enemigoElement').value = '';
        document.getElementById('robosElement').value = '';
        document.getElementById('asesinatosElement').value = '';
    
        showTable(newData);
    }
    else {
        alert('Los campos no cumplen con la validacion');
    }
}

function validateFields(type) {
    const nombre = document.getElementById('nombreElement').value;
    const apellido = document.getElementById('apellidoElement').value;
    const edad = document.getElementById('edadElement').value;

    if(nombre === '' || apellido === '' || parseInt(edad) <= 0) {
        return false;
    }
    else {
        if (type === 'Heroe') {
            const alterEgo = document.getElementById('alterEgoElement').value;
            const ciudad = document.getElementById('ciudadElement').value;
            const publicado = document.getElementById('publicadoElement').value;
            
            if (alterEgo === '' || ciudad === '' || parseInt(publicado) < 1941) {
                return false;
            }
        }
        else if (type === 'Villano') {
            const enemigo = document.getElementById('enemigoElement').value;
            const robos = document.getElementById('robosElement').value;
            const asesinatos = document.getElementById('asesinatosElement').value;
    
            if (enemigo === '' || parseInt(robos) <= 0 || parseInt(asesinatos) <= 0) {
                return false;
            }
        }
    }

    return true;
}

function modifyItem() {
    event.preventDefault();
    const inputId = document.getElementById('idElement');
    const nombreInput = document.getElementById('nombreElement');
    const apellidoInput = document.getElementById('apellidoElement');
    const edadInput = document.getElementById('edadElement');

    const alterEgoInput = document.getElementById('alterEgoElement');
    const ciudadInput = document.getElementById('ciudadElement');
    const publicadoInput = document.getElementById('publicadoElement');

    const enemigoInput = document.getElementById('enemigoElement');
    const robosInput = document.getElementById('robosElement');
    const asesinatosInput = document.getElementById('asesinatosElement');
    
    const item = getPersonaById(inputId.value);

    if (item) {
        item.id = inputId.value;
        item.nombre = nombreInput.value;
        item.apellido = apellidoInput.value;
        item.edad = edadInput.value;
    
        if (item instanceof Heroe) {
            item.alterEgo = alterEgoInput.value
            item.ciudad = ciudadInput.value;
            item.publicado = publicadoInput.value;
        } else if (item instanceof Villano) {
            item.enemigo = enemigoInput.value
            item.robos = robosInput.value;
            item.asesinatos = asesinatosInput.value;
        }
    }

    const personas = getPersonas();
    const index = personas.findIndex(persona => persona.id == item.id);
    
    personas[index] = item;

    newData = personas;

    const formDatos = document.getElementById('form-datos');
    const formAbm = document.getElementById('form-abm');
    formAbm.style.display = 'none';
    formDatos.style.display = 'block';

    showTable(personas);
}

function deleteItem() {
    event.preventDefault();
    const inputId = document.getElementById('idElement');
    const item = getPersonaById(inputId.value);
    const personas = newData.length > 0 ? newData : getPersonas();
    const index = personas.findIndex(persona => persona.id == item.id);
    
    personas.splice(index, 1);

    newData = personas;

    const formDatos = document.getElementById('form-datos');
    const formAbm = document.getElementById('form-abm');
    formAbm.style.display = 'none';
    formDatos.style.display = 'block';

    showTable(personas);
}

