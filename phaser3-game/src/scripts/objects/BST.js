//Purpose: Create Binary Search Tree becuase it is easier to create and
//manipulate if we put number in the nodes.


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
                inputNode.parentNode = curNode;
            }
            else{
                //Try it again with the new node 
                this.insertNode(curNode.leftChild,inputNode);
            }
        }
        //
        else if(curNode.rightChild == null){
            curNode.rightChild = inputNode;
            inputNode.parentNode = curNode;
        }
        else{
            this.insertNode(curNode.rightChild,inputNode);
        }
        
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

    // preorder(node)
    // postorder(node)
    // search(node, data)
    }
}

export class Node { 
    
    constructor(inputContent)
    {

        // What could be diplayed in the tree
        this.content  =  inputContent;

        // Javascript does not have pointers 
        // to make a node just do the node  Node.leftChild = new Node(X)
        this.parentNode = null;
        this.leftChild = null;
        this.rightChild = null; 
    }
    
    
    
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
for (var i = 0; i < MainTree.getNodesInOrder().length; i++) {
    console.log(MainTree.getNodesInOrder()[i].content);
    
}
console.log(MainTree.getNodesInOrder());


// */ 
