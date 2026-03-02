// A simple node debugger;
export function debug(...args: unknown[]): void {
  process.stderr.write(args.map(a => JSON.stringify(a)).join(', ') + '\n');
}
// Usage
// debug('index', 1, 'value', 2); // 🐛 "index", 0, "value", 2
// debug({ name: 'test', value: 42 }); // 🐛 {"name":"test","value":42}
// debug([1, 2, 3]);
