# Pulso Feature Challenge

PulsoAI is a fitness and healthcare application for tracking progress and improving one self.

It leverages AI for a couple of features, mainly the chatbot "Morfeo" and the ability to extract diatary information of different foods by simply taking a picture of it.

In this small self challenge I implemented a feature by which the chatbot has knowledge of the available recipes and can suggest the user some of them.

This is achieved by leveraging RAG:

- First a vector database is created (using the extension of postgres pgvector) and then some vectors are populated with embeddings created from the recipes catalog.

- Then, when the user makes a query to this chatbot the query is embedded and compared by cosine distance in the vector database. The result of this is that we now have the data of the closest recipes, semantically speaking, to the query of the user. This is then appended to the query sent to the LLM, which completes the RAG proccess.

- If the LLM decides that the query and the provided recipes make sense it will generate a response recommending one of said recipes. The code uses Server Side Events (SSE) to then stream the data to the front end to get instant feedback from the generation, and not wait for the complete response generation.

- Since the streamed response are chunks of a JSON string the frontend uses a library called "partial-json" to parse the intermidiate results. Finally a small component is appended in the chat that links direcly to the recipe.

# How to run the project locally

1. Download the full monorepo.

2. Install the necessary dependencies at the root of the monorepo.

```
npm run install
```

3. Run the Docker container that has the database.

```
docker compose up --detach
```

4. Create the .env files, rename the .env.local files and is is okay to use the default variables, the only one necessary to change is the OPENAI_API_KEY

5. Seed the database, go to the api directory and run the command:

```
npm run seed:db
```

6. Create the embeddings of the data from the database, go to the api directory and run the command:

```
npm run generate:embeddings
```

7. Run both the api and the expo app, go to the root of the repository and simply run:

```
npm run dev
```

# Following improvements the project could have

It would be very helpful to make a package to introduce type safety between the frontend and the backend. This is pretty straight forward thanks to the monorepo set up.

Dockerize both applications.
