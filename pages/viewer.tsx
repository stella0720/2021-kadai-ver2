import Link from "next/link"
import React from "react"
import ComicViewer from "react-comic-viewer"

export default function Viewer() {
    return(
    <section className="text-gray-600 body-font">

        <ComicViewer pages={["20211102151758130.png", "20211102151831976.png", "20211102151841414.png", "20211102151854332.png"]} />

        <div className="mt-5 ml-5 ">
        <Link href={{
            pathname: '/',
        }}>もどる</Link>
        </div>
    </section>
    )
}