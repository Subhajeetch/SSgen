'use client';
import { useState, useRef } from 'react';
import { downloadImageFromRef } from '@/utils/downloadImage.js';
import {
    Pencil,
    Candy,
    AppWindow,
    Calendar1,
    User,
    MailQuestion,
    Trash,
    ArrowLeft,
    Clock
} from 'lucide-react';
import { Switch } from "@/components/ui/switch"

// custom icons
import {
    MoreSvg,
    CallSvg,
    VideoCallSvg,
    DoubleTickIcon
} from '@/sections/uni/icons';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"



export default function Page() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sender, setSender] = useState('user');
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempMessage, setTempMessage] = useState(null);
    const [messageType, setMessageType] = useState('text');
    const [imageInput, setImageInput] = useState(""); // Stores the preview URL

    const [showFriendNameInput, setShowFriendNameInput] = useState(true);
    const [friendName, setFriendName] = useState('...?');
    const [liveFriendName, setLiveFriendName] = useState("");
    const [showDate, setShowDate] = useState(false);

    const [replyToMessage, setReplyToMessage] = useState(false);
    const [replyMessage, setReplyMessage] = useState(null);

    const previewRef = useRef(null);
    const FILE_NAME = 'whatsapp-screenshot.png';

    const addMessage = () => {
        if (messageType === "text" && input.trim() === "") return;
        if (messageType === "image" && !imageInput) return;
        if (messageType === "text-image" && input.trim() === "" && !imageInput) return;

        const newMessage = {
            messageText: messageType === "text" || messageType === "text-image" ? input : undefined,
            messageType: messageType,
            sender: sender,
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isRead: true,
            isDelivered: true,
            isSent: true,
            isRepyedMessage: false,
            isForwardedMessage: false,
            replyedMessage: replyMessage,
            isImageAttached: messageType === "image" || messageType === "text-image",
            imageUrl: messageType === "image" || messageType === "text-image" ? imageInput : null,
        };

        setMessages([...messages, newMessage]);
        setInput("");
        setImageInput("");
        setReplyMessage(null);
    };

    const handleDownload = () => {
        downloadImageFromRef(previewRef, FILE_NAME);
    };

    const openEditor = (index) => {
        setEditingIndex(index);
        setTempMessage({ ...messages[index] }); // Copy message to temp
    };

    const deleteMessage = (index) => {
        const updatedMessages = messages.filter((_, i) => i !== index);
        setMessages(updatedMessages);
    };

    const handleTempChange = (key, value) => {
        setTempMessage(prev => ({ ...prev, [key]: value }));
    };

    const saveChanges = () => {
        if (!tempMessage) return;
        const updatedMessages = [...messages];
        updatedMessages[editingIndex] = { ...tempMessage }; // Make sure this is a fresh clone
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

        const original = messages[editingIndex];
        for (let key in tempMessage) {
            if (tempMessage[key] !== original[key]) return true;
        }
        return false;
    };


    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageInput(reader.result); // Set the preview URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageInput(reader.result); // Set the preview URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditorImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                handleTempChange('imageUrl', reader.result); // Update the tempMessage with the preview URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditorImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                handleTempChange('imageUrl', reader.result); // Update the tempMessage with the preview URL
            };
            reader.readAsDataURL(file);
        }
    };

    const formateSender = (s) => {
        if (!s) return;

        if (s === "user") {
            return "You:"
        } else {
            return "Friend:"
        }
    }

    return (
        <div className="flex flex-col lg:flex-row-reverse gap-4 p-4 max-w-[1200px] mx-auto">
            {/* Preview */}
            <div className="w-full flex justify-center items-center lg:flex-1">
                <div className='bg-sidebar p-2 rounded-md flex flex-col'>

                    <div className=' flex flex-col gap-2 mb-2'>
                        <div className={`bg-muted p-1 px-2 rounded-sm flex flex-col gap-2 transition-all duration-300 overflow-hidden ${showFriendNameInput ? "h-[78px]" : "h-[34px]"}`}>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold flex gap-1.5 items-center">
                                    <AppWindow size={20} /> Friend Name
                                </span>
                                <Switch
                                    id="airplane-mode"
                                    checked={showFriendNameInput}
                                    onCheckedChange={() => setShowFriendNameInput((prev) => !prev)}
                                />
                            </div>

                            {showFriendNameInput && (
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        className="bg-sidebar outline-0 rounded px-2 py-1 w-[216px]"
                                        placeholder="...?"
                                        onChange={(e) => { setLiveFriendName(e.target.value) }}
                                        value={liveFriendName}
                                    />
                                    <button
                                        onClick={() => { setFriendName(liveFriendName) }}
                                        className="bg-green-700 px-3 py-1 rounded font-bold">
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="bg-muted p-1 px-2 rounded-sm flex flex-col gap-2 transition-all duration-300 overflow-hidden">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold flex gap-1.5 items-center">
                                    <Calendar1 size={20} /> Show Date
                                </span>
                                <Switch
                                    id="airplane-mode"
                                    checked={showDate}
                                    onCheckedChange={() => setShowDate((prev) => !prev)}
                                />
                            </div>
                        </div>
                    </div>


                    <div className='flex gap-2 pb-2 items-center'
                    >
                        <Candy size={22} />
                        <p className='font-semibold'>Preview</p>
                        <div className='flex-1 flex gap-1 justify-end pr-1.5'>
                            <div className='h-3 w-3 rounded-full bg-[#FFA500]'></div>
                            <div className='h-3 w-3 rounded-full bg-[#FFFF00]'></div>
                            <div className='h-3 w-3 rounded-full bg-[#90EE90]'></div>
                        </div>
                    </div>

                    {/* Preview starts from here */}
                    <div
                        ref={previewRef}
                        className="aspect-[9/16] w-[300px] rounded relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-[60px] bg-[#0000]" />
                        <img src="/whatsapp-bg.png" className="w-full object-cover" alt="Background" />
                        <div className="flex flex-col gap-1 overflow-y-auto absolute top-0 left-0 right-0 bottom-0">

                            {showFriendNameInput && (
                                <div className='h-11 bg-white flex gap-2 px-1.5'>
                                    {/* profile picture */}
                                    <div className='flex gap-1.5 items-center'>
                                        <ArrowLeft className='text-black' size={22} />
                                        <img src="/no-pfp-pfp.jpg" alt="Profile Picture" className='h-8 w-8 rounded-full' />
                                    </div>

                                    <div className='flex-1 flex text-black items-center'>
                                        <p className=' w-[120px] truncate'>{friendName}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <VideoCallSvg className='text-black mr-1' size={22} />
                                        <CallSvg className='text-black' size={21} />
                                        <MoreSvg className='text-black' size={22} />

                                    </div>
                                </div>
                            )}

                            <div className='flex-1 flex flex-col gap-1.5 p-2 overflow-y-auto'>
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`relative ${msg.sender === 'user' ? 'self-end' : 'self-start'} max-w-[80%] text-sm`}
                                    >


                                        <div className={`absolute rounded-t-sm top-0 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent
                                            ${msg.sender === 'user' ? 'border-t-[#d8fdd2]  right-[-7px]' : 'border-t-white left-[-7px]'}
                                            `}></div>




                                        <div
                                            className={`flex flex-col ${msg.sender === 'user' ? 'bg-[#d8fdd2]  text-black' : 'bg-white text-black'
                                                } rounded-md p-1 px-2`}
                                        >

                                            {msg.replyedMessage && (

                                                <div className='overflow-hidden rounded flex gap-1 bg-[#b9dfb2]'>
                                                    <div className='h-auto w-1.5 bg-amber-700'></div>
                                                    <div className='flex flex-col'>
                                                        <p className='font-semibold'>
                                                            {msg.replyedMessage.sender === "user" ? (
                                                                <span>You</span>) : (
                                                                <span>{friendName}</span>
                                                            )}
                                                        </p>
                                                        <p className='line-clamp-2'>{msg.replyedMessage.messageText}</p>
                                                    </div>

                                                    {msg.replyedMessage.imageUrl && (
                                                        <div className='ml-2'>
                                                            <img src={msg.replyedMessage.imageUrl} alt="Attached" className="w-8 h-8 object-cover rounded" />
                                                        </div>
                                                    )}
                                                </div>
                                            )}


                                            {msg.isImageAttached && msg.imageUrl ? (
                                                <>
                                                    <img src={msg.imageUrl} alt="Attached" className="max-w-full rounded mb-1" />
                                                    <div className="flex justify-between gap-2 items-end">
                                                        <p className="break-words">{msg.messageText}</p>
                                                        <span className="text-[9px] opacity-70 whitespace-nowrap flex gap-1">{msg.time}
                                                            {msg.isDelivered && msg.isSent ? (
                                                                msg.isRead ? (
                                                                    <DoubleTickIcon size={12} className='text-blue-500' />
                                                                ) : (
                                                                    <DoubleTickIcon size={12} className='text-gray-500' />
                                                                )
                                                            ) : (
                                                                <Clock size={12} className='text-gray-500' />
                                                            )}


                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex justify-between gap-2 items-end">
                                                    <p className="break-words">{msg.messageText}</p>
                                                    <span className="text-[9px] opacity-70 whitespace-nowrap flex gap-1">{msg.time} {msg.isDelivered && msg.isSent ? (
                                                        msg.isRead ? (
                                                            <DoubleTickIcon size={12} className='text-blue-500 font-bold' />
                                                        ) : (
                                                            <DoubleTickIcon size={12} className='text-gray-500' />
                                                        )
                                                    ) : (
                                                        <Clock size={12} className='text-gray-500' />
                                                    )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <button onClick={handleDownload} className='w-full bg-green-700 px-3 py-1 rounded font-bold'>
                            Generate Image
                        </button>
                    </div>
                </div>
            </div>

            {/* Editor */}
            <div className="md:p-4 w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className='flex gap-2 items-center'>
                        <label className='font-bold flex gap-2 items-center'>
                            <User /> Send as
                        </label>

                        <Select defaultValue="user" onValueChange={setSender}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="sender..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">Me</SelectItem>
                                <SelectItem value="bot">Friend</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>

                    <div className='flex gap-2 items-center'>
                        <label className='font-bold flex gap-2 items-center'>
                            <MailQuestion /> Message Type
                        </label>

                        <Select defaultValue="text" onValueChange={setMessageType}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="text..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="text">Text Only</SelectItem>
                                <SelectItem value="image">Image Only</SelectItem>
                                <SelectItem value="text-image">Text + Image</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>

                    <div className={`${!replyToMessage ? "border-b-1 border-muted" : ""} p-1 px-2 w-fit flex flex-col gap-2 transition-all duration-300 overflow-hidden ${replyToMessage ? "h-[78px]" : "h-[34px]"}`}>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold flex gap-1.5 items-center">
                                <AppWindow size={20} /> Reply To A Message
                            </span>
                            <Switch
                                id="airplane-mode"
                                checked={replyToMessage}
                                onCheckedChange={() => setReplyToMessage((prev) => !prev)}
                            />
                        </div>

                        {showFriendNameInput && (
                            <Select value={replyMessage} onValueChange={setReplyMessage}>
                                <SelectTrigger className="w-[290px]">
                                    <SelectValue placeholder="Select reply message..." />
                                </SelectTrigger>
                                <SelectContent>

                                    {messages.map((msg, i) => (
                                        <SelectItem key={i} value={msg} className="flex flex-col items-start">
                                            <span >From <span className='underline font-semibold'>{formateSender(msg.sender)}</span>
                                            </span>

                                            <div className='flex gap-2 items-center'>
                                                <p className='truncate max-w-[124px]'>
                                                    {msg.messageText}
                                                </p>

                                                {msg.imageUrl && (
                                                    <img src={msg.imageUrl} alt="message image priview" className='max-h-6 max-w-6 rounded object-cover' />
                                                )}
                                            </div>

                                        </SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>

                        )}
                    </div>

                    {messageType === "text" || messageType === "text-image" ? (
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="p-2 border rounded resize-none"
                        />
                    ) : null}

                    {messageType === "image" || messageType === "text-image" ? (
                        <div
                            className="border-dashed border-2 border-gray-400 rounded p-4 flex flex-col items-center justify-center"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleImageDrop(e)}
                        >
                            {imageInput ? (
                                <img
                                    src={imageInput}
                                    alt="Preview"
                                    className="max-w-full max-h-40 rounded"
                                />
                            ) : (
                                <p className="text-gray-500">Drag and drop an image here, or click to select</p>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageSelect(e)}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                            >
                                Select Image
                            </label>
                        </div>
                    ) : null}

                    <button
                        onClick={addMessage}
                        className="bg-green-500 text-white rounded py-1"
                    >
                        Add Message
                    </button>
                </div>

                <hr className="my-2 border-muted" />

                {/* Messages Editor */}
                <div className="flex flex-col gap-4">
                    {messages.map((msg, i) => (
                        <div key={i} className="bg-sidebar p-3 rounded shadow-md flex flex-col gap-2 relative">
                            {editingIndex === i ? (
                                <>
                                    <textarea
                                        value={tempMessage.messageText}
                                        onChange={(e) => handleTempChange('messageText', e.target.value)}
                                        placeholder="Message Text"
                                        className="p-2 border rounded resize-none"
                                    />
                                    <div className="flex gap-2">


                                        <Select defaultValue={tempMessage.sender} onValueChange={(value) => handleTempChange('sender', value)}

                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="sender..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="user">Me</SelectItem>
                                                <SelectItem value="bot">Friend</SelectItem>
                                            </SelectContent>
                                        </Select>


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
                                            <div
                                                className="border-dashed border-2 border-gray-400 rounded p-4 flex flex-col items-center justify-center"
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => handleEditorImageDrop(e)}
                                            >
                                                {tempMessage.imageUrl ? (
                                                    <img
                                                        src={tempMessage.imageUrl}
                                                        alt="Attached"
                                                        className="max-w-full max-h-40 rounded"
                                                    />
                                                ) : (
                                                    <p className="text-gray-500">Drag and drop an image here, or click to select</p>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleEditorImageSelect(e)}
                                                    className="hidden"
                                                    id={`image-upload-${editingIndex}`}
                                                />
                                                <label
                                                    htmlFor={`image-upload-${editingIndex}`}
                                                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                                                >
                                                    Select Image
                                                </label>
                                            </div>
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
                                        <div className='flex flex-col gap-2'>
                                            <label>
                                                {msg.sender === "user" ? (
                                                    <span>From <span className='font-bold underline'>You</span></span>
                                                ) : (
                                                    <span>From <span className='font-bold underline'>Friend</span></span>
                                                )}
                                            </label>

                                            <p className='mt-0.5 ml-4 line-clamp-2'>
                                                {msg.messageText}
                                            </p>
                                            <img src={msg.imageUrl} alt="Attached" className="max-w-40 rounded" />
                                        </div>

                                    ) : (
                                        <div className="flex flex-col gap-2"> <label>
                                            {msg.sender === "user" ? (
                                                <span>From <span className='font-bold underline'>You</span></span>
                                            ) : (
                                                <span>From <span className='font-bold underline'>Friend</span></span>
                                            )}
                                        </label>

                                            <p className='mt-0.5 ml-4 line-clamp-2'>
                                                {msg.messageText}
                                            </p></div>
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button
                                            onClick={() => openEditor(i)}
                                            className="bg-muted p-1 rounded"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <Dialog>
                                            <DialogTrigger className="bg-muted p-1 rounded"><Trash size={16} /></DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>You are deleting this message!</DialogTitle>
                                                    <DialogDescription>
                                                    </DialogDescription>
                                                </DialogHeader>

                                                {msg.isImageAttached ? (
                                                    <div className='flex flex-col gap-2 bg-sidebar px-2 pb-2 rounded-md'>
                                                        <label>
                                                            {msg.sender === "user" ? (
                                                                <span>From <span className='font-bold underline'>You</span></span>
                                                            ) : (
                                                                <span>From <span className='font-bold underline'>Friend</span></span>
                                                            )}
                                                        </label>

                                                        <p className='mt-0.5 ml-4 line-clamp-2'>
                                                            {msg.messageText}
                                                        </p>
                                                        <img src={msg.imageUrl} alt="Attached" className="max-w-40 rounded" />
                                                    </div>

                                                ) : (
                                                    <div className="flex flex-col gap-2 bg-sidebar px-2 pb-2 rounded-md"> <label>
                                                        {msg.sender === "user" ? (
                                                            <span>From <span className='font-bold underline'>You</span></span>
                                                        ) : (
                                                            <span>From <span className='font-bold underline'>Friend</span></span>
                                                        )}
                                                    </label>

                                                        <p className='mt-0.5 ml-4 line-clamp-2'>
                                                            {msg.messageText}
                                                        </p></div>
                                                )}

                                                <div className="flex justify-end gap-2 mt-4">
                                                    <button
                                                        onClick={() => deleteMessage(i)}
                                                        className="bg-muted hover:bg-red-500 rounded py-1 px-4"
                                                    >
                                                        Delete
                                                    </button>
                                                    <DialogClose asChild>
                                                        <button
                                                            className="outline-1 outline-muted hover:bg-muted rounded py-1 px-4"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </DialogClose>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
