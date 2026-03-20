import { useState, useEffect } from 'react';
import { lessons } from './data/lessons';
import { projects } from './data/projects';
import { debugChallenges } from './data/debug';
import { exercises } from './data/exercises';
import { badges } from './data/badges';
import { ModuleId } from './types';
import CodeEditor from './components/CodeEditor';
import AITutor from './components/AITutor';
import { Terminal, Trophy, ChevronRight, BookOpen, Hammer, Bug, CheckCircle2, AlertTriangle, Lightbulb, Menu, X, Dumbbell, Star, Medal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('lessons');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Gamification State
  const [xp, setXp] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const level = Math.floor(xp / 100) + 1;
  const xpProgress = (xp % 100) / 100;

  // State for Lessons
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [lessonSuccess, setLessonSuccess] = useState<boolean | null>(null);
  
  // State for Projects
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [projectSuccess, setProjectSuccess] = useState<boolean | null>(null);
  
  // State for Debug
  const [currentDebugIdx, setCurrentDebugIdx] = useState(0);
  const [debugSuccess, setDebugSuccess] = useState<boolean | null>(null);

  // State for Exercises
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [exerciseSuccess, setExerciseSuccess] = useState<boolean | null>(null);
  const [exerciseFeedback, setExerciseFeedback] = useState<string>('');
  const [exerciseOutput, setExerciseOutput] = useState<string>('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rewardXp, setRewardXp] = useState(0);

  const awardXp = (amount: number) => {
    setXp(prev => prev + amount);
    setRewardXp(amount);
  };

  const checkBadges = (module: ModuleId) => {
    const newBadges = [...earnedBadges];
    if (module === 'lessons' && !newBadges.includes('first_blood')) newBadges.push('first_blood');
    if (module === 'lessons' && currentLessonIdx >= 1 && !newBadges.includes('variable_master')) newBadges.push('variable_master');
    if (module === 'lessons' && currentLessonIdx >= 6 && !newBadges.includes('loop_hero')) newBadges.push('loop_hero');
    if (module === 'debug' && !newBadges.includes('bug_hunter')) newBadges.push('bug_hunter');
    if (module === 'projects' && !newBadges.includes('project_builder')) newBadges.push('project_builder');
    if (module === 'exercises' && !newBadges.includes('exercise_pro')) newBadges.push('exercise_pro');
    
    if (newBadges.length > earnedBadges.length) {
      setEarnedBadges(newBadges);
    }
  };

  // --- Handlers ---
  const handleRunLesson = (code: string) => {
    const isCorrect = lessons[currentLessonIdx].validate(code);
    setLessonSuccess(isCorrect);
    if (isCorrect) {
      awardXp(10);
      checkBadges('lessons');
      setTimeout(() => setShowSuccessModal(true), 1000);
    }
  };

  const handleRunProject = (code: string) => {
    const step = projects[currentProjectIdx].steps[currentStepIdx];
    const isCorrect = step.validate(code);
    setProjectSuccess(isCorrect);
    if (isCorrect) {
      awardXp(15);
      checkBadges('projects');
      setTimeout(() => setShowSuccessModal(true), 1000);
    }
  };

  const handleRunDebug = (code: string) => {
    const isCorrect = debugChallenges[currentDebugIdx].validate(code);
    setDebugSuccess(isCorrect);
    if (isCorrect) {
      awardXp(20);
      checkBadges('debug');
      setTimeout(() => setShowSuccessModal(true), 1000);
    }
  };

  const simulatePythonOutput = (code: string, exerciseId: string) => {
    if (exerciseId === 'ex1' && code.includes('print')) return '7.5';
    if (exerciseId === 'ex2' && code.includes('print') && code.includes('nombre')) return 'Hola Python';
    if (exerciseId === 'ex3' && code.includes('while') && code.includes('print')) return '3\n2\n1\n¡Despegue!';
    if (exerciseId === 'ex4' && code.includes('for') && code.includes('print') && code.includes('% 2')) return '2\n4\n6';
    return 'Error: No se pudo ejecutar o falta código.';
  };

  const handleRunExercise = (code: string) => {
    const exercise = exercises[currentExerciseIdx];
    const output = simulatePythonOutput(code, exercise.id);
    setExerciseOutput(output);
    
    const result = exercise.validate(code, output);
    setExerciseSuccess(result.success);
    setExerciseFeedback(result.feedback);
    
    if (result.success) {
      awardXp(exercise.xpReward);
      checkBadges('exercises');
      setTimeout(() => setShowSuccessModal(true), 1500);
    }
  };

  const nextItem = () => {
    setShowSuccessModal(false);
    if (activeModule === 'lessons') {
      if (currentLessonIdx < lessons.length - 1) {
        setCurrentLessonIdx(prev => prev + 1);
        setLessonSuccess(null);
      }
    } else if (activeModule === 'projects') {
      const project = projects[currentProjectIdx];
      if (currentStepIdx < project.steps.length - 1) {
        setCurrentStepIdx(prev => prev + 1);
        setProjectSuccess(null);
      } else if (currentProjectIdx < projects.length - 1) {
        setCurrentProjectIdx(prev => prev + 1);
        setCurrentStepIdx(0);
        setProjectSuccess(null);
      }
    } else if (activeModule === 'debug') {
      if (currentDebugIdx < debugChallenges.length - 1) {
        setCurrentDebugIdx(prev => prev + 1);
        setDebugSuccess(null);
      }
    } else if (activeModule === 'exercises') {
      if (currentExerciseIdx < exercises.length - 1) {
        setCurrentExerciseIdx(prev => prev + 1);
        setExerciseSuccess(null);
        setExerciseOutput('');
        setExerciseFeedback('');
      }
    }
  };

  const selectItem = (setter: any, idx: number, successSetter: any) => {
    setter(idx);
    successSetter(null);
    if (activeModule === 'exercises') {
      setExerciseOutput('');
      setExerciseFeedback('');
    }
    setIsMobileMenuOpen(false);
  };

  // --- Render Helpers ---
  const renderSidebar = () => (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-emerald-400">
              <Terminal size={24} />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Python Academy</h1>
                <span className="text-[10px] text-zinc-500 font-medium">by Marco Gugliuandolo López</span>
              </div>
            </div>
            <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          {/* Gamification Stats */}
          <div className="bg-zinc-900/50 rounded-xl p-3 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-500/20 text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                  {level}
                </div>
                <span className="text-sm font-medium text-zinc-300">Nivel {level}</span>
              </div>
              <button 
                onClick={() => setShowBadgesModal(true)}
                className="text-xs flex items-center gap-1 text-yellow-500 hover:text-yellow-400 transition-colors bg-yellow-500/10 px-2 py-1 rounded-md"
              >
                <Medal size={14} />
                <span>{earnedBadges.length}</span>
              </button>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="text-[10px] text-zinc-500 mt-1 text-right">{xp} XP</div>
          </div>
        </div>
        
        {/* Module Tabs */}
        <div className="grid grid-cols-2 gap-1 p-3 border-b border-white/10 bg-zinc-900/30">
          <button onClick={() => setActiveModule('lessons')} className={`py-2 rounded-lg flex flex-col items-center gap-1 transition-all ${activeModule === 'lessons' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-zinc-400 hover:bg-white/5 border border-transparent'}`}>
            <BookOpen size={18} />
            <span className="text-xs font-medium">Lecciones</span>
          </button>
          <button onClick={() => setActiveModule('exercises')} className={`py-2 rounded-lg flex flex-col items-center gap-1 transition-all ${activeModule === 'exercises' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-white/5 border border-transparent'}`}>
            <Dumbbell size={18} />
            <span className="text-xs font-medium">Ejercicios</span>
          </button>
          <button onClick={() => setActiveModule('projects')} className={`py-2 rounded-lg flex flex-col items-center gap-1 transition-all ${activeModule === 'projects' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-zinc-400 hover:bg-white/5 border border-transparent'}`}>
            <Hammer size={18} />
            <span className="text-xs font-medium">Proyectos</span>
          </button>
          <button onClick={() => setActiveModule('debug')} className={`py-2 rounded-lg flex flex-col items-center gap-1 transition-all ${activeModule === 'debug' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-zinc-400 hover:bg-white/5 border border-transparent'}`}>
            <Bug size={18} />
            <span className="text-xs font-medium">Clínica</span>
          </button>
        </div>

        {/* List Items based on active module */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <AnimatePresence mode="popLayout">
            {activeModule === 'lessons' && lessons.map((l, idx) => (
              <motion.button 
                key={l.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                onClick={() => selectItem(setCurrentLessonIdx, idx, setLessonSuccess)} 
                className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center gap-3 ${idx === currentLessonIdx ? 'bg-blue-500/10 border border-blue-500/30 text-blue-100' : 'text-zinc-400 hover:bg-white/5 border border-transparent'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === currentLessonIdx ? 'bg-blue-500 text-white' : 'bg-zinc-800'}`}>{idx + 1}</div>
                <span className="font-medium text-sm truncate">{l.title}</span>
              </motion.button>
            ))}

            {activeModule === 'projects' && projects.map((p, idx) => (
              <motion.button 
                key={p.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                onClick={() => { selectItem(setCurrentProjectIdx, idx, setProjectSuccess); setCurrentStepIdx(0); }} 
                className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center gap-3 ${idx === currentProjectIdx ? 'bg-purple-500/10 border border-purple-500/30 text-purple-100' : 'text-zinc-400 hover:bg-white/5 border border-transparent'}`}
              >
                <Hammer size={18} className={idx === currentProjectIdx ? 'text-purple-400' : 'text-zinc-500'} />
                <span className="font-medium text-sm truncate">{p.title}</span>
              </motion.button>
            ))}

            {activeModule === 'debug' && debugChallenges.map((d, idx) => (
              <motion.button 
                key={d.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                onClick={() => selectItem(setCurrentDebugIdx, idx, setDebugSuccess)} 
                className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center gap-3 ${idx === currentDebugIdx ? 'bg-orange-500/10 border border-orange-500/30 text-orange-100' : 'text-zinc-400 hover:bg-white/5 border border-transparent'}`}
              >
                <Bug size={18} className={idx === currentDebugIdx ? 'text-orange-400' : 'text-zinc-500'} />
                <span className="font-medium text-sm truncate">{d.title}</span>
              </motion.button>
            ))}
            {activeModule === 'exercises' && exercises.map((e, idx) => (
              <motion.button 
                key={e.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                onClick={() => selectItem(setCurrentExerciseIdx, idx, setExerciseSuccess)} 
                className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center gap-3 ${idx === currentExerciseIdx ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-100' : 'text-zinc-400 hover:bg-white/5 border border-transparent'}`}
              >
                <Dumbbell size={18} className={idx === currentExerciseIdx ? 'text-emerald-400' : 'text-zinc-500'} />
                <span className="font-medium text-sm truncate">{e.title}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );

  const renderLessonView = () => {
    const lesson = lessons[currentLessonIdx];
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="shrink-0 p-5 lg:p-8 border-b border-white/5 bg-zinc-900/20">
          <h2 className="text-xl lg:text-2xl font-bold text-blue-400">{lesson.title}</h2>
          <p className="text-zinc-400 mt-1 text-sm lg:text-base">Aprende los conceptos básicos</p>
        </header>
        <div className="flex-1 p-4 lg:p-6 flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 overflow-y-auto lg:overflow-hidden">
          <div className="flex flex-col gap-4 lg:gap-6 lg:overflow-y-auto lg:pr-2">
            <div className="glass-panel p-5 lg:p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><BookOpen size={20} className="text-blue-400"/> Teoría</h3>
              <p className="text-zinc-300 leading-relaxed text-sm lg:text-base">{lesson.theory}</p>
            </div>
            <div className="glass-panel p-5 lg:p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Lightbulb size={20} className="text-yellow-400"/> Ejemplo</h3>
              <CodeEditor initialCode={lesson.exampleCode} readOnly title="ejemplo.py" />
            </div>
          </div>
          <div className="flex flex-col gap-4 min-h-[400px] lg:min-h-0">
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
              <p className="text-blue-200 font-medium text-sm lg:text-base">{lesson.instruction}</p>
            </div>
            <div className="flex-1 min-h-[300px] lg:min-h-0">
              <CodeEditor initialCode={lesson.initialCode} onRun={handleRunLesson} success={lessonSuccess} lockedPrefix={lesson.initialCode} />
            </div>
            <div className="shrink-0">
              <AITutor code={lesson.initialCode} instruction={lesson.instruction} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectView = () => {
    const project = projects[currentProjectIdx];
    const step = project.steps[currentStepIdx];
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="shrink-0 p-5 lg:p-8 border-b border-white/5 bg-zinc-900/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-purple-400">{project.title}</h2>
            <p className="text-zinc-400 mt-1 text-sm lg:text-base">{project.description}</p>
          </div>
          <div className="flex gap-2">
            {project.steps.map((s, i) => (
              <div key={s.id} className={`flex-1 lg:w-8 h-2 rounded-full ${i < currentStepIdx ? 'bg-purple-500' : i === currentStepIdx ? 'bg-purple-400 shadow-[0_0_10px_#a855f7]' : 'bg-zinc-800'}`} />
            ))}
          </div>
        </header>
        <div className="flex-1 p-4 lg:p-6 flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 overflow-y-auto lg:overflow-hidden">
          <div className="flex flex-col gap-4 min-h-[400px] lg:min-h-0">
            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
              <p className="text-purple-200 font-medium text-sm lg:text-base">{step.instruction}</p>
            </div>
            <div className="flex-1 min-h-[300px] lg:min-h-0">
              <CodeEditor initialCode={step.initialCode} onRun={handleRunProject} success={projectSuccess} lockedPrefix={step.initialCode} />
            </div>
            <div className="shrink-0">
              <AITutor code={step.initialCode} instruction={step.instruction} />
            </div>
          </div>
          <div className="flex flex-col min-h-[300px] lg:min-h-0">
            <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
              <h3 className="text-lg lg:text-xl font-bold text-zinc-300 mb-6 lg:mb-8 z-10">Progreso del Proyecto</h3>
              <div className="flex flex-col gap-3 lg:gap-4 w-full max-w-md z-10">
                {project.steps.map((s, i) => (
                  <motion.div 
                    key={s.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: i <= currentStepIdx ? 1 : 0.3, x: 0 }}
                    className={`p-3 lg:p-4 rounded-xl border flex items-center gap-3 lg:gap-4 ${i < currentStepIdx || (i === currentStepIdx && projectSuccess) ? 'bg-purple-500/10 border-purple-500/30 text-purple-200' : 'bg-zinc-900/50 border-white/5 text-zinc-500'}`}
                  >
                    {i < currentStepIdx || (i === currentStepIdx && projectSuccess) ? <CheckCircle2 className="text-purple-400 shrink-0" /> : <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 border-zinc-700 shrink-0" />}
                    <span className="font-medium text-sm lg:text-base">{s.unlockedFeature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDebugView = () => {
    const challenge = debugChallenges[currentDebugIdx];
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="shrink-0 p-5 lg:p-8 border-b border-white/5 bg-zinc-900/20">
          <h2 className="text-xl lg:text-2xl font-bold text-orange-400">{challenge.title}</h2>
          <p className="text-zinc-400 mt-1 text-sm lg:text-base">Encuentra y corrige el error</p>
        </header>
        <div className="flex-1 p-4 lg:p-6 flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 overflow-y-auto lg:overflow-hidden">
          <div className="flex flex-col gap-4 lg:gap-6 lg:overflow-y-auto lg:pr-2">
            <div className="bg-red-500/5 border border-red-500/20 p-5 lg:p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-400"><AlertTriangle size={20} /> Consola de Error</h3>
              <div className="bg-[#0d0d0d] p-4 rounded-lg font-mono text-xs lg:text-sm text-red-400 border border-white/5 overflow-x-auto">
                {challenge.errorOutput}
              </div>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 p-5 lg:p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-orange-400"><Bug size={20} /> Análisis</h3>
              <p className="text-orange-200 leading-relaxed text-sm lg:text-base">{challenge.question}</p>
            </div>
            {debugSuccess && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500/10 border border-emerald-500/20 p-5 lg:p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-2 text-emerald-400">Explicación</h3>
                <p className="text-emerald-200 text-sm lg:text-base">{challenge.explanation}</p>
              </motion.div>
            )}
          </div>
          <div className="flex flex-col gap-4 min-h-[400px] lg:min-h-0">
            <div className="flex-1 min-h-[300px] lg:min-h-0">
              <CodeEditor initialCode={challenge.brokenCode} onRun={handleRunDebug} success={debugSuccess} />
            </div>
            <div className="shrink-0">
              <AITutor code={challenge.brokenCode} instruction={challenge.question} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExerciseView = () => {
    const exercise = exercises[currentExerciseIdx];
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="shrink-0 p-5 lg:p-8 border-b border-white/5 bg-zinc-900/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-emerald-400">{exercise.title}</h2>
            <p className="text-zinc-400 mt-1 text-sm lg:text-base">Práctica interactiva</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20">
            <Star size={16} fill="currentColor" />
            <span className="font-bold text-sm">+{exercise.xpReward} XP</span>
          </div>
        </header>
        <div className="flex-1 p-4 lg:p-6 flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 overflow-y-auto lg:overflow-hidden">
          <div className="flex flex-col gap-4 lg:gap-6 lg:overflow-y-auto lg:pr-2">
            <div className="glass-panel p-5 lg:p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-emerald-400"><Dumbbell size={20} /> El Reto</h3>
              <p className="text-zinc-300 leading-relaxed text-sm lg:text-base">{exercise.description}</p>
            </div>
            <div className="shrink-0">
              <AITutor code={exercise.starterCode} instruction={exercise.description} />
            </div>
          </div>
          <div className="flex flex-col gap-4 min-h-[400px] lg:min-h-0">
            <div className="flex-1 min-h-[300px] lg:min-h-0">
              <CodeEditor 
                initialCode={exercise.starterCode} 
                onRun={handleRunExercise} 
                success={exerciseSuccess} 
                feedbackMessage={exerciseFeedback}
                consoleOutput={exerciseOutput}
                lockedPrefix={exercise.starterCode}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 text-zinc-50 flex font-sans selection:bg-emerald-500/30 overflow-hidden">
      {renderSidebar()}
      
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-white/10 flex items-center px-4 bg-zinc-950/80 backdrop-blur-md shrink-0 z-30">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2 ml-2">
            <Terminal size={20} className="text-emerald-400" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white leading-tight">Python Academy</span>
              <span className="text-[9px] text-zinc-500 font-medium">by Marco Gugliuandolo López</span>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeModule}-${activeModule === 'lessons' ? currentLessonIdx : activeModule === 'projects' ? currentProjectIdx : activeModule === 'exercises' ? currentExerciseIdx : currentDebugIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col min-w-0 h-full overflow-hidden"
          >
            {activeModule === 'lessons' && renderLessonView()}
            {activeModule === 'exercises' && renderExerciseView()}
            {activeModule === 'projects' && renderProjectView()}
            {activeModule === 'debug' && renderDebugView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 p-6 lg:p-8 rounded-3xl shadow-2xl w-full max-w-md text-center"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-400" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-2 text-white">¡Excelente Trabajo!</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed text-sm lg:text-base">
                {activeModule === 'lessons' && lessons[currentLessonIdx].successMessage}
                {activeModule === 'projects' && projects[currentProjectIdx].steps[currentStepIdx].successMessage}
                {activeModule === 'debug' && debugChallenges[currentDebugIdx].explanation}
                {activeModule === 'exercises' && exerciseFeedback}
              </p>
              
              {rewardXp > 0 && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-lg mb-6 bg-emerald-500/10 py-2 rounded-xl border border-emerald-500/20"
                >
                  <Star size={20} fill="currentColor" />
                  +{rewardXp} XP
                </motion.div>
              )}
              
              <button
                onClick={nextItem}
                className="w-full py-3.5 lg:py-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl font-bold text-base lg:text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Continuar
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Badges Modal */}
      <AnimatePresence>
        {showBadgesModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowBadgesModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 p-6 lg:p-8 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                  <Medal className="text-yellow-500" />
                  Tus Insignias
                </h3>
                <button onClick={() => setShowBadgesModal(false)} className="text-zinc-400 hover:text-white p-2">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {badges.map(badge => {
                    const isEarned = earnedBadges.includes(badge.id);
                    return (
                      <div 
                        key={badge.id} 
                        className={`p-4 rounded-2xl border flex items-start gap-4 transition-all ${isEarned ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-zinc-900/50 border-white/5 opacity-50 grayscale'}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-2xl ${isEarned ? 'bg-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'bg-zinc-800'}`}>
                          {badge.icon}
                        </div>
                        <div>
                          <h4 className={`font-bold ${isEarned ? 'text-yellow-400' : 'text-zinc-400'}`}>{badge.name}</h4>
                          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{badge.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
