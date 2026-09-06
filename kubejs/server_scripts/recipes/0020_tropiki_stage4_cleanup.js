// Tropiki Stage 4: remove the exact recipe IDs still failing after Stage 3.
// This complements the data overrides in kubejs/data.
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
    'compatdelight:cavebiomesdelight/glazed_frost_lily',
    'ironfurnaces:upgrades/upgrade_unobtainium',
    'ironfurnaces:upgrades/upgrade_vibranium',
    'croptopia:oatmeal',
    'farmersdelight:wheat_dought_from_water_and_flour'
  ];
  for (var i = 0; i < broken.length; i++) event.remove({ id: broken[i] });
});
