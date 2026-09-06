// Tropiki Stage 6 — food identity unification
// Minecraft 1.21.1 / NeoForge 21.1.249 / KubeJS 2101.7.2-build.374
//
// Goal:
//  * one canonical identity for exact semantic duplicates;
//  * recipes accept every known equivalent through Tropiki tags;
//  * alias items stop generating duplicate craft outputs;
//  * aliases remain obtainable through 1:1 conversion so existing worlds are not broken;
//  * crop/seed identity stays with Unified Crops rather than inventing a second crop system.

const TropikiBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const TropikiResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');

function tropikiItemExists(id) {
  try {
    const rl = TropikiResourceLocation.parse(id);
    return TropikiBuiltInRegistries.ITEM.containsKey(rl);
  } catch (e) {
    return false;
  }
}

function tropikiExisting(ids) {
  return ids.filter(tropikiItemExists);
}

function tropikiCanonicalFood(event, key, canonical, aliases) {
  const candidates = tropikiExisting([canonical].concat(aliases));
  if (candidates.length < 2) return;

  // Canonical is explicit for true duplicates; this keeps progression stable and predictable.
  const actualCanonical = tropikiItemExists(canonical) ? canonical : candidates[0];
  const actualAliases = candidates.filter(id => id !== actualCanonical);

  const tagId = `tropiki:food/${key}`;
  event.add(tagId, actualCanonical);
  actualAliases.forEach(id => event.add(tagId, id));

  // All recipes asking for an alias now accept the complete semantic family.
  actualAliases.forEach(alias => {
    event.replaceInput({ input: alias }, alias, `#${tagId}`);

    // Do not let the alias keep its own duplicated recipe chain.
    event.remove({ output: alias });

    // 1:1 migration path for existing/obtained aliases.
    event.shapeless(actualCanonical, [alias]).id(`kubejs:tropiki_food_alias/${key}/${alias.split(':')[1]}`);
  });
}

ServerEvents.tags('item', event => {
  // Exact semantic duplicates already verified in this pack.
  // Vanilla is the stable canonical identity where it exists.
  tropikiCanonicalFood(event, 'carrot', 'minecraft:carrot', [
    'croptopia:carrot',
    'pamhc2crops:carrot'
  ]);
  tropikiCanonicalFood(event, 'potato', 'minecraft:potato', [
    'croptopia:potato',
    'pamhc2crops:potato'
  ]);
  tropikiCanonicalFood(event, 'beetroot', 'minecraft:beetroot', [
    'croptopia:beetroot',
    'pamhc2crops:beetroot'
  ]);
  tropikiCanonicalFood(event, 'apple', 'minecraft:apple', [
    'croptopia:apple'
  ]);
  tropikiCanonicalFood(event, 'sugar', 'minecraft:sugar', [
    'pamhc2crops:sugar'
  ]);
  tropikiCanonicalFood(event, 'cocoa_beans', 'minecraft:cocoa_beans', [
    'pamhc2crops:cocoa_beans'
  ]);

  // Crop/seed identity bridge for names explicitly present in the current Unified Crops map.
  // We only create tags for IDs that actually exist, so missing optional crops are harmless.
  const cropGroups = {
    cabbage: ['croptopia:cabbage', 'pamhc2crops:cabbage', 'pamhc2crops:cabbageseed'],
    flax: ['croptopia:flax', 'pamhc2crops:flax', 'pamhc2crops:flaxseed'],
    onion: ['croptopia:onion', 'pamhc2crops:onion'],
    rice: ['croptopia:rice', 'pamhc2crops:rice'],
    tomato: ['croptopia:tomato', 'pamhc2crops:tomato', 'pamhc2crops:tomatoseed']
  };

  Object.entries(cropGroups).forEach(([name, ids]) => {
    const present = tropikiExisting(ids);
    if (present.length >= 2) {
      event.add(`tropiki:crops/${name}`, present);
    }
  });
});

ServerEvents.recipes(event => {
  // Mirror the semantic food families in recipe inputs without changing unique dishes.
  const groups = {
    carrot: ['minecraft:carrot', 'croptopia:carrot', 'pamhc2crops:carrot'],
    potato: ['minecraft:potato', 'croptopia:potato', 'pamhc2crops:potato'],
    beetroot: ['minecraft:beetroot', 'croptopia:beetroot', 'pamhc2crops:beetroot'],
    apple: ['minecraft:apple', 'croptopia:apple'],
    sugar: ['minecraft:sugar', 'pamhc2crops:sugar'],
    cocoa_beans: ['minecraft:cocoa_beans', 'pamhc2crops:cocoa_beans']
  };

  Object.entries(groups).forEach(([key, ids]) => {
    const present = tropikiExisting(ids);
    if (present.length < 2) return;
    const canonical = present.indexOf(ids[0]) >= 0 ? ids[0] : present[0];
    present.filter(id => id !== canonical).forEach(alias => {
      event.replaceInput({ input: alias }, alias, `#tropiki:food/${key}`);
      event.remove({ output: alias });
      event.shapeless(canonical, [alias]).id(`kubejs:tropiki_food_alias/${key}/${alias.split(':')[1]}`);
    });
  });

  // Keep coal/charcoal handled by the earlier canonical material layer.
  console.info('[Tropiki] Stage 6 food identity unification complete.');
});
