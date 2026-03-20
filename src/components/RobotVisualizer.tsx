import { motion } from 'motion/react';

interface RobotVisualizerProps {
  level: number;
  success: boolean;
}

export default function RobotVisualizer({ level, success }: RobotVisualizerProps) {
  // Determine which parts of the robot to show based on level and success
  const showCore = level > 1 || (level === 1 && success);
  const showTracks = level > 2 || (level === 2 && success);
  const showEyes = level > 3 || (level === 3 && success);
  const showArms = level > 4 || (level === 4 && success);

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Head */}
        <motion.div 
          className="w-24 h-20 bg-slate-600 rounded-xl border-4 border-slate-500 relative flex items-center justify-center gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Antenna */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-6 bg-slate-500">
            <motion.div 
              className="absolute -top-2 -left-1 w-4 h-4 rounded-full bg-red-500"
              animate={{ opacity: showEyes ? [0.5, 1, 0.5] : 0.2 }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>

          {/* Eyes */}
          <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${showEyes ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-slate-800'}`}></div>
          <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${showEyes ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-slate-800'}`}></div>
        </motion.div>

        {/* Neck */}
        <div className="w-8 h-4 bg-slate-500"></div>

        {/* Body */}
        <motion.div 
          className="w-32 h-32 bg-slate-600 rounded-2xl border-4 border-slate-500 relative flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Core */}
          <motion.div 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-1000 ${showCore ? 'bg-emerald-500 shadow-[0_0_20px_#10b981]' : 'bg-slate-800'}`}
            animate={showCore ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {showCore && <div className="w-6 h-6 bg-emerald-300 rounded-full blur-sm"></div>}
          </motion.div>

          {/* Arms */}
          {showArms && (
            <>
              <motion.div 
                className="absolute -left-12 top-4 w-12 h-6 bg-slate-500 rounded-l-full origin-right"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <div className="absolute -left-2 top-1 w-4 h-4 bg-slate-400 rounded-full"></div>
              </motion.div>
              <motion.div 
                className="absolute -right-12 top-4 w-12 h-6 bg-slate-500 rounded-r-full origin-left"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <div className="absolute -right-2 top-1 w-4 h-4 bg-slate-400 rounded-full"></div>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Base/Tracks */}
        <motion.div 
          className="w-40 h-12 mt-2 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {showTracks ? (
            <div className="w-full h-full bg-slate-700 rounded-full border-4 border-slate-600 flex items-center justify-between px-2 overflow-hidden relative">
              <div className="w-6 h-6 rounded-full bg-slate-500"></div>
              <div className="w-6 h-6 rounded-full bg-slate-500"></div>
              <div className="w-6 h-6 rounded-full bg-slate-500"></div>
              {/* Track animation */}
              <motion.div 
                className="absolute inset-0 border-t-4 border-dashed border-slate-400 rounded-full"
                animate={{ x: [-20, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              />
            </div>
          ) : (
            <div className="w-24 h-4 bg-slate-800 mx-auto rounded-full mt-4"></div>
          )}
        </motion.div>
      </div>
      
      {/* Status Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <StatusBadge active={showCore} label="Núcleo" />
        <StatusBadge active={showTracks} label="Motor" />
        <StatusBadge active={showEyes} label="Sensores" />
        <StatusBadge active={showArms} label="Ensamblaje" />
      </div>
    </div>
  );
}

function StatusBadge({ active, label }: { active: boolean, label: string }) {
  return (
    <div className={`text-xs font-mono px-3 py-1 rounded-full border flex items-center gap-2 transition-colors duration-500 ${active ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-400 shadow-[0_0_5px_#34d399]' : 'bg-slate-600'}`}></div>
      {label}
    </div>
  );
}
