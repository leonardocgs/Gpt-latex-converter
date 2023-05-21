import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [expressionToTranslate, setExpressionToTranslate] = useState("");
  const [translatedExpression, setTranslatedExpression] = useState("");
  return (
    <>
      <main
        className={` min-h-screen text-center font-sans  p-24 ${inter.className}`}
      >
        <h1 className="text-4xl font-bold ">
          Expression to <MathJax>{"\\(\\LaTeX\\)"}</MathJax> converter
        </h1>
        <div
          className={`flex text-center min-h-screen gap-[20px] font-sans  p-24 ${inter.className}`}
        >
          <form
            className="flex-1"
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
            <textarea
              className="text-lg w-full min-h-[500px] p-4 border-2 border-gray-300 rounded-md resize-none"
              id="expressionToTranslate"
              placeholder="Expression to convert"
              onChange={(e) => setExpressionToTranslate(e.target.value)}
            />
            <button type="submit" className="bg-blue-100 p-5 ">
              Convert
            </button>
          </form>
          {translatedExpression && (
            <div className="flex-1 text-3xl">
              <h2 className="font-bold ">Preview</h2>

              <MathJax>{`\\(${translatedExpression}\\)`}</MathJax>
              <h2 className="font-bold mt-5">Latex Code</h2>
              <p>{translatedExpression}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
