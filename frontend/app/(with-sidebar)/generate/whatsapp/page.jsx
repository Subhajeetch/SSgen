'use client';
import { useState, useRef } from 'react';
import { downloadImageFromRef } from '@/utils/downloadImage.js';
import { Pencil, Candy } from 'lucide-react'; // if not installed, run: npm install lucide-react

export default function Page() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sender, setSender] = useState('user');
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempMessage, setTempMessage] = useState(null);
    const previewRef = useRef(null);
    const FILE_NAME = 'whatsapp-screenshot.png';

    const addMessage = () => {
        if (input.trim() === '') return;
        const newMessage = {
            messageText: input,
            messageType: 'text',
            sender: sender,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: true,
            isDelivered: true,
            isSent: true,
            isRepyedMessage: false,
            isForwardedMessage: false,
            replyedMessage: null,
            isImageAttached: false,
            imageUrl: null,
        };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    const handleDownload = () => {
        downloadImageFromRef(previewRef, FILE_NAME);
    };

    const openEditor = (index) => {
        setEditingIndex(index);
        setTempMessage({ ...messages[index] }); // Copy message to temp
    };

    const handleTempChange = (key, value) => {
        setTempMessage(prev => ({ ...prev, [key]: value }));
    };

    const saveChanges = () => {
        const updatedMessages = [...messages];
        updatedMessages[editingIndex] = tempMessage;
        setMessages(updatedMessages);
        setEditingIndex(null);
        setTempMessage(null);
    };

    const cancelChanges = () => {
        setEditingIndex(null);
        setTempMessage(null);
    };

    const hasChanges = () => {
        if (!tempMessage) return false;
        return JSON.stringify(tempMessage) !== JSON.stringify(messages[editingIndex]);
    };

    return (
        <div className="flex flex-col lg:flex-row-reverse gap-4 p-4">
            {/* Preview */}
            <div className="w-full flex justify-center items-center">
                <div className='bg-sidebar p-2 rounded-md flex flex-col'>
                    <div className='flex gap-2 pb-2 items-center'>
                        <Candy size={22} />
                        <p className='font-semibold'>Preview</p>
                        <div className='flex-1 flex gap-1 justify-end pr-1.5'>
                            <div className='h-3 w-3 rounded-full bg-[#FFA500]'></div>
                            <div className='h-3 w-3 rounded-full bg-[#FFFF00]'></div>
                            <div className='h-3 w-3 rounded-full bg-[#90EE90]'></div>
                        </div>
                    </div>
                    <div
                        ref={previewRef}
                        className="aspect-[9/16] h-[430px] w-full max-w-[250px] rounded relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-[60px] bg-[#0000]" />
                        <img src="/whatsapp-bg.png" className="w-full object-cover" alt="Background" />
                        <div className="flex flex-col gap-1 overflow-y-auto absolute top-0 left-0 right-0 bottom-0 p-2">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`relative px-3 py-1 rounded-lg max-w-[80%] text-sm ${msg.sender === 'user'
                                        ? 'self-end bg-green-500 text-white'
                                        : 'self-start bg-white text-black border border-gray-200'
                                        }`}
                                >
                                    {msg.isImageAttached && msg.imageUrl ? (
                                        <img src={msg.imageUrl} alt="Attached" className="max-w-full rounded" />
                                    ) : (
                                        msg.messageText
                                    )}
                                    <div className="text-[10px] mt-1 opacity-70 text-right">
                                        {msg.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        heyy
                    </div>
                </div>
            </div>

            {/* Editor */}
            <div className="bg-gray-700 rounded shadow-md p-4 w-full lg:w-[400px] flex flex-col gap-4 overflow-y-auto max-h-[90vh]">
                <div className="flex flex-col gap-2">
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
                </div>

                <hr className="my-2 border-gray-500" />

                {/* Messages Editor */}
                <div className="flex flex-col gap-4">
                    {messages.map((msg, i) => (
                        <div key={i} className="bg-gray-600 p-3 rounded shadow-md flex flex-col gap-2 relative">
                            {editingIndex === i ? (
                                <>
                                    <textarea
                                        value={tempMessage.messageText}
                                        onChange={(e) => handleTempChange('messageText', e.target.value)}
                                        placeholder="Message Text"
                                        className="p-2 border rounded resize-none"
                                    />
                                    <div className="flex gap-2">
                                        <select
                                            value={tempMessage.sender}
                                            onChange={(e) => handleTempChange('sender', e.target.value)}
                                            className="border rounded p-2 flex-1"
                                        >
                                            <option value="user">User</option>
                                            <option value="bot">Friend</option>
                                        </select>
                                        <input
                                            type="time"
                                            value={tempMessage.time}
                                            onChange={(e) => handleTempChange('time', e.target.value)}
                                            className="border rounded p-2 flex-1"
                                        />
                                    </div>
                                    <input
                                        type="date"
                                        value={tempMessage.date}
                                        onChange={(e) => handleTempChange('date', e.target.value)}
                                        className="border rounded p-2"
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {['isRead', 'isDelivered', 'isSent'].map(field => (
                                            <label key={field} className="flex items-center gap-1">
                                                <input
                                                    type="checkbox"
                                                    checked={tempMessage[field]}
                                                    onChange={(e) => handleTempChange(field, e.target.checked)}
                                                />
                                                {field.replace('is', '')}
                                            </label>
                                        ))}
                                    </div>

                                    {/* Image Attachment */}
                                    <div className="flex flex-col gap-1">
                                        <label className="flex items-center gap-1">
                                            <input
                                                type="checkbox"
                                                checked={tempMessage.isImageAttached}
                                                onChange={(e) => handleTempChange('isImageAttached', e.target.checked)}
                                            />
                                            Attach Image
                                        </label>
                                        {tempMessage.isImageAttached && (
                                            <input
                                                type="text"
                                                value={tempMessage.imageUrl || ''}
                                                onChange={(e) => handleTempChange('imageUrl', e.target.value)}
                                                placeholder="Image URL"
                                                className="p-2 border rounded"
                                            />
                                        )}
                                    </div>

                                    {/* Save/Cancel */}
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={saveChanges}
                                            disabled={!hasChanges()}
                                            className={`flex-1 rounded py-1 ${hasChanges() ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelChanges}
                                            className="flex-1 rounded py-1 bg-red-500 text-white"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {msg.isImageAttached ? (
                                        <img src={msg.imageUrl} alt="Attached" className="max-h-20 rounded" />
                                    ) : (
                                        <div className="line-clamp-2">{msg.messageText}</div>
                                    )}
                                    <button
                                        onClick={() => openEditor(i)}
                                        className="absolute top-2 right-2 bg-gray-500 hover:bg-gray-400 p-1 rounded"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleDownload}
                    className="bg-blue-500 text-white rounded py-2 mt-4"
                >
                    Generate Image
                </button>
            </div>
        </div>
    );
}
