import { HelmetProvider } from 'react-helmet-async'
import { AppRouter } from './core/routes/AppRouter'

export function App() {
  return (
    <HelmetProvider>
      <main>
        <AppRouter />
      </main>
    </HelmetProvider>
  )
}
