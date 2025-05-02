import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipesDetail.module.css";
import { Typography, Box, Grid } from "@mui/material";

export default function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://dummyjson.com/recipes/${id}`);
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching details:", error);
            }
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className={styles.recipeDetail}>
            {/* Recipe Title */}
            <Typography variant="h3" className={styles.title}>
                {recipe.name}
            </Typography>

            {/* Recipe Image */}
            <img src={recipe.image} alt={recipe.name} className={styles.recipeImage} />

            {/* Description */}
            {recipe.cuisine && (
                <Box className={styles.infoBox}>
                    <Typography variant="h6">Cuisine: {recipe.cuisine}</Typography>
                    <Typography variant="body1">Difficulty: {recipe.difficulty}</Typography>
                    <Typography variant="body1">Meal Type: {recipe.mealType.join(', ')}</Typography>
                </Box>
            )}

            {/* Prep Time, Cook Time, Servings */}
            <Box className={styles.infoBox}>
                <Typography variant="body1">
                    <strong>Preparation Time:</strong> {recipe.prepTimeMinutes} minutes
                </Typography>
                <Typography variant="body1">
                    <strong>Cooking Time:</strong> {recipe.cookTimeMinutes} minutes
                </Typography>
                <Typography variant="body1">
                    <strong>Servings:</strong> {recipe.servings}
                </Typography>
                <Typography variant="body1">
                    <strong>Calories per Serving:</strong> {recipe.caloriesPerServing}
                </Typography>
            </Box>

            {/* Ingredients */}
            <Typography variant="h5" className={styles.subTitle}>Ingredients:</Typography>
            <ul className={styles.ingredients}>
                {recipe.ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>

            {/* Instructions */}
            <Typography variant="h5" className={styles.subTitle}>Instructions:</Typography>
            <ol className={styles.instructions}>
                {recipe.instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                ))}
            </ol>

            {/* Tags */}
            {recipe.tags && (
                <Box className={styles.tags}>
                    <Typography variant="h6">Tags: </Typography>
                    <Grid container spacing={1}>
                        {recipe.tags.map((tag, i) => (
                            <Grid item key={i}>
                                <Typography variant="body2" className={styles.tag}>
                                    {tag}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {/* Rating and Reviews */}
            <Box className={styles.ratingBox}>
                <Typography variant="body1">
                    <strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)
                </Typography>
            </Box>
        </div>
    );
}
