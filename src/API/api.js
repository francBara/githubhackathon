const lmnt = require('lmnt-node');

const speech = new lmnt.Speech('af1fb0f85cb548d59c97066b0c8128ac');

const lmntAPI = {
    textToSpeech: async (text) => {
        const audio = await speech.synthesize(text, "morgan");
        return audio;
    },

    getVoices: async () => {
        const voices = await speech.fetchVoices();
        return voices;
    }

};

export default lmntAPI;