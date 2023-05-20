export const latexPrompt = (expression: string) => {
  return `Translate the expression into LaTeX code. 
    Expression:Limit of x as x approaches 10 of x + 5.
    LaTeX: \\lim_{x \\to 10} (x + 5)
    Expression: function f of x equals x squared plus 5.
    LaTeX: f(x) = x^2 + 5
    Expression:${expression}
    LaTeX:`;
};
