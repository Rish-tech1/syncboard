"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ImageIcon, FileImage, Code2, CheckCircle2 } from "lucide-react";
import { Draw } from "@/lib/draw";

interface ExportModalProps {
  draw: Draw | undefined;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onClose: () => void;
}

type Format = "png" | "jpg" | "webp" | "svg";

interface FormatCard {
  id: Format;
  label: string;
  description: string;
  icon: React.ReactNode;
  supportsTransparency: boolean;
  color: string;
  glow: string;
}

const FORMAT_CARDS: FormatCard[] = [
  {
    id: "png",
    label: "PNG",
    description: "Lossless quality, supports transparency",
    icon: <ImageIcon className="w-6 h-6" />,
    supportsTransparency: true,
    color: "from-blue-500/20 to-blue-600/10",
    glow: "border-blue-500/40 hover:border-blue-400/70",
  },
  {
    id: "jpg",
    label: "JPG",
    description: "Compressed, smaller file size",
    icon: <FileImage className="w-6 h-6" />,
    supportsTransparency: false,
    color: "from-orange-500/20 to-orange-600/10",
    glow: "border-orange-500/40 hover:border-orange-400/70",
  },
  {
    id: "webp",
    label: "WebP",
    description: "Modern format, best compression",
    icon: <ImageIcon className="w-6 h-6" />,
    supportsTransparency: true,
    color: "from-green-500/20 to-green-600/10",
    glow: "border-green-500/40 hover:border-green-400/70",
  },
  {
    id: "svg",
    label: "SVG",
    description: "Vector format, infinitely scalable",
    icon: <Code2 className="w-6 h-6" />,
    supportsTransparency: true,
    color: "from-purple-500/20 to-purple-600/10",
    glow: "border-purple-500/40 hover:border-purple-400/70",
  },
];

const BG_OPTIONS = [
  { label: "Transparent", value: "", preview: "checkered" },
  { label: "Black", value: "#000000", preview: "#000000" },
  { label: "White", value: "#ffffff", preview: "#ffffff" },
  { label: "Dark", value: "#1a1a2e", preview: "#1a1a2e" },
];

export function ExportModal({ draw, canvasRef, onClose }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<Format>("png");
  const [bgColor, setBgColor] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const selectedCard = FORMAT_CARDS.find((f) => f.id === selectedFormat)!;
  const effectiveBg =
    selectedFormat === "jpg" && bgColor === "" ? "#000000" : bgColor;

  const handleExport = useCallback(async () => {
    if (!draw) return;
    setIsExporting(true);
    try {
      await new Promise((r) => setTimeout(r, 80)); // let UI update

      const dataUrl = draw.exportCanvas(selectedFormat, effectiveBg || undefined);

      if (selectedFormat === "svg") {
        // SVG returns a blob URL
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `syncboard-canvas.svg`;
        a.click();
        // Revoke after a tick
        setTimeout(() => URL.revokeObjectURL(dataUrl), 5000);
      } else {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `syncboard-canvas.${selectedFormat}`;
        a.click();
      }

      setExported(true);
      setTimeout(() => setExported(false), 2500);
    } finally {
      setIsExporting(false);
    }
  }, [draw, selectedFormat, effectiveBg]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-lg mx-4"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">Export Canvas</h2>
                  <p className="text-gray-400 text-xs">Choose format and options</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Format Selection */}
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                  Format
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {FORMAT_CARDS.map((card) => (
                    <motion.button
                      key={card.id}
                      id={`export-format-${card.id}`}
                      onClick={() => setSelectedFormat(card.id)}
                      className={`relative p-3 rounded-xl border transition-all duration-200 text-left
                        bg-gradient-to-br ${card.color} ${card.glow}
                        ${selectedFormat === card.id
                          ? "border-opacity-100 ring-2 ring-purple-500/50 ring-offset-1 ring-offset-zinc-900"
                          : "border-white/10"
                        }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="text-white/80 mb-2">{card.icon}</div>
                      <div className="text-white font-bold text-sm">{card.label}</div>
                      {selectedFormat === card.id && (
                        <motion.div
                          className="absolute top-2 right-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mt-2">{selectedCard.description}</p>
              </div>

              {/* Background Color */}
              {selectedFormat !== "svg" && (
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                    Background
                    {selectedFormat === "jpg" && (
                      <span className="ml-2 text-yellow-500/80 normal-case">(JPG doesn't support transparency)</span>
                    )}
                  </p>
                  <div className="flex gap-2">
                    {BG_OPTIONS.map((opt) => (
                      <button
                        key={opt.label}
                        id={`export-bg-${opt.label.toLowerCase()}`}
                        onClick={() => setBgColor(opt.value)}
                        className={`flex-1 py-2.5 rounded-lg border text-xs font-medium transition-all duration-200
                          ${bgColor === opt.value
                            ? "border-purple-500/70 text-white bg-purple-500/10"
                            : "border-white/10 text-gray-400 hover:border-white/25 hover:text-white"
                          }`}
                        title={opt.label}
                      >
                        <div className="flex flex-col items-center gap-1.5">
                          <div
                            className="w-5 h-5 rounded border border-white/20 flex-shrink-0"
                            style={
                              opt.preview === "checkered"
                                ? {
                                    background:
                                      "repeating-conic-gradient(#666 0% 25%, #333 0% 50%) 0 0 / 10px 10px",
                                  }
                                : { background: opt.preview }
                            }
                          />
                          {opt.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Export Button */}
              <motion.button
                id="export-canvas-btn"
                onClick={handleExport}
                disabled={isExporting}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
                  ${exported
                    ? "bg-green-600 text-white"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                whileHover={!isExporting ? { scale: 1.01 } : {}}
                whileTap={!isExporting ? { scale: 0.99 } : {}}
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Exporting…
                  </>
                ) : exported ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Export as {selectedFormat.toUpperCase()}
                  </>
                )}
              </motion.button>

              {/* Info */}
              <p className="text-center text-gray-600 text-xs">
                Canvas will be cropped to fit all shapes with 40px padding
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
