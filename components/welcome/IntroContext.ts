"use client";

import { createContext } from "react";

/** true, когда заставка ушла. Анимации первого экрана ждут этот сигнал. */
export const IntroContext = createContext(true);
