import { getUserDetails } from "../actions/submitUser"


export default async function Dashboard() {
  const user = await getUserDetails()

  if (!user) {
    return <div>Error fetching user details</div>
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center font-mono">
      <div className="max-w-md w-full space-y-4">
        <div className="border-b border-black pb-2">
          <h1 className="text-lg">CONFIRMATION</h1>
        </div>
        <div className="space-y-2">
          <p>
            <span>{user.name}</span>{' '}
            <span>{user.lastName}</span>
          </p>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
    </div>
  )
}

