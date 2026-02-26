export interface Outfit {
    id: string;
    label: string;
    emoji: string;
    colors: {
      shirt: string;
      pants: string;
      shoes: string;
      hair: string;
      skin: string;
    };
  }
  
  export const outfits: Outfit[] = [
    {
      id: "developer",
      label: "Developer",
      emoji: "💻",
      colors: {
        shirt: "#1e1e2e",
        pants: "#2d2d3d",
        shoes: "#111111",
        hair: "#1a1a1a",
        skin: "#f4c89a",
      },
    },
    {
      id: "casual",
      label: "Casual",
      emoji: "👕",
      colors: {
        shirt: "#3b82f6",
        pants: "#1e3a5f",
        shoes: "#ffffff",
        hair: "#1a1a1a",
        skin: "#f4c89a",
      },
    },
    {
      id: "formal",
      label: "Formal",
      emoji: "👔",
      colors: {
        shirt: "#ffffff",
        pants: "#111827",
        shoes: "#1a1a1a",
        hair: "#1a1a1a",
        skin: "#f4c89a",
      },
    },
    {
      id: "hoodie",
      label: "Hoodie",
      emoji: "🧥",
      colors: {
        shirt: "#6d28d9",
        pants: "#374151",
        shoes: "#dc2626",
        hair: "#1a1a1a",
        skin: "#f4c89a",
      },
    },
    {
      id: "summer",
      label: "Summer",
      emoji: "🏖️",
      colors: {
        shirt: "#f97316",
        pants: "#fbbf24",
        shoes: "#84cc16",
        hair: "#1a1a1a",
        skin: "#f4c89a",
      },
    },
  ];