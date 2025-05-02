import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Button, Grid, Typography, Select, MenuItem, Box,} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import styles from "./Recipes.module.css";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState({});
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const navigate = useNavigate();

  // Load liked recipes from localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem("likedRecipes");
    if (storedLikes) {
      setLikedRecipes(JSON.parse(storedLikes));
    }
  }, []);

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://dummyjson.com/recipes");
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const toggleLike = (id) => {
    setLikedRecipes((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("likedRecipes", JSON.stringify(updated));
      return updated;
    });
  };

  // Extract unique cuisines
  const cuisines = ["All", ...new Set(recipes.map((r) => r.cuisine))];

  // Apply cuisine filter
  const filteredRecipes =
    cuisineFilter === "All"
      ? recipes
      : recipes.filter((r) => r.cuisine === cuisineFilter);

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" mb={3}>
        Recipes
      </Typography>

      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Select
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {cuisines.map((type, i) => (
            <MenuItem key={i} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        className={styles.gridContainer}
      >
        {filteredRecipes.map((recipe) => (
          <Grid size={3} item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
            <Card className={styles.card}>
              <div className={styles.likeButton}>
                <Button onClick={() => toggleLike(recipe.id)} color="secondary">
                  {likedRecipes[recipe.id] ? <Favorite /> : <FavoriteBorder />}
                </Button>
              </div>
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.name}
                className={styles.cardMedia}
              />
              <CardContent className={styles.cardContent}>
                <Typography
                  className={styles.title}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                    fontFamily: '"Georgia", serif',
                  }}
                >
                  {recipe.name}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                View Recipe
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
