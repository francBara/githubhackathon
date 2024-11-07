import React, { useState } from "react";
import { useEffect } from "react";
import lmntAPI from "../API/api";

/**
 * 
 * @param {Object} props
 * @param {import("lmnt-node").Voice} props.voice
 * @returns 
 */
const VoiceCard = ({ voice, onVoiceSelected }) => {
    return (
      <div className="flex flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 cursor-pointer items-center p-4 mb-2" onClick={() => {
        onVoiceSelected(voice.name);
      }}>
        <h2 className="text-xl font-semibold text-gray-800 mr-4">{voice.name}</h2>
        <p className="text-gray-600">{voice.description}</p>
      </div>
    );
  };

function ChooseVoices({onVoiceSelected}) {
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
        <div className="border-2">
            <div className="text-xl font-semibold mb-4">
                Voices
            </div>
            <div className="h-64 overflow-auto">
            {
                voices &&
                voices.map((voice) => {
                    return <VoiceCard voice={voice} onVoiceSelected={onVoiceSelected}/>;
                })
            }
            </div>
        </div>
    );
}

export default ChooseVoices;