"use client"
import { useState, useEffect} from 'react';
import Image from 'next/image'
import { Inter,IBM_Plex_Mono } from 'next/font/google'
import {repeat_key_xor, repeat_key_xor_dec} from "../crypto.js"

const inter = Inter({ subsets: ['latin'] })
const ibm_plex = IBM_Plex_Mono({ subsets: ['latin'],
                  weight:["100", "200", "300", "400", 
                          "500", "600", "700"] })

export default function Home() {
  const [message, set_message] = useState("A message is a discrete unit of communication intended by the source for consumption by some recipient or group of recipients"
);
  const [key, set_key] = useState("ICE");
  const [result, set_result] = useState("");
  const [is_encrypt_mode, set_is_encrypt_mode] = useState(true);
  useEffect(() => { 
    set_result(repeat_key_xor(message, key));
  },[])
 function make_result(){
    if (is_encrypt_mode){
      set_result(repeat_key_xor(message, key));
    } 
    else{
      set_result(repeat_key_xor_dec(message, key));
    }
  }

  function handle_message_change(event){
    set_message(event.target.value)
    make_result();
  }
  function handle_key_change(event){
    set_key(event.target.value)
    make_result();
  }
   function handle_click(){
    console.log("button clicked")
    set_is_encrypt_mode(!is_encrypt_mode);
    let temp = message;
    set_message(result);
    set_result(temp);
  }
  const checkboxStyle = {
    transform: 'scale(1.5)',
    marginRight: '10px', 
  };

  return (
   <div className={`${ibm_plex.className} `} style={{fontSize: 20}} >
    <h1>Repeated key XOR</h1>
    <label>
      {is_encrypt_mode ? "Encrypt mode":"Decrypt mode" }
      &nbsp;
      <button className={`${ibm_plex.className} `}  
              style={{fontSize: 20}} 
              onClick = {handle_click}
              >
      Click for &#160; 
      {is_encrypt_mode ? "Decrypt mode":"Encrypt mode" }
      </button>
    </label>
    <br/>
    <br/>
    <label >
      {is_encrypt_mode ? "Message ":"Encrypted Message " }
      <textarea
        value = {message}
        onChange = {handle_message_change}
        name="message" 
        className={`${ibm_plex.className} `}  
        style={{fontSize: 20}}  

        rows={4} cols={40} />
    </label>
    <br/>
    <br/>
    <label>
      Key: 
      <input 
        value = {key}
        onChange = {handle_key_change}
        className={`${ibm_plex.className}`}  style={{fontSize: 20, width: 200}}   name="key"/>
    </label>
    <br/>
    <br/>
    <div 
     style={{width: 700,wordWrap: "break-word"}} 
    >
  {is_encrypt_mode ? "Encrypted Message: " :"Decrypted Message: " }

<br/>
  {result}
          </div>

   </div>
 )
}
