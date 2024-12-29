import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from "lucide-react";


function Header() {
  const user = false 
  const navigate = useNavigate();
  return (
    <div className='h-16 w-full flex items-center justify-between py-4 px-6  text-white'>
      <h1 onClick={() => navigate('/')} className='text-2xl font-semibold cursor-pointer'>Shortyourl</h1>
      <div className='flex gap-4 items-center'>

        {!user ? (
          <>
            <div onClick={() => navigate('/auth')} className='cursor-pointer'>Sign up</div>
            <Button onClick={() => navigate('/auth')} variant="outline" className="text-white border-white hover:bg-white hover:text-gray-800">Login</Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full w-10 overflow-hidden">
              <Avatar className="border-2 border-transparent hover:border-2 hover:border-sky-400">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>User Name</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>

                <div className="flex items-center cursor-pointer">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  My Links
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="text-red-500 flex items-center cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </div>

              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

      </div>
    </div>
  );
}

export default Header;