"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Draw, Shape, Tool } from "../../lib/draw";
import Toolbar from "./Toolbar";
import { ExportModal } from "./ExportModal";
import {
  ChevronDown,
  ChevronUp,
  Download,
  LogOut,
  Minus,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import { PropertiesPanel } from "./PropertiesPanel";
import { motion } from "framer-motion";
import { saveShapesToDB } from "@/lib/indexDB";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CanvasProps {
  roomId?: string;
  socket?: WebSocket;
  allowAnonymousDrawing?: boolean;
}

function Canvas({
  roomId,
  socket,
  allowAnonymousDrawing = false,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [draw, setDraw] = useState<Draw>();
  const [selectedTool, setSelectedTool] = useState<Tool | null>("rect");
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [scale, setScale] = useState(draw?.transform.scale || 1);
  const [editingText, setEditingText] = useState<{
    id: string;
    x: number;
    y: number;
    content: string;
  } | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (draw) {
        saveShapesToDB(draw.shapes);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [draw]);

  useEffect(() => {
    if (canvasRef.current) {
      const drawInstance = new Draw(
        canvasRef.current,
        roomId!,
        socket!,
        allowAnonymousDrawing,
        session?.user?.id
      );
      setDraw(drawInstance);

      return () => {
        drawInstance.destroy();
        Object.values(drawInstance.remoteCursors).forEach((cursor) => {
          if (cursor.parentNode === document.body) {
            document.body.removeChild(cursor);
          }
        });
        const presenceUI = document.getElementById("presence-ui-container");
        if (presenceUI) {
          presenceUI.remove();
        }
      };
    }
  }, [canvasRef, roomId, socket, session]);

  useEffect(() => {
    draw?.setTool(selectedTool as Tool);
  }, [selectedTool, draw]);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleLeaveRoom = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "LEAVE_ROOM",
          payload: { roomId },
        })
      );
      socket.close();
    }
    router.push("/join");
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingText) {
      const newText = {
        ...editingText,
        content: e.target.value,
      };
      setEditingText(newText);
      draw?.updateTextContent(editingText.id, e.target.value);
    }
  };

  const handleTextBlur = () => {
    if (editingText) {
      draw?.finalizeTextEdit(editingText);
      setEditingText(null);
    }
  };

  const handleUpdateShape = (updatedShape: Shape) => {
    if (draw) {
      draw.updateShape(updatedShape);
    }
  };

  // ---------- Image Upload ----------
  const processImageFile = useCallback(
    (file: File, dropX?: number, dropY?: number) => {
      if (!draw || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = new window.Image();
        img.onload = () => {
          // Scale down if too large, keeping aspect ratio, max 600px wide/tall
          const maxSize = 600;
          const scale = Math.min(1, maxSize / img.width, maxSize / img.height);
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);

          // Place at center of canvas or at drop point
          const canvas = canvasRef.current;
          let x = 100,
            y = 100;
          if (dropX !== undefined && dropY !== undefined && canvas) {
            const rect = canvas.getBoundingClientRect();
            x =
              (dropX - rect.left - draw.transform.offsetX) /
              draw.transform.scale;
            y =
              (dropY - rect.top - draw.transform.offsetY) /
              draw.transform.scale;
          } else if (canvas) {
            x =
              (canvas.width / 2 - draw.transform.offsetX) /
                draw.transform.scale -
              w / 2;
            y =
              (canvas.height / 2 - draw.transform.offsetY) /
                draw.transform.scale -
              h / 2;
          }
          draw.addImageToCanvas(dataUrl, x, y, w, h);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    },
    [draw]
  );

  const handleImageUploadClick = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const handleImageFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processImageFile(file);
      // Reset input so same file can be selected again
      e.target.value = "";
    },
    [processImageFile]
  );

  // ---------- Drag & Drop ----------
  const handleDragOver = useCallback((e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes("Files")) {
      setIsDraggingFile(true);
    }
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingFile(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      setIsDraggingFile(false);
      const file = e.dataTransfer.files[0];
      if (file) processImageFile(file, e.clientX, e.clientY);
    },
    [processImageFile]
  );

  return (
    <>
      {/* Hidden image file input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFileChange}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${theme === "light" ? "bg-black" : "bg-white"} ${
          isDraggingFile ? "ring-4 ring-emerald-400/60 ring-inset" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />

      {/* Drag-over overlay */}
      {isDraggingFile && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
          <div className="flex flex-col items-center gap-3 bg-zinc-900/90 border-2 border-dashed border-emerald-400/70 rounded-2xl px-12 py-10">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Plus className="w-7 h-7 text-emerald-400" />
            </div>
            <p className="text-white font-semibold text-lg">Drop image here</p>
            <p className="text-gray-400 text-sm">Image will be added to the canvas</p>
          </div>
        </div>
      )}

      {/* Toolbar at bottom center */}
      <Toolbar
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        handleScreenshot={() => {}}
        onImageUpload={handleImageUploadClick}
      />

      {/* Properties panel and toggle button at bottom right */}
      <div className="flex items-end gap-2">
        <button
          onClick={togglePanel}
          className="md:hidden fixed bottom-20 right-5 md:bottom-6 bg-darkbg lg:right-[42rem] outline-none border-none p-2 lg:p-4 hover:bg-gray-700 rounded-lg"
        >
          <motion.div transition={{ duration: 0.2 }}>
            {isPanelOpen ? (
              <ChevronDown className="w-4 h-4 text-white" />
            ) : (
              <ChevronUp className="w-4 h-4 text-white" />
            )}
          </motion.div>
        </button>
        {isPanelOpen && (
          <div className="mb-2 absolute md:right-2 md:top-16 right-4 bottom-32">
            <PropertiesPanel
              onUpdateShape={handleUpdateShape}
              draw={draw}
              selectedTool={selectedTool}
            />
          </div>
        )}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-20 left-4 md:bottom-2 md:left-2 flex items-center gap-2 bg-darkbg backdrop-blur-sm rounded-lg border border-darkbg p-2 text-white">
        <button
          onClick={() =>
            draw?.zoomOut((newScale: number) => setScale(newScale))
          }
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="min-w-[40px] text-center text-xs">
          {(scale || 1).toFixed(2)}x
        </span>
        <button
          onClick={() => draw?.zoomIn((newScale: number) => setScale(newScale))}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Export button (replaces bare Download icon) */}
      <button
        id="export-canvas-trigger"
        title="Export Canvas"
        onClick={() => setShowExportModal(true)}
        className="absolute top-4 left-12 flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 border border-white/10 rounded-lg text-white text-xs font-medium transition-all duration-200 hover:scale-105 group"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden lg:inline">Export</span>
      </button>

      {/* Theme toggle */}
      {theme === "dark" ? (
        <Moon
          onClick={() => setTheme("light")}
          className={`absolute top-4 left-4 lg:right-32 w-4 h-4 hover:scale-110 transition-all ease-in-out duration-200 cursor-pointer text-black`}
        />
      ) : (
        <Sun
          onClick={() => setTheme("dark")}
          className={`absolute top-4 left-4 lg:right-32 w-4 h-4 hover:scale-110 transition-all ease-in-out duration-200 cursor-pointer text-white`}
        />
      )}

      {/* Leave button */}
      {session?.user ? (
        <button
          onClick={() => setShowLeaveConfirmation(true)}
          className={`fixed top-2 right-2 px-4 py-2 rounded-lg text-white text-xs font-medium border border-red-400/30 transition-colors duration-200 flex items-center gap-x-2 ${theme === "dark" ? "bg-red-500" : "bg-red-500/50 hover:bg-red-500"}`}
        >
          <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
          Leave
        </button>
      ) : (
        <button
          onClick={() => router.push("/sign-in")}
          className="fixed top-2 right-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500/80 text-white text-xs font-medium border border-none transition-colors duration-200 flex gap-x-2"
        >
          Sign in
        </button>
      )}

      {/* Leave confirmation modal */}
      {showLeaveConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg shadow-xl">
            <p className="mb-4 text-lg font-semibold text-white">
              Are you sure you want to leave the room?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={() => setShowLeaveConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                onClick={handleLeaveRoom}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Text editing input */}
      {editingText && (
        <div
          className="absolute"
          style={{
            left: `${editingText.x}px`,
            top: `${editingText.y - 20}px`,
            zIndex: 1000,
          }}
        >
          <input
            autoFocus
            className="bg-transparent text-white border border-white px-2 py-1 outline-none"
            value={editingText.content}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTextBlur();
              }
            }}
          />
        </div>
      )}

      {/* Iframe rendering */}
      {draw?.shapes.map((shape) => {
        if (shape.type === "iframe" && shape.url) {
          return (
            <iframe
              key={shape.id}
              src={shape.url}
              className="absolute"
              style={{
                left: shape.x * scale + (draw.transform.offsetX || 0),
                top: shape.y * scale + (draw.transform.offsetY || 0),
                width: (shape.width || 0) * scale,
                height: (shape.height || 0) * scale,
                pointerEvents: selectedTool === "iframe" ? "none" : "auto",
              }}
            />
          );
        }
        return null;
      })}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          draw={draw}
          canvasRef={canvasRef}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </>
  );
}

export default Canvas;

