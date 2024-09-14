
// import 'material-icons/iconfont/material-icons.css';
import '../../public/tema/vendor/bootstrap/css/bootstrap.min.css'
import '../../public/tema/css/style.css'
import Header from './Header';
import Menu from './Menu';
import ScriptJs from './ScriptJs';

function Template({ children }: { children: React.ReactNode }) {
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

                <Menu />

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