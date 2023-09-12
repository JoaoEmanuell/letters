import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function UserIndex() {
    const cookieStore = cookies()
    const userToken = cookieStore.get('userToken')
    if (userToken === undefined) {
        return redirect('/user/login')
    }
    return <h1>User index</h1>
}
