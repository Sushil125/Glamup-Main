const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");
const { delay } = require("../utils/delay");

// Given("Test registration functionality", { timeout: 30000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/login");
//   await driver.findElement(By.id("createAccount")).click();
//   await driver.findElement(By.name("fullname")).sendKeys("test");
//   await driver.findElement(By.name("contact")).sendKeys("98632123");
//   await driver.findElement(By.name("address")).sendKeys("test");
//   await driver.findElement(By.name("email")).sendKeys("test123@gmail.com");
//   await driver.findElement(By.name("password")).sendKeys("test1234");
//   await driver.sleep(5000);
//   await driver.findElement(By.id("registerBtn")).click();

//   await driver.wait(until.elementLocated(By.id("otp")), 30000);
//   expect(await driver.wait(until.elementLocated(By.id("otp"))));
//   await driver.sleep(3000);
//   await driver.quit();
// });
// Given("Test login functionality", { timeout: 30000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/login");
//   await driver.findElement(By.name("email")).sendKeys("test1@gmail.com");
//   await driver.findElement(By.name("password")).sendKeys("test1234");
//   await driver.sleep(5000);
//   await driver.findElement(By.id("loginBtn")).click();

//   await driver.wait(until.elementLocated(By.id("homePage")), 30000);
//   expect(await driver.wait(until.elementLocated(By.id("homePage"))));
//   await driver.sleep(3000);
//   await driver.quit();
// });
// Given("Test Admin login functionality", { timeout: 30000 }, async function () {
//   let driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("http://localhost:3000/login");
//   await driver.findElement(By.name("email")).sendKeys("aglamup71@gmail.com");
//   await driver.findElement(By.name("password")).sendKeys("123456");
//   await driver.sleep(5000);
//   await driver.findElement(By.id("loginBtn")).click();

//   await driver.wait(until.elementLocated(By.id("adminPage")), 30000);
//   expect(await driver.wait(until.elementLocated(By.id("adminPage"))));
//   await driver.sleep(3000);
//   await driver.quit();
// });
Given("Test AddProduct functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/dashboard/addproducts");
  await driver.findElement(By.name("brandname")).sendKeys("test");
  await driver.findElement(By.name("name")).sendKeys("test1234");
  // await driver.findElement(By.name("description")).sendKeys("testdescription");
  // await driver.findElement(By.name("category")).sendKeys("test");
  // await driver.findElement(By.name("price")).sendKeys("45");
  
  await driver.sleep(1000);
  await driver.findElement(By.id("addProduct")).click();

  await driver.wait(until.elementLocated(By.id("addProduct")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("addProduct"))));
  // await driver.sleep(3000);
  await driver.quit();
});


