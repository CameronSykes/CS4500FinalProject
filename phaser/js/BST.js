//Name: Khalfani Wadlington
//Date: [2019-10-30 Wed]
//Purpose: Make binary search tree


//Create Binary Search Tree becuase it is easier to create and manipulate if we
//put number in the nodes.
class BinarySearchTree 
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
    // inorder(node) 
    // preorder(node)                
    // postorder(node) 
    // search(node, data) 
}
// this is an object becuase it's going to have more properites later on
// It should be inside Binary tree to reduce coupling


class Node
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



var MainTree = new BinarySearchTree();

MainTree.insert(8);
MainTree.insert(3);
MainTree.insert(1);
MainTree.insert(10);
MainTree.insert(14);
console.log(MainTree);
console.log(MainTree.root.rightChild);
console.log(MainTree.root.leftChild);

