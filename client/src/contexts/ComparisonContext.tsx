import { createContext, useContext, useState, useEffect } from "react";

interface ComparisonContextType {
  selectedProducts: string[];
  addToComparison: (productId: string) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(() => {
    const saved = localStorage.getItem("compareProducts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("compareProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const addToComparison = (productId: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) return prev;
      if (prev.length >= 4) return prev;
      return [...prev, productId];
    });
  };

  const removeFromComparison = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  };

  const clearComparison = () => {
    setSelectedProducts([]);
  };

  const isInComparison = (productId: string) => {
    return selectedProducts.includes(productId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedProducts,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider");
  }
  return context;
}
