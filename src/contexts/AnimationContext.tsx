import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnimationContextType {
  hasAnimated: (key: string) => boolean;
  markAsAnimated: (key: string) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
}) => {
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());

  const hasAnimated = (key: string): boolean => {
    return animatedItems.has(key);
  };

  const markAsAnimated = (key: string): void => {
    setAnimatedItems((prev) => new Set([...prev, key]));
  };

  return (
    <AnimationContext.Provider value={{ hasAnimated, markAsAnimated }}>
      {children}
    </AnimationContext.Provider>
  );
};
