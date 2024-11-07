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
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 m-8" onClick={() => {
        onVoiceSelected(voice.name);
      }}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-lg font-semibold">
              {voice.gender === 'M' ? '♂️' : '♀️'}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{voice.name}</h2>
          </div>
          <p className="text-gray-600 mb-4">{voice.description}</p>
          <div className="hidden flex space-x-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Listen
            </button>
            <img>
              {voice.imageUrl}
            </img>
          </div>
        </div>
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
        <div>
            Voices
            <div className="h-64 overflow-auto border-2">
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