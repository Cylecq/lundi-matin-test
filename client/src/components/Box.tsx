interface Props {
  children: React.ReactNode;
}

function Box({ children }: Props) {
  return (
    <div className="bg-white border border-slate-200 shadow-sm w-full px-6 py-4">
      {children}
    </div>
  );
}

export default Box;
