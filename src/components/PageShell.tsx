export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-24">{children}</div>
    </div>
  );
}
    