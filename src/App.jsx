import React, { useState, useEffect } from 'react';

//Helper component for icons
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

//Main App Component
export default function App() {
    // State management
    const [jobDescription, setJobDescription] = useState('');
    const [userResume, setUserResume] = useState('');
    const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    //Core Logic
    const handleGenerate = async () => {
        //Validation
        if (!jobDescription.trim() || !userResume.trim()) {
            setError('Please provide both a job description and your resume.');
            return;
        }

        //Reset state and start loading
        setIsLoading(true);
        setError('');
        setGeneratedCoverLetter('');
        setCopySuccess(false);

        //Construct the prompt for the AI model
        const prompt = `
            As an expert career coach and professional cover letter writer, your task is to generate a concise, compelling, and professional cover letter.

            Synthesize the provided user's resume and the target job description to create a letter that highlights the user's most relevant skills and experiences. Tailor the content specifically to the requirements and keywords found in the job description.

            Maintain a professional and enthusiastic tone. The letter should be well-structured and approximately 3-4 paragraphs long. Do not invent any skills or experiences not present in the resume.

            --- JOB DESCRIPTION ---
            ${jobDescription}

            --- USER'S RESUME/CV ---
            ${userResume}
        `;

        try {
            //Calling the Gemini API
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }

            const result = await response.json();

            //Process the response and update state
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setGeneratedCoverLetter(text);
            } else {
                throw new Error("The AI returned an unexpected response format.");
            }

        } catch (err) {
            console.error("Error during generation:", err);
            setError(err.message || "An unknown error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    //Clipboard Logic
    const handleCopyToClipboard = () => {
        if (!generatedCoverLetter) return;

        const textarea = document.createElement('textarea');
        textarea.value = generatedCoverLetter;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000); // to reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textarea);
    };
    
    //UI Rendering
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-sky-400">AI Cover Letter Generator</h1>
                    <p className="text-slate-400 mt-2 text-lg">Create a tailored cover letter in seconds.</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/*Input*/}
                    <div className="flex flex-col gap-6">
                        <div>
                            <label htmlFor="job-desc" className="block text-lg font-medium text-slate-300 mb-2">
                                1. Paste Job Description
                            </label>
                            <textarea
                                id="job-desc"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="e.g., We are looking for a React Developer with 3+ years of experience..."
                                className="w-full h-48 p-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="resume" className="block text-lg font-medium text-slate-300 mb-2">
                                2. Paste Your Resume/CV
                            </label>
                            <textarea
                                id="resume"
                                value={userResume}
                                onChange={(e) => setUserResume(e.target.value)}
                                placeholder="e.g., John Doe - Software Engineer - Skills: React, JavaScript, Node.js..."
                                className="w-full h-48 p-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none"
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Icon path="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a4.5 4.5 0 01-2.695-2.695L11.25 18l1.938-.648a4.5 4.5 0 012.695 2.695z" />
                                    Generate Cover Letter
                                </>
                            )}
                        </button>
                        {error && <p className="text-red-400 text-center bg-red-900/50 p-3 rounded-lg">{error}</p>}
                    </div>

                    {/*Output*/}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 relative">
                         <h2 className="text-2xl font-bold text-slate-200 mb-4">Generated Cover Letter</h2>
                         {generatedCoverLetter && (
                            <button 
                                onClick={handleCopyToClipboard}
                                className="absolute top-4 right-4 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2 px-3 rounded-lg transition duration-200 flex items-center gap-2"
                            >
                                {copySuccess ? (
                                    <>
                                        <Icon path="M4.5 12.75l6 6 9-13.5" className="w-5 h-5 text-green-400" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Icon path="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.125 0 1.13.094 1.976 1.057 1.976 2.192V7.5m-9 3c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 011.125 0c1.13.094 1.976 1.057 1.976 2.192V19.5A2.25 2.25 0 0118 21.75H6a2.25 2.25 0 01-2.25-2.25V10.5z" className="w-5 h-5" />
                                        Copy
                                    </>
                                )}
                            </button>
                         )}
                         
                         {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                                <svg className="animate-spin h-10 w-10 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="mt-4 text-slate-400">The AI is writing your letter...</p>
                            </div>
                         ) : (
                            <div className="prose prose-invert prose-slate max-w-none whitespace-pre-wrap text-slate-300">
                                {generatedCoverLetter || <p className="text-slate-500">Your cover letter will appear here...</p>}
                            </div>
                         )}
                    </div>
                </main>
            </div>
        </div>
    );
}
