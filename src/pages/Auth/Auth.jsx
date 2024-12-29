import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from './Login'
import Signup from './Signup'

function Auth() {
    const [searchParams] = useSearchParams()
    return (
        <div className='h-full w-full flex flex-col gap-10 items-center justify-center mt-10'>
            {searchParams.get('createNew') ?
                <h1 className='text-3xl font-extrabold'>You need to Login First!</h1>
                :
                <h1 className='text-3xl font-extrabold'>Login / Signup Page</h1>
            }
            <Tabs defaultValue="login" className="w-full px-2 sm:w-[400px]">
                <TabsList className="grid grid-cols-2 w-full h-12">
                    <TabsTrigger className="h-full" value="login">Login</TabsTrigger>
                    <TabsTrigger className="h-full" value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login"><Login /></TabsContent>
                <TabsContent value="signup"><Signup /></TabsContent>
            </Tabs>

        </div>
    )
}

export default Auth