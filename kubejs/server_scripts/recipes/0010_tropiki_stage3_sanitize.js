// Tropiki Stage 3: clean known broken recipe IDs and keep Stage 2 rules.
// This is safe to load alongside Stage 2, but is self-contained for the cleanup layer.
ServerEvents.recipes(function (event) {
  var broken = [
    'tf_dnv:composter',
    'tf_dnv:mycologist_table',
    'tf_dnv:mushgloom_torch',
    'tf_dnv:alchemy_table',
    'tf_dnv:lumber_table',
    'tf_dnv:butcher_table',
    'compatdelight:tropicraftdelight/coconut_milk',
    'compatdelight:cavebiomesdelight/icicle_knife',
    'compatdelight:cavebiomesdelight/glazed_frost_lily'
  ];
  for (var i = 0; i < broken.length; i++) event.remove({ id: broken[i] });

  // Known malformed output/ingredient cases reported by the recipe manager.
  event.remove({ id: 'ironfurnaces:smelting/iron_furnace' });
  event.remove({ id: 'ironfurnaces:crafting/iron_furnace' });
});
