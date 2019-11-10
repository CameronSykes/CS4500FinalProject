//Name: Khalfani Wadlington
//Date: [2019-10-30 Wed]
//Purpose: Create Binary Search Tree becuase it is easier to create and
//manipulate if we put number in the nodes.


<<<<<<< HEAD
//TODO use @class directives to put this into make this importable
class BinarySearchTree
{
    constructor(screenW, caveRadius, kFactor)
    {
        // Root of a binary seach tree starts off empty
        this.root = new Node(null);
        this.root.setxCoord(screenW/2);
        this.root.setyCoord(caveRadius + 10);
        this.kFactor = kFactor;
    }

    getRootNode() { return this.root; }

    // Implement recursive algorithm
    insert(inputNodeValue)
    {
        var nodeToInsert = new Node(inputNodeValue);

        // If its the first time inserting a node make it the root
        if(this.root == null)
        {
            this.root = nodeToInsert;
        }
        else
        {
            // Start recursively searching for node to insert this new node under
            // Beggining at root
            this.insertNode(this.root, nodeToInsert);
        }
    }

    // Handle traversal down tree to find place to insert new node
    insertNode(curNode, inputNode)
    {
        // A child node is under a parent node
        // Get the parent node's y coordinate then decrement by kFactor
        inputNode.setyCoord(curNode.getyCoord() - kFactor);

        if(inputNode.content < curNode.content)
        {
            // Is there an empty space to insert it
            if(curNode.leftChild == null)
            {
                // The left child is to the left of the parent node
                // Get the parent node's x coordinate then decrement by kFactor/2
                inputNode.setxCoord(curNode.getxCoord() - (kFactor / 2));

                // Insert the node
                curNode.leftChild = inputNode;
            }
            else
            {
                //Try it again with the new node
                this.insertNode(curNode.leftChild, inputNode);
            }
        }
        // The value content of the node to be added is greater than
        else if(curNode.rightChild == null)
        {
            // The right child is to the right of the parent node
            // Get the parent node's x coordinate then increment by kFactor/2
            inputNode.setxCoord(curNode.getxCoord() + (kFactor / 2));

            // A child node is under a parent node
            // Get the parent node's y coordinate then decrement by kFactor

            curNode.rightChild = inputNode;
        }
        else { this.insertNode(curNode.rightChild, inputNode); }
    }
    // Helper function
    // findMinNode()
    // getRootNode()

