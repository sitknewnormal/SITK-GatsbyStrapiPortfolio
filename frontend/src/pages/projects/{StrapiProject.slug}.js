import React from "react"
import { graphql } from "gatsby"
import Seo from "../../components/Seo"
const ProjectTemplate = ({ pageContext: { slug }, data }) => {
  return (
    <>
      <Seo
        title={data.strapiProject.title.toUpperCase()}
        description={data.strapiProject.description}
        image={data.strapiProject.image.publicURL}
      />
      <main className="project-template-page">
        <h2>{data.strapiProject.title}</h2>
        <p>{data.strapiProject.description}</p>
      </main>
    </>
  )
}

export const query = graphql`
  query getSingleProject($slug: String) {
    strapiProject(slug: { eq: $slug }) {
      description
      title
      slug
      image {
        publicURL
      }
    }
  }
`

export default ProjectTemplate
