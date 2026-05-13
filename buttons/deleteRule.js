const deleteRule = async interaction => {
  // console.log(interaction);
  interaction.message.components[0].components.forEach(button => button.data.disabled = true);
  console.log("hello");

  console.log(interaction.message.embeds[0]);
  
  await interaction.update({
    embeds: interaction.message.embeds,
    components: interaction.message.components
  });
};

module.exports = {
  run: deleteRule
};