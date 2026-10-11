import katex from "katex";
export function MathText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(```[\s\S]*?```)/g).map((piece, i) =>
        piece.startsWith("```") ? (
          <pre key={i}>
            <code>
              {piece.replace(/^```(?:java)?\n?/, "").replace(/```$/, "")}
            </code>
          </pre>
        ) : (
          <span key={i}>
            {piece
              .split(/(\$[^$]+\$)/g)
              .map((p, j) =>
                p.startsWith("$") && p.endsWith("$") ? (
                  <span
                    key={j}
                    dangerouslySetInnerHTML={{
                      __html: katex.renderToString(p.slice(1, -1), {
                        throwOnError: false,
                        trust: false,
                        strict: "ignore",
                      }),
                    }}
                  />
                ) : (
                  <span key={j}>{p}</span>
                ),
              )}
          </span>
        ),
      )}
    </>
  );
}
