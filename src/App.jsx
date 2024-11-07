import React, { useState } from "react";
import ChooseVoices from "./Pages/ChooseVoices";
import lmntAPI from "./API/api";


function App() {
    const [selectedVoice, setSelectedVoice] = useState(null);

    const synthetize = async () => {
        const audio = await lmntAPI.textToSpeech("blablabla", selectedVoice);
    }

    return (
        <div>
            <div>
                <ChooseVoices onVoiceSelected={(voice) => {
                    setSelectedVoice(voice);
                }}/>
            </div>
        </div>
    );
}

export default App;
