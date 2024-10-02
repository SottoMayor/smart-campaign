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
To resolve this issue, I converted the BigInt values to strings before returning them in the object, ensuring proper serialization:

```
return {
  minimumContribution: summary[0].toString(),  // Convert BigInt to string
  balance: summary[1].toString(),              // Convert BigInt to string
  requestsCount: summary[2].toString(),        // Convert BigInt to string
  approversCount: summary[3].toString(),       // Convert BigInt to string
  manager: summary[4],                         // Manager is already a string (address)
};
```

### Problem 4: Solidity does not accept returning an array of structs all at once

This error occurred in the `/campaigns/[address]/requests` page, specifically in the `getInitialProps` function. Because solidity does not accept returning an array of structs all at once, _you first need to know the size of that array and then iterate to call each struct one by one_. While this is not an ideal strategy, it works. But, in this approach I encountered two issues:

1. When obtaining the size of an array, it comes in the format of BigInt. Therefore, it needs to be converted to an integer:

   ```
   const requestCountBigInt = await campaign.methods.getRequestsAccount().call();
   const requestCount = parseInt(requestCountBigInt.toString());
   ```

2. The value of `rawRequests` is resolved by a promise and returns an array. _I cannot directly return this array_; I need to do another map to adjust the BigInt values to strings.

   Here is the complete code in `getInitialProps` function:

   ```
   requests.getInitialProps = async (props) => {
     const { address } = await props.query;

     const campaign = Campaign(address);
     const requestCountBigInt = await campaign.methods.getRequestsAccount().call();
     const requestCount = parseInt(requestCountBigInt.toString());

     const rawRequests = await Promise.all(
       Array(requestCount).fill()
       .map((_, index) => campaign.methods.requests(index).call())
     );

     const reqs = rawRequests.map(element => ({
       description: element.description,
       value: element.value.toString(),
       recipient: element.recipient,
       complete: element.complete,
       approvalCount: element.approvalCount.toString()
     }));

     return { address, reqs, requestCount };
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

### Side Note 3: How to safely reload a page with Next.js

To safely reload a page in Next.js, you should use Next's router and push to the same page you're currently on. For example, if you're on `/users/` and want to reload the page, use `router.replace('/users')`. The `window.location.reload` method also works, but it reloads the entire page, potentially causing some in-memory data to be lost.   

I used this approach in `/components/Contribute.js`.

### Side Note 4: Handling inputs for Ether or Wei values

When working with inputs that handle values of Ether or Wei to be passed to a smart contract, the state type that manages this input should be a `string`, and the default value in `setValue` should be `''` (an empty string). If we use the `number` type and the default value is `0`, every time the page with this form loads, the number `0` will always be there by default, which can negatively impact the user experience.   

I used this approach in `/components/Contribute.js` and `/pages/campaings/new.js`.

### Side Note 5: Dynamic parameters for nested routes

Inside the `users` folder, a `[id].js` file will expect a dynamic user ID in the URL, like `/users/123`, where `123` is dynamic. If additional segments need to follow this dynamic path, it’s a good idea to refactor the page structure. The `[id].js` file should become a folder `[id]`, and inside that folder, you will have an `index.js` for the `/users/123` path and another file `xyz.js` for the `/users/123/xyz` path.
