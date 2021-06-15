import React from "react"
import Title from "./Title"
import { FaCode, FaSketch, FaAndroid, FaDatabase, FaKey,  FaPlug   } from "react-icons/fa"
import { graphql } from "gatsby"
import services from "../constants/services"

// const Services = ({
//   data: {
//     allStrapiService: { nodes: services },
//   },
// }) => {
//   return (
//     <section className="section bg-grey">
//       <Title title="services" />
//       <div className="section-center services-center">
//         {services.map(service => {
//           const { order, FontAwesome, title, description } = service
//           // let icon = `<${FontAwesome} className="service-icon" />`
//           return (
//             <article key={order} className="service">
//               {/* {icon} */}
//               <h4>{title}</h4>
//               <div className="underline"></div>
//               <p>{description}</p>
//             </article>
//           )
//         })}
//       </div>
//     </section>
//   )
// }

const Services = () => {
  return (
    <section className="section bg-grey">
      <Title title="services" />
      <div className="section-center services-center">
        {services.map(service => {
          const { id, icon, title, text } = service
          return (
            <article key={id} className="service">
              {icon}
              <h4>{title}</h4>
              <div className="underline"></div>
              <p>{text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

// export const query = graphql`
// {
//   allStrapiService(sort: {order: ASC, fields: order}) {
//     nodes {
//       FontAwesome
//       description
//       order
//       title
//     }
//   }
// }
// `
export default Services
