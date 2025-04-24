'use client';
import { useState, useRef } from 'react';
import { downloadImageFromRef } from '@/utils/downloadImage.js';

export default function Page() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sender, setSender] = useState('user'); // 'user' or 'bot'
    const previewRef = useRef(null);
    const FILE_NAME = 'whatsapp-screenshot.png';

    const addMessage = () => {
        if (input.trim() === '') return;
        setMessages([...messages, { text: input, from: sender }]);
        setInput('');
    };

    const handleDownload = () => {
        downloadImageFromRef(previewRef, FILE_NAME);
    };

    return (
        <div className="flex flex-col lg:flex-row-reverse gap-4 p-4">
            {/* preview */}
            <div className="w-full flex justify-center items-center">
                <div
                    ref={previewRef}
                    style={{ backgroundImage: 'url(/whatsapp-bg.png)' }}
                    className="aspect-[9/16] h-[430px] w-full max-w-[250px] p-2 flex flex-col gap-1 overflow-y-auto rounded shadow-md border border-gray-300"
                >
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`px-3 py-1 rounded-lg max-w-[80%] text-sm ${msg.from === 'user'
                                ? 'self-end bg-green-500 text-white'
                                : 'self-start bg-white text-black border border-gray-200'
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* edit */}
            <div className="bg-gray-700 rounded shadow-md p-4 w-full lg:w-[300px] flex flex-col gap-2">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="p-2 border rounded resize-none"
                />
                <select
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="user">User</option>
                    <option value="bot">Friend</option>
                </select>
                <button
                    onClick={addMessage}
                    className="bg-green-500 text-white rounded py-1"
                >
                    Add Message
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-blue-500 text-white rounded py-1"
                >
                    Generate Image
                </button>
            </div>
        </div >
    );
}
