"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import CryptoJS from 'crypto-js';
import Modal from 'react-bootstrap/Modal';

const Login = () => {
  // const [showButton, setShowButton] = useState(false);
  const [usernama, setUsernama] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [st, setSt] = useState(false);
  const kunci1 = 'Bismillahirrahmanirrahim Allahuakbar ZikriAini2628';
  const kunci2 = 'Iikagennishiro Omaee Omaedakega Tsurainanteomounayo Zenin Kimochiwa Onajinanda';

  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setShowButton(true);
    // }, 2000);
    // return () => clearTimeout(timer);
  }, []);

  const handleShow = () => setShow(true);
  if (isLoading) {
    Swal.fire({
      title: "Mohon tunggu!",
      position: 'top',
      html: "Sedang validasi data",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    })
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const handleSubmit = async (e: SyntheticEvent) => {
    setIsLoading(true)

    const enkripPertama = CryptoJS.AES.encrypt(passwordText, kunci1).toString();
    const password = CryptoJS.AES.encrypt(enkripPertama, kunci2).toString();
    e.preventDefault();
    const login = await signIn('credentials', {
      usernama,
      password,
      redirect: false
    })

    setTimeout(function () {
      if (login?.error) {
        setIsLoading(false)
        Toast.fire({
          icon: 'warning',
          title: 'Username atau password salah'
        })

        return
      }
      else {

        setIsLoading(false)
        window.location.href = '/'
      }
    }, 2000);
  };

  return (
    <main>


      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    href=""
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="/tema/img/logo3.png" alt="" width={150} />
                    {/* <span className="d-none d-lg-block">ePustaka</span> */}
                  </a>
                </div>
                {/* End Logo */}

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Selamat Datang...!!!
                      </h5>
                      <p className="text-center small">
                        Silahkan login untuk melanjutkan
                      </p>
                    </div>
                    <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                      <div className="col-12">
                        {/* <label htmlFor="yourUsername" className="form-label">
                          Username
                        </label> */}
                        <div className="input-group has-validation">
                          <input
                            required
                            type="text"
                            className="form-control form-control"
                            onChange={(e) => setUsernama(e.target.value)}
                            placeholder="Username"
                          // style={{ backgroundColor: "antiquewhite" }}
                          />

                        </div>
                      </div>
                      <div className="col-12">
                        {/* <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label> */}
                        <div className="input-group">
                          <input
                            required
                            type={st ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={passwordText} onChange={(e) => setPasswordText(e.target.value)}
                          />
                          {st ?
                            <button onClick={() => setSt(!st)} className="btn btn-primary btn-xs" type="button">
                              <i className="mdi mdi-eye-off" />
                            </button>
                            :
                            <button onClick={() => setSt(!st)} className="btn btn-primary btn-xs" type="button">
                              <i className="mdi mdi-eye" />
                            </button>
                          }
                        </div>

                      </div>
                      {/* <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="remember"
                            defaultValue="true"
                            id="rememberMe"
                          />
                          <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                          </label>
                        </div>
                      </div> */}
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Login
                        </button>
                      </div>
                      {/* <div className="col-12">
                        <p className="small mb-0">
                          Don't have account?{" "}
                          <a href="pages-register.html">Create an account</a>
                        </p>
                      </div> */}
                    </form>
                  </div>
                </div>
                <div className="credits">
                  {/* All the links in the footer should remain intact. */}
                  {/* You can delete the links only if you purchased the pro version. */}
                  {/* Licensing information: https://bootstrapmade.com/license/ */}
                  {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ */}
                  Designed by <a href="https://hizra.co.id" target="_blank">Hizratech</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


    </main>

  )
}

export default Login