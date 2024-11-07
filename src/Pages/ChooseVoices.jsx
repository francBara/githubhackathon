import React, { useState } from "react";
import { useEffect } from "react";
import lmntAPI from "../API/api";

/**
 * 
 * @param {Object} props
 * @param {import("lmnt-node").Voice} props.voice
 * @returns 
 */
function VoiceTile({voice}) {
    return (
        <div>
            <div>
                {voice.name}
            </div>
            <div>
                {voice.description}
            </div>
            <div>
                {voice.gender}
            </div>
        </div>
    );
}

function ChooseVoices() {
    /**
     * @type {[import("lmnt-node").VoicesResponse, function]}
     */
    const [voices, setVoices] = useState(null);

    const fetch = async () => {
        const voices = await lmntAPI.getVoices();
        setVoices(voices);
    };

    useEffect(() => {
        fetch();
    }, [])

    return (
        <div>
            {
                voices &&
                voices.map((voice) => {
                    return <VoiceTile voice={voice}/>;
                })
            }
        </div>
    );
}

export default ChooseVoices;