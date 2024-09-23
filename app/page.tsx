import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/auth";

export default async function Home() {
  const session= await getServerSession(authOptions)
  return (
    <>
      {/* <div>
        <div className="bg-white p-3 rounded shadow-sm">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
      </div> */}
      <div>
        <div className="pagetitle bg-white p-3 rounded shadow-sm flex items-center">
          <nav>
            <ol className="breadcrumb flex items-center">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
          <h3>Dashboard</h3>
          <pre>{JSON.stringify(session)}</pre>
        </div>
      </div>
    </>
  );
}
