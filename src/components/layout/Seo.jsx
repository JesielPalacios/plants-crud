import { Helmet } from 'react-helmet-async'

export const Seo = ({ title, subtitle }) => {
  return (
    <Helmet data-rh="true">
      {title && <title>{title} | Warehouse Receipts</title>}
      {subtitle && <meta name="description" content={subtitle} />}
    </Helmet>
  )
}
