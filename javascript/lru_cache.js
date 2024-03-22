class Node {
  constructor(data = null, key = null, next = null, prev = null) {
    this.data = data;
    this.key = key;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
  }

  // ADD THE NODE TO THE HEAD OF THE LIST
  addHead(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.head.prev = null;
  }

  // REMOVE THE TAIL NODE FROM THE LIST
  // AND RETURN IT
  removeTail() {
    if (!this.tail) {
      return null;
    }
    if (this.head === this.tail) {
      let tailToReturn = this.tail;
      this.head = null;
      this.tail = null;
      return tailToReturn;
    }
    let tailToReturn = this.tail;
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    return tailToReturn;
  }

  // REMOVE THE GIVEN NODE FROM THE LIST
  // AND THEN RETURN IT
  removeNode(node) {
    if (this.head.key === node.key) {
      if (this.head.next) {
        this.head.next.prev = null;
      }
      this.head = this.head.next;
      return node;
    }

    if (this.tail.key === node.key) {
      if (this.tail.prev) {
        this.tail.prev.next = null;
      }
      this.tail = this.tail.prev;
      return node;
    }

    node.next.prev = node.prev;
    node.prev.next = node.next;
    return node;

  }

  // MOVE THE GIVEN NODE FROM ITS LOCATION TO THE HEAD
  // OF THE LIST
  moveNodeToHead(node) {
    if (this.head === node) {
      return;
    }

    this.removeNode(node);
    this.addHead(node);

  }
}

class LRUCache {
  constructor(limit = 10) {
    this.limit = limit;
    this.size = 0;
    this.hash = {};
    // this.list = new DoublyLinkedList(limit); WHY PASS IT THE LIMIT?
    this.list = new DoublyLinkedList();
  }

  // RETRIEVE THE NODE FROM THE CACHE USING THE KEY
  // IF THE NODE IS IN THE CACHE, MOVE IT TO THE HEAD OF THE LIST AND RETURN IT
  // OTHERWISE RETURN -1
  get(key) {
    if (this.hash[key]) {
      this.list.moveNodeToHead(this.hash[key]);
      return this.hash[key];
    }
    return -1;

  }

  // ADD THE GIVEN KEY AND VALUE TO THE CACHE
  // IF THE CACHE ALREADY CONTAINS THE KEY, UPDATE ITS VALUE AND MOVE IT TO
  // THE HEAD OF THE LIST
  // IF THE CACHE DOESN'T CONTAIN THE KEY, ADD IT TO THE CACHE AND PLACE IT
  // AT THE HEAD OF THE LIST
  // IF THE CACHE IS FULL, REMOVE THE LEAST RECENTLY USED ITEM BEFORE ADDING
  // THE NEW DATA TO THE CACHE
  put(key, value) {
    if (this.size + 1 > this.limit) {
      let tailKey = this.list.tail.key;
      delete this.hash[tailKey]
      this.list.removeTail();
      this.size--;

    }
    if (this.hash[key]) {
      let nodeToPut = new Node (value, key);
      this.hash[key] = nodeToPut;
      this.list.moveNodeToHead(nodeToPut);
    } else {
      let nodeToPut = new Node (value, key);
      this.hash[key] = nodeToPut;
      this.list.addHead(nodeToPut);
      this.size++;
    }

  }
}

if (require.main === module) {
  // add your own tests in here
  let lruCache = new LRUCache(3);
  lruCache.put("cake", "cake recipe");

  console.log(lruCache.get("cake"));

  lruCache.put("cookies", "cookie recipe")
  lruCache.put("cake", "fixed cake recipe")
  lruCache.put("scones", "scone recipe")
  lruCache.put("smoothie", "smoothie recipe")


  //console.log(lruCache.get("cake"));
  // console.log(lruCache.get("smoothie"))
  console.log(lruCache.get("cookies"))



}

module.exports = {
  Node,
  DoublyLinkedList,
  LRUCache
};

// Please add your pseudocode to this file
// And a written explanation of your solution
