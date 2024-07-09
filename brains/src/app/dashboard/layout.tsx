import "@/app/globals.css";
import SideMenu from '../ui/sideMenu';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
      <div className="container flex min-w-full max-w-full min-h-full max-h-full p-0">
        <SideMenu />
        <div className="main-content flex- flex justify-center">
          <div className="notes-page w-full">
            {children}
          </div>
        </div>
      </div>
      );
};

