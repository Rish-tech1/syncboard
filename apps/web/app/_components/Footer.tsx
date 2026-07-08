import { appName } from "@/utils";
import { Github, Mail, Globe, ArrowUpRight, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "./Resuable/Logo";

function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#0e0e11" }}
      className="relative z-10 py-16 border-t border-white/5 text-gray-400"
    >
      {/* Dynamic light glows in footer */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description Column */}
          <div className="md:col-span-1 flex flex-col space-y-4 items-center md:items-start">
            <Link href="/" className="group flex items-center space-x-3">
              <Logo size={36} className="transition-transform group-hover:scale-105" />
              <span className="text-3xl font-bagel-fat font-semibold text-white tracking-wide transition-colors group-hover:text-purple-400">
                {appName}
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed text-center md:text-start">
              The premium real-time collaborative whiteboard built for visual thinkers, creative designers, and distributed teams.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <Link
                href="https://github.com/Rish-tech1"
                target="_blank"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/rishabhjainggsipu/"
                target="_blank"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:jainrishabh8153@gmail.com"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="flex flex-col space-y-4 text-center md:text-start">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/playground" className="hover:text-white transition-colors duration-200">
                  Playground
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white transition-colors duration-200">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/join" className="hover:text-white transition-colors duration-200">
                  Real-time Rooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col space-y-4 text-center md:text-start">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="https://github.com/Rish-tech1" target="_blank" className="inline-flex items-center hover:text-white transition-colors duration-200">
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-gray-500" />
                </Link>
              </li>
              <li>
                <Link href="/#demo" className="hover:text-white transition-colors duration-200">
                  Watch Demo
                </Link>
              </li>
              <li>
                <Link href="mailto:jainrishabh8153@gmail.com" className="hover:text-white transition-colors duration-200">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Company */}
          <div className="flex flex-col space-y-4 text-center md:text-start">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  About SyncBoard
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright block */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            &copy; 2026{" "}
            <Link
              href="/"
              className="text-gray-400 hover:text-purple-400 underline decoration-dotted transition-colors duration-200 font-medium"
            >
              {appName}
            </Link>
            . All rights reserved.
          </p>
          <div className="flex space-x-6">
            <span className="inline-flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
