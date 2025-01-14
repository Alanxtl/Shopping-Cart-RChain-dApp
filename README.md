# Shopping-Cart-RChain-dApp

A rchain shopping cart dapp demo.

See the demonstration [here](https://github.com/Alanxtl/Shopping-Cart-RChain-dApp/assets/25652981/8e7e6d4b-d487-4074-928c-f181e8214e8c).

We developed login/register page and upload/buy item page based on blockchain.

Our work mainly focus on the usage of blockchain, instead of focusing on the desgination of the frontend.

We use hello-rchain api to interact with rchain blockchain, hello-rchain is the origin repository I forked from, which is based on rchain-toolkit api.



## Prerequisites

### Environment

Our work is based on `node.js v18.18.0` and `Ubuntu 20.04`.

### Deployment

1. This project uses CLOUDINARY as the online image hosting platform, so you need to configure the CLOUDINARY environment before deploying the project.

    First you need to register a CLOUDINARY account [here](https://cloudinary.com).

    In a terminal, set your `CLOUDINARY_URL` environment variable.

    Replace `CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME` with the API environment variable copied from your product environment credentials:

    ```bash
    export CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
    ```

    You can find more details on [CLOUDINARY](https://cloudinary.com/documentation/node_quickstart#4_transform_the_image).

2. Because the project is based on hello-rchain, you need to clone **our** project and config the rchain following the guidance of [hello-rchain](https://github.com/Alice2O3/Hello-RChain).

3. change directory to our project root directory, and install node packages.

    ```bash
    cd ~/Shopping-Cart-RChain-dApp
    npm install
    ```

4. change directory to the bin directory, and install node packages.

    ```bash
    cd bin
    npm install
    ```

## Usage

0. Make sure you have configed the RChain and Cloudinary environment in `Prerequisites Deployment`.

1. change directory to our project root directory.

    ```bash
    cd ~/Shopping-Cart-RChain-dApp
    ```

3. Delete everything in `rnode0` directory, copy everything from folder `rnode0 (override)` to folder `rnode0`.

   Whenever you want to reset the blockchain, just override `rnode0` with `rnode0 (override)`.

4. Start rchain server

    ```bash
    npm run rnode
    ```

5. In another terminal, cd to the `bin` directory of our project.

    ```bash
    cd ~/Shopping-Cart-RChain-dApp/bin
    ``` 
    
6. Start node.js clinent.

    ```bash
    npm run start
    ``` 
   
8. Open your browse and open `localhost:3000` to use our dapp.

## Credits

Login form: [login-form](https://github.com/acmenlei/login-form)

Cart form: [nodejs-shopping-cart](https://github.com/gtsopour/nodejs-shopping-cart)

Hello-RChain: [Hello-RChain](https://github.com/Alice2O3/Hello-RChain)

RChain project: [https://github.com/rchain/rchain](https://github.com/rchain/rchain)

RChain key-pair generator: [https://tgrospic.github.io/rnode-client-js/](https://tgrospic.github.io/rnode-client-js/)

RChain-toolkit (from my knowledge it's the only working RChain api for v0.13.0-alpha3, so great thanks): [https://github.com/fabcotech/rchain-toolkit](https://github.com/fabcotech/rchain-toolkit)
