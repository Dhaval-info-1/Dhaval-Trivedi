import Head from 'next/head';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaMedium } from 'react-icons/fa';
import Header from '../src/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Dhaval Makwana | AI Innovation Leader & Strategic Project Manager</title>
        <meta name="description" content="Dhaval Makwana - AI Innovation Leader & Strategic Project Manager. Expert in AI/ML product development, digital transformation, and agile methodologies." />
        <meta name="keywords" content="Dhaval Makwana, AI Project Manager, Machine Learning Expert, Digital Transformation Leader, Agile Coach, AI Product Development, Tech Innovation Strategist, Future Technology Leader, AI Implementation Expert, Project Management Professional, Artificial Intelligence Consultant, Technology Vision Leader, MBA IT Professional, Enterprise AI Solutions, Deep Learning Specialist" />
        <meta name="author" content="Dhaval Makwana" />
        <meta property="og:title" content="Dhaval Makwana - Future-Forward Project Manager" />
        <meta property="og:description" content="Pioneering the future of AI product development through innovative project management and cutting-edge methodologies." />
        <meta property="og:image" content="https://github.com/Dhaval-info-1/Dhaval-Makwana/blob/main/images/7d.jpg" />
        <meta property="og:url" content="https://dhaval-info-1.github.io/Dhaval-Makwana/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dhaval Makwana Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@dhaval_info_" />
        <meta name="twitter:site" content="@dhaval_info_" />
        <meta name="twitter:title" content="Dhaval Makwana - Future-Forward Project Manager" />
        <meta name="twitter:description" content="Pioneering the future of AI product development through innovative project management." />
        <meta name="twitter:image" content="https://github.com/Dhaval-info-1/Dhaval-Makwana/blob/main/images/7d.jpg" />
        <meta name="google-site-verification" content="ouKkpKksE2eWbzxs52IK0YMZ63WpyoZ2UKFHeNEhBLg" />
      </Head>

      <Header />

      <main className="pt-20">
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-accent font-mono mb-4">Hi, my name is</p>
              <h1 className="text-5xl md:text-6xl font-bold text-text mb-4">Dhaval Makwana.</h1>
              <h2 className="text-4xl md:text-5xl text-textSecondary mb-6">I build AI-powered futures.</h2>
              <p className="text-textSecondary mb-8 max-w-lg">
                I'm an AI Innovation Leader & Strategic Project Manager specializing in crafting exceptional digital experiences through artificial intelligence. Currently, I'm focused on building accessible, human-centered AI solutions that make a difference.
              </p>
              <div className="flex space-x-4">
                <Link href="#work" className="btn-primary">View My Work</Link>
                <Link href="#contact" className="btn-secondary">Get In Touch</Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-full h-96 bg-accent bg-opacity-10 rounded-lg"></div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-text mb-8">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-textSecondary mb-4">
                  Hello! I'm Dhaval Makwana, a visionary Project Manager specializing in AI innovation and digital transformation. With an MBA in Information Technology, I bridge the gap between cutting-edge technology and strategic business objectives.
                </p>
                <p className="text-textSecondary mb-4">My expertise spans across:</p>
                <ul className="list-disc list-inside text-textSecondary mb-4">
                  <li>Artificial Intelligence & Machine Learning</li>
                  <li>Agile Project Management</li>
                  <li>Digital Transformation</li>
                  <li>Product Development & Innovation</li>
                  <li>Team Leadership & Strategy</li>
                </ul>
                <p className="text-textSecondary">
                  I'm passionate about leveraging AI to solve complex business challenges and create transformative solutions that drive measurable results. My approach combines technical expertise with strategic thinking to deliver projects that exceed expectations.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-lg overflow-hidden">
                  <img src="/images/7d.jpg" alt="Dhaval Makwana" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text mb-8">Get In Touch</h2>
            <p className="text-textSecondary mb-8 max-w-2xl mx-auto">
              I'm currently open to new opportunities and collaborations. Whether you have a question, project idea, or just want to say hi, I'll get back to you!
            </p>
            <div className="flex justify-center space-x-4">
              <a href="mailto:dhaval2123mba@gmail.com" className="btn-primary">Email Me</a>
              <a href="https://www.linkedin.com/in/dhavalmakwana-/" target="_blank" rel="noopener noreferrer" className="btn-secondary">Connect on LinkedIn</a>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <a href="https://github.com/Dhaval-info-1" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-text transition-colors">
                <FaGithub size={24} />
              </a>
              <a href="https://twitter.com/dhaval_info_" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-text transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://medium.com/@dhaval.info" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-text transition-colors">
                <FaMedium size={24} />
              </a>
              <a href="https://www.linkedin.com/in/dhavalmakwana-/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-text transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-primary border-t border-accent">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-textSecondary">&copy; 2024 Dhaval Makwana. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
} 