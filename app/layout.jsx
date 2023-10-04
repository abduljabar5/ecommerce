import '@styles/globals.css';
import { Toaster } from 'sonner';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
export const metadata = {
    title: "promtopia",
    description: "Discover new ai prompts!"
}

const Rootlayout = ({ children }) => {
  return (
   <html lang="en">
    <body>
        <Provider>
        <div className='main'>
            <div className='gradient' />
        </div>

        <main className='app'>
            <Nav />
            <Toaster />
            {children} 

        </main>
        </Provider>
    </body>
   </html> 
  )
}
 
export default Rootlayout;