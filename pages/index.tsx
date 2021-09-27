import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Image from 'next/image'
import profilePic from '../public/sample.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faBookOpen, faEnvelope, faHeart, faImages, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useAuthentication } from '../hooks/authentication'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  // ユーザ情報を取得
  const { user } = useAuthentication()

  // フォームができたら、ここで先にユーザIDを取得し、フォーム画面に渡すようにする
  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

    <div className="flex flex-wrap -mx-4 -mb-10">
      <div className="sm:w-full mb-10 px-4 .text-left">
        <h1 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3"><FontAwesomeIcon icon={faAngleDoubleRight} className="mr-2"/>LandingPage</h1>
      </div>
      <div className="sm:w-1/2 mb-10 px-4 .text-left">
        <div className="rounded-lg overflow-hidden">
          <Image alt="content" className="object-cover object-center h-full w-full" src={profilePic} />
        </div>
        <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3"><FontAwesomeIcon icon={faBookOpen} className="mr-2"/>タイトル</h2>
        <p className="w-2/3 leading-relaxed text-base">「あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。」</p>
        <button className="mt-6 w-32 bg-blue-400 text-white active:bg-lightBlue-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> button</button>
      </div>
      <div className="sm:w-1/2 mb-10 px-4 .text-left">
        <div className="rounded-lg overflow-hidden">
          <Image alt="content" className="object-cover object-center h-full w-full" src={profilePic} />
        </div>
        <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3"><FontAwesomeIcon icon={faBookOpen} className="mr-2"/>タイトル</h2>
        <p className="w-2/3 leading-relaxed text-base">「あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。」</p>
        <button className="mt-6 w-32 bg-blue-400 text-white active:bg-lightBlue-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> button</button>
      </div>
      <div className="sm:w-1/5 flex flex-col mb-10 px-4 .text-left">
      <div className="mt-8">
      <p className="leading-relaxed text-base"><FontAwesomeIcon icon={faEnvelope} className="mr-2"/>ダミーテキスト</p>
        <button className="mt-6 w-32 bg-rose-300 text-white active:bg-rose-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">form</button>
      </div>
      </div>
      <div className="sm:w-1/5 flex flex-col mb-10 px-4 .text-left">

      <div className="mt-8">
      <p className="leading-relaxed text-base"><FontAwesomeIcon icon={faTwitter} className="mr-2"/>ダミーテキスト</p>
        <button className="mt-6 w-32 bg-sky-400 text-white active:bg-lightBlue-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"><i className="fas fa-heart"></i> twitter</button>
      </div>
    </div>
    </div>

</div>
  </section>
  )
}
