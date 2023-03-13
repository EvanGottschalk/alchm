import DiscordMessager from "./DiscordMessager";

export default { midjournize }

async function midjournize (alchemy) {
    
    var prompt_sections = {};
    var prompt = '/imagine ';
    // Code to generate prompt
    prompt += 'a heroic knight facing camera wielding a hammer with stars and suns carved in his armor and planets and stars and the night sky in the gackground, photorealistic, dramatic'
    DiscordMessager.sendMessage('default', prompt);
}