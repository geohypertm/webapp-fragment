import { useEffect, useState } from "react";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(window.Telegram.WebApp.initDataUnsafe?.user || {});
  }, []);

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
                        src={`https://t.me/i/userpic/320/${userInfo.id}.jpg`}
                        alt="Avatar"
                        onError={(e) => (e.target.src = "https://img.daisyui.com/images/profile/demo/2@94.webp")}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{`${userInfo.first_name || ""} ${userInfo.last_name || ""}`}</div>
                    <div className="text-sm opacity-50">{`@${userInfo.username || "unknown"}`}</div>
                  </div>
                </div>
              </td>
              <td>
                {userInfo.id || "N/A"}
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserInfo;
