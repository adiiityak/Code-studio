import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        // console.log(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('Room Id & Username required');
            return;
        }
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };

    const handleInputEnter=(e)=>{
        if(e.code === 'Enter'){
            joinRoom();
        }
    }

    return (
        <div className='homePageWrapper'>
            <div className='formWrapper'>
                <img className='homePageLogo' src="/codestudio.png" alt='codestudio-logo' />
                <h4 className='mainLabel'>Paste invitation RoomId</h4>
                <div className='inputGroup'>
                    <input type='text' className='inputBox' placeholder='Enter Room Id' onChange={(e) => setRoomId(e.target.value)} value={roomId} onKeyUp={handleInputEnter} />
                    <input type='text' className='inputBox' placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} value={username} onKeyUp={handleInputEnter} />
                    <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                    <span className='createInfo'>
                        If you dont have an invite then &nbsp;
                        <a onClick={createNewRoom} href='/' className='createNewBtn'>new room</a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home