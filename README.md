This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Main Information
SOXO TODO App - Recruitment task to test your knowledge and skills as a Frontend developer.
The application was written in accordance with the Feature-First Architecture, as the aim of our task was to rely on a modular architecture and the task was limited to a single feature (todo list).

### Technologies:
- Node v20.18.0
- Next.js v15.3
- Material UI + tailwind css
- docker
- jest 
- playwright

### Starting the server:

```bash
npm install

# development mode
npm run dev 

#build production mode
npm run build
npm run start 

#run docker image
npm run docker:build
npm run docker:run

#run tests
npm run test
npm run test:e2e
npx playwright install #You may need to install the package globally
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

