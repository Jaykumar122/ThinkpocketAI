# Thinkpocket AI — Official Web Showcase

> Fully on-device private LLM & multimodal generative studio for mobile. Pure client-side static website engineered for effortless **1-click GitHub Pages hosting** with Apple-style fluid animations.

---

## 🌟 Key Highlights & Features

- **Hungry Tiger & Apple Keynote-Grade Scrollytelling & Motion Suite**:
  - **Full-Screen Sticky 3D Scrollytelling Journey (`#scrolly-journey`)**: Pinned 380vh viewport narrative featuring a photorealistic 3D smartphone rotating across 4 cinematic acts (**Silicon Sovereignty**, **Air-Gapped Privacy**, **Streaming Velocity**, **Multimodal Horizon**) with alternating frosted glass narrative cards, live Dynamic Island updates, reactive sonar/diffusion/token overlays, and 1-click tracker dots (`01`, `02`, `03`, `04`).
  - **Spring-Damped 3D Momentum Physics Engine**: Continuous 60/120FPS physics loop with lerp damping (`lerpFactor = 0.085`) on rotation, translation, scale, and gyro tilt.
  - **Interactive Titanium Finish Switcher**: 4 Apple-grade metallic finishes (**Natural Platinum**, **Desert Gold**, **Black Stealth Onyx**, **Cosmic Blue**) that dynamically re-texture all smartphone bezels and specular rims in real time.
  - **Dynamic 3D Floor Shadow with Ambient Occlusion**: Photorealistic floor shadow that dynamically stretches, rotates, and blurs in the opposite direction of the 3D phone's perspective tilt.
  - **Interactive Dynamic Island Pill**: Expandable status capsule at the top of the display that springs open on tap/hover displaying live inference telemetry (`Snapdragon NPU • 48.2 t/s`).
  - **Web Audio API Synthesized Micro-Haptic Audio Engine**: Zero-asset procedural micro-ticks on UI clicks, switches, and sliders with a navbar speaker toggle (`🔊 Sound FX: ON/OFF`).
  - **Hero Interactive Neural Particle Synapse Canvas**: Hardware-accelerated 2D canvas with drifting synaptic nodes that connect with glowing fibers and repulse away from the cursor.
  - **Giant Background Editorial Parallax Watermarks**: Enormous outlined typographic banners drifting across section backgrounds (`AIR-GAPPED SILICON`, `DART ISOLATE WORKER`, `120HZ COMPONENT DYNAMICS`, `ON-DEVICE SOVEREIGNTY`).
  - **Mobile Gyroscope Sensor Support**: Native `deviceorientation` gyro tracking so mobile/tablet users can physically tilt their phone to rotate the on-screen 3D model.
  - **Dynamic 3D Specular Glare**: Real-time reactive glass shine across the phone screen shifting gradient angle and luminosity as the device turns.
  - **3D Spatial Orbital Hardware Badges**: Floating hardware pills (`✦ Snapdragon 8 Gen 3`, `🛡️ 0 KB Cloud`, `⚡ 50+ Tokens/Sec`, `🎛️ Q4_K_M GGUF`) anchored at varying depth layers (`data-depth="45"` to `"90"`) with independent 3D parallax drift and floating bobbing.
  - **Global Viewport Scroll Progress Bar**: Gradient reading bar (`#6366f1` to `#ec4899` to `#10b981`) tracking total page scroll.
  - **Awwwards-Grade Fluid Magnetic Cursor**: Lagging magnetic glass ring that tracks the cursor and smoothly expands over interactive targets.
  - **Interactive 3D Bento Card Tilt with Specular Sheen**: Cards tilt dynamically toward the cursor with a moving radial light sheen hotspot.
  - **Active Flowing Dotted Lines**: Continuous marquee pulse along dotted dividers (`@keyframes dottedFlow`).
  - **Real-Time Render FPS Telemetry**: Live FPS counter (`120.0 FPS • GPU Composited`) in the studio chrome bar.
  - **Word-by-Word Scroll Scrubbing with Spring Pop (`[data-scrub-text]`)**: Section headlines calculate exact scroll progress, illuminating words from dim 20% opacity to glowing white.
  - **Comprehensive Multi-Device Responsive Architecture**:
    - 📱 **Mobile Phones (iOS & Android)**: Vertical non-overlapping stage (`clamp(185px, 48vw, 220px)` phone placed in upper half, narrative cards at bottom with safe-area insets), dynamic island constrained to 90% width, centered bottom dock, iOS Safari auto-zoom prevention (16px inputs), and touch drag timeline scrubber.
    - 📟 **Tablets (iPads / Android Tabs / Surface)**: Automatic portrait-to-landscape detection (side-by-side view in landscape orientation with `transX * 0.75`), `lg:` threshold mobile drawer preventing tablet navbar bunching, touch swipe on the App Tour carousel, and spatial gyroscope tilt for both smartphones.
    - 💻 **Laptops & Macs (MacBook Air/Pro, iMac, Windows)**: WebKit 3D compositing prefixes (`-webkit-transform-style: preserve-3d; -webkit-backface-visibility: hidden;`) preventing Safari clipping bugs, device pixel ratio Retina canvas rendering (`dpr = Math.min(2, window.devicePixelRatio)`), frame-rate independent delta-time physics for 120Hz ProMotion displays, and battery-preserving `IntersectionObserver` loops.
  - **Tactile Film Grain Overlay (`.hungry-grain`)**: Authentic noise texture across the canvas for editorial depth.
