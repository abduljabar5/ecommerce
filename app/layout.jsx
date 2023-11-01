import '@styles/globals.css';
import { Toaster } from 'sonner';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { AppProvider } from '@utils/appProvider';
export const metadata = {
    title: "Ecommerce",
    description: "Shop Now"
}

const Rootlayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <main className=''>
                        <AppProvider>
                            <Nav />
                            <Toaster />
                            {children}
                        </AppProvider>
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default Rootlayout;