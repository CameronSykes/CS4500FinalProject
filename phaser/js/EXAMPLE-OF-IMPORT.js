//the from location is relative to the html file location

//BST.js and This file are in the same location but since index.html is in a parent directory this file is located above
import {BinarySearchTree, Node} from '/js/BST.js';

var X = new BinarySearchTree();
X.insert(3);
X.insert(8);
console.log(X.getNodesInOrder());
