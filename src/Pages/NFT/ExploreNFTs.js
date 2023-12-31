import React, { useState, useEffect, useContext } from "react";
import ReactAudioPlayer from "react-audio-player";
import { BlockchainConfig } from "../../BackendConfig/BlockchainConfig";
import { FirebaseConfig } from "../../BackendConfig/FirebaseConfig";
import Navbar from "../Landing/components/Navbar";

import { Loader } from "./components/Loader";
import NFTCard from "./components/NFTCard";

const ExploreNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [OriginalNFTs, setOriginalNFTs] = useState([])
  const { fetchMyNFTsOrListedNFTs,fetchNFTs } = useContext(BlockchainConfig);
  const { getMoodDatas } = useContext(FirebaseConfig);
  const [filteredNfts, setFilteredNfts] = useState(nfts);
  const [moodSelected, setMoodSelected] = useState("");
  const filterNfts = async (mood) => {
    setMoodSelected(mood);
    setLoading(true);
    let temp = [];
    if(mood==='all'){
      setFilteredNfts(OriginalNFTs)
      console.log('yes')
    }
    else{
    let dat = await getMoodDatas(mood);
    
    console.log("dd", dat);
    nfts.forEach((item) => {
      console.log("wer", item.image);
      for (let i = 0; i < dat.length; i++) {
        console.log("dddweeeed", item.image === dat[i]);
        if (item.image === dat[i]) {
          temp.push(item);
          console.log("yes");
        }
      }
    })
    setFilteredNfts(temp);
  };
    
    setLoading(false);
  };
  useEffect(() => {
    fetchNFTs(setLoading).then((items) => {
      setNfts(items);
      setFilteredNfts(items);
      setLoading(false);
      setOriginalNFTs(items)
    });
  }, []);

  // if (Loading) {
  //   return (
  //     <div className="flexStart min-h-screen">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    < div className="min-h-screen bg-[#99FFE3]">

      <Navbar />

      <div className="flex justify-center sm:px-4 p-12 min-h-screen">
        <div className="w-full minmd:w-4/5">
        {  <div className="flex flex-row justify-evenly">
            {moodSelected === "all"  && !Loading ? (
              <button className="bg-green-500 border-2 border border-green-800 p-2 font-bold text-white rounded-xl mx-3">
                All{" "}
              </button>
            ) : (
              <button
                className="bg-green-800 p-2 font-bold text-white rounded-xl mx-3"
                onClick={() => filterNfts("all")}
              >
                All{" "}
              </button>
            )}
            {moodSelected === "happy" ? (
              <button className="bg-green-500 border-2 border border-green-800 p-2 font-bold text-white rounded-xl mx-3">
                Happy 😀{" "}
              </button>
            ) : (
              <button
                className="bg-green-800 p-2 font-bold text-white rounded-xl mx-3"
                onClick={() => filterNfts("happy")}
              >
                Happy 😀{" "}
              </button>
            )}
            {/* <button className='bg-green-800 p-2 font-bold text-white rounded-xl mx-3' onClick={()=>filterNfts("happy")}> Happy 😀</button> */}

            {moodSelected === "angry" ? (
              <button className="bg-green-500 border-2 border border-green-800 p-2 font-bold text-white rounded-xl mx-3">
               Angry 😡
              </button>
            ) : (
              <button
                className="bg-green-800 p-2 font-bold text-white rounded-xl mx-3"
                onClick={() => filterNfts("angry")}
              >
              Angry 😡
              </button>
            )}
            {moodSelected === "sad" ? (
              <button className="bg-green-500 border-2 border border-green-800 p-2 font-bold text-white rounded-xl mx-3">
                Sad ☹️
              </button>
            ) : (
              <button
                className="bg-green-800 p-2 font-bold text-white rounded-xl mx-3"
                onClick={() => filterNfts("sad")}
              >
                 Sad ☹️
              </button>
            )}
            {/* <button className='bg-green-800 p-2 font-bold text-white rounded-xl mx-3' onClick={()=>filterNfts("angry")}> Angry 😡</button> */}
            {/* <button className='bg-green-800 p-2 font-bold text-white rounded-xl mx-3' onClick={()=>filterNfts("sad")}> sad 😖</button> */}
          </div>}

          <div className="mt-4">
            {!Loading && filteredNfts.length === 0 ? (
              <div className="flexCenter sm:p-4 p-16 ">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
                  No NFTs Listed for Sale
                </h1>
              </div>
            ) : (
              <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2">
                NFTs listed for sale
              </h2>
            )}

            <div className="mt-3 w-full flex flex-wrap justify-center md:justify-center">
              {!Loading && filteredNfts.map((nft) => (
                <>
                  {" "}
                  <NFTCard key={nft.tokenId} nft={nft} />{" "}
                </>
              ))}
              {Loading && <Loader/> }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreNFTs;
