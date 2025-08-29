import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import styles from "./App.module.scss";

const App: React.FC = () => (
  <div className={styles.app}>
    <RouterProvider router={router} />
  </div>
);

export default App;
