// Tropiki Stage 8 — Netherite progression cleanup
// Keeps Advanced Netherite as the primary progression layer.
// Easy Netherite is intentionally left alone.
// ZEN's Upgraded Netherite keeps only the seven approved items;
// Stage 2 is responsible for the broader ZEN recipe cleanup.

ServerEvents.recipes(event => {
  const remove = [
    // Known non-primary Netherite material progression recipes from common addons.
    // We only target explicit ZEN upgraded-material recipes when present.
    'zens_upgraded_netherite:fluorisite_elytra',
    'zens_upgraded_netherite:singularite_elytra',
    'zens_upgraded_netherite:amberite_elytra',
    'zens_upgraded_netherite:sapphenite_elytra',
    'zens_upgraded_netherite:emeraldite_elytra',
    'zens_upgraded_netherite:topazite_elytra',
    'zens_upgraded_netherite:onyxerite_elytra',
    'zens_upgraded_netherite:rubycite_elytra'
  ];

  remove.forEach(id => event.remove({ id: id }));
});
