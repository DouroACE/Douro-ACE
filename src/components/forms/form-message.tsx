type Props = {
  message?: string;
  success?: boolean;
};

export function FormMessage({ message, success }: Props) {
  if (!message) return null;
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm ${
        success ? "border-green-600/40 bg-green-50 text-green-900" : "border-rose-500/30 bg-rose-50 text-rose-800"
      }`}
    >
      {message}
    </div>
  );
}
