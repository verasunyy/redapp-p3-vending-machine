const inventory = require('../data.json')

class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
  }
  getAllProductInventory() {
    return this.inventory.products
  }
  getProductInventoryByPosition(position) {
    return this.inventory.products[position].inventory
  }
  getChangeInventory() {
    return this.inventory.changes
  }
  getChangeInventoryByName(name) {
    return this.inventory.changes[name].numCoins
  }
  getChangeValueByName(name) {
    return this.inventory.changes[name].value
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




}
module.exports = VendingMachine;
const vw = new VendingMachine(inventory);
// console.log(vw.getInventory("A1"));
// console.log(vw.setProductInventory("A1", 6));
// console.log(vw.setChangeInventory("toonies", 25));