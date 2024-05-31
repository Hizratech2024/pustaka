import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/auth';
import Dashboard from './dashboard';

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <h2 style={{ color: 'black' }}>Dashboard</h2>
      <div className="row">
        <div className="col-xl-12 box-warpper">
          <div className="row">
            <div className="col-xl-6">
              <div className="row">
                <div className="col-sm-6">
                  <div className="card bg-primary-light">
                    <div className="card-body depostit-card">
                      <div className="depostit-card-media d-flex justify-content-between">
                        <div>
                          <h6 className="font-w400 mb-0">Tasks Not Finisheds</h6>
                          <h3>20</h3>
                        </div>
                        <div className="icon-box">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_71_124)">
                              <path
                                opacity="0.3"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8 3V3.5C8 4.32843 8.67157 5 9.5 5H14.5C15.3284 5 16 4.32843 16 3.5V3H18C19.1046 3 20 3.89543 20 5V21C20 22.1046 19.1046 23 18 23H6C4.89543 23 4 22.1046 4 21V5C4 3.89543 4.89543 3 6 3H8Z"
                                fill="#252525"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.875 15.75C10.6354 15.75 10.3958 15.6542 10.2042 15.4625L8.2875 13.5458C7.90417 13.1625 7.90417 12.5875 8.2875 12.2042C8.67083 11.8208 9.29375 11.8208 9.62917 12.2042L10.875 13.45L14.0375 10.2875C14.4208 9.90417 14.9958 9.90417 15.3792 10.2875C15.7625 10.6708 15.7625 11.2458 15.3792 11.6292L11.5458 15.4625C11.3542 15.6542 11.1146 15.75 10.875 15.75Z"
                                fill="#252525"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11 2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2H14.5C14.7761 2 15 2.22386 15 2.5V3.5C15 3.77614 14.7761 4 14.5 4H9.5C9.22386 4 9 3.77614 9 3.5V2.5C9 2.22386 9.22386 2 9.5 2H11Z"
                                fill="#252525"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_71_124">
                                <rect width={24} height={24} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      <div className="progress-box mt-0 custome-progress">
                        <div className="d-flex justify-content-between">
                          <p className="">Complete Task</p>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar bg-white"
                            style={{ width: "60%", height: 12, borderRadius: 8 }}
                            role="progressbar"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card same-card-chart bg-danger-light diposit-bg">
                    <div className="card-body depostit-card p-0">
                      <div className="depostit-card-media d-flex justify-content-between pb-0">
                        <div>
                          <h6 className="mb-0 font-w400">Total Deposit</h6>
                          <h3>$1200.00</h3>
                        </div>
                        <div className="icon-box rounded-circle">
                          <svg
                            width={15}
                            height={15}
                            viewBox="0 0 12 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4642 13.7074C11.4759 12.1252 10.8504 10.8738 9.60279 9.99009C8.6392 9.30968 7.46984 8.95476 6.33882 8.6137C3.98274 7.89943 3.29927 7.52321 3.29927 6.3965C3.29927 5.14147 4.93028 4.69493 6.32655 4.69493C7.34341 4.69493 8.51331 5.01109 9.23985 5.47964L10.6802 3.24887C9.73069 2.6333 8.43112 2.21342 7.14783 2.0831V0H4.49076V2.22918C2.12884 2.74876 0.640949 4.29246 0.640949 6.3965C0.640949 7.87005 1.25327 9.03865 2.45745 9.86289C3.37331 10.4921 4.49028 10.83 5.56927 11.1572C7.88027 11.8557 8.81873 12.2813 8.80805 13.691L8.80799 13.7014C8.80799 14.8845 7.24005 15.3051 5.89676 15.3051C4.62786 15.3051 3.248 14.749 2.46582 13.9222L0.535522 15.7481C1.52607 16.7957 2.96523 17.5364 4.4907 17.8267V20.0001H7.14783V17.8735C9.7724 17.4978 11.4616 15.9177 11.4642 13.7074Z"
                              fill="#111828"
                            />
                          </svg>
                        </div>
                      </div>
                      <div id="NewExperience" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card bg-warning-light">
                    <div className="card-header border-0 flex-wrap">
                      <div className="revenue-date">
                        <h6 className="mb-0 font-w400">Revenue</h6>
                        <h4 className="">$310.45</h4>
                      </div>
                      <div className="avatar-list avatar-list-stacked me-2">
                        <img
                          src="images/contacts/pic555.jpg"
                          className="avatar avatar-md rounded-circle"
                          alt=""
                        />
                        <img
                          src="images/contacts/pic666.jpg"
                          className="avatar avatar-md rounded-circle"
                          alt=""
                        />
                        <a href="app-profile-2.html">
                          <span className="avatar avatar-md rounded-circle bg-white">
                            25+
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="card-body pb-0 pt-0 custome-tooltip d-flex align-items-center">
                      <div id="chartBar" className="chartBar" />
                      <div className="grouth">
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx={10} cy={10} r={10} fill="white" />
                          <g clipPath="url(#clip0_3_443)">
                            <path
                              opacity="0.3"
                              d="M13.0641 7.54535C13.3245 7.285 13.3245 6.86289 13.0641 6.60254C12.8038 6.34219 12.3817 6.34219 12.1213 6.60254L6.46445 12.2594C6.2041 12.5197 6.2041 12.9419 6.46445 13.2022C6.7248 13.4626 7.14691 13.4626 7.40726 13.2022L13.0641 7.54535Z"
                              fill="black"
                            />
                            <path
                              d="M7.40729 7.26921C7.0391 7.26921 6.74062 6.97073 6.74062 6.60254C6.74062 6.23435 7.0391 5.93587 7.40729 5.93587H13.0641C13.4211 5.93587 13.7147 6.21699 13.7302 6.57358L13.9659 11.9947C13.9819 12.3626 13.6966 12.6737 13.3288 12.6897C12.961 12.7057 12.6498 12.4205 12.6338 12.0526L12.4258 7.26921H7.40729Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_3_444">
                              <rect
                                width={16}
                                height={16}
                                fill="white"
                                transform="matrix(-1 0 0 -1 18 18)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="d-block font-w600 text-black mt-1">45%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card bg-info-light">
                    <div className="card-header border-0 flex-wrap">
                      <div className="revenue-date">
                        <h6 className="mb-0 font-w400">Expenses</h6>
                        <h4 className="">$310.45</h4>
                      </div>
                      <a
                        href="#"
                        className="diposit-bg"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <div className="icon-box  rounded-circle">
                          <svg
                            width={14}
                            height={15}
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.83333 6.08333V1.41667C5.83333 0.772334 6.35567 0.25 7 0.25C7.64433 0.25 8.16667 0.772334 8.16667 1.41667V6.08333H12.8333C13.4777 6.08333 14 6.60567 14 7.25C14 7.89433 13.4777 8.41667 12.8333 8.41667H8.16667V13.0833C8.16667 13.7277 7.64433 14.25 7 14.25C6.35567 14.25 5.83333 13.7277 5.83333 13.0833V8.41667H1.16667C0.522334 8.41667 0 7.89433 0 7.25C0 6.60567 0.522334 6.08333 1.16667 6.08333H5.83333Z"
                              fill="#222B40"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                    <div className="card-body pb-0 pt-0 custome-tooltip d-flex align-items-center">
                      <div id="expensesChart" className="chartBar" />
                      <div className="grouth">
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx={10} cy={10} r={10} fill="white" />
                          <g clipPath="url(#clip0_3_443)">
                            <path
                              opacity="0.3"
                              d="M13.0641 7.54535C13.3245 7.285 13.3245 6.86289 13.0641 6.60254C12.8038 6.34219 12.3817 6.34219 12.1213 6.60254L6.46445 12.2594C6.2041 12.5197 6.2041 12.9419 6.46445 13.2022C6.7248 13.4626 7.14691 13.4626 7.40726 13.2022L13.0641 7.54535Z"
                              fill="black"
                            />
                            <path
                              d="M7.40729 7.26921C7.0391 7.26921 6.74062 6.97073 6.74062 6.60254C6.74062 6.23435 7.0391 5.93587 7.40729 5.93587H13.0641C13.4211 5.93587 13.7147 6.21699 13.7302 6.57358L13.9659 11.9947C13.9819 12.3626 13.6966 12.6737 13.3288 12.6897C12.961 12.7057 12.6498 12.4205 12.6338 12.0526L12.4258 7.26921H7.40729Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_3_443">
                              <rect
                                width={16}
                                height={16}
                                fill="white"
                                transform="matrix(-1 0 0 -1 18 18)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="d-block font-w600 text-black mt-1">45%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card overflow-hidden">
                <div className="card-header border-0 pb-0 flex-wrap">
                  <h4 className="card-title mb-0">Projects Overview</h4>
                  <ul className="nav nav-pills mix-chart-tab" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        data-series="week"
                        id="pills-week-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-week"
                        type="button"
                        role="tab"
                        aria-selected="true"
                      >
                        Week
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-series="month"
                        id="pills-month-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-month"
                        type="button"
                        role="tab"
                        aria-selected="false"
                      >
                        Month
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-series="year"
                        id="pills-year-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-year"
                        type="button"
                        role="tab"
                        aria-selected="false"
                      >
                        Year
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-series="all"
                        id="pills-all-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-all"
                        type="button"
                        role="tab"
                        aria-selected="false"
                      >
                        All
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body custome-tooltip p-0">
                  <div id="overiewChart" />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">User Profile </h4>
                  <div className="dropdown custom-dropdown mb-0">
                    <div
                      className="btn sharp btn-primary light tp-btn"
                      data-bs-toggle="dropdown"
                    >
                      <svg
                        width={6}
                        height={15}
                        viewBox="0 0 6 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.19995 10.001C5.19995 9.71197 5.14302 9.42576 5.03241 9.15872C4.9218 8.89169 4.75967 8.64905 4.55529 8.44467C4.35091 8.24029 4.10828 8.07816 3.84124 7.96755C3.5742 7.85694 3.28799 7.80001 2.99895 7.80001C2.70991 7.80001 2.4237 7.85694 2.15667 7.96755C1.88963 8.07816 1.64699 8.24029 1.44261 8.44467C1.23823 8.64905 1.0761 8.89169 0.965493 9.15872C0.854882 9.42576 0.797952 9.71197 0.797952 10.001C0.798085 10.5848 1.0301 11.1445 1.44296 11.5572C1.85582 11.9699 2.41571 12.2016 2.99945 12.2015C3.58319 12.2014 4.14297 11.9694 4.55565 11.5565C4.96832 11.1436 5.20008 10.5838 5.19995 10L5.19995 10.001ZM5.19995 3.00101C5.19995 2.71197 5.14302 2.42576 5.03241 2.15872C4.9218 1.89169 4.75967 1.64905 4.55529 1.44467C4.35091 1.24029 4.10828 1.07816 3.84124 0.967552C3.5742 0.856941 3.28799 0.800011 2.99895 0.800011C2.70991 0.800011 2.4237 0.856941 2.15667 0.967552C1.88963 1.07816 1.64699 1.24029 1.44261 1.44467C1.23823 1.64905 1.0761 1.89169 0.965493 2.15872C0.854883 2.42576 0.797953 2.71197 0.797953 3.00101C0.798085 3.58475 1.0301 4.14453 1.44296 4.55721C1.85582 4.96988 2.41571 5.20164 2.99945 5.20151C3.58319 5.20138 4.14297 4.96936 4.55565 4.5565C4.96832 4.14364 5.20008 3.58375 5.19995 3.00001L5.19995 3.00101ZM5.19995 17.001C5.19995 16.712 5.14302 16.4258 5.03241 16.1587C4.9218 15.8917 4.75967 15.6491 4.55529 15.4447C4.35091 15.2403 4.10828 15.0782 3.84124 14.9676C3.5742 14.8569 3.28799 14.8 2.99895 14.8C2.70991 14.8 2.4237 14.8569 2.15666 14.9676C1.88963 15.0782 1.64699 15.2403 1.44261 15.4447C1.23823 15.6491 1.0761 15.8917 0.965493 16.1587C0.854882 16.4258 0.797952 16.712 0.797952 17.001C0.798084 17.5848 1.0301 18.1445 1.44296 18.5572C1.85582 18.9699 2.41571 19.2016 2.99945 19.2015C3.58319 19.2014 4.14297 18.9694 4.55565 18.5565C4.96832 18.1436 5.20008 17.5838 5.19995 17L5.19995 17.001Z"
                          fill="#000000"
                        />
                      </svg>
                    </div>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="javascript:void(0);">
                        Option 1
                      </a>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Option 2
                      </a>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Option 3
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="projectChart" className="project-chart" />
                  <div className="project-date">
                    <div className="project-media">
                      <p className="mb-0">
                        <svg
                          className="me-2"
                          width={17}
                          height={18}
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="1.5"
                            y="1.9248"
                            width={14}
                            height={14}
                            rx={7}
                            fill="white"
                            stroke="var(--primary-light)"
                            strokeWidth={3}
                          />
                        </svg>
                        Male
                      </p>
                      <span>50%</span>
                    </div>
                    <div className="project-media">
                      <p className="mb-0">
                        <svg
                          className="me-2"
                          width={17}
                          height={18}
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="1.5"
                            y="1.9248"
                            width={14}
                            height={14}
                            rx={7}
                            fill="white"
                            stroke="#F4CF0C"
                            strokeWidth={3}
                          />
                        </svg>
                        Female
                      </p>
                      <span>20%</span>
                    </div>
                    <div className="project-media">
                      <p className="mb-0">
                        <svg
                          className="me-2"
                          width={17}
                          height={18}
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="1.5"
                            y="1.9248"
                            width={14}
                            height={14}
                            rx={7}
                            fill="white"
                            stroke="#FF7C7C"
                            strokeWidth={3}
                          />
                        </svg>
                        Other
                      </p>
                      <span>30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-md-12">
              <div className="card overflow-hidden mandal-map">
                <div className="card-header">
                  <h4 className="card-title">Active users</h4>
                </div>
                <div className="card-body pt-0  ps-2">
                  <div className="row">
                    <div className="col-xl-8 active-map-main col-sm-7">
                      <div id="world-map" className="active-map" />
                    </div>
                    <div className="col-xl-4 impressionbox col-sm-5">
                      <h4 className="card-title left-title">Weekly</h4>
                      <div className="d-flex justify-content-between">
                        <div className="wickly-update">
                          <small>This Week</small>
                          <h6 className="text-primary">+ 20%</h6>
                        </div>
                        <div className="wickly-update">
                          <small>Last Week</small>
                          <h6 className="text-warning">+ 20%</h6>
                        </div>
                      </div>
                      <h5 className="fs-16 font-w700 mt-3">Impression</h5>
                      <div id="impressionChart" className="impression" />
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <h5 className="mb-0 fs-18 font-w700">12.345%</h5>
                        <p className="mb-0">
                          <span className="text-primary font-w700">5.4%</span> than last
                          year
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}