import { useMemo, useState} from "react";

const UserInfo = () => {
    const [userInfo, setUserInfo ] = useState({});
    const user = useMemo(() => {
        return setUserInfo(window.Telegram.WebApp.initDataUnsafe?.user);
    }, [userInfo]);

    return (
        <>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>          
        <th>INFO / ID</th>
        <th>ID</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{`${user.first_name} ${user.last_name}`}</div>
              <div className="text-sm opacity-50">{`@${user.username}`}</div>
            </div>
          </div>
        </td>
        <td>
          {user.id}
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
        </>
    )
}

export default UserInfo;