import React, { use } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, Slide,Flip } from 'react-toastify'


function Encrypt() {
    const [message, setmessage] = useState(" ");
    const [password, setpassword] = useState(" ");
    const [hint, sethint] = useState(" ")
    const [secret, setsecret] = useState(" ")
    const navigate = useNavigate();
    const [descrySecret, setdescrySecret] = useState("")
    const [descryPassword, setdescryPassword] = useState("")
    const [eForm, seteForm] = useState(true)
    const [dForm, setdForm] = useState(false)
    const [DBAMessage, setDBAMessage] = useState("")
    const handleevent = (e) => {
        e.preventDefault();
        if (message === " " || password === " " || hint === " ") {
            toast.error('👋 Hold on! We need some input here before you proceed.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
        else {
            Sentmessage(message, password)
        }
    }
    useEffect(() => {
        setdForm(false);
        seteForm(true)
        toast('🤫 Welcome to Secret Messenger! Create your secret code and share it with your friends — only they can unlock it 🔓', {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
            bodyClassName:"toastIntro"
        }

    );
    }, [])
    const varifyPassword = (e) => {
        e.preventDefault();

        console.log('user input data')
        console.log('descrySecret = ' + descrySecret)
        console.log('descryPassword = ' + descryPassword)
        axios.post(`http://localhost:8080/varifyPassword?secret=${encodeURIComponent(descrySecret)}&password=${encodeURIComponent(descryPassword)}`)
            .then((resp) => {
                console.log(resp.data)
                // console.log("your secret message = " + resp.data.message);
                const msg = resp.data[0].message;
                setDBAMessage[msg];
                console.log("msg = " + msg);
                setDBAMessage(msg)
            })
            .catch((error) => {
                console.log(error);

            })

    }

    const Sentmessage = (message, password) => {
        console.log("function clle");

        axios.post(`http://localhost:8080/sentMessage?msg=${message}&password=${password}&hint=${hint}`).then((resp) => {
            console.log("Message successfully encrypted");
            console.log("your secret message = " + resp.data);
            const s = resp.data;
            setsecret(s);
            console.log("secret = " + s)
            navigate("/success", {
                state: {
                    secret: s,
                    hint_msg: hint,
                }
            })


        })
            .catch((error) => {
                console.log(error);

            })

    }
    return (
        <div className="container">

            <div className="buttons">
                <button className="Ebtn"
                    onClick={() => {
                        seteForm(true);
                        setdForm(false)
                    }}>Encrypt</button>
                <button className="Dbtn"
                    onClick={() => {
                        seteForm(false);
                        setdForm(true)
                    }}>Decrypt</button>
            </div>
            <div className="forms">
                {eForm && <div className="EmainCont">
                    <h1>Welcome to LOCK-TALK - Encryption</h1>
                    <div id="form">
                        <label>Message</label>
                        <textarea rows="3" cols="45" placeholder="Type your message here ..."
                            // value={message}
                            onChange={((e) => {
                                setmessage(e.target.value);
                            })}

                        />

                        <label>Password</label>
                        <input type="password" placeholder="Enter password ..."
                            // value={password}
                            onChange={((e) => {
                                setpassword(e.target.value);
                            })}
                        />
                        <label>Hint</label>
                        <input type="text" placeholder="Enter Hint ..."
                            // value={hint}
                            onChange={((e) => {
                                sethint(e.target.value);
                            })}
                        />

                        <button className='btn' type="submit" onClick={handleevent}>Encrypt</button>
                    </div>
                </div>}



                {/* ======================   decryption form =================================================  */}



                {dForm && <div className="FmainCont">
                    <h1>Welcome to LOCK-TALK - Decryption</h1>
                    <div id="form">
                        <label>Secret Code</label>
                        <textarea rows="3" cols="45" placeholder="Copy and Paste Secret Message here ..."
                            // value={message}
                            onChange={((e) => {
                                setdescrySecret(e.target.value);
                            })}

                        />

                        <label>Password</label>
                        <input type="password" placeholder={hint}
                            // value={hint}
                            onChange={((e) => {
                                setdescryPassword(e.target.value)
                            })}

                        />
                        <div className="msgLabel">
                            <label className='Message' >{DBAMessage}</label>
                        </div>
                        <button className='btn' type="submit" onClick={varifyPassword}>Decrypt</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Encrypt
