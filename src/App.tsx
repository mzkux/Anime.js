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

function App() {
  const timeRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLDivElement>(null);
  const yRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { chars } = text.split(".text", {
      chars: { wrap: "clip" },
    });

    animate(chars, {
      y: [{ to: ["100%", "0%"] }, { to: "-100%", delay: 750, ease: "in(3)" }],
      duration: 750,
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
      delay: 2000,
      alternate: true,
      loop: true,
      onUpdate: (self: any) => {
        if (timeRef.current) {
          timeRef.current.innerHTML = self.currentTime;
        }
      },
      autoplay: onScroll({
        container: scrollRef.current!,
        debug: true,
        target: timeRef.current!,
      }),
    });

    animate(".animation1", {
      x: () => random(-30, 30),
      y: () => random(-30, 30),
      rotate: () => random(-180, 180),
      duration: random(500, 1000),
      loop: true,
      loopDelay: random(0, 500),
      onLoop: (self) => self.refresh(),
      autoplay: onScroll({ container: scrollRef.current!, debug: true }),
    });

    animate(".animation2", {
      x: () => random(-30, 30),
      y: () => random(-30, 30),
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
      autoplay: onScroll({ container: scrollRef.current!, debug: true }),
    });

    animate(".animation3", {
      x: () => random(-30, 30),
      y: () => random(-30, 30),
      borderRadius: () => String(random(0, 100)) + "%",
      rotate: () => random(-180, 180),
      duration: random(500, 1000),
      loop: true,
      loopDelay: random(0, 500),
      onLoop: (self) => self.refresh(),
      autoplay: onScroll({ container: scrollRef.current!, debug: true }),
    });

    createDraggable(".drag", {
      container: ".grid",
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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center" ref={scrollRef}>
      <div className="h-screen my-auto">
        <p className="text text-white text-4xl font-bold">Welcome to</p>
        <svg viewBox="0 0 304 112">
          <g
            stroke="currentColor"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
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
      <div className="h-screen my-auto">
        <div className="flex flex-col">
          <span className="text-amber-300 font-medium text-xs uppercase tracking-wider">
            Current Time
          </span>
          <span
            className="px-3 py-2 bg-orange-900/30 text-amber-200 font-bold rounded-lg 
              border border-orange-800 shadow-sm text-center text-xl"
            ref={timeRef}
          >
            0
          </span>
        </div>
      </div>
      <div className="h-screen my-auto">
        <div className="relative w-20 h-20 border border-amber-300 flex items-center justify-center">
          <div className="animation1 absolute w-2 h-2 rounded-xs bg-yellow-200" />
          <div className="animation2 absolute w-4 h-4 rounded-xs bg-transparent border border-yellow-200" />
          <div className="animation3 absolute w-3 h-3 rounded-xs bg-yellow-200" />
          <div className="animation4 absolute w-2 h-2 rounded-xs bg-yellow-200" />
        </div>
      </div>
      <div className="h-screen my-auto">
        <div className="grid w-20 h-20 border border-amber-300">
          <div className="drag w-2 h-2 rounded-xs bg-yellow-200" />
        </div>
      </div>
      <div className="h-screen my-auto">
        <div className="flex flex-col items-center bg-amber-300/10 p-4 rounded-lg">
          <div
            ref={demoRef}
            className="flex items-center justify-center relative"
          >
            <div className="circle bg-amber-200 w-2 h-2 rounded-full"></div>
          </div>
          <div>
            <p>Circle Position</p>
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
