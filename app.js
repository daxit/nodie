var nodie = document.getElementById('nodie');
var nodes = [];
var actions = ['incoming', 'delete', 'outgoing'];
var selectedNode = undefined;

// action is the action function preformed by the node
function createNode(action) {
  nodes[nodes.length] = {
    element: createNodeElement(this),
    action: action,
    selected: false,
    inputs: [],
    outputs: [],
  }
};

function createNodeElement(node) {
  let nodeElement = document.createElement('div');
  nodeElement.className = 'node';
  for (var action in actions) {
    let actionElement = document.createElement('div');
    actionElement.className = 'node-action ' + actions[action];
    nodeElement.appendChild(actionElement);
  }
  let nodeItemElement = document.createElement('div');
  nodeItemElement.className = 'node-item';
  nodeElement.appendChild(nodeItemElement);
  nodie.appendChild(nodeElement);

  nodeElement.addEventListener('mousedown', e => {
    node.selected = true;
    window.setTimeout(() => {
      node.selected = false;
    }, 500);
  });
  nodeElement.addEventListener('mouseup', e => {
    if (node.selected) {
      console.log('clickedme');
      nodeElement.classList.toggle('selected');
      nodeElement.classList.remove('show-menu');
    }
  })
  nodeElement.addEventListener('dblclick', e => {
    nodeElement.classList.toggle('show-menu');
    nodeElement.classList.add('selected');
  });
  return nodeElement;
}

for (i = 0; i < 5; i++) {
  createNode();
}

nodie.addEventListener('mousedown', e => {
  if (e.target !== undefined && e.target.classList.contains('node')) {
    selectedNode = e.target;
  } else if (e.target !== undefined && e.target.parentElement.classList.contains('node')) {
    selectedNode = e.target.parentElement;
  }
});
nodie.addEventListener('mousemove', e => {
  if (selectedNode !== undefined) {
    selectedNode.style.left = e.clientX - selectedNode.offsetWidth / 2 + 'px';
    selectedNode.style.top = e.clientY - selectedNode.offsetHeight / 2 + 'px';
  }
});
nodie.addEventListener('mouseup', e => {
  selectedNode = undefined;
});