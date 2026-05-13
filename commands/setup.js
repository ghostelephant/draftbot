const {SlashCommandBuilder, SectionBuilder, MessageFlags, ButtonStyle, TextDisplayBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder} = require("discord.js");
const {getDraft} = require("../utils");

const setup = async interaction => {
  // console.log(interaction.channel);

  await interaction.deferReply();
  await interaction.deleteReply();

  const draft = await getDraft({
    discordGuildId: interaction.guildId,
    discordChannelId: interaction.channelId,
    excludeStatus: ["completed", "abandoned"]
  });

  if(!draft){
    return interaction.channel.send("No draft is currently running in this channel!");
  }

  const rules = [
    {text: "We Do Not Talk About Fight Club"},
    {text: "Rule 2: The first rule of Tautology Club is the first rule of Tautology Club"}
  ];

  // // SEND DRAFT INFO AS SECTION
  // const slots = "**Draft Slots**\nNo slots added yet"

  // const post = new SectionBuilder()
  //   .addTextDisplayComponents(
  //     t => t.setContent(rules.join("\n")),
  //     t => t.setContent(slots)
  //   )
  //   .setButtonAccessory(b =>
  //     b.setCustomId("blarg")
  //       .setLabel("blarg")
  //       .setStyle(ButtonStyle.Primary)
  //   );
  // console.log(post);





  // // SEND DRAFT RULES AS COMPONENTS
  // const components = [];
  // components.push(new TextDisplayBuilder()
  //   .setContent("**Draft Rules**")
  // );

  // rules.forEach((rule, idx) => {
  //   components.push(new TextDisplayBuilder()
  //     .setContent(`${idx + 1}.  ${rule.text}`)
  //   );
  //   components.push(new ActionRowBuilder()
  //     .addComponents(new ButtonBuilder()
  //       .setCustomId(`edit-${idx}`)
  //       .setLabel("Edit Rule")
  //       .setStyle(ButtonStyle.Primary)
  //     )
  //     .addComponents(new ButtonBuilder()
  //       .setCustomId(`delete-${idx}`)
  //       .setLabel("Delete Rule")
  //       .setStyle(ButtonStyle.Danger)
  //     )
  //   );
  // });
  // console.log(components);

  // interaction.channel.send({
  //   components,
  //   flags: MessageFlags.IsComponentsV2
  // });



  // SEND DRAFT INFO AS EMBED
  const embed = {
    color: interaction.client.embedColor,
    title: draft.name,
    description: "test"
  };

  const actionRow = new ActionRowBuilder()
    .addComponents(new ButtonBuilder()
      .setCustomId("edit-rule")
      .setLabel("Edit a Rule")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true)
    )
    .addComponents(new ButtonBuilder()
      .setCustomId("delete-rule")
      .setLabel("Delete a Rule")
      .setStyle(ButtonStyle.Danger)
    );

  interaction.channel.send({
    embeds: [embed],
    components: [actionRow]
  })
    .catch(e => console.log(e.rawError.errors.embeds[0].color._errors));

};

const data = new SlashCommandBuilder()
  .setName("setup")
  .setDescription("View or edit draft options and fields");

module.exports = {
  data,
  run: setup
};