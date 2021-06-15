# Sharing Is The Key - Personal Portfolio
This is the Strapi Content Management System with MongoDB that Sharing Is The Key is using to produce beautiful JAMStack websites using GatsbyJS and much more.
The infrastructure is set up using Docker and Docker Compose.

## Frontend
With Gatsby, which is one of the most popular and open source JAMStack project, we built a beautiful Personal Portfolio that connects with Strapi for content management.

### Setup Notes

1. All components ready to go (including imports)
2. Use main.css - less imports
3. Limit amount of components - better overview
4. React Icons

[react icons] :https://react-icons.github.io/react-icons/

```javascript
import { FaHome } from "react-icons/fa"
const Component = () => {
  return <FaHome className="icon"></FaHome>
}
```

5. Use constants to avoid repetition.
6. In order to follow along with the video use my backend (url below)

   [strapi backend]:https://github.com/john-smilga/strapi-gatsby-porfolio-2020-api

7. Make sure such content-types exist in your Strapi application. Or replace/delete them in gatsby-config.js

```javascript
{
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000, // Default to 100
        // contentTypes: [`jobs`, `projects`, `blogs`, ],
        //singleTypes:[`about` ]
        contentTypes: [`jobs`, `projects`, `blogs`],
        singleTypes: [`about`],
      },
    },
```

## Backend
With Strapi CMS, which is an open source Headless CMS Front-End Developers love, we provide all necessary content type for the Personal Portfolio developed with Gatsby. Strapi is more than a Node.js Framework and more than a Headless CMS, it saves API development time through a beautiful admin panel anyone can use.

