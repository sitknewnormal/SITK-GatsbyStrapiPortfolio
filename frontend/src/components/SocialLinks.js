import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Icon from "./FontAwesome"

const SocialLinks = ({isSideBar}) => {
  const data = useStaticQuery(query)
  const {
    allStrapiSocialmedia: { nodes: socialmedias },
  } = data
//   console.log(`isSideBar: ${JSON.stringify(isSideBar)}`);
  return (
    <React.Fragment>
        {socialmedias.map(socialmedia => {
            const { url, FontAwesome, id } = socialmedia
            let result = isSideBar ? 
                <li key={id}> 
                    <a href={url} className="social-link"> 
                        <Icon iconName={FontAwesome} className="social-icon"/> 
                    </a> 
                </li> 
                : 
                <a key={id} href={url} className="social-link"> 
                    <Icon iconName={FontAwesome} className="social-icon"/> 
                </a>
            return (
                <React.Fragment>
                    {result}
                </React.Fragment>
            )
        })}
    </React.Fragment>
  )
}

export const query = graphql`
  {
    allStrapiSocialmedia(sort: {order: ASC, fields: order}) {
      nodes {
        id
        FontAwesome
        url
        order
      }
    }
  }
`

export default SocialLinks
