import { useRef, useState } from "react";
import { useContext } from "react";
import fragmentContext from "../../ContextApi/context";

const CreateFT = () => {
  const [inputValue, setInputValue] = useState("");
  const [domain, setDomain] = useState("");
  const [exportValue, setExportValue] = useState("");
  const [show, setShow] = useState(false);
  const refInput = useRef(null);

  let templateJson =
    '{"log": {"access": "", "error": "", "loglevel": "warning"}, "inbounds": [{"tag": "socks", "port": 10808, "listen": "127.0.0.1", "protocol": "socks", "sniffing": {"enabled": true, "destOverride": ["http", "tls"], "routeOnly": false}, "settings": {"auth": "noauth", "udp": true, "allowTransparent": false}}, {"tag": "http", "port": 10809, "listen": "127.0.0.1", "protocol": "http", "sniffing": {"enabled": true, "destOverride": ["http", "tls"], "routeOnly": false}, "settings": {"auth": "noauth", "udp": true, "allowTransparent": false}}], "outbounds": [{"tag": "proxy", "protocol": "vless", "settings": {"vnext": [{"address": """address""", "port": 443, "users": [{"id": """uuid""", "alterId": 0, "email": "t@t.tt", "security": "auto", "encryption": "none", "flow": ""}]}]}, "streamSettings": {"network": "ws", "security": "tls", "tlsSettings": {"allowInsecure": false, "serverName": """domain""", "alpn": ["h2", "http/1.1"], "fingerprint": "chrome", "show": false}, "wsSettings": {"path": """path""", "headers": {"Host": """domain"""}}, "sockopt": {"dialerProxy": "fragment", "tcpKeepAliveIdle": 100, "mark": 255, "tcpNoDelay": true}}, "mux": {"enabled": true, "concurrency": 8}}, {"tag": "fragment", "protocol": "freedom", "settings": {"domainStrategy": "AsIs", "fragment": {"packets": "tlshello", "length": "11-31", "interval": "3-9"}}, "streamSettings": {"sockopt": {"tcpNoDelay": true, "tcpKeepAliveIdle": 100}}}, {"tag": "direct", "protocol": "freedom", "settings": {}}, {"tag": "block", "protocol": "blackhole", "settings": {"response": {"type": "http"}}}], "routing": {"domainStrategy": "AsIs", "rules": [{"type": "field", "inboundTag": ["api"], "outboundTag": "api", "enabled": true}, {"id": "5627785659655799759", "type": "field", "port": "0-65535", "outboundTag": "proxy", "enabled": true}]}}';
  const { valueDomins } = useContext(fragmentContext);
  const handleButtonClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
    } catch (err) {
      console.log(err.message);
    }
  };

  const hanlderCovert = (inputValue) => {
    const domainRegex = /(?<=sni=)[\w\-.]+(?=(?:&type|#))/;
    const path = /(?<=path=%2F|\/)[a-zA-Z0-9]+(?=&host)/;
    const UUID = /[a-zA-Z0-9\-]{25,}/;

    const valueUUID = UUID.exec(inputValue);
    const valueDomain = domainRegex.exec(inputValue);
    const valuePath = path.exec(inputValue);

    if (!valueUUID || !valueDomain || !valuePath || !domain) {
      setShow(false);
      setInputValue("");
      alert("⚠️ لطفا کانفیگ معتبر وارد کنید و دامنه رو هم اضافه کنید");
      return;
    }
    setShow(true);

    const formattedDomain = valueDomain[0]
      .split("")
      .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("");
    const formattedPath = "/" + valuePath[0];

    let u = templateJson.replace(/""uuid""/, valueUUID[0]);
    let d = u.replace(/""domain""/g, formattedDomain);
    let i = d.replace(/""address""/, domain);
    let p = i.replace(/""path""/, formattedPath);

    setExportValue(p);
  };

  const deleteInputValue = () => {
    setInputValue("");
  }
  
  let copyTimer;
  const handlerCopy = () => {
      refInput.current.textContent = "کپی شد !";
      
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        refInput.current.textContent = "برای کپی کردن خروجی کلیک کنید";
      }, 1000);
      
      navigator.clipboard.writeText(exportValue);
};

return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="flex justify-center w-full m-2">
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="select select-primary w-full max-w-xs text-center"
          >
            <option value="" disabled>
              انتخاب کردن IP / Domain
            </option>
            {valueDomins.map((domain, index) => (
              <option value={domain.name} key={index}>
                {domain.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleButtonClick}
          className="btn btn-outline btn-info w-full max-w-xs m-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        </button>
        <input
          dir="rtl"
          type="text"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
          placeholder="کانفیگ خود را وارد کنید"
          className="input input-bordered input-primary w-full max-w-xs m-2"
        />
        <button
          onClick={() => {
            hanlderCovert(inputValue);
          }}
          className="btn btn-outline btn-info w-full max-w-xs m-2"
        >
          تبدیل
        </button>
        <button
        onClick={deleteInputValue}
          className="btn btn-outline btn-info w-full max-w-xs m-2"
        >
          پاک کردن اینپوت
        </button>
        
      </div>

      <div className={show ? "flex justify-center items-center m-4" : "hidden"}>
        <button
          ref={refInput}
          onClick={handlerCopy}
          className="btn btn-outline btn-info w-full max-w-xs m-2"
        >
          برای کپی کردن خروجی کلیک کنید
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default CreateFT;
