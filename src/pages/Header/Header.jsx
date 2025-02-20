import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "../../context/context";
import useFetch from "../../hooks/use-fetch";
import { logout } from "../../db/apiAuth";
import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();

  const { loading, fn: fnLogout } = useFetch(logout);

  const { user, fetchUser } = UrlState()

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      <div className='h-16 w-full flex items-center justify-between py-4 px-6 bg-gray-800 text-white'>
        <h1 onClick={() => navigate('/')} className='text-2xl font-extrabold cursor-pointer flex items-center gap-2 tracking-wide'>Shortyourl <LinkIcon /></h1>
        <div className='flex gap-4 items-center'>
          {!user ? (
            <Button onClick={() => navigate('/auth')} variant="outline" className="text-white border-white hover:bg-white hover:text-gray-800">Login</Button>

          ) : (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full w-10 overflow-hidden">
                  <Avatar className="border-2 border-transparent hover:border-2 hover:border-sky-400">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.user_metadata.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center cursor-pointer">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      My Links
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  fnLogout().then(() => {
                    navigate("/")
                    fetchUser()
                  })
                }} >
                  <div className="text-red-500 flex items-center cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div >
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      }
    </>
  );
}

export default Header;