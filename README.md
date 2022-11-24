# POSH Coding Challenge

Instructions for the assignment can be found [here](https://poshgroup.notion.site/POSH-Take-Home-Coding-Challenge-9e0934388c9b4c808cd9c320c37b31e1).

## Running the App Locally

1. Clone this repo
2. Configure your environment variables in `.env`, including
   - PORT, HOST, MONGO_IP, and URI
     > Note: your 'MONGO_IP' should be whatever the public IP for your machine has been currently assigned. If you try to connect this server to Mongo Atlas and receive a 'connection refused' error, make sure that your current IP is white-listed in Monogo Atlas's [Add IP Access List Entries](https://www.mongodb.com/docs/atlas/#add-ip-access-list-entries) (check 'Secure your Database' tab, mid-way down on the page)
3. (In the root of the project) Run `yarn install` to install server modules
4. Run `yarn start-dev` to start your server
5. Navigate to the `client` folder of the project
6. Run `yarn install` to install the necessary client modules
7. Run `yarn start` to load the "starter" React App in your browser

From here, you should effort to achieve the various goals stipulated in the assignment's instructions.
