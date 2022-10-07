import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { GlobalStyle } from '../../components/layout/GlobalStyle'
import { Layout } from '../../components/layout/Layout'

const PlantsList = React.lazy(() => import('../../components/PlantsList'))
const Plant = React.lazy(() => import('../../components/Plant'))
const PlantAddOrEdit = React.lazy(() =>
  import('../../components/PlantAddOrEdit')
)

export const AppRouter = () => {
  return (
    <Suspense fallback="Loading...">
      <GlobalStyle />

      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate replace to="/plants" />} />
            <Route path="/plants">
              <Route index element={<PlantsList />} />
              <Route
                path="new"
                element={<PlantAddOrEdit title="Create new plant" />}
              />
            </Route>
            <Route path="plant/:plantId">
              <Route index element={<Plant />} />
              <Route
                path="edit"
                element={<PlantAddOrEdit title="Edit plant" />}
              />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </Suspense>
  )
}
