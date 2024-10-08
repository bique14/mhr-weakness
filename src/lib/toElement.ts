const Element: any = {
  fire: "text-red-500",
  water: "text-blue-700",
  ice: "text-blue-300",
  dragon: "text-purple-600",
  thunder: "text-yellow-400",
};

export const toElementColor = (element: string): string => {
  return Element[element];
};
