//Purpose: Create Binary Search Tree becuase it is easier to create and
//manipulate if we put number in the nodes.


export class BinarySearchTree
{ 
    constructor(screenW, caveRadius, kFactor)
    {
        // Root of a binary seach tree starts off empty
        this.root = null;
        this.root.setxCoord(screenW/2);
        this.root.setyCoord(caveRadius + 10);
        this.kFactor = kFactor;
    }

    getRootNode() { return this.root; }

    //Returns the node created in BST
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
            //Start recursively searching for node to insert this new node under
            //Beginning at root
            this.insertNode(this.root, nodeToInsert);
        }
        //the node was modified in the this.insertNode(this.root, nodeToInsert);
        //function. It should be returned outside the if statement so the function always returns a value

        return(nodeToInsert);
    }

    // Handle traversal down tree to find place to insert new node
    insertNode(curNode, inputNode)
    {
        // A child node is under a parent node
        // Get the parent node's y coordinate then decrement by this.kFactor
        inputNode.setyCoord(curNode.getyCoord() - this.kFactor);

        if(inputNode.content < curNode.content)
        {
            // Is there an empty space to insert it
            if(curNode.leftChild == null)
            {
                // The left child is to the left of the parent node
                // Get the parent node's x coordinate then decrement by this.kFactor/2
                inputNode.setxCoord(curNode.getxCoord() - (kFactor / 2));

                // Insert the node
                curNode.leftChild = inputNode;
                inputNode.parentNode = curNode;
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
            // Get the parent node's x coordinate then increment by this.kFactor/2
            inputNode.setxCoord(curNode.getxCoord() + (kFactor / 2));

            // A child node is under a parent node
            // Get the parent node's y coordinate then decrement by this.kFactor

            curNode.rightChild = inputNode;
            inputNode.parentNode = curNode;
        }
        else { this.insertNode(curNode.rightChild, inputNode); }
        return curNode;
    }
    bfs()
    {
        let node = this.root;
        const queue = [node];
        const finalData = [ ];

        while(queue.length)
        {
            node= queue.shift();
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
            finalData.push(node);
        }

        return finalData;
    } 
    // Helper function 
    // findMinNode() 
    // getRootNode() 

    //returns a array of nodes from inorder traversal
    getNodesInOrder() {
        // Traversal algorithm inspired by
        // https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion/
        
        var currentNode = this.root;
        var stack = [];
        var nodeArray = [];
        while (currentNode != null || stack.length != 0){
            if (currentNode != null) {
                // add all leftmost nodes
                stack.push(currentNode);
                currentNode = currentNode.leftChild;
            }
            else if (stack.length != 0) {
                currentNode = stack.pop();
                nodeArray.push(currentNode);
                
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
    //This does a binary serach and return all nodes in the search path to a node
    //returns null if node not found (contains end node in path) 
    getSearchPathFromContent(contentToFind,parentNode){
        if (parentNode === undefined)
            parentNode = this.root;
 
        var listOfTraversedNodes = [];
        //if called before first insert
        while(parentNode != null  && parentNode.content != contentToFind ){
            listOfTraversedNodes.push(parentNode);
            if(contentToFind < parentNode.content){
                parentNode = parentNode.leftChild;
            }
            else{
                parentNode = parentNode.rightChild;
            }
        }

        if (parentNode.content == contentToFind){
            listOfTraversedNodes.push(parentNode);
            return(listOfTraversedNodes);   
        }

        console.log("Error node",contentToFind,"not found"); 
        return(null); 

    }
    //do a binary serach and return all nodes in path
    //returns null if node not found
    getNodeFromContent(contentToFind){
        var searchPath = this.getSearchPathFromContent(contentToFind);
        if(searchPath!=null){
            return(searchPath[searchPath.length - 1]);
        }
        return(null);

    }


    getShortestPath(startNode,endNode){
        /* Assume you have a bst like this
           /* //make tree
           //      5 
           //    /   \ 
           //   3     7 
           //  /  \  /  \ 
           // 2   4  6   8 

        Take 8 and 2 for example.

        Find the first shared ancsestor node          : 5 
 
        the shortest path from 8 to 2 is              : 8,7,5,3,2

        This algorithm will
        search from first shared ancsestor node to 8  : 5 7 8
        search from first shared ancsestor node to 2  : 5 3 2

        delete shared parents in begin node path
        path to 8 : 7 8
        path to 2 : 5 3 2

        reverse the first path and append it to the second
        path to 8 : 7 8
        path to 2 : 5 3 2

        8 7 5 3 2 
        append first path to second 

        */
 
        var lastSharedAncestor;

        var startNodeSearchPathFromRoot = this.getSearchPathFromContent(startNode.content);
        var endNodeSearchPathFromRoot = this.getSearchPathFromContent(endNode.content);
        var shortestPathFromRootLength = Math.min(startNodeSearchPathFromRoot.length,endNodeSearchPathFromRoot.length);
 
        for (var i = 0; i < shortestPathFromRootLength; i++) {
            if(startNodeSearchPathFromRoot[i]  == endNodeSearchPathFromRoot[i]){
                lastSharedAncestor = startNodeSearchPathFromRoot[i];
            }
        }


        var startNodeSearchPathFromAncestor = this.getSearchPathFromContent(startNode.content,lastSharedAncestor);
        var endNodeSearchPathFromAncestor = this.getSearchPathFromContent(endNode.content,lastSharedAncestor);
        var shortestPath = Math.min(startNodeSearchPathFromAncestor.length,endNodeSearchPathFromRoot.length);
        //remove shared parents 
        for (i = 0; i < shortestPath; i++) {
            if(startNodeSearchPathFromAncestor[i]  == endNodeSearchPathFromAncestor[i]){
                startNodeSearchPathFromAncestor.splice(i,1); 
            }
        }
  

        return ( startNodeSearchPathFromAncestor.reverse().concat(endNodeSearchPathFromAncestor) );
    }
}

export class Node { 
    
    constructor(inputContent)
    {
        this.content  = inputContent;
        this.xCoord = 0;
        this.yCoord = 0;

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
}

//Many functions return a list of node objects, that is not easy see in the console
//This will print contents of all nodes in a list for debug purposes
function printNodeListContents(listOfNodes){
    //This will print all node content seperated by spaces instead of newlines
    var singleLineToPrint = "";
    for (var i = 0; i < listOfNodes.length; i++) {
        singleLineToPrint = singleLineToPrint + String(listOfNodes[i].content) + " ";
    }
    console.log(singleLineToPrint);
}  

/*
//Test if it works
//make tree
//      5 
//    /   \ 
//   3     7 
//  /  \  /  \ 
// 2   4  6   8 
var MainTree                       = new BinarySearchTree();
MainTree.insert(5);
MainTree.insert(3);
MainTree.insert(2);
MainTree.insert(4);
MainTree.insert(7);
MainTree.insert(6);
MainTree.insert(8);
console.log("TREE");


printNodeListContents(MainTree.getShortestPath(MainTree.getNodeFromContent(3),
                                               MainTree.getNodeFromContent(2)));

printNodeListContents(MainTree.getShortestPath(MainTree.getNodeFromContent(2),
                                               MainTree.getNodeFromContent(3)));
printNodeListContents(MainTree.getShortestPath(MainTree.getNodeFromContent(8),
                                               MainTree.getNodeFromContent(2)));

printNodeListContents(MainTree.getShortestPath(MainTree.getNodeFromContent(5),
                                     MainTree.getNodeFromContent(2)));

printNodeListContents(MainTree.getShortestPath(MainTree.getNodeFromContent(2),
                                               MainTree.getNodeFromContent(5)));
*/
