import React, { Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { GlobalStyle } from '../../components/layout/GlobalStyle'

const Products = React.lazy(() => import('../../components/ProductsList'))

export const AppRouter = () => {
  return (
    <Suspense fallback="Loading...">
      <GlobalStyle />

      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </Suspense>
  );
}
