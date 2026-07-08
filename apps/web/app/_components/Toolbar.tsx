import React from "react";
import {
  Square,
  CircleIcon,
  Minus,
  Type,
  Pencil,
  ArrowRight,
  Diamond,
  Eraser,
  HandIcon,
  ImagePlus,
} from "lucide-react";
import { Tool } from "../../lib/draw";

const Selection = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m2 3.1782.0617.1675 6.8733 18.6544h2.0533l.0116-.002 1c0-6.0212 4.9769-10.998 10.9982-10.998l.0033-.0186v-2.0459l-18.6556-6.8738-.1674-.0617h-.1784l-1 1v.1782Zm7.6166 14.887-4.929-13.3777 13.3776 4.9291c-3.9883 1.2841-7.1645 4.4602-8.4486 8.4486Z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M21.998 10.0956c-6.5736 0-11.9025 5.3289-11.9025 11.9024l-7.139-19.0412 19.0415 7.1388Z"
      ></path>
    </svg>
  );
};

function Toolbar({
  selectedTool,
  setSelectedTool,
  handleScreenshot,
  onImageUpload,
}: {
  selectedTool: Tool | null;
  setSelectedTool: (tool: Tool | null) => void;
  handleScreenshot: () => void;
  onImageUpload: () => void;
}) {
  const tools: { type: Tool; icon: React.ReactNode; label: string }[] = [
    { type: "select", icon: <Selection />, label: "Select" },
    { type: "hand", icon: <HandIcon className="w-4 h-4" />, label: "Hand" },
    { type: "circle", icon: <CircleIcon className="w-4 h-4" />, label: "Circle" },
    { type: "rect", icon: <Square className="w-4 h-4" />, label: "Rectangle" },
    { type: "line", icon: <Minus className="w-4 h-4" />, label: "Line" },
    { type: "text", icon: <Type className="w-4 h-4" />, label: "Text" },
    { type: "pencil", icon: <Pencil className="w-4 h-4" />, label: "Pencil" },
    { type: "arrow", icon: <ArrowRight className="w-4 h-4" />, label: "Arrow" },
    { type: "diamond", icon: <Diamond className="w-4 h-4" />, label: "Diamond" },
    { type: "eraser", icon: <Eraser className="w-4 h-4" />, label: "Eraser" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-2 flex justify-center">
      <div className="flex lg:space-x-2 bg-darkbg p-1 rounded-lg shadow-lg border border-white/10">
        {tools.map((tool) => (
          <button
            key={tool.type}
            id={`toolbar-${tool.type}`}
            title={tool.label}
            onClick={() => {
              if (tool.type === "camera") {
                handleScreenshot();
              } else {
                setSelectedTool(tool.type === selectedTool ? null : tool.type);
              }
            }}
            className={`p-2 rounded-lg transition-colors ${
              selectedTool === tool.type
                ? "bg-purple-600 text-white"
                : "text-white hover:bg-gray-700"
            }`}
          >
            {tool.icon}
          </button>
        ))}

        {/* Divider */}
        <div className="w-px bg-white/10 mx-1 self-stretch" />

        {/* Image Upload Button */}
        <button
          id="toolbar-image-upload"
          title="Add Image"
          onClick={onImageUpload}
          className="p-2 rounded-lg transition-colors text-white hover:bg-emerald-600/70 hover:text-white relative group"
        >
          <ImagePlus className="w-4 h-4" />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-zinc-800 text-white px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Add Image
          </span>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;