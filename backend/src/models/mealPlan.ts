interface MealPlan {
  id: string; // Unique identifier for the MealPlan, auto-incremented.
  date: Date; // The date and time of the meal.
  mealType: string; // Type of meal (e.g., breakfast, lunch, dinner).
  description: string; // Description of the meal.
  userId: number; // Foreign key linking to the User's id.
}
