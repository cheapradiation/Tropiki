// Tropiki Stage 9 — unified armor progression layer
// This stage does NOT delete armor sets. It gives the pack one canonical set of
// tags used by recipes/quests later, while preserving each mod's registered items.

ServerEvents.tags('item', event => {
  // Generic progression groups. Add concrete sets here as we verify their IDs.
  event.add('tropiki:armor_progression/early', [
    'minecraft:leather_helmet', 'minecraft:leather_chestplate',
    'minecraft:leather_leggings', 'minecraft:leather_boots',
    'minecraft:chainmail_helmet', 'minecraft:chainmail_chestplate',
    'minecraft:chainmail_leggings', 'minecraft:chainmail_boots',
    'minecraft:golden_helmet', 'minecraft:golden_chestplate',
    'minecraft:golden_leggings', 'minecraft:golden_boots'
  ]);

  event.add('tropiki:armor_progression/mid', [
    'minecraft:iron_helmet', 'minecraft:iron_chestplate',
    'minecraft:iron_leggings', 'minecraft:iron_boots',
    'minecraft:diamond_helmet', 'minecraft:diamond_chestplate',
    'minecraft:diamond_leggings', 'minecraft:diamond_boots'
  ]);

  event.add('tropiki:armor_progression/endgame', [
    'minecraft:netherite_helmet', 'minecraft:netherite_chestplate',
    'minecraft:netherite_leggings', 'minecraft:netherite_boots'
  ]);

  // Keep Elytra separate: Netherite Elytra is the approved final flight item.
  event.add('tropiki:elytra/canonical', [
    'zens_upgraded_netherite:netherite_elytra'
  ]);
});
