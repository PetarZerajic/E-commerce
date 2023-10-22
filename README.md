# Strapi Starter Typescript,Sass and Strapi

note:This project was started with love and passion for programming.
![demo-site](https://www.loom.com/share/58702124a8d74d90a03bb807787596e6?sid=49f3c515-0700-4e48-b1c7-780a4b1cf9e1)

## Getting Started

1. Clone the repository locally:

```bash
  git clone https://github.com/PetarZerajic/E-commerce.git
```

2. Run `install` command to install Client and Server dependencies:

```bash
  npm install
```

3. Next, navigate to your `/Server` directory and set up your `.env` file. You can use the `.env.example` file as reference:

```bash
HOST=localhost
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
```

4. Start your project by running the following command:

```bash
  npm run build
  npm run develop
```

You will be prompted to create your first admin user.

![admin-user](https://user-images.githubusercontent.com/6153188/231865420-5f03a90f-b893-4057-9634-9632920a7d97.gif)

Great. You now have your project running. Let's add some data.

## Seeding The Data

We are going to use our DEITS feature which will alow to easily import data into your project.

You can learn more about it in our documentation [here](https://docs.strapi.io/dev-docs/data-management).

In the root of our project we have our `export-data.tar.gz` file. We will use it to seed our data.

1. Open up your terminal and make sure you are still in you `Server` folder.

2. Run the following command to seed your data:

```bash
  npm run strapi import -- -f export-data.tar.gz
```

This will import your data locally. Log back into your admin panel to see the newly imported data.

## Setting Up The Client

Next we need to switch to our `/Client` directory and create our `.env` file and paste in the following.

```bash
REACT_APP_API_TOKEN=your-api-token
REACT_APP_API_URL=http://localhost:1337/api
REACT_APP_UPLOAD_URL=http://localhost:1337

```

Before starting our React app we need to go inside our Strapi Admin and create token that we will be using for displaying our **content**.

Inside your Strapi Admin Panel navigate to Settings -> API Tokens and click on the `Create new API Token`.

![api-tokens](https://user-images.githubusercontent.com/6153188/231865572-cebc5538-374c-4050-91cd-c303fae25a3d.png)

Here are our Token Settings

Name: **Token**.
Description: Access to public content.
Token duration: Unlimited
Token type: Custom

In Permissions lets give the following access.

| Content      |   Permissions    |
| ------------ | :--------------: |
| Category     | find and findOne |
| Order        |                  |
| Product      | find and findOne |
| Review       |                  |
| Sub-Category | find and findOne |

Once you have your token add it to your `REACT_APP_API_TOKEN` variable name in the `.env` file.

**One more thing:**

When you're done with the token, it's important to make a modification to display the product rating stars.

Inside your Strapi Admin Panel navigate to Settings -> USERS AND PERMISSIONS PLUGIN and click on the `Roles` go to `Authenticated`.

In Permissions lets give the following access.

| Content |       Permissions        |
| ------- | :----------------------: |
| Review  | create, find and findOne |

Save the changes.

You should now see your React frontend .

## Start Both Projects

In the project directory, you can run:

**Client:** `npm start`.
**Server:** `npm run start or npm run develop`.

## Conclusion

Hope you find this starter useful, it is a bare-bone example to help you get started quickly.

If you find bugs or have suggestions feel free to create issues.

Thank you and stay awesome.
