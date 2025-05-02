import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import styles from "./App.module.css";
import Recipes from "./components/Recipes/Recipes";
import RecipeDetail from "./components/RecipesDetail/RecipesDetail";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function app() {
return <ThemeProvider theme={theme}>
    <BrowserRouter>
    <div className={styles.app}>
      <nav className={styles.navbar}>
        <Link to="/">Home</Link>
      </nav>
    
    <div className={styles.container}>
    <Routes>
      <Route path="/" element={<Recipes />}/>
      <Route path="/recipe/:id" element={<RecipeDetail />}/>
    </Routes>
    </div>
    </div>
    </BrowserRouter>
    </ThemeProvider>

}

