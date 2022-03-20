# URL Hashing System
[Trello Board](https://trello.com/invite/b/Menl9lh4/f92f996827d20c5b46e6925e73d5f4a0/url-hashing-system)

A system to hash long URLs to make them easy-to-use with mailers and avoid formatting issues.

Release plan defined in [RELEASES.md](./RELEASES.md)

## Tech Stack

- NodeJS with Express
- MongoDB with Mongoose
- NanoID
- React with Vite
- TailwindCSS
- Jotai
- React Query
- Swagger

## Architecture 

### Backend

Since there are no relations required in this application's database, NoSQL database is a better choice, hence I used MongoDB. And for mongoDB, I chose Mongoose to get a bit of structure for our data.

I initially used uuid to generate unique hashes, but those were very long, so I later chose to go with nanoid instead which also ensures unique but small hashes everytime.

For authentication, I used jsonwebtoken with username/password defined in environment variables, since we don't need any actual users for this admin panel.

### Frontend

I chose Vite with React instead of CRA since it's much faster than Webpack builds. For styling, I prefer Tailwind or regular CSS/SCSS modules than CSS-in-JS libraries like Styled-components. 

For state management, I used Jotai, which is a simpler alternative to Context API and doesn't need any Provider wrappers.

React Query is used in the dashboard to fetch list of available hashes, which is cached automatically and can be refetched automatically (on changing window focus) and manually at any time to stay up-to-date. 