    //returns a array of nodes from inorder traversal
    getNodesInOrder()
    {
        // Traversal algorithm inspired by
        // https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion/

        var currentNode = this.root;
        var stack = [];
        var nodeArray = [];
        while (currentNode != null || stack.length != 0)
        {
            if (currentNode != null)
            {
=======
export class BinarySearchTree
{ 
    constructor() 
    { 
        // root of a binary seach tree starts off empty
        this.root = null;
    }

    //implement recursive algorithm
    insert(inputNodeValue) {

        var nodeToInsert = new Node(inputNodeValue);

        //if its the first time inserting a node make it the root
        if(this.root == null){
            this.root = nodeToInsert;
        } 
        else{
            //start recursively searching for node to insert this new node under
            //beggining at root
            this.insertNode(this.root,nodeToInsert);
        }
    }

    //Handle traversal down tree to find place to insert new node 
    insertNode(curNode, inputNode) {

        if(inputNode.content < curNode.content ){
            // is there an empty space to insert it
            if(curNode.leftChild == null){
                curNode.leftChild = inputNode;
            }
            else{
                //Try it again with the new node 
                this.insertNode(curNode.leftChild,inputNode);
            }
        }
        //
        else if(curNode.rightChild == null){
                curNode.rightChild = inputNode;
            }
            else{
                this.insertNode(curNode.rightChild,inputNode);
            }
        
    }
    
    // Helper function 
    // findMinNode() 
    // getRootNode() 

    //returns a array of nodes from inorder traversal
    getNodesInOrder(node) {
        // Traversal algorithm inspired by
        // https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion/
        
        var currentNode = this.root;
        var stack = [];
        var nodeArray = [];
        while (currentNode != null || stack.length != 0){
            if (currentNode != null) {
>>>>>>> 343665a236722125b3a66e6a87c294ef29c17524
                // add all leftmost nodes
                stack.push(currentNode);
                currentNode = currentNode.leftChild;
            }
<<<<<<< HEAD
            else if (stack.length != 0)
            {
                currentNode = stack.pop();
                nodeArray.push(currentNode);

=======
            else if (stack.length != 0) {
                currentNode = stack.pop();
                nodeArray.push(currentNode);
                
>>>>>>> 343665a236722125b3a66e6a87c294ef29c17524
                /*
                  This loop pushes the bottom leftmost node to array.

                  Then it goes to the right node. However, when the right node
                  is null (at the bottom of the tree) it will pop the stack and
                  work on the root. The root has a right child. Therefore the
                  loop will work on the right child. The traversal will follow
                  the pattern "left,root,right"
                */
                currentNode = currentNode.rightChild;
            }
        }
        return(nodeArray);
    }
    // preorder(node)
    // postorder(node)
<<<<<<< HEAD

    search(node, content)
    {
        // Code source: geeksforgeeks.org/implementation-binary-search-tree-javascript
        if (node === null) { return null; }
        else if (content < node.content) { return this.search(node.leftChild, content); }
        else if (content > node.content) { return this.search(node.rightChild, content); }
        else { return node; }
    }
}
// this is an object becuase it's going to have more properites later on
//its a part of Binary Search Tree object
class Node
{
    constructor(inputContent)
    {
        // What could be diplayed in the tree
        this.content  = inputContent;
        this.xCoord = 0;
        this.yCoord = 0;

        // Javascript does not have pointers
        // to make a node just do the node  Node.leftChild = new Node(X)
        this.parentNode = null;
        this.leftChild = null;
        this.rightChild = null;
    }

    getContent() { return this.content; }
    setContent(val) { this.content = val; }

    getxCoord() { return this.xCoord; }
    setxCoord(xVal) { this.xCoord = xVal; }

    getyCoord() { return this.yCoord; }
    setyCoord(yVal) { this.yCoord = yVal; }

    // remove(data)

    // Helper function
    // findMinNode()
    // getRootNode()
    // inorder(node)
    // preorder(node)
    // postorder(node)
    // search(node, data)
}

// Test if it works
var MainTree                       = new BinarySearchTree();
MainTree.root                      = new Node(1); 
MainTree.root.leftChild            = new Node(2); 
MainTree.root.rightChild           = new Node(3); 
MainTree.root.leftChild.leftChild  = new Node(4); 
MainTree.root.leftChild.rightChild = new Node(5); 
console.log("TREE");
console.log(MainTree.getNodesInOrder());
=======
    // search(node, data)
}
// this is an object becuase it's going to have more properites later on
//its a part of Binary Search Tree object
export class Node
{ 
    constructor(inputContent) 
    {
        
        // What could be diplayed in the tree  
        this.content  = inputContent;
        // Javascript does not have pointers 
        // to make a node just do the node  Node.leftChild = new Node(X)
        this.parentNode = null;
        this.leftChild = null;
        this.rightChild = null; 
    }
    
    
    // remove(data) 
    
    
    // Helper function 
    // findMinNode() 
    // getRootNode() 
    // inorder(node) 
    // preorder(node)                
    // postorder(node) 
    // search(node, data) 
} 



// Test if it works
// var MainTree                       = new BinarySearchTree();
// MainTree.root                      = new Node(1); 
// MainTree.root.leftChild            = new Node(2); 
// MainTree.root.rightChild           = new Node(3); 
// MainTree.root.leftChild.leftChild  = new Node(4); 
// MainTree.root.leftChild.rightChild = new Node(5); 
// console.log("TREE");
// console.log(MainTree.getNodesInOrder());
>>>>>>> 343665a236722125b3a66e6a87c294ef29c17524
