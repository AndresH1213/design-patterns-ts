namespace Iterator {
  type INode = Node | null;

  class Node {
    public value: number;
    public left: INode;
    public right: INode;
    public parent: INode;
    constructor(value: number, left: INode = null, right: INode = null) {
      this.value = value;
      this.left = left;
      this.right = right;
      this.parent = null;

      if (left) left.parent = this;
      if (right) right.parent = this;
    }
  }

  function makeInOrderIterator(root: INode) {
    // go to leftmost
    let current = root;
    while (current!.left) {
      current = current!.left;
    }
    let yieldedStart = false;

    return {
      next: function () {
        if (!yieldedStart) {
          yieldedStart = true;
          return {
            value: current,
            done: false,
          };
        }
        if (current!.right) {
          current = current!.right;
          while (current!.left) {
            current = current!.left;
          }
          return {
            value: current,
            done: false,
          };
        } else {
          let p = current!.parent;
          while (p && current === p.right) {
            current = p;
            p = p.parent;
          }
          current = p;
          return {
            value: current,
            done: current == null,
          };
        }
      }, // next

      // this makes the iterator iterable
      [Symbol.iterator]: function () {
        return this;
      },
    };
  }

  class BinaryTree {
    public rootNode: Node;
    constructor(rootNode: Node) {
      this.rootNode = rootNode;
    }

    // assuming only one form of iteration
    [Symbol.iterator]() {
      return makeInOrderIterator(this.rootNode);
    }

    *betterInOrder() {
      function* traverse(current) {
        if (current.left) {
          for (let left of traverse(current.left)) yield left; // recursion
        }
        yield current;
        if (current.right) {
          for (let right of traverse(current.right)) yield right;
        }
      }
      for (let node of traverse(this.rootNode)) yield node;
    }

    get inOrder() {
      return makeInOrderIterator(this.rootNode);
    }
  }

  //    1
  //   / \
  //  2   3
  // / \ / \
  //6  7 4 9
  // in-order:  213
  // preorder:  1267349
  // postorder: 231

  let root2 = new Node(1, new Node(2), new Node(3));

  // c++ style
  let It = makeInOrderIterator(root2);
  let result = It.next();
  while (!result.done) {
    console.log(result.value!.value);
    result = It.next();
  }

  let tree2 = new BinaryTree(root2);

  for (let x of tree2) console.log(x?.value);

  console.log([...tree2].map((x) => x?.value));

  console.log([...tree2.inOrder].map((x) => x.value));

  // a generator is both an iterator and iterable
  console.log('using a generator...');
  console.log([...tree2.betterInOrder()].map((x) => x.value));

  for (let x of tree2.betterInOrder()) console.log(x.value);
}
