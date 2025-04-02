'use client';
import {
  Home,
  Flame,
  LayoutGrid,
  Settings,
  PlaneTakeoff,
  User,
  Newspaper,
  Gamepad2,
  Monitor,
  Film,
  BookMinus,
  Shirt,
  PencilLine,
  LogOut,
  CircleHelp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useRouter } from 'next/navigation';

export function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState('/');

  // Update active route when pathname changes
  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/popular', label: 'Popular', icon: Flame },
    { path: '/explore', label: 'Explore', icon: LayoutGrid },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleNavigation = (path: string) => {
    setActiveRoute(path);
    router.push(path);
  };
  return (
    <div className="hidden md:block fixed top-14 left-0 w-80 h-[calc(100vh-3.5rem)] bg-background shadow-lg">
      <div className="flex h-full flex-col">
        <div className="space-y-2 px-3">
          <div className="py-6">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeRoute === item.path;
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex w-65 items-center rounded-md px-4 mx-4 py-2 ${
                      isActive ? 'bg-select' : 'hover:bg-muted'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 mr-2 ${isActive ? 'stroke-secondary' : 'stroke-primary'}`}
                    />
                    <span
                      className={isActive ? 'text-secondary' : 'text-primary'}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional navigation sections */}
          <div>
            <h2 className="mb-2 px-4 mx-4  text-primary text-[14px] tracking-tight ">
              Filter by topic:
            </h2>
            <div className="border-t border-b border-[#B2B2B2] space-y-1 ">
              <input
                type="text"
                placeholder="Search..."
                className="w-65 text-[14px] bg-muted h-7 rounded-md mt-2 mx-4 border border-input pl-3 pr-3 focus:outline-none  "
              />
              <div className="overflow-y-auto overflow-x-clip max-h-55">
                <button className="flex w-65 items-center rounded-md pl-4 ml-4 py-2 hover:bg-muted">
                  <PlaneTakeoff className="h-5 w-5 mr-2 stroke-primary" />
                  <span className="text-[12px] text-primary">Travel</span>
                </button>
                <button className="flex w-65 items-center rounded-md pl-4 ml-4 py-2 hover:bg-muted">
                  <User className="h-5 w-5 mr-2 stroke-primary" />
                  <span className="text-[12px] text-primary">Personal</span>
                </button>
                <button className="flex w-65 items-center rounded-md pl-4 ml-4 py-2 hover:bg-muted">
                  <Newspaper className="h-5 w-5 mr-2 stroke-primary" />
                  <span className="text-[12px] text-primary">News</span>
                </button>
                <button className="flex w-65 items-center rounded-md pl-4 ml-4 py-2 hover:bg-muted">
                  <Gamepad2 className="h-5 w-5 mr-2 stroke-primary" />
                  <span className="text-[12px] text-primary">Gaming</span>
                </button>
                <button className="flex w-65 items-center rounded-md pl-4 ml-4 py-2 hover:bg-muted">
                  <Monitor className="h-5 w-5 mr-2 stroke-primary" />
                  <span className="text-[12px] text-primary">Technology</span>
                </button>
                <button className="flex w-65 items-center rounded-md pl-4 ml-4 py-2 hover:bg-muted">
                  <Film className="h-5 w-5 mr-2 stroke-primary" />
                  <span className="text-[12px] text-primary">
                    Entertainment
                  </span>
                </button>
                <button className="flex w-65 items-center rounded-md pl-4 ml-4 py-2 hover:bg-muted">
                  <BookMinus className="h-5 w-5 mr-2 stroke-primary" />
                  <span className="text-[12px] text-primary">Education</span>
                </button>
                <button className="flex w-65 items-center rounded-md pl-4 mx-4 py-2 hover:bg-muted">
                  <Shirt className="h-5 w-5 mr-2 stroke-primary" />
                  <span className="text-[12px] text-primary">Fashion</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 pb-2 border-b border-[#B2B2B2] justify-center flex items-center px-4 mx-4  text-lg font-semibold tracking-tight">
              <button
                onClick={() => router.push('/createapost')}
                className="flex w-65 items-center rounded-[20px] px-8 py-2 bg-secondary text-white hover:bg-select"
              >
                <PencilLine className="mr-2 stroke-white" />
                <span>Create Post</span>
              </button>
            </div>
            <div className="space-y-1">
              <button className="flex w-65 items-center rounded-md px-4 mx-4  py-2 hover:bg-muted">
                <LogOut className="h-5 w-5 mr-2 stroke-primary" />
                <span className="text-primary">Logout</span>
              </button>
              <button className="flex items-center rounded-md px-3 mx-4 py-2 hover:bg-muted w-65">
                <CircleHelp className="h-7 w-7 mr-2 text-[#4F3E9E] stroke-white fill-[#4F3E9E]" />
                <span className="text-primary">Help</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
