# RAGMan frontend

## About

RAGMan frontend is a fork of [ChatBot-UI](https://github.com/mckaywrigley/chatbot-ui) at around Nov 8, 2023, which is further developed by the Mondego group at UC Irvine. Our project is a true fork, in the sense that it does not follow ChatBot-UI any longer. Our UI aims to be feature poor and very simple. Unlike the original ChatBot-UI, RAGMan frontend requires a second web app, RAGMan-backend, to work. All the fancy intelligent actions are done in RAGMan-backend.

![RAGMan frontend](./public/screenshots/screenshot-0402023.jpg)


## Running Locally

NOTE: requires NodeJS version 18 or above.

**1. Clone Repo**

```bash
git clone https://github.com/Mondego/ragman-frontend.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Provide OpenAI API Key**

Create a .env.local file in the root of the repo with your OpenAI API Key: (This step is unnecessary, because we call openai API from backend, but you can set the key to make sure the frontend is running)

```bash
OPENAI_API_KEY=YOUR_KEY
```

> You can set `OPENAI_API_HOST` where access to the official OpenAI host is restricted or unavailable, allowing users to configure an alternative host for their specific needs.

> Additionally, if you have multiple OpenAI Organizations, you can set `OPENAI_ORGANIZATION` to specify one.


**4. Configure OAuth and Database Variables**

In the .env.local file created in Step 3, add the following variables for OAuth authentication and database configuration:

```bash
# GitHub OAuth Credentials
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET

# Google OAuth Credentials
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# Required for NextAuth.js to sign and verify authentication tokens
AUTH_SECRET=YOUR_AUTH_SECRET

# Path to your SQLite database
DATABASE_PATH=SQLITE_DATABASE_PATH

```

* Replace YOUR_GITHUB_CLIENT_ID and YOUR_GITHUB_CLIENT_SECRET with your GitHub OAuth credentials.
* Replace YOUR_GOOGLE_CLIENT_ID and YOUR_GOOGLE_CLIENT_SECRET with your Google OAuth credentials.
* Set AUTH_SECRET to any secure string of your choice, which will be used to sign and verify authentication tokens.
* Ensure DATABASE_PATH correctly points to your SQLite database file.

**5. Run App**

* run locally
    ```bash
    npm run dev
    ```

* use this command for server running
    ```bash
    npm run dev -- -p 3333
    ```


**6. Use It**

You should be able to start chatting.

## Configuration

When deploying the application, the following environment variables can be set:

| Environment Variable              | Default value                  | Description                                                                                                                               |
| --------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| RAGMAN_BACKEND_HOST               |   http://localhost:5000        | The url for the server                                             |
| RAGMAN_API_KEY                    |   123                          | Eventually, we'll implement this...                                |
| NEXT_PUBLIC_NAME                  |                                | The user-facing name of the app                                    |
| NEXT_PUBLIC_MAX_LENGTH            |   1000                         | The maximum number of characters the user can send in a message                                |
| NEXT_PUBLIC_COMMENT_MAX_LENGTH            |   1000                         | The maximum number of characters the user can enter in a comment                                |


## Contact

If you have any questions, feel free to reach out to Iris Ma on [Iris Ma](mailto:huaiyaom@uci.edu).

