# BIKE API

## Project Description
The bike api fetches data from an external api [Bike Index](https://bikeindex.org) API. The api displays the bike list on a table.

- Also you can view the bike api account profile which is using auth token to fetch account data.

## Author
Nathan Mbicho

## Setup Instructions
1. Clone this repository to your local machine
``
git clone git@github.com:thespider911/thespider911.github.io.git
``
2. Navigate to the project directory `api-project`
3. Install node modules using  `npm install`
4. Start server by running `npm run dev`
5. Once the server is running open `your_path/public/index.html`

## Technologies Used
- HTML
- CSS
- JavaScript - ( express, fetch api, async, wait, cors, dotenv )

## Features
- Click `All Bikes` button and it will list bikes data on a table
- Click `My Profile` button and my bikes account details will show.
*This might fail if my auth token has expired*

## License
Theis project is open-sourced software licensed under the [MIT license](https://opensource.org/license/MIT).
