import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-row gap-x-1 sm:flex-col min-h-[100vh]  mx-1 mr-4 gap-y-3  items-center justify-center bg-slate-100 py-2">
      <Navbar />
      {children}
    </div>
  );
};
export default ProtectedLayout;
