
// import 'material-icons/iconfont/material-icons.css';
import '../../public/tema/vendor/bootstrap/css/bootstrap.min.css'
import '../../public/tema/css/style.css'
import Header from './Header';
import Menu from './Menu';
import ScriptJs from './ScriptJs';
import MenuAdmin from './MenuAdmin';
import MenuAdministrasi from './MenuAdministrasi';
import MenuPetugas from './MenuPetugas';
import { useSession } from 'next-auth/react';

function Template({ children }: { children: React.ReactNode }) {
    const session = useSession()
    return (
        <div>
            <div id="preloader">
                <div className="dz-ripple">
                    <div />
                    <div />
                </div>
            </div>

            <div id="main">

                <Header />

                {session?.data?.role === 'Admin' ? (<MenuAdmin />) :
                    session?.data?.role === 'Administrasi' ? <MenuAdministrasi /> :
                        session?.data?.role === 'Petugas' ? <MenuPetugas /> : null}

                {/* <Menu /> */}

                <div className="outer-body">
                    <div className="inner-body">
                        <div className="content-body">
                            <div className="container-fluid">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <ScriptJs />

        </div>
    )
}

export default Template