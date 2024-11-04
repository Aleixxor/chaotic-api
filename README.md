# Chaotic Trading Card Game API

This project serves as an API solution for aggregating card data related to the Chaotic Trading Card Game.

## Overview

- Provides endpoints to access information about attacks, battlegear, cards, creatures, locations, and mugic related to the game.
- Centralized repository of Chaotic Trading Card Game assets and data.
- Makes it easier for developers or enthusiasts to access and utilize card data for various purposes.
- Is based on the project with mongodb of @unitehenry: https://github.com/unitehenry/chaotic-api.git

## Technologies Used

- Node.js
- Express.js
- TypeScript

## Project Structure

```
chaotic-api/
├── src/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── cards.ts
│   │   │   ├── creatures.ts
│   │   │   ├── attacks.ts
│   │   │   ├── battlegear.ts
│   │   │   ├── locations.ts
│   │   │   └── mugic.ts
│   │   └── server.ts
│   ├── assets/
│   ├── db/
│   ├── utils/
│   └── index.ts
├── dist/
├── tsconfig.json
└── package.json
```

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/Aleixxor/chaotic-api.git
   ```

2. Navigate to the project directory:

   ```
   cd chaotic-api
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the server:
   ```
   npm run serve
   ```

## Usage

Once the server is running, you can access the API endpoints:

- Cards: `GET /api/cards`
- Creatures: `GET /api/creatures`
- Attacks: `GET /api/attacks`
- Battlegear: `GET /api/battlegear`
- Locations: `GET /api/locations`
- Mugics: `GET /api/mugics`

Additionally, you can retrieve card images:

- `GET /api/images/:set/:id`

Replace `:set` with the card set name and `:id` with the card ID.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

