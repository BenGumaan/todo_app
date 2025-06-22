import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import { Outlet } from 'react-router'

export default function MainLayout() {
    return (
        <div>
            <div >
                <Header />
            </div>
            <Outlet />
            <div >
                <Footer />
            </div>
        </div>
    )
}
