import AuthLayout from "./_auth/AuthLayout"
import SigninForm from "./_auth/forms/SigninForm"
import SignupForm from "./_auth/forms/SignupForm"
import RootLayout from "./_root/RootLayout"
import {AllUsers, CreatePost, EditPost, Explore, Home, PostDetail, Profile, Saved, UpdateProfile} from "./_root/pages"
import "./globals.css"
import { Route,Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import ImageGenerator from "./_root/pages/ImageGenerator/ImageGenerator"

const App = () => {
  return (
   <main className="flex h-screen" >
    <Routes>
    {/* public routes */}
    <Route element={<AuthLayout/>}>
    <Route path="/sign-up" element={<SignupForm/>}/>
    <Route path="/sign-in" element={<SigninForm/>}/>
    
    </Route>
    
    {/* private routes */}
    <Route element={<RootLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/explore" element={<Explore/>} />
    <Route path="/saved" element={<Saved/>} />
    <Route path="/all-users" element={<AllUsers/>} />
    <Route path="/create-post" element={<CreatePost/>} />
    <Route path="/update-post/:id" element={<EditPost/>} />
    <Route path="/posts/:id" element={<PostDetail/>} />
    <Route path="/profile/:id/*" element={<Profile/>} />
    <Route path="/update-profile/:id/" element={<UpdateProfile/>} />
    <Route path="/ai-image" element={<ImageGenerator/>} />
    </Route>
   

    </Routes>
    <Toaster/>
   </main>
  )
}

export default App
