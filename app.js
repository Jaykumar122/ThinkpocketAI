/**
 * Thinkpocket AI — Apple-Style Interactive Web Engine
 * Pure Vanilla JavaScript • High Performance • Smooth Animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 0. WEB AUDIO SYNTHESIZED MICRO-HAPTIC AUDIO ENGINE (GLOBAL INITIALIZATION)
  // =========================================================================
  let audioCtx = null;
  let soundEnabled = false;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playHapticTick(freq = 900, duration = 0.025, type = 'sine', volume = 0.08) {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.45, audioCtx.currentTime + duration);
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // =========================================================================
  // 1. NAVIGATION & SCROLL EFFECTS
  // =========================================================================
  const mainHeader = document.getElementById('main-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Sticky Navbar Scroll Elevation
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // =========================================================================
  // 2. JITTER-STYLE VIDEO TIMELINE & MOTION WALKTHROUGH ENGINE
  // =========================================================================
  const phoneContainer = document.getElementById('phone-showcase');
  const interactivePhone = document.getElementById('ht-3d-phone') || document.getElementById('interactive-phone');
  const studioCanvasStage = document.getElementById('studio-canvas-stage') || document.getElementById('ht-3d-stage') || document.querySelector('.studio-canvas-stage');
  const activePhoneImg = document.getElementById('active-phone-img');
  const screenPills = document.querySelectorAll('.screen-pill');
  const timelineToggleBtn = document.getElementById('timeline-toggle-btn');
  const timelineReplayBtn = document.getElementById('timeline-replay-btn');
  const timelinePlayIcon = document.getElementById('timeline-play-icon');
  const timelineTrack = document.getElementById('timeline-track');
  const trackFillScreens = document.getElementById('track-fill-screens');
  const trackFillTokens = document.getElementById('track-fill-tokens');
  const trackFillCursor = document.getElementById('track-fill-cursor');
  const timelineNeedle = document.getElementById('timeline-needle');
  const timelineCurrTime = document.getElementById('timeline-curr-time');
  const motionWaveform = document.getElementById('motion-waveform');
  const speedButtons = document.querySelectorAll('.timeline-speed-chip');
  const aspectButtons = document.querySelectorAll('.studio-aspect-btn');
  const presetChips = document.querySelectorAll('.preset-chip');
  const jitterStickers = document.querySelectorAll('.jitter-sticker');
  
  // Overlays
  const liveTokenOverlay = document.getElementById('live-token-overlay');
  const tokenChipsContainer = document.getElementById('token-chips-container');
  const liveTpsBadge = document.getElementById('live-tps-badge');
  const liveDiffusionScan = document.getElementById('live-diffusion-scan');
  const liveSonarRadar = document.getElementById('live-sonar-radar');
  const motionCursor = document.getElementById('motion-cursor');
  const clickRipple = document.getElementById('click-ripple');
  const motionCaptionText = document.getElementById('motion-caption-text');
  const keyframeDiamonds = document.querySelectorAll('.keyframe-diamond');

  const videoSteps = [
    {
      id: 'chat',
      screen: 'assets/screenshots/qa_home_screen.png',
      caption: '1/6: Serene Chat & X Design: likes, bookmarks, TTS voice, spark chips & live token streaming (50+ t/s)...',
      cursor: { top: '76%', left: '86%' },
      timeStart: 0,
      timeEnd: 3,
      tokens: ['Thinkpocket', 'executes', 'quantized', 'GGUF', 'weights', 'on', 'NPU/CPU', 'zero', 'cloud', 'traffic.']
    },
    {
      id: 'search',
      screen: 'assets/screenshots/qa_qwen_search.png',
      caption: '2/6: In-App Hugging Face Explorer: Live search & 1-tap download for Qwen, DeepSeek & SmolLM...',
      cursor: { top: '22%', left: '45%' },
      timeStart: 3,
      timeEnd: 6
    },
    {
      id: 'studio',
      screen: 'assets/screenshots/qa_create_studio_active.png',
      caption: '3/6: 3-Engine Multimodal Studio: Qwen-Image 2.1 Turbo 7B DiT offline, Local SLM SVG, & AnimateDiff on GPU...',
      cursor: { top: '78%', left: '50%' },
      timeStart: 6,
      timeEnd: 9
    },
    {
      id: 'models',
      screen: 'assets/screenshots/qa_models_screen.png',
      caption: '4/6: Dynamic RAM safety guard: 11.7 GB verified safe for 7B-8B Q4_K_M weights with 0 MB startup RAM...',
      cursor: { top: '23%', left: '50%' },
      timeStart: 9,
      timeEnd: 12
    },
    {
      id: 'dashboard',
      screen: 'assets/screenshots/qa_dashboard.png',
      caption: '5/6: Unlimited Local AI & Telemetry: ZERO LIMITS, no daily quotas, AVX2 acceleration, 0 KB to cloud...',
      cursor: { top: '35%', left: '68%' },
      timeStart: 12,
      timeEnd: 15
    },
    {
      id: 'vault',
      screen: 'assets/screenshots/qa_vault_screen.png',
      caption: '6/6: Pocket Vault & 100% Offline RAG: 384-D Vector DB cosine index & 1-tap "Chat with Doc"...',
      cursor: { top: '34%', left: '38%' },
      timeStart: 15,
      timeEnd: 18
    }
  ];

  const totalDuration = 18; // 18 seconds loop
  let videoTime = 0;
  let playbackSpeed = 1.0;
  let isVideoPlaying = true;
  let lastFrameTime = performance.now();
  let currentStepIndex = -1;

  function setVideoStep(index, triggerClick = true) {
    if (index === currentStepIndex) return;
    currentStepIndex = index;
    const step = videoSteps[index];
    if (!step) return;

    // Update screen pill
    screenPills.forEach(p => {
      p.classList.toggle('active', p.dataset.screen === step.id);
    });

    // Crossfade screenshot with spring scale
    if (activePhoneImg) {
      activePhoneImg.style.opacity = '0';
      activePhoneImg.style.transform = 'scale(0.96)';
      setTimeout(() => {
        activePhoneImg.src = step.screen;
        activePhoneImg.style.opacity = '1';
        activePhoneImg.style.transform = 'scale(1)';
      }, 100);
    }

    // Update caption
    if (motionCaptionText) {
      motionCaptionText.textContent = step.caption;
    }

    // Toggle live overlays based on scene
    if (step.id === 'chat') {
      if (liveTokenOverlay) liveTokenOverlay.classList.remove('hidden-overlay');
      if (liveDiffusionScan) liveDiffusionScan.classList.remove('active-overlay');
      if (liveSonarRadar) liveSonarRadar.classList.remove('active-overlay');
      burstTokenChips();
    } else if (step.id === 'studio') {
      if (liveTokenOverlay) liveTokenOverlay.classList.add('hidden-overlay');
      if (liveDiffusionScan) liveDiffusionScan.classList.add('active-overlay');
      if (liveSonarRadar) liveSonarRadar.classList.remove('active-overlay');
    } else if (step.id === 'dashboard') {
      if (liveTokenOverlay) liveTokenOverlay.classList.add('hidden-overlay');
      if (liveDiffusionScan) liveDiffusionScan.classList.remove('active-overlay');
      if (liveSonarRadar) liveSonarRadar.classList.add('active-overlay');
    } else {
      if (liveTokenOverlay) liveTokenOverlay.classList.add('hidden-overlay');
      if (liveDiffusionScan) liveDiffusionScan.classList.remove('active-overlay');
      if (liveSonarRadar) liveSonarRadar.classList.remove('active-overlay');
    }

    // Animate cursor movement
    if (motionCursor) {
      motionCursor.classList.add('visible');
      motionCursor.style.top = step.cursor.top;
      motionCursor.style.left = step.cursor.left;

      if (triggerClick) {
        setTimeout(() => {
          motionCursor.classList.add('clicking');
          if (clickRipple) {
            clickRipple.style.top = step.cursor.top;
            clickRipple.style.left = step.cursor.left;
            clickRipple.classList.remove('animate');
            void clickRipple.offsetWidth; // trigger reflow
            clickRipple.classList.add('animate');
          }
          setTimeout(() => {
            motionCursor.classList.remove('clicking');
          }, 200);
        }, 400);
      }
    }

    // Update keyframe diamond highlights
    keyframeDiamonds.forEach((diamond, idx) => {
      diamond.classList.toggle('active-keyframe', idx <= index);
    });
  }

  // Burst new token chips into live chat overlay
  function burstTokenChips() {
    if (!tokenChipsContainer) return;
    const words = ['Local', 'GGUF', 'ARM64-v8a', 'NEON', 'SIMD', 'Matrix', '52.4 t/s', 'Zero-Cloud', 'SQLite', 'Encrypted'];
    tokenChipsContainer.innerHTML = '';
    words.forEach((w, i) => {
      setTimeout(() => {
        const chip = document.createElement('span');
        chip.className = 'live-token-chip';
        chip.textContent = w;
        tokenChipsContainer.appendChild(chip);
      }, i * 140);
    });
  }

  // Main 60FPS Video Animation Loop
  function videoTick(now) {
    if (isVideoPlaying) {
      const delta = ((now - lastFrameTime) / 1000) * playbackSpeed;
      videoTime = (videoTime + delta) % totalDuration;

      // Progress percentages
      const progressPct = (videoTime / totalDuration) * 100;
      
      // Update multi-track timeline fills
      if (trackFillScreens) trackFillScreens.style.width = `${progressPct.toFixed(1)}%`;
      if (trackFillTokens) trackFillTokens.style.width = `${((progressPct * 1.4) % 100).toFixed(1)}%`;
      if (trackFillCursor) trackFillCursor.style.width = `${progressPct.toFixed(1)}%`;
      if (timelineNeedle) timelineNeedle.style.left = `${progressPct.toFixed(1)}%`;

      // Update timestamp text (mm:ss.SS)
      if (timelineCurrTime) {
        const sec = Math.floor(videoTime);
        const centisec = Math.floor((videoTime - sec) * 100);
        timelineCurrTime.textContent = `00:${sec < 10 ? '0' : ''}${sec}.${centisec < 10 ? '0' : ''}${centisec}`;
      }

      // Determine step
      const stepIdx = Math.floor(videoTime / 3);
      setVideoStep(stepIdx);
    }
    lastFrameTime = now;
    requestAnimationFrame(videoTick);
  }

  requestAnimationFrame((now) => {
    lastFrameTime = now;
    requestAnimationFrame(videoTick);
  });

  // Play / Pause Toggle
  if (timelineToggleBtn) {
    timelineToggleBtn.addEventListener('click', () => {
      isVideoPlaying = !isVideoPlaying;
      updatePlayButtonUI();
    });
  }

  // Replay Button
  if (timelineReplayBtn) {
    timelineReplayBtn.addEventListener('click', () => {
      videoTime = 0;
      isVideoPlaying = true;
      lastFrameTime = performance.now();
      setVideoStep(0, true);
      updatePlayButtonUI();
    });
  }

  function updatePlayButtonUI() {
    if (isVideoPlaying) {
      if (timelinePlayIcon) timelinePlayIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
      if (motionWaveform) motionWaveform.classList.add('playing');
    } else {
      if (timelinePlayIcon) timelinePlayIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
      if (motionWaveform) motionWaveform.classList.remove('playing');
    }
  }

  // Multi-Track Scrubber (Click & Touch Drag for Phone/Tablet)
  function handleTimelineScrub(clientX) {
    if (!timelineTrack) return;
    const rect = timelineTrack.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    videoTime = pct * totalDuration;
    lastFrameTime = performance.now();
    const stepIdx = Math.floor(videoTime / 3);
    setVideoStep(stepIdx, true);
  }

  if (timelineTrack) {
    timelineTrack.addEventListener('click', (e) => handleTimelineScrub(e.clientX));
    timelineTrack.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) handleTimelineScrub(e.touches[0].clientX);
    }, { passive: true });
    timelineTrack.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        handleTimelineScrub(e.touches[0].clientX);
        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });
  }

  // Speed Selector Chips
  speedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      speedButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playbackSpeed = parseFloat(btn.dataset.speed) || 1.0;
    });
  });

  // Aspect Ratio Switcher
  aspectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      aspectButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const aspect = btn.dataset.aspect;
      if (studioCanvasStage) {
        studioCanvasStage.classList.remove('mode-cinema', 'mode-square');
        if (aspect === 'cinema') studioCanvasStage.classList.add('mode-cinema');
        if (aspect === 'square') studioCanvasStage.classList.add('mode-square');
      }
    });
  });

  // Motion Presets Toolbar
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      triggerMotionPreset(chip.dataset.preset);
    });
  });

  // Floating Stickers Click Action
  jitterStickers.forEach(sticker => {
    sticker.addEventListener('click', () => {
      triggerMotionPreset(sticker.dataset.preset || 'spring');
    });
  });

  function triggerMotionPreset(preset) {
    if (!interactivePhone) return;

    if (preset === 'spring') {
      interactivePhone.classList.remove('motion-anim-spring');
      void interactivePhone.offsetWidth;
      interactivePhone.classList.add('motion-anim-spring');
    } else if (preset === 'tokens') {
      videoTime = 0; // jump to chat
      setVideoStep(0, true);
      burstTokenChips();
    } else if (preset === 'diffusion') {
      videoTime = 3; // jump to studio
      setVideoStep(1, true);
    } else if (preset === 'sonar') {
      videoTime = 9; // jump to dashboard
      setVideoStep(3, true);
    } else if (preset === 'wave') {
      interactivePhone.classList.remove('motion-anim-pulse');
      void interactivePhone.offsetWidth;
      interactivePhone.classList.add('motion-anim-pulse');
      setTimeout(() => interactivePhone.classList.remove('motion-anim-pulse'), 2500);
    } else if (preset === 'gyro') {
      interactivePhone.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
      interactivePhone.style.transform = 'rotateY(360deg) scale(1.05)';
      setTimeout(() => {
        interactivePhone.style.transform = 'rotateY(0deg) scale(1)';
      }, 1200);
    }
  }

  // Clicking Screen Switcher Pills Pauses and Jumps Video
  screenPills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      videoTime = idx * 3;
      setVideoStep(idx, true);
      isVideoPlaying = false;
      updatePlayButtonUI();
    });
  });

  // Dynamic Light Aura Tracking on Hover
  if (phoneContainer && interactivePhone && window.innerWidth > 768) {
    phoneContainer.addEventListener('mousemove', (e) => {
      const rect = phoneContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const aura = interactivePhone.querySelector('.phone-glow-aura');
      if (aura) {
        const pctX = ((x / rect.width) * 100).toFixed(1);
        const pctY = ((y / rect.height) * 100).toFixed(1);
        aura.style.setProperty('--mouse-x', `${pctX}%`);
        aura.style.setProperty('--mouse-y', `${pctY}%`);
      }
    });
  }

  // =========================================================================
  // JITTER MOTION STUDIO PLAYGROUND ENGINE
  // =========================================================================
  const pgElemBtns = document.querySelectorAll('.pg-elem-btn');
  const pgActionBtns = document.querySelectorAll('.pg-action-btn');
  const pgPlayBtn = document.getElementById('playground-play-btn');
  const pgCurveLabel = document.getElementById('pg-curve-label');

  const pgTargets = {
    chat: document.getElementById('pg-target-chat'),
    diffusion: document.getElementById('pg-target-diffusion'),
    telemetry: document.getElementById('pg-target-telemetry'),
    shield: document.getElementById('pg-target-shield'),
  };

  const animEasingMap = {
    'motion-anim-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1) [Spring 800ms]',
    'motion-anim-stagger': 'cubic-bezier(0.16, 1, 0.3, 1) [Smooth Reveal]',
    'motion-anim-elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6) [Elastic Bounce]',
    'motion-anim-pulse': 'cubic-bezier(0.4, 0, 0.2, 1) [Luminous Glow]',
    'motion-anim-glitch': 'cubic-bezier(0.25, 0.46, 0.45, 0.94) [Glitch Wave]'
  };

  let currentPgElem = 'chat';
  let currentPgAnim = 'motion-anim-spring';

  // Select Element
  pgElemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pgElemBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPgElem = btn.dataset.elem;

      // Show chosen target
      Object.keys(pgTargets).forEach(key => {
        if (pgTargets[key]) {
          pgTargets[key].classList.toggle('hidden', key !== currentPgElem);
        }
      });

      triggerPlaygroundAnim();
    });
  });

  // Select Animation
  pgActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pgActionBtns.forEach(b => {
        b.classList.remove('active', 'bg-indigo-500/20', 'text-indigo-300', 'border-indigo-500/40');
        b.classList.add('bg-white/5', 'text-neutral-300', 'border-white/10');
      });
      btn.classList.add('active', 'bg-indigo-500/20', 'text-indigo-300', 'border-indigo-500/40');
      btn.classList.remove('bg-white/5', 'text-neutral-300', 'border-white/10');

      currentPgAnim = btn.dataset.anim;
      if (pgCurveLabel && animEasingMap[currentPgAnim]) {
        pgCurveLabel.textContent = animEasingMap[currentPgAnim];
      }

      triggerPlaygroundAnim();
    });
  });

  // Play Button
  if (pgPlayBtn) {
    pgPlayBtn.addEventListener('click', () => {
      triggerPlaygroundAnim();
    });
  }

  function triggerPlaygroundAnim() {
    const target = pgTargets[currentPgElem];
    if (!target) return;

    // Remove any previous anim class
    Object.keys(animEasingMap).forEach(cls => target.classList.remove(cls));
    void target.offsetWidth; // Reflow
    target.classList.add(currentPgAnim);
  }

  // =========================================================================
  // 3. INTERACTIVE LIVE TOKEN STREAMING SIMULATOR
  // =========================================================================
  const modelBtns = document.querySelectorAll('.sim-model-btn');
  const sparkBtns = document.querySelectorAll('.sim-spark');
  const promptInput = document.getElementById('sim-prompt-input');
  const runBtn = document.getElementById('sim-run-btn');
  const stopBtn = document.getElementById('sim-stop-btn');
  const outputContainer = document.getElementById('sim-output-container');
  const tpsVal = document.getElementById('sim-tps-val');
  const tpsBar = document.getElementById('sim-tps-bar');
  const tokenCountEl = document.getElementById('sim-token-count');
  const ttftVal = document.getElementById('sim-ttft-val');
  const ramVal = document.getElementById('sim-ram-val');

  let activeSimModel = {
    id: 'deepseek_r1',
    name: 'DeepSeek-R1 Distill 1.5B',
    tps: 39.5,
    ram: '5.0 GB',
    size: '1.04 GB'
  };

  let isStreaming = false;
  let streamTimer = null;
  let currentTokenIdx = 0;
  let tokensGenerated = 0;

  // Simulated Knowledge Responses for On-Device Demo
  const simulatedResponses = {
    cot: `### 🧠 DeepSeek-R1 Chain-of-Thought Reasoning

<cot-block>
**Thought Process (186 tokens generated on background isolate):**
1. The user requests an explanation of quantum superposition with step-by-step physical logic.
2. Classical mechanics dictates an object is in a definite state (e.g. bit = 0 or 1).
3. In quantum theory, the state vector |ψ⟩ is a linear combination |ψ⟩ = α|0⟩ + β|1⟩ in complex Hilbert space.
4. Probability normalization: |α|² + |β|² = 1.
5. Wavefunction collapse occurs only upon measurement via Hermitian operator projection.
6. Analogy needed: A rotating coin or musical harmonic resonance to make the concept intuitive without mathematical obscurity.
</cot-block>

### ⚛️ Understanding Quantum Superposition

Unlike classical binary switches that must be strictly **0 or 1**, a quantum system can exist in a linear combination of simultaneous states until observed.

1. **The State Vector**: Represented as \`|ψ⟩ = α|0⟩ + β|1⟩\`, where \`α\` and \`β\` represent probability amplitudes.
2. **Measurement Collapse**: When measured, the system instantaneously resolves into one definite outcome with probability \`|α|²\` or \`|β|²\`.
3. **On-Device Parallelism**: This exact principle inspires modern quantum computing and vectorized tensor operations running inside Thinkpocket's on-device matrix kernels.`,

    voice: `### 🎙️ Whisper Neural Audio Transcription (On-Device)

**Audio Recording**: \`voice_note_17292438.m4a\` (AAC-LC • 44.1 kHz • 4.2 sec)
**Transcription Model**: \`Whisper Tiny Speech\` (39M Parameters • Q5_1 • 75 MB)
**Latency**: 142 ms • **Accuracy**: 99.4% (Air-gapped)

---

> *"Meeting on device inference speed, target 45 tokens per second on Snapdragon."*

### 📋 Extracted Action Items:
- **Benchmark Target**: Achieve ≥ 45 tokens/sec sustained throughput.
- **Hardware Architecture**: Target Qualcomm Snapdragon 8 Gen 2/3 NPU vector registers.
- **Privacy Status**: 100% processed locally on device. Zero audio data left your phone microphone buffer.`,

    privacy: `### 🛡️ Why On-Device AI is the Future of Personal Computing

Running LLMs locally via **Thinkpocket AI** fundamentally transforms data security:

1. **True Air-Gapped Privacy**: Every token generation is performed directly inside your smartphone RAM using \`libllama.so\` ARM64 NEON SIMD kernels. Not a single byte is transmitted over the cellular or WiFi network.
2. **Permanent Cost Independence**: Eliminates recurring monthly API subscriptions and cloud tokens. Once downloaded, the model is yours to run forever without rate limits.
3. **Instantaneous Availability**: Works 30,000 feet in the air, during subway commutes, or in deep remote areas without any signal.
4. **Uncensored Personal Memory**: Your private documents, diary entries, and confidential business plans stay strictly locked in local encrypted SQLite.`,

    code: `### ⚡ Dart Isolate Worker for High-Performance Inference

Here is how Thinkpocket AI routes inference to background threads to guarantee a locked 120Hz UI:

\`\`\`dart
import 'dart:isolate';
import 'package:llama_cpp_dart/llama_cpp_dart.dart';

/// Worker isolate spawn entry
void llamaWorkerIsolate(SendPort uiSendPort) {
  final workerReceivePort = ReceivePort();
  uiSendPort.send(workerReceivePort.sendPort);

  LlamaProcessor? processor;

  workerReceivePort.listen((message) {
    if (message is LoadModelCommand) {
      processor = LlamaProcessor(message.modelPath);
      uiSendPort.send(StatusEvent.modelLoaded);
    } else if (message is GeneratePromptCommand) {
      processor?.streamTokens(message.prompt).listen(
        (token) => uiSendPort.send(TokenEvent(token)),
        onDone: () => uiSendPort.send(GenerationDoneEvent()),
      );
    }
  });
}
\`\`\`

*Zero UI drops. Native C++ matrix operations via FFI.*`,

    nda: `### 🔒 Non-Disclosure Agreement (Local Air-Gapped Draft)

**CONFIDENTIAL AI TECHNOLOGY DISCLOSURE SUMMARY**

- **Disclosing Party**: Thinkpocket Research Laboratory
- **Recipient**: Authorized Client
- **Purpose**: Evaluation of proprietary on-device GGUF inference pipelines and local vector embeddings.

**1. Air-Gapped Verification**: Both parties stipulate that all testing models, training weights, and inference outputs shall be processed solely on local mobile hardware with no third-party cloud routing.

**2. Offline Persistence**: Confidential session transcripts shall remain encrypted within on-device SQLite instances and may be purged instantly with zero residual cloud trace.`,

    generic: `### 🚀 On-Device Inference Telemetry Verified

Thinkpocket AI successfully loaded **{MODEL_NAME}** on background Isolate #1.

- **Engine Bindings**: \`llama.cpp\` & \`fllama\` via Dart FFI / JNI
- **Architecture**: ARM64-v8a NEON SIMD
- **Quantization**: Q4_K_M (Lossless 4-bit)
- **Zero Cloud Traffic**: Verified (0 bytes sent)

Your smartphone's dedicated neural and vector registers executed this response with native computational sovereignty. No subscriptions. No rate limits. Complete freedom.`,

    model7b: `### 👑 7B Flagship Parameter Scale Verified (On-Device)

Thinkpocket AI successfully loaded **{MODEL_NAME}** on background Isolate #1 with 0 bytes of cloud traffic:

- **Parameter Scale**: Up to 7.6 Billion Parameters (Dense Multilingual SOTA Architecture)
- **Quantization**: Q3_K_M / Q4_K_M (Lossless quantization • Memory locked to RAM)
- **Target Hardware**: 8GB–12GB+ Flagship Qualcomm Snapdragon / MediaTek Dimensity
- **Inference Speed**: ~18–24 tokens/second sustained throughput with NEON SIMD acceleration
- **Task Capability**: Full desktop-class multi-step mathematical reasoning, full code generation, deep multi-turn chat, and complex domain analysis.

Your mobile device is running a true 7B parameter foundation model entirely offline. Complete silicon sovereignty with zero API fees.`,

    model8b: `### 👑 8B Flagship Parameter Scale Verified (On-Device)

Thinkpocket AI successfully loaded **{MODEL_NAME}** on background Isolate #1 with 0 bytes of cloud traffic:

- **Parameter Scale**: 8.03 Billion Parameters (Meta Llama 3.1 8B Instruct Architecture)
- **Quantization**: Q3_K_M / Q4_K_M (Lossless quantization • Memory locked to RAM)
- **Target Hardware**: 10GB–12GB+ Flagship Qualcomm Snapdragon / MediaTek Dimensity
- **Inference Speed**: ~16–22 tokens/second sustained throughput with NEON SIMD acceleration
- **Task Capability**: Full desktop-class multi-step mathematical reasoning, full code generation, 128k context support, and complex domain analysis.

Your mobile device is running a true 8B parameter foundation model entirely offline. Complete silicon sovereignty with zero API fees.`
  };

  // Model Selection Click
  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isStreaming) stopStreaming();

      modelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeSimModel = {
        id: btn.dataset.model,
        name: btn.querySelector('.font-bold').textContent.trim(),
        tps: parseFloat(btn.dataset.tps),
        ram: btn.dataset.ram,
        size: btn.dataset.size
      };

      ramVal.textContent = activeSimModel.ram;
      tpsVal.textContent = `${activeSimModel.tps} t/s`;
      tpsBar.style.width = `${Math.min(100, (activeSimModel.tps / 90) * 100)}%`;
    });
  });

  // Prompt Sparks Click (Auto-streams on click for instant tactile interaction)
  sparkBtns.forEach(spark => {
    spark.addEventListener('click', () => {
      if (promptInput) promptInput.value = spark.dataset.prompt;
      if (isStreaming) stopStreaming();
      setTimeout(() => startStreaming(spark.dataset.prompt), 50);
    });
  });

  // Run Simulator Inference
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (isStreaming) return;
      const prompt = (promptInput && promptInput.value.trim()) || "Explain quantum superposition with step-by-step logic and show chain-of-thought thinking.";
      startStreaming(prompt);
    });
  }

  // Stop Streaming
  if (stopBtn) {
    stopBtn.addEventListener('click', stopStreaming);
  }

  function startStreaming(prompt) {
    isStreaming = true;
    runBtn.disabled = true;
    runBtn.classList.add('opacity-50');
    stopBtn.disabled = false;
    stopBtn.classList.remove('opacity-50', 'cursor-not-allowed');

    // Pick response template based on prompt content
    let fullText = simulatedResponses.generic.replace('{MODEL_NAME}', activeSimModel.name);
    const lower = prompt.toLowerCase();
    if (activeSimModel.id === 'llama8b') {
      fullText = simulatedResponses.model8b.replace('{MODEL_NAME}', activeSimModel.name);
    } else if (activeSimModel.id === 'qwen7b' || activeSimModel.id === 'yi_6b' || activeSimModel.id === 'llama32_3b') {
      fullText = simulatedResponses.model7b.replace('{MODEL_NAME}', activeSimModel.name);
    } else if (lower.includes('quantum') || lower.includes('superposition') || lower.includes('chain-of-thought') || lower.includes('cot') || activeSimModel.id === 'deepseek_r1') {
      fullText = simulatedResponses.cot;
    } else if (lower.includes('voice') || lower.includes('audio') || lower.includes('whisper') || lower.includes('transcribe') || activeSimModel.id === 'whisper') {
      fullText = simulatedResponses.voice;
    } else if (lower.includes('privacy') || lower.includes('cloud') || lower.includes('why')) {
      fullText = simulatedResponses.privacy;
    } else if (lower.includes('code') || lower.includes('dart') || lower.includes('isolate') || lower.includes('fibonacci')) {
      fullText = simulatedResponses.code;
    } else if (lower.includes('nda') || lower.includes('patent') || lower.includes('confidential')) {
      fullText = simulatedResponses.nda;
    }

    // Set up output box
    outputContainer.innerHTML = `
      <div class="user-bubble p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-neutral-200 text-xs mb-4">
        <strong class="text-indigo-400">User Prompt:</strong> ${escapeHtml(prompt)}
      </div>
      <div class="ai-response text-neutral-200 text-xs leading-relaxed space-y-2 typing-cursor" id="stream-text-target"></div>
    `;

    const targetEl = document.getElementById('stream-text-target');
    tokensGenerated = 0;
    tokenCountEl.textContent = '0';
    ttftVal.textContent = `${Math.floor(80 + Math.random() * 40)} ms`;

    // Stream word-by-word with realistic variable token cadence
    const words = fullText.split(' ');
    let wordIdx = 0;
    const baseInterval = Math.max(12, Math.floor(1000 / (activeSimModel.tps * 1.3)));

    streamTimer = setInterval(() => {
      if (wordIdx < words.length) {
        const chunk = words[wordIdx] + ' ';
        targetEl.innerHTML += formatMarkdownInline(chunk);
        outputContainer.scrollTop = outputContainer.scrollHeight;
        
        wordIdx++;
        tokensGenerated += Math.floor(1 + Math.random() * 1.5);
        tokenCountEl.textContent = tokensGenerated;

        // Dynamic jitter on TPS
        const jitter = (Math.random() * 4 - 2).toFixed(1);
        const currentTps = (activeSimModel.tps + parseFloat(jitter)).toFixed(1);
        tpsVal.textContent = `${currentTps} t/s`;
        tpsBar.style.width = `${Math.min(100, (currentTps / 90) * 100)}%`;
      } else {
        stopStreaming();
      }
    }, baseInterval);
  }

  function stopStreaming() {
    if (streamTimer) clearInterval(streamTimer);
    isStreaming = false;
    runBtn.disabled = false;
    runBtn.classList.remove('opacity-50');
    stopBtn.disabled = true;
    stopBtn.classList.add('opacity-50', 'cursor-not-allowed');

    const targetEl = document.getElementById('stream-text-target');
    if (targetEl) {
      targetEl.classList.remove('typing-cursor');
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatMarkdownInline(text) {
    return text
      .replace(/<cot-block>([\s\S]*?)<\/cot-block>/g, '<div class="p-3 my-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-mono leading-relaxed"><div class="flex items-center gap-1.5 font-bold text-purple-300 text-[11px] mb-1"><span class="animate-pulse">💭</span> <span>Chain-of-Thought Reasoning</span></div>$1</div>')
      .replace(/### (.*?)(<br>|\n|$)/g, '<div class="text-white font-bold text-sm mt-3 mb-1">$1</div>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-indigo-300 font-mono text-[11px]">$1</code>')
      .replace(/\n/g, '<br>');
  }

  // Pre-populate Simulator on page load with verified telemetry
  if (outputContainer) {
    const initialPrompt = "Why is running an LLM on-device better than using cloud APIs?";
    if (promptInput) promptInput.value = initialPrompt;
    outputContainer.innerHTML = `
      <div class="user-bubble p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-neutral-200 text-xs mb-3">
        <strong class="text-indigo-400">User Prompt:</strong> ${escapeHtml(initialPrompt)}
      </div>
      <div class="ai-response text-neutral-200 text-xs leading-relaxed space-y-2">
        <div class="text-white font-bold text-sm mb-1">🛡️ Why On-Device AI is the Future of Personal Computing</div>
        <p>Running LLMs locally via <strong class="text-white font-semibold">Thinkpocket AI</strong> fundamentally transforms data security:</p>
        <p>1. <strong class="text-white font-semibold">True Air-Gapped Privacy</strong>: Every token generation is performed directly inside your smartphone RAM using <code class="px-1.5 py-0.5 rounded bg-white/10 text-indigo-300 font-mono text-[11px]">libllama.so</code> ARM64 NEON SIMD kernels. 0 bytes sent over the network.</p>
        <p>2. <strong class="text-white font-semibold">Permanent Cost Independence</strong>: Eliminates recurring monthly API subscriptions and cloud tokens. Run models forever with zero rate limits.</p>
        <p>3. <strong class="text-white font-semibold">Instantaneous Availability</strong>: Operates 100% offline in airplane mode or during subway commutes.</p>
        <p>4. <strong class="text-white font-semibold">Uncensored Personal Memory</strong>: Private documents stay strictly locked in local encrypted SQLite.</p>
      </div>
    `;
    if (tokenCountEl) tokenCountEl.textContent = '148';
    if (ttftVal) ttftVal.textContent = '94 ms';
    if (tpsVal) tpsVal.textContent = '42.8 t/s';
    if (tpsBar) tpsBar.style.width = '48%';
  }

  // =========================================================================
  // 4. BENTO CARDS MOUSE SPOTLIGHT EFFECT
  // =========================================================================
  const bentoCards = document.querySelectorAll('.glass-bento-card');
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--card-mouse-x', `${x}px`);
      card.style.setProperty('--card-mouse-y', `${y}px`);
    });
  });

  // =========================================================================
  // 5. MODEL MATRIX MODALITY FILTER
  // =========================================================================
  const filterBtns = document.querySelectorAll('.model-filter-btn');
  const modelCards = document.querySelectorAll('#models-container > div');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      modelCards.forEach(card => {
        const modality = card.dataset.modality;
        if (filter === 'all' || modality === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 6. INTERACTIVE APP TOUR CAROUSEL
  // =========================================================================
  const tourCards = document.querySelectorAll('.tour-card');
  const tourMainImg = document.getElementById('tour-main-img');
  let tourAutoIndex = 0;
  let tourInterval = null;

  function setTourActive(index) {
    tourCards.forEach(c => c.classList.remove('active'));
    if (tourCards[index]) {
      tourCards[index].classList.add('active');
      const imgSrc = tourCards[index].dataset.tourImg;
      if (tourMainImg && imgSrc) {
        tourMainImg.style.opacity = '0';
        setTimeout(() => {
          tourMainImg.src = imgSrc;
          tourMainImg.style.opacity = '1';
        }, 150);
      }
    }
  }

  tourCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      clearInterval(tourInterval);
      tourAutoIndex = idx;
      setTourActive(idx);
    });
  });

  // Touch Swipe Support for Phones and Tablets
  if (tourMainImg) {
    let tourTouchStartX = 0;
    tourMainImg.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        tourTouchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });

    tourMainImg.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - tourTouchStartX;
        if (Math.abs(diffX) > 40) {
          clearInterval(tourInterval);
          if (diffX < 0) {
            tourAutoIndex = (tourAutoIndex + 1) % tourCards.length;
          } else {
            tourAutoIndex = (tourAutoIndex - 1 + tourCards.length) % tourCards.length;
          }
          setTourActive(tourAutoIndex);
          playHapticTick(900, 0.02, 'sine', 0.06);
        }
      }
    }, { passive: true });
  }

  // Auto-rotate tour tabs every 6s
  tourInterval = setInterval(() => {
    tourAutoIndex = (tourAutoIndex + 1) % tourCards.length;
    setTourActive(tourAutoIndex);
  }, 6000);

  // =========================================================================
  // 7. FAQ ACCORDION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (btn && content && icon) {
      btn.addEventListener('click', () => {
        const isHidden = content.classList.contains('hidden');
        
        // Close others
        faqItems.forEach(other => {
          const otherContent = other.querySelector('.faq-content');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherContent && otherIcon) {
            otherContent.classList.add('hidden');
            otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        if (isHidden) {
          content.classList.remove('hidden');
          icon.style.transform = 'rotate(180deg)';
        } else {
          content.classList.add('hidden');
          icon.style.transform = 'rotate(0deg)';
        }
      });
    }
  });

  // =========================================================================
  // 8. QR CODE MODAL TOGGLE
  // =========================================================================
  const qrToggleBtn = document.getElementById('qr-toggle-btn');
  const qrModal = document.getElementById('qr-modal');
  const qrCloseBtn = document.getElementById('qr-close-btn');

  if (qrToggleBtn && qrModal && qrCloseBtn) {
    qrToggleBtn.addEventListener('click', () => {
      qrModal.classList.remove('hidden');
    });

    qrCloseBtn.addEventListener('click', () => {
      qrModal.classList.add('hidden');
    });

    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.add('hidden');
      }
    });
  }

  // =========================================================================
  // 9. SCROLL REVEAL OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll('.glass-card, .glass-bento-card, .faq-item');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // =========================================================================
  // 10. HUNGRY TIGER SIGNATURE: WORD-BY-WORD SCROLL SCRUBBING
  // =========================================================================
  const scrubHeadlines = document.querySelectorAll('[data-scrub-text]');
  scrubHeadlines.forEach(headline => {
    const rawText = headline.textContent.trim();
    const words = rawText.split(/\s+/);
    headline.innerHTML = '';
    
    words.forEach(word => {
      const span = document.createElement('span');
      span.className = 'scrub-word';
      span.textContent = word + ' ';
      headline.appendChild(span);
    });
  });

  function updateWordScrubbers() {
    scrubHeadlines.forEach(headline => {
      // Exclude scrollytelling chapter cards as they are scrubbed by scrollytelling engine
      if (headline.closest('.scrolly-chapter-card')) return;
      const rect = headline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the headline
      const startTrigger = windowHeight * 0.85;
      const endTrigger = windowHeight * 0.25;
      
      let progress = (startTrigger - rect.top) / (startTrigger - endTrigger);
      progress = Math.max(0, Math.min(1, progress));
      
      const words = headline.querySelectorAll('.scrub-word');
      const activeWordCount = Math.floor(progress * words.length);
      
      words.forEach((w, idx) => {
        if (idx <= activeWordCount) {
          w.classList.add('active');
        } else {
          w.classList.remove('active');
        }
      });
    });
  }

  window.addEventListener('scroll', updateWordScrubbers, { passive: true });
  updateWordScrubbers();

  // =========================================================================
  // 11. HUNGRY TIGER SPRING-DAMPED CONTINUOUS 3D PHYSICS ENGINE
  // =========================================================================
  const ht3dStage = document.getElementById('ht-3d-stage');
  const ht3dPhone = document.getElementById('ht-3d-phone');
  const orbitalTags = document.querySelectorAll('.ht-orbital-tag');
  const glareEl = ht3dPhone ? ht3dPhone.querySelector('.ht-3d-glare') : null;

  let currentAngleMode = 'dynamic'; // 'dynamic', 'isometric', 'side', 'flat'

  // Physics Target & Current State (Momentum Lerp)
  let targetRotX = 14;
  let targetRotY = -18;
  let targetRotZ = -4;
  let targetTransY = 0;
  let targetTransZ = 0;
  let targetScale = 1.0;

  let currentRotX = 14;
  let currentRotY = -18;
  let currentRotZ = -4;
  let currentTransY = 0;
  let currentTransZ = 0;
  let currentScale = 1.0;

  let targetMouseTiltX = 0;
  let targetMouseTiltY = 0;
  let currentMouseTiltX = 0;
  let currentMouseTiltY = 0;

  function calculateScroll3DTargets() {
    if (currentAngleMode !== 'dynamic') return;

    const scrollY = window.scrollY;
    // Normalize progress over hero scroll distance (0 -> 1400px)
    const progress = Math.min(1, Math.max(0, scrollY / 1300));

    // Dynamic 3D orbital trajectory
    targetRotX = 14 - (progress * 20);
    targetRotY = -18 + (progress * 38);
    targetRotZ = -4 + (progress * 9);
    targetTransY = progress * 42;
    targetTransZ = Math.sin(progress * Math.PI) * 45;
    targetScale = 1.0 + Math.sin(progress * Math.PI) * 0.03;
  }

  window.addEventListener('scroll', calculateScroll3DTargets, { passive: true });
  calculateScroll3DTargets();

  // Mouse Parallax Offset (Tactile Gyro Tilt)
  if (ht3dStage) {
    ht3dStage.addEventListener('mousemove', (e) => {
      if (currentAngleMode !== 'dynamic') return;
      const rect = ht3dStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      targetMouseTiltX = -y * 20;
      targetMouseTiltY = x * 24;
    });

    ht3dStage.addEventListener('mouseleave', () => {
      targetMouseTiltX = 0;
      targetMouseTiltY = 0;
    });
  }

  // Perspective Switcher Buttons in Floating Tactical Dock
  const angleButtons = document.querySelectorAll('.ht-angle-btn');
  angleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.angle;
      currentAngleMode = mode;

      angleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      targetMouseTiltX = 0;
      targetMouseTiltY = 0;

      switch (mode) {
        case 'isometric':
          targetRotX = 18;
          targetRotY = -24;
          targetRotZ = -3;
          targetTransY = -10;
          targetTransZ = 35;
          targetScale = 1.03;
          break;
        case 'side':
          targetRotX = 6;
          targetRotY = 40;
          targetRotZ = 2;
          targetTransY = 0;
          targetTransZ = 20;
          targetScale = 0.98;
          break;
        case 'flat':
          targetRotX = 0;
          targetRotY = 0;
          targetRotZ = 0;
          targetTransY = 0;
          targetTransZ = 0;
          targetScale = 1.0;
          break;
        case 'dynamic':
        default:
          calculateScroll3DTargets();
          break;
      }
    });
  });

  // Continuous 60/120FPS Damped Physics Loop
  function physics3DTick() {
    if (ht3dPhone) {
      const lerpFactor = 0.085;

      currentMouseTiltX += (targetMouseTiltX - currentMouseTiltX) * lerpFactor;
      currentMouseTiltY += (targetMouseTiltY - currentMouseTiltY) * lerpFactor;

      currentRotX += ((targetRotX + currentMouseTiltX) - currentRotX) * lerpFactor;
      currentRotY += ((targetRotY + currentMouseTiltY) - currentRotY) * lerpFactor;
      currentRotZ += (targetRotZ - currentRotZ) * lerpFactor;
      currentTransY += (targetTransY - currentTransY) * lerpFactor;
      currentTransZ += (targetTransZ - currentTransZ) * lerpFactor;
      currentScale += (targetScale - currentScale) * lerpFactor;

      ht3dPhone.style.transform = `rotateX(${currentRotX.toFixed(3)}deg) rotateY(${currentRotY.toFixed(3)}deg) rotateZ(${currentRotZ.toFixed(3)}deg) translateY(${currentTransY.toFixed(2)}px) translateZ(${currentTransZ.toFixed(2)}px) scale(${currentScale.toFixed(3)})`;

      // Specular Glare Shine Reacting to 3D Rotation
      if (glareEl) {
        const glarePos = 48 + (currentRotY * 1.4);
        const glareOpacity = Math.min(0.65, Math.max(0.18, 0.28 + (Math.abs(currentRotY) / 50) * 0.35));
        glareEl.style.background = `linear-gradient(${115 + currentRotY * 0.7}deg, rgba(255, 255, 255, ${glareOpacity.toFixed(2)}) 0%, rgba(255, 255, 255, 0) ${glarePos.toFixed(1)}%, rgba(99, 102, 241, 0.25) 100%)`;
      }

      // Parallax Drift for 3D Orbital Tags
      orbitalTags.forEach(tag => {
        const depth = parseFloat(tag.dataset.depth) || 50;
        const driftX = (currentRotY * (depth / 60)).toFixed(2);
        const driftY = (-currentRotX * (depth / 80)).toFixed(2);
        const driftZ = (depth * (currentScale)).toFixed(2);
        tag.style.transform = `translate3d(${driftX}px, ${driftY}px, ${driftZ}px)`;
      });

      // Dynamic 3D Floor Shadow with Ambient Occlusion
      const shadowEl = document.getElementById('phone-shadow-3d');
      if (shadowEl) {
        const shadowX = -currentRotY * 2.2;
        const shadowScaleX = 1 + Math.abs(currentRotY) * 0.01;
        const shadowOpacity = Math.max(0.3, 0.7 - Math.abs(currentRotX) * 0.01);
        shadowEl.style.transform = `translateX(${shadowX.toFixed(1)}px) scaleX(${shadowScaleX.toFixed(2)})`;
        shadowEl.style.opacity = shadowOpacity.toFixed(2);
      }
    }

    requestAnimationFrame(physics3DTick);
  }
  requestAnimationFrame(physics3DTick);

  // =========================================================================
  // 11B. HUNGRY TIGER FULL-SCREEN STICKY 3D SCROLLYTELLING ENGINE (#scrolly-journey)
  // =========================================================================
  const scrollySection = document.getElementById('scrolly-journey');
  const scrollyViewport = scrollySection ? scrollySection.querySelector('.scrolly-viewport') : null;
  const scrollyPhone = document.getElementById('scrolly-phone');
  const scrollyGlare = document.getElementById('scrolly-glare');
  const scrollyShadow = document.getElementById('scrolly-shadow');
  const scrollyHalo = document.getElementById('scrolly-halo');
  const scrollyWatermark = document.getElementById('scrolly-watermark');
  const scrollyIsland = document.getElementById('scrolly-island');
  const scrollyIslandText = document.getElementById('scrolly-island-text');
  const scrollyScreenImg = document.getElementById('scrolly-screen-img');
  const scrollyLayers = document.querySelectorAll('.scrolly-screen-layer');
  const scrollyTokenOverlay = document.getElementById('scrolly-token-overlay');
  const scrollyDiffusionScan = document.getElementById('scrolly-diffusion-scan');
  const scrollySonarRadar = document.getElementById('scrolly-sonar-radar');
  const scrollyChapterCards = document.querySelectorAll('.scrolly-chapter-card');
  const scrollyTrackerItems = document.querySelectorAll('.scrolly-tracker-item');

  if (scrollySection && scrollyPhone) {
    const chapters = [
      {
        id: 0,
        title: 'ACT 01 // SILICON SOVEREIGNTY',
        rotX: 14,
        rotY: -28,
        rotZ: -3,
        transX: 160,
        transY: 0,
        scaleDesktop: 1.05,
        scaleMobile: 0.86,
        screen: 'assets/screenshots/qa_home_screen.png',
        watermark: 'SILICON SOVEREIGNTY',
        island: '✦ Snapdragon NPU • 48.2 t/s',
        halo: 'radial-gradient(circle, rgba(99, 102, 241, 0.32) 0%, rgba(168, 85, 247, 0.16) 45%, transparent 70%)',
        overlay: null
      },
      {
        id: 1,
        title: 'ACT 02 // AIR-GAPPED PRIVACY',
        rotX: 8,
        rotY: 34,
        rotZ: 2,
        transX: -160,
        transY: 0,
        scaleDesktop: 1.08,
        scaleMobile: 0.86,
        screen: 'assets/screenshots/qa_dashboard.png',
        watermark: 'AIR-GAPPED PRIVACY',
        island: '🛡️ 0 KB Cloud • Air-Gapped',
        halo: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(6, 182, 212, 0.16) 45%, transparent 70%)',
        overlay: 'sonar'
      },
      {
        id: 2,
        title: 'ACT 03 // STREAMING VELOCITY',
        rotX: -4,
        rotY: 0,
        rotZ: 0,
        transX: 160,
        transY: -10,
        scaleDesktop: 1.15,
        scaleMobile: 0.90,
        screen: 'assets/screenshots/qa_models_screen.png',
        watermark: 'STREAMING VELOCITY',
        island: '⚡ libllama.so • 52.4 t/s',
        halo: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(99, 102, 241, 0.22) 45%, transparent 70%)',
        overlay: 'token'
      },
      {
        id: 3,
        title: 'ACT 04 // MULTIMODAL HORIZON',
        rotX: 16,
        rotY: -24,
        rotZ: -3,
        transX: -160,
        transY: 0,
        scaleDesktop: 1.08,
        scaleMobile: 0.86,
        screen: 'assets/screenshots/qa_create_studio.png',
        watermark: 'MULTIMODAL STUDIO',
        island: '🎨 MobileDiffusion Active',
        halo: 'radial-gradient(circle, rgba(236, 72, 153, 0.32) 0%, rgba(168, 85, 247, 0.18) 45%, transparent 70%)',
        overlay: 'diffusion'
      }
    ];

    // Preload all chapter screenshots so there is zero delay or black image glitch during scrolling
    chapters.forEach(c => {
      const preloadImg = new Image();
      preloadImg.src = c.screen;
    });

    let scrollyActiveChapter = -1;
    let targetScrollyRotX = chapters[0].rotX;
    let targetScrollyRotY = chapters[0].rotY;
    let targetScrollyRotZ = chapters[0].rotZ;
    let targetScrollyTransX = chapters[0].transX;
    let targetScrollyTransY = chapters[0].transY;
    let targetScrollyScale = chapters[0].scaleDesktop;

    let currentScrollyRotX = targetScrollyRotX;
    let currentScrollyRotY = targetScrollyRotY;
    let currentScrollyRotZ = targetScrollyRotZ;
    let currentScrollyTransX = targetScrollyTransX;
    let currentScrollyTransY = targetScrollyTransY;
    let currentScrollyScale = targetScrollyScale;

    let scrollyMouseTiltX = 0;
    let scrollyMouseTiltY = 0;
    let currScrollyMouseX = 0;
    let currScrollyMouseY = 0;

    // Viewport mouse tracking for interactive tilt
    if (scrollyViewport) {
      scrollyViewport.addEventListener('mousemove', (e) => {
        const rect = scrollyViewport.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        scrollyMouseTiltX = -ny * 16;
        scrollyMouseTiltY = nx * 18;
      }, { passive: true });

      scrollyViewport.addEventListener('mouseleave', () => {
        scrollyMouseTiltX = 0;
        scrollyMouseTiltY = 0;
      });
    }

    // Scroll Progress Calculation & State Updates
    function updateScrollytelling() {
      const rect = scrollySection.getBoundingClientRect();
      const scrollDist = scrollySection.offsetHeight - window.innerHeight;
      if (scrollDist <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollDist));
      const isDesktop = window.innerWidth >= 1024;
      const isTabletLandscape = window.innerWidth >= 768 && window.innerWidth < 1024 && window.innerWidth > window.innerHeight;

      // Auto-hide tactical dock on mobile when inside scrollytelling to avoid covering narrative cards
      const htDock = document.getElementById('ht-dock');
      if (htDock && !isDesktop) {
        const inScrolly = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.2;
        htDock.classList.toggle('dock-hidden-mobile', inScrolly);
      }

      // Continuous 3D Keyframe Interpolation across the 4 chapters
      const scaledProgress = progress * 3;
      const segmentIdx = Math.min(2, Math.floor(scaledProgress));
      const segT = scaledProgress - segmentIdx;
      // Smoothstep easing (3t^2 - 2t^3)
      const easeT = segT * segT * (3 - 2 * segT);

      const fA = chapters[segmentIdx];
      const fB = chapters[segmentIdx + 1];

      const lerp = (a, b, t) => a + (b - a) * t;

      targetScrollyRotX = lerp(fA.rotX, fB.rotX, easeT);
      targetScrollyRotY = lerp(fA.rotY, fB.rotY, easeT);
      targetScrollyRotZ = lerp(fA.rotZ, fB.rotZ, easeT);
      targetScrollyTransX = isDesktop 
        ? lerp(fA.transX, fB.transX, easeT) 
        : (isTabletLandscape ? lerp(fA.transX * 0.75, fB.transX * 0.75, easeT) : 0);
      targetScrollyTransY = lerp(fA.transY, fB.transY, easeT);
      targetScrollyScale = isDesktop 
        ? lerp(fA.scaleDesktop, fB.scaleDesktop, easeT)
        : (isTabletLandscape ? lerp(0.92, 0.95, easeT) : lerp(fA.scaleMobile, fB.scaleMobile, easeT));

      // Determine active chapter (4 segments: 0..0.25, 0.25..0.5, 0.5..0.75, 0.75..1.0)
      const chapterIdx = Math.min(3, Math.floor(progress * 4));

      if (chapterIdx !== scrollyActiveChapter) {
        scrollyActiveChapter = chapterIdx;
        const curChap = chapters[chapterIdx];

        // Update narrative cards
        scrollyChapterCards.forEach((card, idx) => {
          card.classList.toggle('active', idx === chapterIdx);
        });

        // Update tracker nav dots
        scrollyTrackerItems.forEach((item, idx) => {
          item.classList.toggle('active', idx === chapterIdx);
        });

        // Smooth pre-rendered layer crossfade (100% zero black flash)
        if (scrollyLayers && scrollyLayers.length > 0) {
          scrollyLayers.forEach((layer, idx) => {
            layer.classList.toggle('active', idx === chapterIdx);
          });
        } else if (scrollyScreenImg && !scrollyScreenImg.src.includes(curChap.screen)) {
          scrollyScreenImg.src = curChap.screen;
          scrollyScreenImg.style.opacity = '1';
        }

        // Update Dynamic Island text
        if (scrollyIslandText) {
          scrollyIslandText.textContent = curChap.island;
        }

        // Update Watermark
        if (scrollyWatermark) {
          scrollyWatermark.textContent = curChap.watermark;
          scrollyWatermark.style.opacity = '0.35';
          setTimeout(() => {
            if (scrollyWatermark) scrollyWatermark.style.opacity = '1';
          }, 150);
        }

        // Update ambient halo
        if (scrollyHalo) {
          scrollyHalo.style.background = curChap.halo;
        }

        // Toggle chapter overlays
        if (scrollyTokenOverlay) {
          scrollyTokenOverlay.classList.toggle('hidden-overlay', curChap.overlay !== 'token');
        }
        if (scrollySonarRadar) {
          scrollySonarRadar.classList.toggle('active-overlay', curChap.overlay === 'sonar');
        }
        if (scrollyDiffusionScan) {
          scrollyDiffusionScan.classList.toggle('active-overlay', curChap.overlay === 'diffusion');
        }

        // Play haptic tick on chapter transition
        playHapticTick(900 + chapterIdx * 120, 0.03, 'triangle', 0.08);
      }

      // Word scrubbing inside active chapter card
      const activeCard = scrollyChapterCards[chapterIdx];
      if (activeCard) {
        const intraProgress = Math.max(0, Math.min(1, (progress * 4) - chapterIdx));
        const words = activeCard.querySelectorAll('.scrub-word');
        const count = Math.floor(intraProgress * words.length);
        words.forEach((w, i) => {
          w.classList.toggle('active', i <= count);
        });
      }
    }

    window.addEventListener('scroll', updateScrollytelling, { passive: true });
    window.addEventListener('resize', updateScrollytelling, { passive: true });
    updateScrollytelling();

    // Click on Tracker Dot to Jump to Chapter
    scrollyTrackerItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetChapter = parseInt(item.dataset.gotoChapter, 10);
        if (isNaN(targetChapter)) return;

        const scrollDist = scrollySection.offsetHeight - window.innerHeight;
        const targetProgress = (targetChapter + 0.3) / 4;
        const targetY = scrollySection.offsetTop + targetProgress * scrollDist;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });

        playHapticTick(1100, 0.04, 'triangle', 0.1);
      });
    });

    // 60/120FPS Damped Momentum Physics Loop for Scrolly Phone (ProMotion 120Hz Adaptive)
    let lastScrollyTick = performance.now();
    function scrollyPhysicsTick(now) {
      const deltaMs = now ? (now - lastScrollyTick) : 16.667;
      lastScrollyTick = now || performance.now();
      const dt = Math.min(32, Math.max(8, deltaMs)) / 16.667;
      const lerpFactor = 1 - Math.pow(1 - 0.085, dt);

      currScrollyMouseX += (scrollyMouseTiltX - currScrollyMouseX) * lerpFactor;
      currScrollyMouseY += (scrollyMouseTiltY - currScrollyMouseY) * lerpFactor;

      currentScrollyRotX += ((targetScrollyRotX + currScrollyMouseX) - currentScrollyRotX) * lerpFactor;
      currentScrollyRotY += ((targetScrollyRotY + currScrollyMouseY) - currentScrollyRotY) * lerpFactor;
      currentScrollyRotZ += (targetScrollyRotZ - currentScrollyRotZ) * lerpFactor;
      currentScrollyTransX += (targetScrollyTransX - currentScrollyTransX) * lerpFactor;
      currentScrollyTransY += (targetScrollyTransY - currentScrollyTransY) * lerpFactor;
      currentScrollyScale += (targetScrollyScale - currentScrollyScale) * lerpFactor;

      scrollyPhone.style.transform = `translateX(${currentScrollyTransX.toFixed(2)}px) translateY(${currentScrollyTransY.toFixed(2)}px) rotateX(${currentScrollyRotX.toFixed(3)}deg) rotateY(${currentScrollyRotY.toFixed(3)}deg) rotateZ(${currentScrollyRotZ.toFixed(3)}deg) scale(${currentScrollyScale.toFixed(3)})`;

      // Specular glare reaction
      if (scrollyGlare) {
        const glarePos = 50 + currentScrollyRotY * 1.3;
        const glareOpacity = Math.min(0.65, Math.max(0.18, 0.3 + (Math.abs(currentScrollyRotY) / 50) * 0.35));
        scrollyGlare.style.background = `linear-gradient(${120 + currentScrollyRotY * 0.8}deg, rgba(255, 255, 255, ${glareOpacity.toFixed(2)}) 0%, rgba(255, 255, 255, 0) ${glarePos.toFixed(1)}%, rgba(99, 102, 241, 0.25) 100%)`;
      }

      // Floor shadow reaction
      if (scrollyShadow) {
        const shadowShiftX = currentScrollyTransX * 0.9 - currentScrollyRotY * 2;
        const shadowScaleX = 1 + Math.abs(currentScrollyRotY) * 0.01;
        const shadowOpacity = Math.max(0.25, 0.7 - Math.abs(currentScrollyRotX) * 0.01);
        scrollyShadow.style.transform = `translateX(${shadowShiftX.toFixed(1)}px) scaleX(${shadowScaleX.toFixed(2)})`;
        scrollyShadow.style.opacity = shadowOpacity.toFixed(2);
      }

      requestAnimationFrame(scrollyPhysicsTick);
    }
    requestAnimationFrame(scrollyPhysicsTick);
  }

  // =========================================================================
  // 12. VIEWPORT SCROLL PROGRESS BAR
  // =========================================================================
  const scrollProgressBar = document.getElementById('ht-scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${pct.toFixed(2)}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // =========================================================================
  // 13. AWWWARDS-GRADE FLUID MAGNETIC CURSOR
  // =========================================================================
  const cursorDot = document.getElementById('ht-cursor-dot');
  const cursorRing = document.getElementById('ht-cursor-ring');

  if (cursorDot && cursorRing && typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    function cursorTick() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(cursorTick);
    }
    requestAnimationFrame(cursorTick);

    // Expand Ring on Hover Over Interactive Targets
    const interactiveTargets = document.querySelectorAll('a, button, .screen-pill, .preset-chip, .sim-model-btn, .sim-spark, .faq-btn, .tour-card, .finish-pill');
    interactiveTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active-hover'));
    });
  }

  // =========================================================================
  // 14. INTERACTIVE 3D BENTO CARD TILT & SPECULAR SHEEN
  // =========================================================================
  const interactiveCards = document.querySelectorAll('.glass-bento-card, .glass-card');
  interactiveCards.forEach(card => {
    // Inject dynamic specular glare layer if not present
    if (!card.querySelector('.card-specular-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-specular-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update specular hotspot
      card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
      card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);

      // Gentle 3D perspective tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * -5;
      const tiltY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // =========================================================================
  // 15. REAL-TIME RENDER FPS TELEMETRY COUNTER
  // =========================================================================
  const fpsCounterVal = document.getElementById('fps-counter-val');
  if (fpsCounterVal) {
    let frameCount = 0;
    let lastFpsTime = performance.now();

    function fpsTick(now) {
      frameCount++;
      const elapsed = now - lastFpsTime;
      if (elapsed >= 500) {
        const fps = (frameCount / (elapsed / 1000)).toFixed(1);
        fpsCounterVal.textContent = fps;
        frameCount = 0;
        lastFpsTime = now;
      }
      requestAnimationFrame(fpsTick);
    }
    requestAnimationFrame(fpsTick);
  }

  // =========================================================================
  // 16. WEB AUDIO SYNTHESIZED MICRO-HAPTIC AUDIO ENGINE (CONTROLS & LISTENERS)
  // =========================================================================
  const soundToggleBtn = document.getElementById('sound-fx-toggle');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudioContext();
      soundEnabled = !soundEnabled;
      soundToggleBtn.classList.toggle('sound-fx-active', soundEnabled);
      if (soundEnabled) {
        playHapticTick(1200, 0.04, 'triangle', 0.12);
      }
    });
  }

  // Play haptic tick on all primary UI controls
  document.querySelectorAll('button, .screen-pill, .preset-chip, .sim-model-btn, .sim-spark, .ht-angle-btn').forEach(el => {
    el.addEventListener('click', () => {
      playHapticTick(850, 0.02, 'sine', 0.07);
    });
  });

  // =========================================================================
  // 17. TITANIUM MATERIAL FINISH SWITCHER
  // =========================================================================
  const finishButtons = document.querySelectorAll('.finish-pill');
  const allPhoneBezels = document.querySelectorAll('.phone-bezel');

  finishButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      finishButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const finish = btn.dataset.finish;
      allPhoneBezels.forEach(bezel => {
        bezel.classList.remove('finish-natural', 'finish-desert', 'finish-black', 'finish-blue');
        bezel.classList.add(`finish-${finish}`);
      });

      playHapticTick(1100, 0.035, 'triangle', 0.09);
    });
  });

  // =========================================================================
  // 18. INTERACTIVE DYNAMIC ISLAND
  // =========================================================================
  const dynamicIslands = document.querySelectorAll('.phone-dynamic-island');
  dynamicIslands.forEach(island => {
    island.addEventListener('click', () => {
      island.classList.toggle('expanded');
      playHapticTick(950, 0.03, 'sine', 0.08);
      setTimeout(() => {
        island.classList.remove('expanded');
      }, 4000);
    });
  });

  // =========================================================================
  // 19. HERO INTERACTIVE NEURAL SYNAPSE CANVAS (Retina & Battery Optimized)
  // =========================================================================
  const neuralCanvas = document.getElementById('hero-neural-canvas');
  if (neuralCanvas) {
    const ctx = neuralCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: null, y: null };
    let isHeroVisible = true;

    function resizeCanvas() {
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rectWidth = heroSection.offsetWidth;
      const rectHeight = heroSection.offsetHeight;
      width = rectWidth;
      height = rectHeight;
      neuralCanvas.width = rectWidth * dpr;
      neuralCanvas.height = rectHeight * dpr;
      neuralCanvas.style.width = `${rectWidth}px`;
      neuralCanvas.style.height = `${rectHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function initParticles() {
      particles = [];
      const count = Math.min(45, Math.floor((width * height) / 28000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? 'rgba(99, 102, 241,' : 'rgba(236, 72, 153,'
        });
      }
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', (e) => {
      const heroRect = neuralCanvas.getBoundingClientRect();
      mouse.x = e.clientX - heroRect.left;
      mouse.y = e.clientY - heroRect.top;
    }, { passive: true });

    resizeCanvas();

    // Battery / GPU Optimization: Pause when hero is out of view
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const wasVisible = isHeroVisible;
          isHeroVisible = entry.isIntersecting;
          if (!wasVisible && isHeroVisible) {
            requestAnimationFrame(drawNeuralNetwork);
          }
        });
      }, { threshold: 0.05 });
      const heroEl = document.getElementById('hero');
      if (heroEl) heroObserver.observe(heroEl);
    }

    function drawNeuralNetwork() {
      if (!isHeroVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse gentle repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 2;
            p.y += (dy / dist) * force * 2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} 0.6)`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawNeuralNetwork);
    }
    requestAnimationFrame(drawNeuralNetwork);
  }

  // =========================================================================
  // 20. GIANT EDITORIAL BACKGROUND PARALLAX WATERMARKS
  // =========================================================================
  const watermarks = document.querySelectorAll('.giant-editorial-watermark');
  function updateWatermarks() {
    const scrollY = window.scrollY;
    watermarks.forEach(wm => {
      const speed = parseFloat(wm.dataset.parallaxSpeed) || 0.1;
      const transX = (scrollY * speed).toFixed(2);
      wm.style.transform = `translateX(calc(-50% + ${transX}px))`;
    });
  }
  window.addEventListener('scroll', updateWatermarks, { passive: true });
  updateWatermarks();

  // =========================================================================
  // 21. MOBILE GYROSCOPE (DEVICE ORIENTATION TILT FOR PHONES & TABLETS)
  // =========================================================================
  if (window.DeviceOrientationEvent && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltY = Math.max(-22, Math.min(22, e.gamma * 0.65));
        const tiltX = Math.max(-18, Math.min(18, (e.beta - 45) * 0.45));
        if (currentAngleMode === 'dynamic') {
          targetMouseTiltY = tiltY;
          targetMouseTiltX = tiltX;
        }
        scrollyMouseTiltY = tiltY;
        scrollyMouseTiltX = tiltX;
      }
    };

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      window.addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
            }
          })
          .catch(() => {});
      }, { once: true });
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }
  }

});

