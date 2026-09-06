// Tropiki Stage 7 — material identity unification
// Minecraft 1.21.1 / NeoForge 21.1.249 / KubeJS 2101.7.2-build.374
//
// Conservative layer: only canonical vanilla materials are unified here.
// Dimension-specific materials (Aether/Twilight/Tropicraft) are NOT treated as duplicates.

const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');

function exists(id) {
  try { return BuiltInRegistries.ITEM.containsKey(ResourceLocation.parse(id)); }
  catch (e) { return false; }
}

function present(ids) {
  return ids.filter(exists);
}

const families = {
  iron: {
    tag: 'tropiki:materials/iron_ingot',
    canonical: 'minecraft:iron_ingot',
    aliases: [
      'minecraft:iron_ingot'
    ]
  },
  gold: {
    tag: 'tropiki:materials/gold_ingot',
    canonical: 'minecraft:gold_ingot',
    aliases: [
      'minecraft:gold_ingot'
    ]
  },
  copper: {
    tag: 'tropiki:materials/copper_ingot',
    canonical: 'minecraft:copper_ingot'
  },
  diamond: {
    tag: 'tropiki:materials/diamond',
    canonical: 'minecraft:diamond'
  },
  emerald: {
    tag: 'tropiki:materials/emerald',
    canonical: 'minecraft:emerald'
  },
  lapis: {
    tag: 'tropiki:materials/lapis_lazuli',
    canonical: 'minecraft:lapis_lazuli'
  },
  redstone: {
    tag: 'tropiki:materials/redstone',
    canonical: 'minecraft:redstone'
  },
  quartz: {
    tag: 'tropiki:materials/quartz',
    canonical: 'minecraft:quartz'
  }
};

ServerEvents.tags('item', event => {
  Object.values(families).forEach(f => {
    const ids = present([f.canonical].concat(f.aliases || []));
    if (ids.length) event.add(f.tag, ids);
  });

  // Explicit coal family. Stage 2 already redirects recipe inputs to minecraft:coals.
  event.add('tropiki:materials/coal_fuel', ['minecraft:coal', 'minecraft:charcoal']);
});

ServerEvents.recipes(event => {
  // Make common vanilla material recipe inputs accept the Tropiki family tag.
  Object.values(families).forEach(f => {
    const ids = present([f.canonical].concat(f.aliases || []));
    if (!ids.length) return;
    ids.forEach(id => {
      event.replaceInput({ input: id }, id, `#${f.tag}`);
    });
  });

  // Keep the two separate fuel items interchangeable without inventing new outputs.
  event.replaceInput({ input: 'minecraft:coal' }, 'minecraft:coal', '#tropiki:materials/coal_fuel');
  event.replaceInput({ input: 'minecraft:charcoal' }, 'minecraft:charcoal', '#tropiki:materials/coal_fuel');

  console.info('[Tropiki] Stage 7 material identity layer complete.');
});
