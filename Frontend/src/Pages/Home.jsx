import React from "react";
import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <div>
//         <div className=' bg-center bg-cover bg-no-repeat bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-5 w-full flex flex-col justify-between'>
//              <img className='w-16 ml-8  ' src="https://latestlogo.com/wp-content/uploads/2024/02/uber-white.svg" alt="" />
//               <div className='bg-white py-4 px-4 pb-7 '>
//                 <h2 className='text-2xl font-bold '>Get started with Uber </h2>
//                 <Link to="/login" className='flex justify-center text-zinc-200 text-xl bg-black py-3 rounded mt-2'>Containue</Link>
//               </div>

//         </div>
//     </div>
//   )
// }

// export default Home

function Home() {
  return (
    <>
      <div className="flex flex-col sm:flex-row h-screen">
        {/* Left section with text */}
        <div className="flex flex-col justify-center items-start p-10 w-full sm:w-1/2 bg-white h-full">
          <h1 className="text-3xl sm:text-4xl font-bold mb-5 text-black">
            Log in to see your recent activity
          </h1>
          <p className="mb-6 text-gray-600 text-lg sm:text-xl">
            View past trips, tailored suggestions, support resources, and more.
          </p>
          <Link
            to="/login"
            className="flex justify-center items-center text-white bg-black py-3 px-8 rounded-md mb-4 hover:bg-gray-800 transition"
          >
            Log in to your account
          </Link>
          <p className="text-gray-600">
            Don’t have an Uber account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right section with image */}
        <div
          className="sm:w-1/2 bg-cover bg-center h-full sm:max-w-[650px] lg:max-w-[700px] lg:h-[400px] lg:mt-32 w-full sm:mx-auto sm:h-auto mt-16 sm:mt-0 flex justify-center items-center"
          style={{
            backgroundImage:
              "url('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_465,w_698/v1730197725/assets/0f/48c7ba-da13-4fdc-b54c-42878042f513/original/Airport-Fall.png')",
            backgroundPosition: "center center", // Centering the background image
            backgroundSize: "cover", // Ensuring the image covers the container
          }}
        />
      </div>
    </>
  );
}

export default Home;
