const inventory = require('../data.json')

class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
  }
  getAllProductInventory() {
    return this.inventory.products
  }
  getProductByPosition(position) {
    return this.inventory.products[position]
  }
  getProductInventoryByPosition(position) {
    return this.inventory.products[position].inventory
  }
  getProductPriceByPosition(position) {
    return this.inventory.products[position].price
  }
  getChangeInventory() {
    console.log(this.inventory.changes)
    return this.inventory.changes
  }
  getChangeInventoryByName(name) {
    return this.inventory.changes[name].numCoins
  }
  getChangeValueByName(name) {
    return this.inventory.changes[name].value
  }

  setNewProductToPosition(position, name, price, inventory, maxinventory) {
    this.inventory.products[position] = {
      "name": name,
      "price": price,
      "inventory": inventory,
      "maxinventory": maxinventory
    }
    return this.getProductByPosition(position)
  }

  setProductInventory(position, number) {
    const inventory = this.getProductInventoryByPosition(position)
    const maxInventory = this.inventory.products[position].maxinventory
    const newInventory = inventory + number
    if (newInventory > maxInventory) {
      throw new Error("Over max spot available");
    }
    else {
      this.inventory.products[position].inventory = newInventory
      return this.getProductInventoryByPosition(position);
    }
  }

  setChangeInventory(name, number) {
    const inventory = this.getChangeInventoryByName(name);
    const maxInventory = this.inventory.changes[name].maxCoins;
    const newInventory = inventory + number
    if (newInventory > maxInventory) {
      throw new Error("Over max spot available");
    }
    else {
      this.inventory.changes[name].numCoins = newInventory
      return this.getChangeInventoryByName(name);
    }
  }

  dispenseProduct(position, amount) {
    if (amount > 20) {
      throw new Error("Not accept bill larger than 20");
    } else if (amount < this.getProductPriceByPosition(position)) {
      throw new Error("Not Enough Balance");
    } else if (!this.getProductInventoryByPosition(position)) {
      throw new Error("Product Out of Stock");
    } else {
      let changeAmount = amount - this.getProductPriceByPosition(position)
      this.dispenseChanges(changeAmount);
      this.setProductInventory(position, -1);
      return true
    }
    return false
  }

  dispenseChanges(changeAmount) {
    let changes = [
      { "name": "tens", "number": 0, "value": 10 },
      { "name": "fives", "number": 0, "value": 5 },
      { "name": "toonies", "number": 0, "value": 2 },
      { "name": "loonies", "number": 0, "value": 1 },
      { "name": "quaters", "number": 0, "value": 0.25 },
      { "name": "dimes", "number": 0, "value": 0.10 },
      { "name": "nicles", "number": 0, "value": 0.05 }
    ]
    this.checkChange(changes, changeAmount);
    console.log("changes: \n", changes)
    changes.map((change, index) =>
      this.setChangeInventory(change.name, -change.number)
    )
    return changes.reduce((acc, current) => (acc = acc + current.number * current.value), 0);
  }

  checkChange(array, amount) {
    array.map((change, index) => {
      if (amount >= change.value) {
        const numberOfChange = Math.floor(amount / change.value);
        if (this.getChangeInventoryByName(change.name) >= numberOfChange) {
          array[index].number = numberOfChange;
          amount = parseFloat((amount - change.value * numberOfChange).toFixed(2));
        } else {
          array[index].number = this.getChangeInventoryByName(change.name);
          amount = parseFloat((amount - change.value * this.getChangeInventoryByName(change.name)).toFixed(2))
          if (change.name === "nicles") {
            if (this.getChangeInventoryByName("dimes") >= array[5].number + 3) {
              array[4].number--;
              array[5].number += 3;
              amount = amount - 0.05;
            } else {
              throw new Error("Sorry, not enough changes to give back, please try again")
            }
          }
        }
      }
    })
    if (amount !== 0) {
      throw new Error("Sorry, not enough changes to give back, please try again")
    }
  }
}
module.exports = VendingMachine;
