# Vending Machine Class in JavaScript

Vending Machine Class is to implement a vending machine, include functions such as showing invenotories, refill inventories, dispense inventory and return changes, by using the Test Driven Development (TDD) process.

## Install

run npm

```bash
npm install
```

run the test

```bash
npm run test
```

## Technology Used

-JavaScript
-jest test

## Test Result

12 tests in total:

![Test Result](screenshot/testResult1.png)
![Test Result](screenshot/testResult2.png)
![Test Result](screenshot/testResult3.png)

## Tests and Functions

1. get all the products status in stock and return the data

```
getAllProductInventory()
```

2. by provding the position (eg. A1) reture the number of the product in stock

```
getProductInventoryByPosition(position)
```

3. get all the changes/coins status in stock and return the data

```
getChangeInventory()
```

4. by provding the name (eg. loonies) reture the number of the loonies in stock

```
getChangeInventoryByName("loonies")
```

5. by provding the name (eg. loonies) reture the value of the loonies (which is 1)

```
getChangeValueByName("loonies")
```

6. increase or decrease number of inventories for a specific product, by providing product position and number need change, throw error when over the max spot avalible

```
setProductInventory("A1", 2)
setProductInventory("A1", -2)
```

7. change different product for the position, need to pass the new product's name, price , inventory number and maxinventory and return the new product status for that position

```
setNewProductToPosition("D2", "coke22", 14, 6, 10)
```

8. dispense changes back to customer as the fewest numbers of coins and bills. testing the original amount of changes need to return need to be equal to the sum of the dispensed changes and decrease the number of coins/bills gaven from the change inventory
   when then coins or bills are no instock use alternative, if cant find alternative, then throw error "changes out of stock"

```
dispenseChanges()
```

9. dispense product when customer insert enough payment, product is in stock and changes are avalible

```
dispenseProduct("A1", 5)
```
