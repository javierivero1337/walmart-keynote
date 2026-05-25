import type { ForwardRefExoticComponent, RefAttributes } from "react";

declare const RotatingText: ForwardRefExoticComponent<
  {
    texts: string[];
    transition?: Record<string, unknown>;
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    exit?: Record<string, unknown>;
    animatePresenceMode?: string;
    animatePresenceInitial?: boolean;
    rotationInterval?: number;
    staggerDuration?: number;
    staggerFrom?: string;
    loop?: boolean;
    auto?: boolean;
    splitBy?: string;
    onNext?: () => void;
    mainClassName?: string;
    splitLevelClassName?: string;
    elementLevelClassName?: string;
  } & RefAttributes<unknown>
>;

export default RotatingText;
