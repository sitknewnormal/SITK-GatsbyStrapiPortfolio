import React from "react"
import Title from "./Title"
import { useStaticQuery, graphql } from "gatsby"
import Icon from "./FontAwesome"

const Services = () => {
  const data = useStaticQuery(query)
  const {
    allStrapiService: { nodes: services },
  } = data
  return (
    <section className="section bg-grey">
      <Title title="services" />
      <div className="section-center services-center">
        {services.map(service => {
          const { order, FontAwesome, title, description } = service
        return (
            <article key={order} className="service">
              <Icon iconName={FontAwesome} className="service-icon" />
              <h4>{title}</h4>
              <div className="underline"></div>
              <p>{description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export const query = graphql`
  {
    allStrapiService(sort: {order: ASC, fields: order}) {
      nodes {
        FontAwesome
        description
        order
        title
      }
    }
  }
`

export default Services
