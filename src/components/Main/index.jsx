// eslint-disable-next-line react/prop-types
export function Main({ children }) {
  return (
    // <main className="container mx-auto p-4">{children}</main>
    <main>
      <div className="container mx-auto p-4">
        <h2>{children}</h2>
      </div>
    </main>
  );
}
