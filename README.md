## Issues Encountered and Solutions

### Problem 1: NEXT.js Not Reading Environment Variable

I encountered an issue where the environment variable for the smart contract address, saved as `SMART_CONTRACT_ADDRESS`, was not being read by NEXT.js when rendering. Despite the variable showing correctly in the console, NEXT.js couldn't access it properly during the render process.

This issue occurred in the `/ethereum/factory.js` file.

#### Solution:
NEXT.js requires any environment variable that needs to be accessed on the client-side to be prefixed with `NEXT_PUBLIC_`. To fix the issue, I renamed the environment variable from `SMART_CONTRACT_ADDRESS` to `NEXT_PUBLIC_SMART_CONTRACT_ADDRESS`, allowing NEXT.js to read it correctly during rendering.

Make sure to update your `.env.local` file accordingly:

```bash
NEXT_PUBLIC_SMART_CONTRACT_ADDRESS=your_smart_contract_address_here
```

### Problem 2: Smart Contract Address Undefined or Incorrect
While working in the /ethereum/factory.js file, I encountered an issue where the ABI of the smart contract was logging correctly, but the contract address was being passed as undefined. This was due to the misconfiguration of the environment variable for the contract address. Additionally, it's common to mistakenly pass the wallet address instead of the smart contract address, which leads to the same issue.

The error occurred in this snippet:
```bash
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface), 
    process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS
);
```

Even though the ABI was logged correctly, the contract could not be found, as indicated by the fact that none of the contract methods worked as expected.

#### Solution:
Ensure that the correct contract address is being used, and that it is properly set as an environment variable with the NEXT_PUBLIC_ prefix. Verify that the address in NEXT_PUBLIC_SMART_CONTRACT_ADDRESS is the smart contract's address, not a wallet address.

To confirm that the contract is found correctly, check if the contract methods are invoked properly. Simply logging the ABI does not guarantee that the contract is connected; the real test is if the contract methods can be accessed and executed successfully.

Make sure your .env.local file includes the correct variable:

```bash
NEXT_PUBLIC_SMART_CONTRACT_ADDRESS=your_smart_contract_address_here
```

### Problem 3: "TypeError: Do not know how to serialize a BigInt"

While working in the `[address].js` file, I encountered an issue when trying to return an object from the `getInitialProps` method in NEXT.js. The `summary` object is fetched from the Campaign smart contract and contains general information where the first 4 properties are `uint` and the last is an `address`.

Here is the relevant code snippet:

```javascript
// Returns an object, keys are non-negative integers
const summary = await campaign.methods.getSummary().call();

return {
  minimumContribution: summary[0],
  balance: summary[1],
  requestsCount: summary[2],
  approversCount: summary[3],
  manager: summary[4],
};
```

The error occurred when trying to return the summary properties in the getInitialProps method:

```
TypeError: Do not know how to serialize a BigInt
```

#### Solution:
To resolve this issue, I added a fix at the top of the `getInitialProps` function to properly serialize the BigInt values to numbers or strings:

```
// Fixing the "TypeError: Do not know how to serialize a BigInt" issue.
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};
```

## Side Notes

### Side Note 1: Understanding the <Head /> Component in NEXT.js and Improving the SEO
NEXT.js provides a native <Head /> component, imported from 'next/head'. This component allows you to modify the contents of the <head> section of your HTML document for each page. You can use it to set things like the page title, meta tags, and links to external resources (e.g., stylesheets or scripts).

Example usage:

```bash
import Head from 'next/head';

const MyPage = () => (
  <>
    <Head>
      <title>My Awesome Page</title>
      <meta name="description" content="This is an awesome page built with NEXT.js" />
    </Head>
    <h1>Welcome to My Awesome Page</h1>
  </>
);
```

This way, you can dynamically update the <head> section based on the content of each page, improving SEO and providing a better user experience.

### Side Note 2: Gas Calculation with MetaMask when a transaction is sent.
When sending a transaction from the browser using MetaMask, you do not need to manually specify the gas amount in the send method. MetaMask automatically calculates and sets the gas limit for you. However, when running tests or deploying via scripts, you may need to explicitly define the gas amount.
```bash
const accounts = await web3.eth.getAccounts();

await factory
.methods
.createCampaign(amount)
.send({
    from: accounts[0],
    //gas: '' // Metamask handles it for us!
})
```
