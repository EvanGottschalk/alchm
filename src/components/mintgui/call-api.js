export default { callAPI }

require("dotenv").config();
const request = require('request');
const fs = require('fs');

export async function callAPI(keyName, params) {

    // API Flash
    if (keyName === 'APIFLASH') {
        const API_key = process.env.APIFLASH_KEY;

        const URL = params['URL'];
        const image_name = params['image_name'];

        request({
            url: "https://api.apiflash.com/v1/urltoimage",
            encoding: "binary",
            qs: {
                access_key: API_key,
                url: URL,
                fresh: 'true',
                full_page: 'true',
                quality: '100',
                crop: '420,0,1080,1080',
                time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }, (error, response, body) => {
            if (error) {
                console.log(error);
            } else {
                fs.writeFile("metadata_files/" + image_name + ".png", body, "binary", error => {
                    console.log(error);
                });
            }
        });
    } else

    // Discord
    if (keyName === 'DISCORD') {
        
        const API_key = process.env.DISCORD_BOT_TOKEN;
        console.log("API Key: ", API_key);
        
        const recipient_discord_ID = params['recipient_discord_ID'];
        var channel_discord_ID = params['channel_discord_ID'];
        const message = params['message'];
        
        // Direct Messages
        if (recipient_discord_ID) {
            request({
              method: 'POST',
              url: `https://discord.com/api/v9/users/@me/channels`,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${API_key}`
              },
              body: JSON.stringify({recipient_id: recipient_discord_ID})
            }, (error, response, body) => {
              if (error) {
                console.log(error);
              } else {
                console.log(JSON.parse(body));
                channel_discord_ID = JSON.parse(body).id;
                console.log('Generated DM Channel ID: ', channel_discord_ID);
                request({
                  method: 'POST',
                  url: `https://discord.com/api/v9/channels/${channel_discord_ID}/messages`,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${API_key}`
                  },
                  body: JSON.stringify({content: message})
                }, (error, response, body) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(body);
                  }
                });
              }
            });
        
        // Channel Messages
        } else if (channel_discord_ID) {
          request({
            method: 'POST',
            url: `https://discord.com/api/v9/channels/${channel_discord_ID}/messages`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bot ${API_key}`
            },
            body: JSON.stringify({content: message})
          }, (error, response, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          });
        }
    } else
    // 
    // DALL-E API
    if (keyName === 'DALLE') {
      //const API_key = process.env.DALLE_API_KEY;
      const API_key = params['API_key'];
      const text = params['text'];
      const image_name = params['image_name'];

      request.post({
        url: "https://api.openai.com/v1/images/generations",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_key}`
        },
        body: JSON.stringify({
          "model": "image-alpha-001",
          "prompt": `${text}`,
          "num_images": 1,
          "size": "256x256", // must be one of '256x256', '512x512', or '1024x1024'
          "response_format": "url"
        })
      }, (error, response, body) => {
        if (error) {
          console.log(error);
        } else {
          const JSON_response = JSON.parse(body);
          console.log("JSON Response: ", JSON_response);
          const image_URL = JSON_response.data[0]['url'];
          params['image_URL_element'].innerHTML = 'DALL-E Image URL: ' + image_URL;
          params['image_element'].src = image_URL;
          console.log("Image URL: ", image_URL);
          return(image_URL);


    //For generative fill:
        /*curl https://api.openai.com/v1/images/edits \
          -H "Authorization: Bearer $OPENAI_API_KEY" \
          -F image="@otter.png" \
          -F mask="@mask.png" \
          -F prompt="A cute baby sea otter wearing a beret" \
          -F n=2 \
          -F size="1024x1024"*/





          // This fs.writeFile saves a JSON containing the image's address. It does NOT save the image itself
          // Temporarily disabled
          /*fs.writeFile("generated_images/" + image_name + ".png", body, "binary", error => {
            console.log(error);
          });*/




          /*request.get({
            url: image_url,
            encoding: "binary"
          }, (error, response, body) => {
            if (error) {
              console.log(error);
            } else {
              fs.writeFile("metadata_files/" + image_url + ".png", body, "binary", error => {
                console.log(error);
              });
            }
          });*/
        }
      });
  }
}

//callAPI('APIFLASH', 'https://gateway.pinata.cloud/ipfs/QmfCnfBaphqpuWuLBtnEeu5hFUJix8WrqTREP7dgTujYGg', 'clock');
//callAPI('DISCORD', {'recipient_discord_ID': '', 'channel_discord_ID': '941953657585414186', 'message': 'sup2s'});
//callAPI('DALLE', {'text': 'high octane rendering of a giraffe in flames on a sacred geometry flower, head and shoulders, facing forward', 'image_name': 'Ripping a Fatty for Jesus'});


/*API Flash
fetch('https://hcti.io/v1/image/2c3fad1f-8534-4d7f-8786-f55fa4ee42c8/url=https://gateway.pinata.cloud/ipfs/QmRsTsqY4vV4pUn2Sm8WcR453gvfciNmzRikT8GtaAtWvp/')
                .then(response => {
                    console.log(response);
                    return response;
                })
                .then(response => {
                    console.log(response.url);
                });
*/

/*HTML/CSS to Image API
`use strict`;
const json = {
  url: "https://gateway.pinata.cloud/ipfs/QmQciZBr92K7DEoiw4CrDHtvFY3wqLCftKrftwh2MDNkwt/",
  css: "pre { font-family: 'Courier Prime'; }",
  google_fonts: "Courier Prime"
};

const username = "8e171ec6-bc04-4951-9dbf-33e7689184ab";
const password = "2c3fad1f-8534-4d7f-8786-f55fa4ee42c8";

const options = {
  method: 'POST',
  body: JSON.stringify(json),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(username + ":" + password)
  }
}

fetch('https://hcti.io/v1/image', options)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then(data => {
    // Image URL is available here
    console.log(data.url)
  })
  .catch(err => console.error(err));
*/
