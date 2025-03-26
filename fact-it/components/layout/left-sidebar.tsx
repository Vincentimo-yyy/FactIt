"use client"
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
} from "lucide-react"

export function LeftSidebar() {
  return (
    <div className="hidden md:block fixed top-14 left-0 w-64 h-[calc(100vh-3.5rem)] bg-background border-r">
      <div className="flex h-full flex-col">
        <div className="space-y-2 px-3">
          <div>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
            <div className="space-y-1">
              <button className="flex items-center rounded-md px-4 py-2 bg-muted">
                <Home className="h-5 w-5 mr-2" />
                <span>Home</span>
              </button>
              <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <Flame className="h-5 w-5 mr-2" />
                <span>Popular</span>
              </button>
              <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <LayoutGrid className="h-5 w-5 mr-2" />
                <span>Explore</span>
              </button>
              <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <Settings className="h-5 w-5 mr-2" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Additional navigation sections */}
          <div >
            <h2 className="mb-2 px-4 text-lg tracking-tight ">Filter by topic:</h2>
            <div className="border-t border-b border-[#B2B2B2] space-y-1 ">
              <input type="search" placeholder="Search..." className="w-full bg-muted h-9 rounded-md mt-2   border border-input pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-primary" />
              <div className="overflow-auto max-h-55"> 
                <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                  <PlaneTakeoff className="h-5 w-5 mr-2" />
                  <span className="text-[14px]">Travel</span>
                </button>
                <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                  <User className="h-5 w-5 mr-2" />
                  <span className="text-[14px]">Personal</span>
                </button>
                <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                  <Newspaper className="h-5 w-5 mr-2" />
                  <span className="text-[14px]">News</span>
                </button>
                <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  <span className="text-[14px]">Gaming</span>
                </button>
                <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                  <Monitor className="h-5 w-5 mr-2" />
                  <span className="text-[14px]">Technology</span>
                </button>
                <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                  <Film className="h-5 w-5 mr-2" />
                  <span className="text-[14px]">Entertainment</span>
                </button>
                <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                  <BookMinus className="h-5 w-5 mr-2" />
                  <span className="text-[14px]">Education</span>
                </button>
                <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                  <Shirt className="h-5 w-5 mr-2" />
                  <span className="text-[14px]">Fashion</span>
                </button>
              </div>
            </div>
          </div>

          <div >
            <div className="mb-2 pb-2 border-b border-[#B2B2B2] justify-center flex items-center px-4 text-lg font-semibold tracking-tight">
              <button className="flex items-center rounded-[20px] px-8 py-2 bg-secondary text-white">
                <PencilLine className="mr-2" />
                <span>Create Post</span>
              </button>
            </div>
            <div className="space-y-1">
              <button className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
              <button className="flex items-center rounded-md px-3 py-2 hover:bg-muted ">
                <CircleHelp className="h-7 w-7 mr-2 text-[#4F3E9E] stroke-white   fill-[#4F3E9E]" />
                <span>Help</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

