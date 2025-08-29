const animatedComponents = new Set<string>();

export const isComponentAnimated = (componentId: string): boolean => {
  return animatedComponents.has(componentId);
};

export const markComponentAsAnimated = (componentId: string): void => {
  animatedComponents.add(componentId);
};

export const resetAnimationCache = (): void => {
  animatedComponents.clear();
};
