"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import CryptoJS from 'crypto-js';
import Modal from 'react-bootstrap/Modal';

const Login = () => {
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

  const handleShow = () => setShow(true);
  if (isLoading) {
    Swal.fire({
      title: "Mohon tunggu!",
      position:'top',
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


      <div className="video-container">

        <div className="video-container">
          <video autoPlay loop muted className="custom-video1" poster="">
            <source src="/tema/videos/bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="overlay mt-100">
          <div className="content">

            <button className="login-button" onClick={handleShow} >Login</button>
          </div>
        </div>
      </div>
      <Modal
        dialogClassName="modal-m modal-dialog-centered"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title-center">Silahkan Login!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3 col-md-12">
              <input
                type="email"
                className="form-control form-control"
                onChange={(e) => setUsernama(e.target.value)}
                placeholder="Username"
                style={{ backgroundColor: "antiquewhite" }}
              />
            </div>

            <div className="mb-3 col-md-12">
              <div className="input-group">
                <input
                  required
                  type={st ? "text" : "password"}
                  className="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={passwordText} onChange={(e) => setPasswordText(e.target.value)}
                />
                {st ?
                  <button onClick={() => setSt(!st)} className="btn btn-success" type="button">
                    <i className="mdi mdi-eye-off" />
                  </button>
                  :
                  <button onClick={() => setSt(!st)} className="btn btn-success" type="button">
                    <i className="mdi mdi-eye" />
                  </button>
                }
              </div>
            </div>
            <div className="text-center mb-4">
              <button type="submit" className="btn btn-info  btn-block">
                LOGIN
              </button>
            </div>
          </Modal.Body>
        </form>
      </Modal>
      <div
        className="modal fade"
        id="subscribeModal"
        tabIndex={-1}
        aria-labelledby="subscribeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form
                action="#"
                method="get"
                className="custom-form mt-lg-4 mt-2"
                role="form"
              >
                <h2 className="modal-title" id="subscribeModalLabel">
                  Stay up to date
                </h2>
                <input
                  type="email"
                  name="email"
                  id="email"
                  pattern="[^ @]*@[^ @]*"
                  className="form-control"
                  placeholder="your@email.com"
                  required
                />
                <button type="submit" className="form-control">
                  Notify
                </button>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <p>By signing up, you agree to our Privacy Notice</p>
            </div>
          </div>
        </div>
      </div>

    </main>

  )
}

export default Login