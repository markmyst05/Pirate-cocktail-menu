export function Button({ children, onClick, className = "", variant }) {
  const base = "px-4 py-2 rounded font-semibold transition";
  const styles = variant === "destructive" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700";
  return <button onClick={onClick} className={`${base} ${styles} ${className}`}>{children}</button>;
}