import React, { useEffect, useState } from "react";
import "../styles/loading-grid.css";
import { colors } from "../utils/constants"; // Assurez-vous du chemin d'importation

const LoadingGrid: React.FC = () => {
  const [activeCells, setActiveCells] = useState<
    { index: number; color: string }[]
  >([]);

  // Active de 2 à 5 cases de manière aléatoire toutes les 500 ms
  useEffect(() => {
    const intervalId = setInterval(() => {
      const numberOfActiveCells = Math.floor(Math.random() * 4) + 2; // entre 2 et 5 cases
      const randomCells = Array.from({ length: 9 }, (_, i) => i + 1) // Nombres de 1 à 9
        .sort(() => 0.5 - Math.random()) // Mélange aléatoire
        .slice(0, numberOfActiveCells) // Sélectionne entre 2 et 5 cases
        .map((cellIndex) => ({
          index: cellIndex,
          color: colors.getGreenIntensity(Math.floor(Math.random() * 4)), // Utiliser getGreenIntensity
        }));

      setActiveCells(randomCells);
    }, 500); // Mise à jour toutes les 0.5 s

    return () => clearInterval(intervalId); // Nettoie l'intervalle
  }, []);

  return (
    <div className="loading-grid">
      {Array.from({ length: 9 }, (_, index) => {
        // Trouver la cellule active pour cet index
        const activeCell = activeCells.find((cell) => cell.index === index + 1);
        return (
          <div
            key={index}
            className={`grid-item ${activeCell ? "active" : ""}`}
            style={{
              backgroundColor: activeCell ? activeCell.color : "transparent",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default LoadingGrid;
