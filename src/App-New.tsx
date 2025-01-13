import "./App.css";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import { useLocation } from 'react-router-dom';


function App() {
  const client = ZoomMtgEmbedded.createClient();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parameter = queryParams.get('meeting_id');
  console.log("first request",parameter)
  // const { me } = useParams();

  // const authEndpoint = ""; // http://localhost:4000
  // const sdkKey = "";
  // const meetingNumber = "";
  // const passWord = "";
  // const role = 0;
  // const userName = "React";
  // const userEmail = "";
  // const registrantToken = "";
  // const zakToken = "";

  const authEndpoint = "https://zoomauthserver.onrender.com"; // http://localhost:4000
  const sdkKey = "sLCjS5FQQOrr85PhrkIbQ";
  const meetingNumber = parameter || "0";
  const passWord = "QLW2T7";
  const role = 0;
  const userName = "React";
  const userEmail = "";
  const registrantToken = "";
  const zakToken = "";
  // const leaveUrl = "http://localhost:5173";


  const getSignature = async () => {
    try {
      const req = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber.toString(),
          role: role,
        }),
      });
      const res = await req.json()
      const signature = res.signature as string;
      startMeeting(signature)
    } catch (e) {
      console.log(e);
    }
  };

  async function startMeeting(signature: string) {
    const meetingSDKElement = document.getElementById("meetingSDKElement")!;
    try {
      await client.init({
        zoomAppRoot: meetingSDKElement,
        language: "en-US",
        patchJsMedia: true,
        leaveOnPageUnload: true,
      })
      await client.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        password: passWord,
        userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
      })
      console.log("joined successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <main>
        <h1>Training room Prototype</h1>
        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
