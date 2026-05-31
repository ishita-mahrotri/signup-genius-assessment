import { useState } from "react";
import { TopNav, type Page } from "./components/TopNav/TopNav";
import { ComponentsPage } from "./pages/ComponentsPage/ComponentsPage";
import { DemoPage } from "./pages/DemoPage/DemoPage";
import { DocumentationPage } from "./pages/DocumentationPage/DocumentationPage";
import styles from "./App.module.css";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("components");

  return (
    <div className={styles.shell}>
      <TopNav currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className={styles.content}>
        {currentPage === "components" && <ComponentsPage />}
        {currentPage === "demo" && <DemoPage />}
        {currentPage === "documentation" && <DocumentationPage />}
      </main>
    </div>
  );
}

export default App;
