# EtherLottery
Lottery game built on top of blockchain.

Technologies:
- Typescript
- Node
- Ethers.js (it has typescript support unlike web3.js)
- Solidity
- Ganache
- Mocha with chai
- React
- Emotion styled components

## Server

### Run project:
1. Install packages:
```js
pnpm install
```

2. Add environment variables:
- copy .env.default as .env
- fill variables

### Deploy contract:
3. Run deploy command:
```js
pnpm deploy
```
command will log in console ABI and deployed contract address.

### Other commands:
1. Run tests:
```js
pnpm test
```

2. Run linter and static content analyzer:
```js
pnpm lint
```

## Client

### Run project:
1. Install packages:
```js
pnpm install
```

2. Build the project:
```js
pnpm build
```

3. Run http server in build directory for example:
```js
python3 -m http.server
```

```js
npx http-server
```


### Other commands:
1. Run tests:
```js
pnpm test
```