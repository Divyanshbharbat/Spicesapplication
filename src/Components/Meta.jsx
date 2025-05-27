// Components/Meta.jsx
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Add Open Graph for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index, follow" />
      <meta charSet="utf-8" />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: "Spice Shop | Buy Organic Spices Online",
  description: "Best quality organic spices at affordable prices. Order online now!",
  keywords: "spices, organic spices, turmeric, masala, spice shop"
}

export default Meta
