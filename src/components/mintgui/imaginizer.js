//To fix:
//1. 

import {callAPI} from './call-api.js';

export default { imaginize, generateDALLEprompt, generateMidjourneyPrompt, generateImageFromPrompt }



// Prompt Composition
// 
// Here is the full structure of a prompt. Each separate section is contained in brackets:
//
// [/imagine] [head and shoulders portrait of a] [GENDER_INPUT] [SUN_SIGN_CHARACTER_DESCRIPTION] [in the center of the image] 
// [, DOMINANT_ELEMENT aura][::10] [SUN_SIGN sign][::10] [fire::TOTAL_FIRE] [water::TOTAL_WATER] [air::TOTAL_AIR] [earth::TOTAL_EARTH]
// 
// Here is a breakdown of each:
//
// 0. [/imagine] : initializes the prompt.
//
// 1. [head and shoulders portrait of a]


//////// Midjourney Prompt Dictionaries

// Prompt Weights
const weights_dict = {'Initial Description': 10,
                      'Sun Sign Description': 10};



// Sun Sign Character Dict
const character_dict = {'Aries': "with a goat's head", //tested - works well
                        'Taurus': "with a bull's head", //tested - works well
                        'Gemini': 'a pair of twins', //UNTESTED
                        'Cancer': 'with crab claws', //tested a bit - worked well so far
                        'Leo': "with a lion's head", //tested - works well
                        'Virgo': 'young innocent girl', //UNTESTED
                        'Libra': 'paladin in armor', //UNTESTED
                        'Scorpio': "with scorpion claws", //tested - works ok. Better than tail. Could be improved
                        'Sagittarius': 'centaur with a bow and arrow', //UNTESTED
                        'Capricorn': 'humanoid sea goat person', //UNTESTED
                        'Aquarius': 'person pouring a large jug of water', //UNTESTED
                        'Pisces': 'humanoid fish person'}; //UNTESTED


// Gender Dict
const gender_dict = {'Male': 'a man',
                     'Female': 'a woman',
                     'Other': 'a person'};










//////// DALL-E Prompt Dictionaries

const modality_dict = {'Cardinal': {'Male': 'hero',
                                    'Female': 'female hero',
                                    'Other': 'hero'},
                       'Fixed': {'Male': 'warrior',
                                 'Female': 'female warrior',
                                 'Other': 'warrior'},
                       'Mutable': {'Male': 'wizard',
                                 'Female': 'sorceress',
                                 'Other': 'wizard'}};


const dominant_element_dict = {'Fire': 'with a burning flame aura',
                               'Water': 'with a bubbly water aura',
                               'Air': 'in a swirl of wind magic',
                               'Earth': 'in a swirl of golden magical sand'}










//////// Inactive Prompt Dictionaries

/*

// Modality with largest number of placements
const outfits_dict = {'Cardinal': 'wearing rugged leather armor',
                      'Fixed': 'clad in heavy metal armor',
                      'Mutable': 'adorned in a magical robe'};

// Highest element in total effect value, or highest two elements
// 
const backgrounds_dict = {'Fire': {'Fire': '',
                                   'Water': '',
                                   'Air': '',
                                   'Earth': ''},
                          'Water': {'Fire': '',
                                    'Water': '',
                                    'Air': '',
                                    'Earth': 'on a beach'},
                          'Air': {'Fire': '',
                                    'Water': '',
                                    'Air': '',
                                    'Earth': ''},
                          'Earth': {'Fire': '',
                                    'Water': 'in a watery cavern with beautiful, luminous stalactites and stalagmites',
                                    'Air': '',
                                    'Earth': ''}};

// Determined by sign placement of Mercury
const expression_dict = {'Aries': 'with an explosive demeanor',
                         'Taurus': 'with a reserved expression',
                         'Gemini': 'with a curious expression',
                         'Cancer': 'with a compassionate expression',
                         'Leo': 'with a confident demeanor',
                         'Virgo': 'with an innocent expression',
                         'Libra': 'with a friendly expression',
                         'Scorpio': 'with a plotting expression',
                         'Sagittarius': 'with an angry countenance',
                         'Capricorn': 'with a concerned expression',
                         'Aquarius': 'with an indifferent demeanor',
                         'Pisces': 'with an uncomfortable countenance'};


// Determined by sign placement of Venus
const aesthic_dict = {'Aries': 'war-like aesthetic',
                       'Taurus': '',
                       'Gemini': 'mirrored effect', //duplicitous
                       'Cancer': '',
                       'Leo': '',
                       'Virgo': '',
                       'Libra': '',
                       'Scorpio': '',
                       'Sagittarius': '',
                       'Capricorn': '',
                       'Aquarius': '',
                       'Pisces': ''};


// Determined by sign of Mars
const activity_dict = {'Aries': '',
                       'Taurus': '',
                       'Gemini': '',
                       'Cancer': '',
                       'Leo': '',
                       'Virgo': '',
                       'Libra': '',
                       'Scorpio': '',
                       'Sagittarius': '',
                       'Capricorn': '',
                       'Aquarius': '',
                       'Pisces': ''};

// Derived from Minor Tarot
// Tier 1: 1 - 4
// Tier 2: 5 - 7
// Tier 3: 8 - 10
const object_dict = {'Swords': {'Tier 1': 'dagger',
                                'Tier 2': 'sword',
                                'Tier 3': 'claymore'},
                      'Wands': {'Tier 1': 'dagger',
                                'Tier 2': 'sword',
                                'Tier 3': 'claymore'},
                      'Cups': {'Tier 1': 'dagger',
                               'Tier 2': 'sword',
                               'Tier 3': 'claymore'},
                      'Pentacles': {'Tier 1': 'dagger',
                                    'Tier 2': 'sword',
                                    'Tier 3': 'claymore'}};


// Elemental Styling
// Use multi-prompts with weights equal to elemental values paired with respective element words (earth::3 etc.)

*/


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
                              


