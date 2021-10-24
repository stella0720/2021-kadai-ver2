import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../../models/User'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'

type Query = {
    uid: string
}

// フォーム画面（作成中）
export default function UserShow() {
    const [user, setUser] = useState<User>(null)
    const router = useRouter()
    const query = router.query as Query
  
    // firebaseの匿名認証で生成されたランダムなユーザIDを取得する
    // 送信主のIDがわかるような仕様
    useEffect(() => {
      async function loadUser() {
        const db = getFirestore()
        const ref = doc(collection(db, 'users'), query.uid)
        const userDoc = await getDoc(ref)
  
        if (!userDoc.exists()) {
          return
        }
  
        const gotUser = userDoc.data() as User
        gotUser.uid = userDoc.id
        setUser(gotUser)
      }
      loadUser()
    }, [])
  
    return(
    <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
    </div>
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-full">
          <div className="relative">
            <label className="leading-7 text-sm text-gray-600">Message</label>
            <textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className="p-2 w-full">
          <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Button</button>
        </div>
      </div>
    </div>
  </div>
</section>
  )
  }