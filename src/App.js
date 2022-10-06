import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import { AppRouter } from "./core/routes/AppRouter";

export function App() {
  return (
    <HelmetProvider>
      <main>
        <Layout>
          <AppRouter />
        </Layout>
      </main>
    </HelmetProvider>
  );
}
