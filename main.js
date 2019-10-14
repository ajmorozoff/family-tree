
//form fields
const nameField = document.querySelector('input[name="name"]');
const ageField = document.querySelector('input[name="age"]');
const submit = document.querySelector('button');

//root content Div
const content = document.querySelector('#content');

//global
let root = '';
let selectedNode = '';
let selectedDiv = '';

const makeLeafDiv = (tree, gen) => {
    let trDIV = document.createElement('div');
    trDIV.classList.add('member');
    trDIV.dataset.name = tree.name;
    trDIV.dataset.generation = gen;

    trDIV.addEventListener('click', ev => {
        if (ev.target.classList.contains('member')) {
            ev.target.classList.toggle('selected');
            selectedDiv.classList.toggle('selected');

            selectedDiv = ev.target;
            selectedNode = root.findMember(ev.target.dataset.name);
        }
    });

    let trName = document.createElement('h4');
    trName.innerHTML = tree.name;
    let trAge = document.createElement('p');
    trAge.innerHTML = tree.age;

    trDIV.appendChild(trName);
    trDIV.appendChild(trAge);

    return trDIV;
}

const makeGenDiv = (gen) => {
    let newGenDiv = document.createElement('div');
    let header = document.createElement('h3');
    header.innerHTML = `Generation ${gen}`;
    newGenDiv.appendChild(header);
    newGenDiv.classList.add('generation');
    newGenDiv.id = `#gen-${gen}`;
    return newGenDiv;
}

const findGenDiv = (gen) => {
    let container = document.getElementById(`#gen-${gen}`);
    if (container === null) {
        container = makeGenDiv(gen);
        content.appendChild(container);
    }
    return container;
}

const updatePage = (tree, parentDiv, gen) => {
    parentDiv.appendChild(makeLeafDiv(tree, gen));

    if (!selectedDiv) {
        selectedDiv = document.querySelector('#content .member');
        selectedDiv.classList.toggle('selected');
    }
    else {
        selectedDiv.classList.add('selected');
    }
}

submit.addEventListener('click', ev => {
    ev.preventDefault();

    let [nameInput, ageInput] = [nameField.value, ageField.value];
    let newTree = new FamilyTree(nameInput, ageInput);

    if (!root) {
        root = newTree;
        selectedNode = root;
        updatePage(root, findGenDiv(1), 1);
    }
    else {
        selectedNode.insert(nameInput, ageInput);

        //We have different options for retrieving the generation of the parent and passing it to the child
        //I chose to store the generation on each leaf div's dataset
        //under the belief it is more performant than running another query on the document
        let newTreegen = parseInt(selectedDiv.dataset.generation, 10) + 1;
        updatePage(newTree, findGenDiv(newTreegen), newTreegen);
    }
    nameField.value = '';
    ageField.value = '';

})
