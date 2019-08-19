const inventory = require('../data.json')
const VenderMachine = require("../src/vending-machine");
const venderMachine = new VenderMachine(inventory);

describe('getInventory:', () => {
  describe('When get all products inventory', () => {
    it("should return all products inventory", () => {
      expect(venderMachine.getAllProductInventory()).toEqual(inventory.products);
    });
  });
  describe('When get inventory by position="A1"', () => {
    it("should return inventory = 6", () => {
      expect(venderMachine.getProductInventoryByPosition("A1")).toEqual(6);
    });
  });
  describe('When get all changes', () => {
    it("should return all changes inventory", () => {
      expect(venderMachine.getChangeInventory()).toEqual(inventory.changes);
    });
  });
  describe('When get number of changes by changes="loonies"', () => {
    it("should return numCoins = 50", () => {
      expect(venderMachine.getChangeInventoryByName("loonies")).toEqual(50);
    });
  });
  describe('When get value of changes by changes="loonies"', () => {
    it("should return maxCoins = 1", () => {
      expect(venderMachine.getChangeValueByName("loonies")).toEqual(1);
    });
  });
})
describe('setInventory:', () => {
  describe('When set products inventory position= "A1",number = 2', () => {
    it("should return inventory = 8", () => {
      expect(venderMachine.setProductInventory("A1", 2)).toEqual(8);
    });
  });
  describe('When set products inventory position= "A1",number = 6', () => {
    it("should throw Error", () => {
      expect(() => venderMachine.setProductInventory("A1", 6)).toThrow("Over max spot available");
    });
  });
  describe('When set changes inventory name= "toonies",number = 25', () => {
    it("should return coins=75", () => {
      expect(venderMachine.setChangeInventory("toonies", 25)).toEqual(75);
    });
  });
  describe('When set products inventory position= "toonies",number = 26', () => {
    it("should throw Error", () => {
      expect(() => venderMachine.setChangeInventory("toonies", 26)).toThrow("Over max spot available");
    });
  });

  describe('When set new product to position= "D2", name=coke22, price=14, inventory=6, maxinventory=10', () => {
    it("should return new product detail by position", () => {
      expect(venderMachine.setNewProductToPosition("D2", "coke22", 14, 6, 10)).toEqual({
        "name": "coke22",
        "price": 14,
        "inventory": 6,
        "maxinventory": 10
      });
    });
  });
})
describe('Dispense Products:', () => {
  describe('When giving change amount = 13.4', () => {
    it("should return change = 13.4", () => {
      expect(venderMachine.dispenseChanges(13.4)).toEqual(13.4);
      expect(venderMachine.getChangeInventory()).toEqual(inventory.changes);
    });
  });
  describe('When getting amount = 5, position="A1"', () => {
    it("should return true", () => {
      expect(venderMachine.dispenseProduct("A1", 5)).toEqual(true);
      expect(venderMachine.getChangeInventory()).toEqual(inventory.changes);
      expect(venderMachine.getProductInventoryByPosition("A1")).toEqual(7);
    });
  });

})
