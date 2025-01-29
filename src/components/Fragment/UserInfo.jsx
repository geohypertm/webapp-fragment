import { useContext } from "react";
import fragmentContext from "../../ContextApi/context";
const UserInfo = () => {
    const {inputValue, setInputValue, handlebtn} = useContext(fragmentContext);

  return (
    <>
    <div className="flex flex-col justify-center items-center">
    <h1 className="m-2">اضافه کردن ایپی یا دامنه به لیست</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type here"
        className="input input-bordered input-info w-full m-2 max-w-xs"
      />
      <button onClick={handlebtn} className="btn btn-outline m-2 w-full max-w-xs btn-primary">
        اضافه 
      </button>
    </div>
      
    </>
  );
};

export default UserInfo;
