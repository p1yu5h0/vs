import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="">
          <div>
            Hi Piyush, this is your website....
          </div>
          <div>
            <table>
              <ul>
                <li>
                  Upload the video here
                </li>
              </ul>
            </table>
          </div>  
        </div>
       
      </div>

    </main>
  );
}
