export function TopBar() {
  return (
    <div className="hidden md:flex h-14 items-center justify-end gap-2 border-b border-line px-6">
      <span className="flex h-8 items-center rounded-full bg-bg-popover px-3 text-sm font-medium">
        $140.20
      </span>
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-popover text-xs font-semibold text-ink-primary"
        aria-label="Account"
      >
        RG
      </div>
    </div>
  );
}
