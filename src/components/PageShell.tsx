export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <div
        className="
          mx-auto w-full
          max-w-full
          px-4 sm:px-6
          pt-12 sm:pt-14 pb-20
          sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl
        "
      >
        {children}
      </div>
    </div>
  );
}
