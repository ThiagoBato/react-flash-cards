// eslint-disable-next-line react/prop-types
export function Header({ children, size }) {
  let fontSize = 'text-xl';

  if (size === 'large') {
    fontSize = 'text-2xl';
  }

  return (
    <header>
      <div className="bg-red-300 mx-auto p-4">
        <h1 className={`text-center font-semibold text-xl ${fontSize}`}>{children}</h1>
      </div>
    </header>
  );
}
