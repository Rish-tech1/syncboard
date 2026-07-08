"use client";

import React, { useState, useEffect } from "react";
import {
  PenTool,
  Users,
  Zap,
  Share2,
  Download,
  Play,
  Check,
  ArrowRight,
  Menu,
  X,
  MousePointer,
  Cloud,
  Globe,
  Lock,
  Layers,
  Sparkles,
  Github,
  Mail,
  Twitter,
  MonitorSmartphone,
  Moon,
  Settings,
  Database,
} from "lucide-react";
import Link from "next/link";
import { appName } from "@/utils";
import Header from "./_components/Header";
import Image from "next/image";
import Footer from "./_components/Footer";
import { useUser } from "@/provider/UserProvider";
import { useRouter } from "next/navigation";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Real-time Team Collaboration",
      description:
        "Invite team members to rooms and brainstorm visually with live cursors, presence indicators, and instant updates.",
    },
    {
      icon: PenTool,
      title: "Intuitive Drawing Tools",
      description:
        "Use free-hand drawing, geometric shapes, text, and arrows to bring your ideas to life on an infinite canvas.",
    },
    {
      icon: Zap,
      title: "Instant Sync Across Devices",
      description:
        "No refreshes. Every change you make is synchronized in milliseconds across all participants' screens.",
    },
    // {
    //   icon: Shapes,
    //   title: "Smart Shapes and Connectors",
    //   description:
    //     "Design clean diagrams with built-in snapping, alignment, and connector tools for effortless wireframing or flowcharts.",
    // },
    // {
    //   icon: Lock,
    //   title: "Secure Access & Roles",
    //   description:
    //     "Manage access with login, anonymous guest mode, and role-based permissions inside team rooms.",
    // },
    {
      icon: MonitorSmartphone,
      title: "Cross-Platform Support",
      description:
        "Works beautifully on desktop, tablet, and mobile with responsive layout and optimized performance.",
    },
    // {
    //   icon: LayoutDashboard,
    //   title: "Team Dashboards",
    //   description:
    //     "Organize drawings by workspace, manage team members, and keep track of active projects in one place.",
    // },
    // {
    //   icon: ClipboardList,
    //   title: "Templates & Presets",
    //   description:
    //     "Start faster with reusable templates for brainstorming, mind maps, wireframes, and more. (Upcoming)",
    // },
    // {
    //   icon: Share2,
    //   title: "Easy Sharing",
    //   description:
    //     "Share editable or view-only links to your boards with collaborators, clients, or external teams.",
    // },
    {
      icon: Download,
      title: "Export to Image",
      description:
        "Download your canvas as high-resolution PNG files to use in docs, slides, or reports.",
    },
    {
      icon: Moon,
      title: "Light & Dark Themes",
      description:
        "Switch between light and dark modes for optimal comfort during day or night work.",
    },
    {
      icon: Settings,
      title: "Custom Properties Panel",
      description:
        "Control stroke, fill, text size, colors, and object layering through a flexible properties panel.",
    },
    {
      icon: Database,
      title: "Playground Mode",
      description:
        "Test out new features or troubleshoot issues without creating a room. No data is saved.",
    },
  ];
  const handleTryNow = () => {
    if (user) {
      router.push("/join");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ backgroundColor: "#07070a" }}
    >
      {/* Premium Ambient Background Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-fuchsia-900/10 rounded-full blur-[120px]"></div>
        {/* Subtle Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        ></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 border border-white/10 rounded-full px-4 py-2 text-sm backdrop-blur-sm cursor-pointer hover:border-purple-500/30">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-gray-300 font-medium">
                Now with Real-Time Collaboration
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-white tracking-tight">
              Collaborative Whiteboard
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                for Visual Creativity
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
              Draw, sketch, and brainstorm together in real-time. Designed for
              seamless visual collaboration—whether you are working with
              colleagues, classmates, or friends.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <button
                onClick={handleTryNow}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-purple-900/20 hover:shadow-purple-500/20 hover:scale-[1.02] transform"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href={"#demo"}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 text-gray-300 hover:text-white transition-all duration-200"
              >
                <div className="w-11 h-11 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
                  <Play className="w-4 h-4 ml-0.5 text-purple-400 fill-purple-400/20" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section id="demo" className="relative z-10 py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-zinc-950">
            <video
              src="/drw.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
              Everything you need for
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"> visual collaboration</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
              Powerful tools designed to help teams capture, iterate, and build ideas together.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/[0.01] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.03] rounded-2xl p-7 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 transform hover:-translate-y-1.5 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/10 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:border-purple-500/30">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5 transition-colors group-hover:text-purple-300">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-3xl p-8 lg:p-14 backdrop-blur-sm relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Ready to start collaborating?
            </h2>

            <p className="text-base lg:text-lg text-gray-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Join and create amazing visual projects with SyncBoard.
              <br />
              Ignite your team's creativity today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push("/playground")} 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] transform hover:shadow-lg hover:shadow-purple-500/25"
              >
                Try without login
              </button>

              <button 
                onClick={() => router.push("/sign-in")}
                className="border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 transition-all duration-300 hover:border-white/40"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
