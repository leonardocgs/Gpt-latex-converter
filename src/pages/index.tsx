import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [expressionToTranslate, setExpressionToTranslate] = useState("");
  const [translatedExpression, setTranslatedExpression] = useState("");
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await fetch("/api/latex", {
              method: "POST",
              headers: {
                contentType: "application/json",
              },
              body: JSON.stringify({ expression: expressionToTranslate }),
            });
            const { response: latex } = await response.json();
            setTranslatedExpression(latex);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <label htmlFor="expressionToTranslate">
          Digite a expressão que deseja traduzir para latex
        </label>
        <input
          id="expressionToTranslate"
          type="text"
          onChange={(e) => setExpressionToTranslate(e.target.value)}
        />
        <button type="submit">Traduzir</button>
      </form>
      {translatedExpression && (
        <div>
          <p>{translatedExpression}</p>

          <MathJax>{`\\(${translatedExpression}\\)`}</MathJax>
        </div>
      )}
    </main>
  );
}
