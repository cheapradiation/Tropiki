// Tropiki Stage 5 — JEI cleanup
// Quark 4.1-482 currently exposes an invalid Matrix Influencing JEI entry
// which throws NoSuchElementException inside Quark's InfluenceEntry.
// Hide the entire broken category from recipe viewers.

RecipeViewerEvents.removeCategories(event => {
  event.remove('quark:influence')
})
