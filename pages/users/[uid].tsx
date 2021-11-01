import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { User } from '../../models/User'
import { 
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp, } from 'firebase/firestore'
import { useAuthentication } from '../../hooks/authentication'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faMusic } from '@fortawesome/free-solid-svg-icons'


type Query = {
    uid: string
    radio: string
}

// フォーム画面（作成中）
export default function UserShow() {
    const [user, setUser] = useState<User>(null)

    const { user: currentUser } = useAuthentication()

    const [isSending, setIsSending] = useState(false)

    const [body, setBody] = useState('')

    const [radio, setRadio] = useState('')

    const [isBlue, setIsBlue] = useState(false) 

    const router = useRouter()

    const query = router.query as Query

    const handleChange = e => setRadio(e.target.id)

    const textBody = (e) => setBody(e.target.value)


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
    }, [query.uid])

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      const db = getFirestore()

      setIsSending(true)
      console.log('radio',radio)
      console.log('body' ,body)
      await addDoc(collection(db, 'questions'), {
        senderUid: currentUser.uid,
        receiverUid: user.uid,
        body,
        radio,
        isReplied: false,
        createdAt: serverTimestamp(),
      })
          setIsSending(false)
      setBody('')
      alert('送信しました。')
    }

    return(
  <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
  <form onSubmit={onSubmit}>
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex justify-center flex-wrap -m-2 mb-2">
        <div className="p-2 w-3/4">
            <input id="awesome" name="radio" type="radio" value={radio}
                    onChange={handleChange}
                    className="radio-button hidden"
                    />
            <label htmlFor="awesome"
                  className="checkedRadio rounded border border-gray-300 px-4 py-2">
              <FontAwesomeIcon icon ={faMusic}/>
            </label>


            <input id="good" name="radio" type="radio" value={radio}
                    onChange={handleChange}
                    className="radio-button hidden"/>
            <label htmlFor="good"
                  className="checkedRadio1 rounded border border-gray-300 px-4 py-2">
              <FontAwesomeIcon icon ={faHeart}/>
            </label>

            <style jsx>{`
              #awesome:checked ~ .checkedRadio{
              color:white;
              background-color: #68a4d9!important;
              }
              #good:checked ~ .checkedRadio1{
              color:white;
              background-color: #68a4d9!important;
              }
            `}</style>
        </div>
        <div className="p-2 w-3/4">
            <textarea
            id="message"
            name="message"
            value={body}
            rows={6}
            onChange={textBody}
            placeholder={"コメント"}
            className="w-full mb-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
            </textarea>
          <button type="submit" className="flex mx-auto text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Send</button>
        </div>


      </div>
      </div>
    </form>
  </div>
  </section>
  )
  }