- **Jitter.video-Style Video Motion Design**:
  - **Kinetic Hero Typography**: Staggered spring letter/word reveals (`cubic-bezier(0.34, 1.56, 0.64, 1)`) with glowing aura gradients.
  - **Interactive Video Studio Canvas**: Mac studio header chrome (`● REC 60FPS • 4K ULTRA HD`), aspect ratio toggles (`9:20 Mobile`, `16:9 Cinema`, `1:1 Social`), and floating elastic motion stickers.
  - **Live Synthetic Video Overlays**:
    - 💬 **Real-Time Token Stream Bubble**: Live streaming token chips bursting into place.
    - 🎨 **Diffusion Laser Scanline**: Glowing neon laser beam scanning down the latent canvas.
    - 🛡️ **Air-Gap Sonar Wave**: Concentric radar ping rings verifying 0 KB transmitted.
    - ✨ **Specular Glare Shimmer**: 45-degree cinematic glass light sweep.
  - **Advanced Multi-Track Video Timeline Scrubber**:
    - Draggable glowing cyan playhead needle with millisecond timecode (`00:04.28 / 00:15.00`).
    - 3 Dedicated tracks with diamond keyframe markers (`◆ 0s`, `◆ 3s`, `◆ 6s`, `◆ 9s`, `◆ 12s`).
    - **16-Bar Animated Equalizer Waveform** reacting in real time to video playback.
    - Variable playback speeds (`0.5x`, `1x`, `1.5x`, `2x`) and 1-click restart button.
  - **One-Click Motion Presets Bar**:
    - `⚡ Spring Pop` (snappy bounce overshoot)
    - `✨ Kinetic Tokens` (bursting token stream)
    - `💥 Diffusion Scan` (laser denoise line)
    - `🛡️ Air-Gap Sonar` (expanding radar wave)
    - `🌊 Wave Drift` (liquid physics oscillation)
    - `🌀 3D Gyro Flip` (smooth 3D orbital turn)
- **Interactive "Motion Lab" Component Playground**:
  - Select components (Chat Bubble, Diffusion Canvas, Speed Meter, Air-Gap Shield) and trigger real-time spring physics (`Spring Pop`, `Kinetic Stagger`, `Elastic Jitter`, `Luminous Pulse`, `Glitch Shift`) with live CSS easing curve inspection.
- **Apple & Daylight Sky Glassmorphic Aesthetic**: Deep space dark showcase with serene daylight glassmorphism tokens, ambient mesh aurora gradients, frosted glass (`backdrop-filter: blur(24px)`), and modern typographic hierarchy (`Plus Jakarta Sans`).
- **X Design Language & Tactile Chat**: Ethereal sky blue palette with X-style post actions (Like heart, Bookmark, TTS voice readout, Regenerate, Delete), double checkmarks (`✓✓`), prompt spark chips (`Live Web: OFF`, `Explain simply`, `3 Bullets`), and live word/token estimation in local SQLite.
- **3-Engine Multimodal Creation Studio**:
  - **100% On-Device Offline Latent Diffusion**: Alibaba's SOTA Qwen-Image 2.1 Turbo 7B DiT quantized GGUF and MobileDiffusion Lite.
  - **100% On-Device Local SLM Vector Synthesis**: Procedural XML SVG generation with live code view and stream healing.
  - **Edge Cloud FLUX & AnimateDiff Motion LoRA**: Procedural looping video generation across 1:1, 9:16, and 16:9 aspect ratios.
