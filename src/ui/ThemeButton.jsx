import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const [isOn, setIsOn] = useState(true);

  return (
    <div className="flex items-center gap-3">
      <Sun size={18} className="text-gray-500" />

      <button
        onClick={() => setIsOn(!isOn)}
        className="w-12 h-6 flex items-center rounded-full px-1 
                   bg-gray-700 cursor-pointer transition-all"
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all
                      ${isOn ? "translate-x-6" : "translate-x-0"}`}
        />
      </button>

      <Moon size={18} className="text-blue-300" />
    </div>
  );
}
