import { useState } from 'react';
import Head from 'next/head';

const GEMINI_API_KEY = 'AIzaSyCw9oh0XVuVLJPgRcxUnpZN1DaZVhcuXNU'; // Replace with your actual API key or use env variable

export default function ToolsPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );
      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setOutput(data.candidates[0].content.parts[0].text);
      } else {
        setError('No response from Gemini API.');
      }
    } catch (err) {
      setError('Error calling Gemini API.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary">
      <Head>
        <title>AI Tools | Dhaval Makwana</title>
        <meta name="description" content="Explore multiple AI tools powered by Gemini API." />
      </Head>
      <header className="fixed top-0 w-full bg-primary bg-opacity-90 border-b border-accent z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-3xl font-mono text-accent">DM<span className="text-text">.</span></a>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-text hover:text-accent transition-colors">Home</a></li>
              <li><a href="/blog" className="text-text hover:text-accent transition-colors">Blog</a></li>
              <li><a href="/tools" className="btn-primary">AI Tools</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="pt-24 pb-16 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-accent mb-6">AI Tools</h1>
        <p className="text-textSecondary mb-8">Explore multiple AI-powered tools using the Gemini API. Try the text generation tool below!</p>
        <form onSubmit={handleGenerate} className="mb-6">
          <label htmlFor="input" className="block text-text font-semibold mb-2">Enter your prompt:</label>
          <textarea
            id="input"
            className="w-full p-3 rounded border border-accent bg-secondary text-text mb-4"
            rows={4}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask Gemini anything..."
            required
          />
          <button
            type="submit"
            className="btn-primary px-6 py-2 text-lg font-bold"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {output && (
          <div className="bg-secondary border border-accent rounded p-4 text-text whitespace-pre-line">
            <strong>Gemini Output:</strong>
            <div>{output}</div>
          </div>
        )}
        <div className="mt-12 text-textSecondary text-sm">
          <p>To add more tools, duplicate the form and change the API request as needed for other Gemini endpoints (e.g., image generation, code, etc.).</p>
        </div>
      </main>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-primary border-t border-accent">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-textSecondary">&copy; 2024 Dhaval Makwana. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
} 