async function imaginize(birth_info, horoscope_dict, alchm_info, image_URL_element, image_element, API_key) {
  var avatar_prompt_info = await generateDALLEprompt(birth_info, horoscope_dict, alchm_info);

  const avatar_URL = generateImageFromPrompt(avatar_prompt_info['sentence'], image_URL_element, image_element, API_key);
  avatar_prompt_info['URL'] = avatar_URL;

  console.log("API Output: ", avatar_URL);

  return(avatar_prompt_info);
};

export async function generateImageFromPrompt(avatar_prompt, image_URL_element, image_element, API_key) {
  var API_params = {'text': avatar_prompt,
                    'image_name': 'alchm_v0',
                    'image_URL_element': image_URL_element,
                    'image_element': image_element,
                    'API_key': API_key};

  const API_output = await callAPI('DALLE', API_params);

  console.log("API Output: ", API_output);

  return(API_output);
};




export async function generateDALLEprompt(birth_info, horoscope_dict, alchm_info) {
  const sun_sign = alchm_info['Sun Sign'];
  const dominant_element = alchm_info['Dominant Element'];
  const dominant_modality = alchm_info['Dominant Modality'];
  const gender = birth_info['Gender'];

  var new_avatar_prompt = '';
  var avatar_prompt_dict = {};
  var section_count = 0;

  var new_section;



  // 1. Character Noun from Modality
  new_section = modality_dict[dominant_modality][gender];
  
  new_avatar_prompt += new_section;
  new_avatar_prompt += ' ';
  avatar_prompt_dict[section_count] = new_section;
  section_count += 1;


  // 2. Sun Sign Character Description
  new_section = character_dict[sun_sign];
  
  new_avatar_prompt += new_section;
  new_avatar_prompt += ' ';
  avatar_prompt_dict[section_count] = new_section;
  section_count += 1;

  

  // 3. Dominant Element Description
  new_section = dominant_element_dict[dominant_element];
  
  new_avatar_prompt += new_section;
  new_avatar_prompt += ', ';
  avatar_prompt_dict[section_count] = new_section;
  section_count += 1;


  // 4. Image Quality Description
  new_section ='highly detailed photorealistic digital art';
  
  new_avatar_prompt += new_section;
  //new_avatar_prompt += ' ';
  avatar_prompt_dict[section_count] = new_section;
  section_count += 1;


// End of prompt generation
  const prompt_info = {'sentence': new_avatar_prompt,
                       'dict': avatar_prompt_dict};
  return(prompt_info);
};


export async function generateMidjourneyPrompt(birth_info, horoscope_dict, alchm_info) {
    const sun_sign = alchm_info['Sun Sign'];
    const dominant_element = alchm_info['Dominant Element'];
    const gender = birth_info['Gender'];

    var new_avatar_prompt = '';
    var avatar_prompt_dict = {};
    var section_count = 0;

    var new_section;



    // 0. /imagine
    new_section = '/imagine';
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;


// I. Initial Description
    // 1. Constant Position of Character
    new_section = 'head and shoulders portrait of';
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;



    // 2. Gender
    new_section = gender_dict[gender];
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;


    // 3. Sun Sign Character Description
    new_section = character_dict[sun_sign];
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;



    // 4. Constant Location of Character
    new_section = 'in the center of the image';
    
    new_avatar_prompt += new_section;
    //new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;



    // 5. Element Aura
    new_section = dominant_element + ' aura';
    
    new_avatar_prompt += ', ';
    new_avatar_prompt += new_section;
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;


    // 6. Initial Description Weight
    new_section = '::' + weights_dict['Initial Description'].toString();
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;



// II. Sun Sign Description
    // 7. Sun Sign
    new_section = sun_sign + ' sign';
    
    new_avatar_prompt += new_section;
    //new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;


    // 8. Initial Description Weight
    new_section = '::' + weights_dict['Sun Sign Description'].toString();
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;


// III. Element Augmentation
    // 9. Fire Augmentation
    new_section = 'fire::' + alchm_info['Total Effect Value']['Fire'].toString();
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;

    // 10. Water Augmentation
    new_section = 'water::' + alchm_info['Total Effect Value']['Water'].toString();
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;

    // 11. Air Augmentation
    new_section = 'air::' + alchm_info['Total Effect Value']['Air'].toString();
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;

    // 12. Earth Augmentation
    new_section = 'earth::' + alchm_info['Total Effect Value']['Earth'].toString();
    
    new_avatar_prompt += new_section;
    new_avatar_prompt += ' ';
    avatar_prompt_dict[section_count] = new_section;
    section_count += 1;

    console.log("Prompt:", new_avatar_prompt);
    console.log("Avatar Prompt Dict: ", avatar_prompt_dict);

// End of prompt generation
    const prompt_info = {'sentence': new_avatar_prompt,
                         'dict': avatar_prompt_dict};
    return(prompt_info);
};