- **Pocket Vault & 100% Offline Vector RAG**: Private Vector DB with a **384-Dimensional Cosine Index**, automatic categorization (Notes, Code, Articles, Summaries), and 1-tap "Chat with Doc".
- **Unlimited Local AI with ZERO LIMITS**: Zero daily token quotas, zero subscriptions, AVX2 SIMD acceleration, multi-core CPU thread tuning, and 0 MB RAM startup memory guarantee.
- **Tactile On-Device Streaming Simulator**: Visitors can choose from preset models (**Meta Llama 3.1 8B**, **DeepSeek-R1 Distill 7B & 1.5B with Chain-of-Thought CoT reasoning**, **Qwen 2.5 7B Flagship**, **Yi 6B Chat**, **Llama 3.2 3B**, **Gemma 2 2B**, **Llama 3.2 1B**, **Qwen 2.5 0.5B**, **SmolLM2 135M**, **Whisper Tiny Audio Transcription**) and test simulated on-device token streaming from 135M up to 8B parameters with real-time Tokens-Per-Second (TPS) telemetry, TTFT latency, and memory safety gauges.
- **5-Modality Pipeline Matrix**: Filter by modality (**Text-to-Text SLMs & LLMs from 135M to 8B parameters**, **Diffusion Image Synthesis**, **Video Motion LoRA**, **Whisper Audio Speech**, and **Google EmbeddingGemma Vector Search**).
- **Native Dual Engine & RAM Preserving Architecture**: Official `fllama` + `llama.cpp` JNI bindings with serialized single-model memory locking (0 MB RAM on startup until loaded, instant unloading, zero leaks).
- **In-App Hugging Face GGUF Explorer**: Direct search and background downloading for thousands of open-source models with chunk verification.
- **Offline Voice Notes & Whisper Speech**: Native microphone audio recording with dynamic waveforms and local Whisper transcription.
- **Google Play & Pre-Release Status**:
  - Official Google Play pre-release link (`com.thinkpocket.ai.thinkpocket`) with **Coming Soon** status.
  - Interactive Web Simulator and mobile preview QR modal.

---

## 🚀 How to Host on GitHub Pages (Zero Backend Required)

Since this website is built with pure HTML5, modern Vanilla CSS, and Vanilla JavaScript, **no build step or server is needed**.

### Step 1: Push to GitHub
In terminal / command prompt inside this folder (`d:\ThinkpocketAI website`):
```bash
git init
git add .
git commit -m "feat: complete Thinkpocket AI website with 3D scrollytelling, up to 8B LLM support, and offline simulator"
git branch -M main
git remote add origin https://github.com/Jaykumar122/ThinkpocketAI.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (top navigation tab).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
5. Under **Branch**, select `main` (or `master`) and folder `/(root)`.
6. Click **Save**.

Your website will be live in ~30 seconds at:
```
https://<your-username>.github.io/<your-repo-name>/
```

---

## 📂 Project Directory Structure

```
d:\ThinkpocketAI website\
├── index.html                  # Semantic, SEO-optimized landing page structure
├── style.css                   # Vanilla CSS design system, 3D phone frame, animations
├── app.js                      # Mouse tilt, simulator, tour carousel, modals
├── README.md                   # Setup and deployment documentation
└── assets/
    ├── images/
    │   ├── app_logo.png        # Official squircle logo
    │   ├── app_logo_symbol.png # Minimal TP symbol
    │   ├── app_logo_black.png  # Black background icon
    │   └── ic_launcher.png     # Android launcher icon
    ├── screenshots/
    │   ├── qa_home_screen.png  # Chat & streaming screen
    │   ├── qa_models_screen.png# Model manager & RAM gauges
    │   ├── qa_create_studio.png# Multimodal Studio
    │   ├── qa_create_studio_active.png
    │   ├── qa_final_create_sheet.png
    │   ├── qa_qwen_search.png  # Hugging Face live search
    │   ├── qa_studio_downloaded_filter.png
    │   └── qa_studio_models_sheet.png
    └── thinkpocket-ai-release.apk # Direct release bundle (40.9 MB • v1.2)
```

---

## 🛠️ Local Preview

You can preview the website locally anytime:

### Using Python:
```bash
python -m http.server 8080
```
Then visit [http://localhost:8080](http://localhost:8080) in your web browser.

### Or Double-Click:
You can also open [index.html](file:///d:/ThinkpocketAI%20website/index.html) directly in any modern browser!
