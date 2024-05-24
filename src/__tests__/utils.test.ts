import { addTwoNumbers } from "../helper/helper";

//function test
test("this function helps to add two numbers together", () => {
  const result = addTwoNumbers(1, 5);
  console.log(result);
  expect(result).toBe(6);
});
