_This is a **Typescript** port of Level 1 from Github's Secure Code Game._

## Level 1: Black Friday

Welcome to "Secure Code Game"! 👋

### 📝 Storyline

A few days before the massive shopping event Black Friday, an electronics shop without an online presence rushed to create a website to reach a broader customer base. As a result, they spent all their budget on development without investing in security. Do you have what it takes to fix the bug and progress to Level 2?

### ⌨️ What's in the repo?

For each level, you will find the same file structure:

- `code.ts` includes the vulnerable code to be reviewed
- `code.test.ts` contains the unit tests that should continue passing after you have implemented your fix.
- `hack.test.ts` exploits the vulnerabilities in code. These tests are automatically picked up, so running `npm test` will fail initially, your goal is to get all the tests to pass.
- `hint.ts` contains a hint that should help you keep moving if you are stuck.
- `solution.ts` contains one possible solution and additional information about the exploit.

### 🚦 Time to start!

- Review the code in `code.ts` without looking at the other files. Can you spot the security bugs?
- Try to fix the bugs. Ensure that unit tests are still passing.
- You successfully completed the level when the tests in both `code.test.ts` and `hack.test.ts` are passing 🟢.
- If you get stuck, read the hint in the `hint.ts` file.
- You can review the `hack.test.ts` file to better understand how the exploit is working.
- Finally, once you have completed the challenge or if you are truely stuck, review the `solution.ts` for a fixed version and notes about the vulnerability.

Note that this challenge has two different security issues you need to address to make the tests pass.

Make sure that once you're done you read more about the vulnerability you have fixed in `solution.ts`.
