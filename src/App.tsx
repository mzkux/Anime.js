import "./App.css";

import {
  animate,
  createAnimatable,
  createDraggable,
  createTimer,
  onScroll,
  stagger,
  svg,
  text,
  utils,
} from "animejs";
import { useEffect, useRef } from "react";

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomColor(): string {
  return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)})`;
}

function App() {
  const timeRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLDivElement>(null);
  const yRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  console.log("App rendered");

  useEffect(() => {
    const { chars } = text.split(".text", {
      chars: { wrap: "clip" },
    });

    animate(chars, {
      y: [{ to: ["100%", "0%"] }, { to: "-100%", delay: 750, ease: "in(3)" }],
      duration: 1000,
      ease: "out(3)",
      delay: stagger(50),
      loop: true,
    });

    animate(svg.createDrawable(".line"), {
      draw: ["0 0", "0 1", "1 1"],
      ease: "inOutQuad",
      duration: 2000,
      delay: stagger(100),
      loop: true,
    });

    createTimer({
      delay: 500,
      onUpdate: (self: any) => {
        if (timeRef.current) {
          timeRef.current.innerHTML = self.iterationCurrentTime;
        }
      },
      autoplay: onScroll({
        container: scrollRef.current!,
        target: timeRef.current!,
      }),
    });

    animate(".animation1", {
      delay: 500,
      x: () => random(-50, 50),
      y: () => random(-50, 50),
      rotate: () => random(-180, 180),
      duration: random(500, 1000),
      loop: true,
      loopDelay: random(0, 500),
      onLoop: (self) => self.refresh(),
      autoplay: onScroll({ container: scrollRef.current! }),
    });

    animate(".animation2", {
      delay: 500,
      x: () => random(-50, 50),
      y: () => random(-50, 50),
      scale: () => [
        () => random(0.5, 3),
        () => random(0.5, 3),
        () => random(0.5, 3),
      ],
      rotate: () => random(-180, 180),
      duration: random(500, 1000),
      loop: true,
      loopDelay: random(0, 500),
      onLoop: (self) => self.refresh(),
      autoplay: onScroll({ container: scrollRef.current! }),
    });

    animate(".animation3", {
      delay: 500,
      x: () => random(-50, 50),
      y: () => random(-50, 50),
      borderRadius: () => String(random(0, 100)) + "%",
      rotate: () => random(-180, 180),
      duration: random(500, 1000),
      loop: true,
      loopDelay: random(0, 500),
      onLoop: (self) => self.refresh(),
      autoplay: onScroll({ container: scrollRef.current! }),
    });

    animate(".animation4", {
      delay: 500,
      x: () => random(-50, 50),
      y: () => random(-50, 50),
      scale: () => [
        () => random(0.5, 3),
        () => random(0.5, 3),
        () => random(0.5, 3),
      ],
      skew: () => [
        () => random(-50, 50),
        () => random(-50, 50),
        () => random(-50, 50),
      ],
      rotate: () => random(-180, 180),
      duration: random(500, 1000),
      loop: true,
      loopDelay: random(0, 500),
      onLoop: (self) => self.refresh(),
      autoplay: onScroll({ container: scrollRef.current! }),
    });

    createDraggable(".drag", {
      releaseDamping: 5,
    });

    const circle: any = createAnimatable(".circle", {
      x: 500,
      y: 500,
      ease: "out(2)",
    });

    circle.animations.x.onRender = () => {
      xRef.current!.innerHTML = utils.roundPad(circle.x(), 2);
      yRef.current!.innerHTML = utils.roundPad(circle.y(), 2);
    };

    const onMouseMove = (e: MouseEvent) => {
      const bounds = demoRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const { width, height, left, top } = bounds!;
      const hw = width / 2;
      const hh = height / 2;
      const x = utils.clamp(e.clientX - left - hw, -hw, hw);
      const y = utils.clamp(e.clientY - top - hh, -hh, hh);
      circle.x(x);
      circle.y(y);
    };

    const onMoiseLeave = () => {
      circle.x(0);
      circle.y(0);
    };

    demoRef.current!.addEventListener("mousemove", onMouseMove);
    demoRef.current!.addEventListener("mouseleave", onMoiseLeave);

    return () => {
      if (demoRef.current) {
        demoRef.current.removeEventListener("mousemove", onMouseMove);
        demoRef.current.removeEventListener("mouseleave", onMoiseLeave);
      }
    };
  }, []);

  return (
    <div
      className="h-[100vh] w-full md:w-[60vw] overflow-y-auto bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-700"
      ref={scrollRef}
    >
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6 border-2 border-amber-200 dark:border-zinc-700 transition-colors duration-700 mt-8 mx-4">
        <p className="text text-amber-700 dark:text-amber-200 text-5xl font-extrabold drop-shadow-lg tracking-tight mb-2">
          Welcome to
        </p>
        <svg viewBox="0 0 304 112" className="w-full max-w-lg">
          <g
            stroke="currentColor"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path
              className="line"
              d="M59 90V56.136C58.66 46.48 51.225 39 42 39c-9.389 0-17 7.611-17 17s7.611 17 17 17h8.5v17H42C23.222 90 8 74.778 8 56s15.222-34 34-34c18.61 0 33.433 14.994 34 33.875V90H59z"
            />
            <polyline
              className="line"
              points="59 22.035 59 90 76 90 76 22 59 22"
            />
            <path
              className="line"
              d="M59 90V55.74C59.567 36.993 74.39 22 93 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90H59z"
            />
            <polyline
              className="line"
              points="127 22.055 127 90 144 90 144 22 127 22"
            />
            <path
              className="line"
              d="M127 90V55.74C127.567 36.993 142.39 22 161 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z"
            />
            <path
              className="line"
              d="M118.5 22a8.5 8.5 0 1 1-8.477 9.067v-1.134c.283-4.42 3.966-7.933 8.477-7.933z"
            />
            <path
              className="line"
              d="M144 73c-9.389 0-17-7.611-17-17v-8.5h-17V56c0 18.778 15.222 34 34 34V73z"
            />
            <path
              className="line"
              d="M178 90V55.74C178.567 36.993 193.39 22 212 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z"
            />
            <path
              className="line"
              d="M263 73c-9.389 0-17-7.611-17-17s7.611-17 17-17c9.18 0 16.58 7.4 17 17h-17v17h34V55.875C296.433 36.994 281.61 22 263 22c-18.778 0-34 15.222-34 34s15.222 34 34 34V73z"
            />
            <path
              className="line"
              d="M288.477 73A8.5 8.5 0 1 1 280 82.067v-1.134c.295-4.42 3.967-7.933 8.477-7.933z"
            />
          </g>
        </svg>
      </div>
      <div className="h-[200vh] flex items-center justify-center">
        <div className="flex flex-col items-center bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl p-16 border-2 border-amber-200 dark:border-zinc-700 transition-colors duration-700">
          <span className="text-amber-500 dark:text-amber-100 font-bold text-4xl uppercase tracking-widest mb-4">
            Current Time
          </span>
          <span
            className="px-20 py-6 bg-orange-100/60 dark:bg-zinc-800/60 text-amber-700 dark:text-amber-200 font-extrabold rounded-xl border-2 border-orange-300 dark:border-zinc-600 shadow-lg text-center text-6xl transition-colors duration-700"
            ref={timeRef}
          >
            0
          </span>
        </div>
      </div>
      <div className="h-[200vh] flex items-center justify-center">
        <div className="relative w-80 h-80 border-4 border-amber-400 dark:border-zinc-700 rounded-2xl bg-white/70 dark:bg-zinc-900/70 shadow-lg flex items-center justify-center transition-colors duration-700">
          <div
            className="animation1 absolute square shadow-lg border-2 border-amber-300"
            style={{
              backgroundColor: getRandomColor(),
              padding: `${random(16, 28)}px`,
            }}
          />
          <div
            className="animation2 absolute square bg-transparent border-4 border-amber-400 shadow-md"
            style={{
              borderColor: getRandomColor(),
              padding: `${random(16, 28)}px`,
            }}
          />
          <div
            className="animation3 absolute square shadow-lg"
            style={{
              backgroundColor: getRandomColor(),
              borderRadius: `${random(20, 60)}%`,
              padding: `${random(16, 28)}px`,
            }}
          />
          <div
            className="animation4 absolute square shadow-md border-2 border-amber-200"
            style={{
              backgroundColor: getRandomColor(),
              padding: `${random(16, 28)}px`,
            }}
          />
        </div>
      </div>
      <div className="h-[200vh] flex items-center justify-center">
        <div className="dragContainer w-96 h-32 border-4 border-zinc-700 rounded-2xl bg-zinc-900/70 shadow-xl transition-colors duration-700 flex items-center justify-center">
          <div
            className="drag square shadow-lg border-2 border-amber-400"
            style={{
              backgroundColor: getRandomColor(),
              padding: `${random(18, 32)}px`,
            }}
          />
        </div>
      </div>
      <div className="h-[200vh] flex items-center justify-center">
        <div className="flex flex-col items-center bg-zinc-900/80 rounded-2xl shadow-2xl p-8 border-2 border-zinc-700 transition-colors duration-700">
          <div
            ref={demoRef}
            className="flex items-center justify-center relative mb-4 p-8"
          >
            <div className="circle shadow-xl transition-colors duration-700 w-16 h-16 bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-400 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 border-4 border-amber-400 dark:border-zinc-700"></div>
          </div>
          <div className="mt-2 text-sm text-amber-100">
            <p className="font-semibold tracking-wide">Circle Position</p>
            <p>
              X: <span ref={xRef}>0</span>
            </p>
            <p>
              Y: <span ref={yRef}>0</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
