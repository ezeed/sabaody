import { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function Dropdown({
  options,
  value,
  onChange,
  disabled,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <button
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-neutral-600 px-3 py-1 text-sm disabled:opacity-50"
      >
        {selected?.label} <span>▾</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 z-10 mt-1 min-w-full rounded-md border border-neutral-600 bg-neutral-800 py-1 shadow-lg">
          {options.map(opt => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-neutral-700"
            >
              <input
                type="radio"
                name="dropdown"
                checked={opt.value === value}
                onChange={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="accent-blue-400"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
