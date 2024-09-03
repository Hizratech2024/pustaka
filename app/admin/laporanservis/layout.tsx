
export const metadata = {
    title: "Laporan Servis",
}

function LayoutPenjualan({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-10 py-10">{children}</div>
    )
}

export default LayoutPenjualan